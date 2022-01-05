import React, { useState } from 'react';
import StyledButton from './components/StyledButton'
import { ValidateUrlFormatPromise, checkUrlExists } from './helpers/validationRules'
import isEmptyObj from './helpers/isEmptyObj'
import readTime from './helpers/readTime'
import validateField from './helpers/validateField'
import BookmarkEditBox from './components/BookmarkEditBox'

export function displayForm(buttons, bookmark = {}) {

  // TODO: collect these up into one state object
  // if the bookmark is empty initially show the form and init the fields to empty strings.
  const [showForm, setShowForm] = useState(() => isEmptyObj(bookmark));
  const [url, setUrl] = useState(() => isEmptyObj(bookmark) ? '' : bookmark.url);
  const [urlDesc, setUrlDesc] = useState(() => isEmptyObj(bookmark) ? '' : bookmark.urlDesc);
  const [isWaiting, setIsWaiting] = useState(false);
  const [validationMessage, setValidationMessage] = useState('')

  const validationRules = [ValidateUrlFormatPromise, checkUrlExists]

  const submitButton = returnSubmitButton(buttons)

  function setTimedValidationMessage(flashMessage = "") {
    setValidationMessage(flashMessage)
    const delay = readTime(flashMessage)
    setTimeout(() => { setValidationMessage('') }, delay * 3)
  }

  function returnSubmitButton(buttons) {
    return buttons.find((button) => button.type === 'submit')
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsWaiting(true)
    const validationResult = await validateField(url, validationRules)
      .catch(v => {
        setTimedValidationMessage("sorry something went terribly wrong.")
      })
    setIsWaiting(false)
    //console.log('validationResult=', validationResult);
    if (validationResult.passedAll) {
      bookmark.url = url
      bookmark.urlDesc = urlDesc
      bookmark.created = ('created' in bookmark) ? bookmark.created : + new Date()
      // calls the function associated with the submit button, atm either add or edit.
      submitButton.func(bookmark)
      // calls a local form action such as reset or close the form.
      callAfterFunc(submitButton.afterFunc)
    } else {
      setTimedValidationMessage(validationResult.messages[0].errorMessage)
      console.log('validation failed', validationResult.messages[0].errorMessages)
    }
  }

  // allow buttons to change the local form values show/hide and reset input fields.
  function callAfterFunc(funcName) {
    switch (funcName) {
      case 'close':
        setShowForm(false)
        break;
      case 'reset':
        setUrl("")
        setUrlDesc("")
        break;
      default:
        console.warn('unknown switch case')
    }
  }

  // pass the current bookmark to the buttons onClick function
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
        &nbsp;<StyledButton onClick={() => setShowForm(true)}>edit</StyledButton>
      </div>
    )
  }

  //return an jsx fragment containing the buttons for the form depending on if we are building the add or edit form.
  //TODO: could probably dry this up a bit
  function DisplayFormButtons() {
    return (
      <React.Fragment>
        {
          buttons.map((button, i) => {
            //test if this is the submit button and treat it slightly diffently.
            if (button.type === 'submit') {
              return (<StyledButton key={'key' + bookmark.created + '-' + i} type='submit' wait={isWaiting} disabled={isWaiting}>
                {isWaiting ? 'wait' : button.value}
              </StyledButton>
              )
            } else {
              return (
                <StyledButton
                  key={'key' + bookmark.created + '-' + i} onClick={(e) => handleButtonClick(e, button.func, button.afterFunc, bookmark)}>
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
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          &nbsp;<span>{validationMessage}</span>
          <br />
          <label>notes:</label>
          <input
            name='urlDesc'
            type='text'
            value={urlDesc}
            onChange={e => setUrlDesc(e.target.value)}
          />
          <br />
          <DisplayFormButtons />
        </form>
      </BookmarkEditBox>
    )
  }

  //NOTE: conditional rendering but hooks always get called. 
  return showForm ? formView() : readView()
}

