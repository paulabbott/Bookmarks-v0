import React, { useState } from 'react';
import StyledButton from './components/StyledButton'
import { ValidateUrlFormatPromise, checkUrlExists } from './helpers/validationRules'
import isEmptyObj from './helpers/isEmptyObj'
import readTime from './helpers/readTime'
import validateField from './helpers/validateField'
import BookmarkEditBox from './components/BookmarkEditBox'

export function displayForm(buttons, bookmark = {}) {

  //init form depending on if we were passed a bookmark with data
  const [values, setValues] = useState(() => {
    if (isEmptyObj(bookmark)) {
      return ({
        showForm: true,
        url: '',
        urlDesc: '',
        isWaiting: false,
        validationMessage: ''
      })
    } else {
      return ({
        showForm: false,
        url: bookmark.url,
        urlDesc: bookmark.urlDesc,
        isWaiting: false,
        validationMessage: ''
      })
    }
  })

  //generic handleChange funciton for all inputs
  const handleChange = (event) => {
    updateValues({ [event.target.name]: event.target.value })
  }

  const updateValues = (obj) => {
    console.log('in updateValues with', obj)
    let newValues = {}
    for (const [key, value] of Object.entries(obj)) {
      newValues[key] = value
    }
    //have to pass prevState, cos closures
    //ref: https://reactjs.org/docs/hooks-reference.html#usestate
    setValues(prevState => {
      return { ...prevState, ...newValues };
    });
  }

  const validationRules = [ValidateUrlFormatPromise, checkUrlExists]

  const submitButton = returnSubmitButton(buttons)

  const setTimedValidationMessage = (flashMessage = "") => {
    // setValidationMessage(flashMessage)
    updateValues({ validationMessage: flashMessage })
    const delay = readTime(flashMessage)
    setTimeout(() => { updateValues({ validationMessage: '' }) }, delay * 3)
  }

  function returnSubmitButton(buttons) {
    return buttons.find((button) => button.type === 'submit')
  }

  async function handleSubmit(e) {
    e.preventDefault();
    updateValues({ isWaiting: true })
    const validationResult = await validateField(values.url, validationRules)
      .catch(v => {
        setTimedValidationMessage("sorry something went terribly wrong.")
      })
    updateValues({ isWaiting: false })
    if (validationResult.passedAll) {
      bookmark['url'] = values.url
      bookmark['urlDesc'] = values.urlDesc
      bookmark['created'] = ('created' in bookmark) ? bookmark.created : + new Date()
      // calls the function associated with the submit button, atm either add or edit.
      //TODO: rename onClickFunc?
      submitButton.func(bookmark)
      // calls a local form action such as reset or close the form.
      callAfterFunc(submitButton.afterFunc)
    } else {
      setTimedValidationMessage(validationResult.messages[0].errorMessage)
      console.log('validation failed', validationResult.messages[0].errorMessages)
    }
  }

  // allow buttons to change the local form values, show/hide and reset input fields.
  function callAfterFunc(funcName) {
    switch (funcName) {
      case 'close':
        updateValues({ showForm: false })
        break;
      case 'reset':
        updateValues({ url: '', urlDesc: '' })
        break;
      default:
        console.warn('unknown switch case')
    }
  }

  // pass the current bookmark to the passed in function onClick function
  function handleButtonClick(e, func, afterFunc, bookmark) {
    e.preventDefault();
    func && func(bookmark)
    afterFunc && callAfterFunc(afterFunc)
  }

  //display the form in onlyread mode
  function readView() {
    return (
      <div>
        <a target='_blank' href={bookmark.url}>{bookmark.url}</a>
        &nbsp;<StyledButton onClick={() => updateValues({ showForm: true })}>edit</StyledButton>
      </div>
    )
  }

  //return an jsx fragment containing the buttons for the form
  //TODO: could probably dry this up a bit
  function DisplayFormButtons() {
    return (
      <React.Fragment>
        {
          buttons.map((button, i) => {
            //test if this is the submit button and treat it slightly diffently.
            if (button.type === 'submit') {
              return (<StyledButton key={'key' + bookmark.created + i} type='submit' wait={values.isWaiting} disabled={values.isWaiting}>
                {values.isWaiting ? 'wait' : button.value}
              </StyledButton>
              )
            } else {
              return (
                <StyledButton
                  key={'key' + bookmark.created + i} onClick={(e) => handleButtonClick(e, button.func, button.afterFunc, bookmark)}>
                  {button.value}
                </StyledButton>
              )
            }
          })
        }
      </React.Fragment>
    )
  }

  //display the form inputs and the custom buttons.
  function formView() {
    return (
      <BookmarkEditBox>
        <form onSubmit={e => { handleSubmit(e) }}>
          <label>url:</label>
          <input
            name='url'
            type='text'
            value={values.url}
            onChange={handleChange} 
          />
          &nbsp;<span>{values.validationMessage}</span>
          <br />
          <label>notes:</label>
          <input
            name='urlDesc'
            type='text'
            value={values.urlDesc}
            onChange={handleChange} 
          />
          <br />
          <DisplayFormButtons />
        </form>
      </BookmarkEditBox>
    )
  }

  //NOTE: conditional rendering but hooks always get called. 
  return values.showForm ? formView() : readView()
}

