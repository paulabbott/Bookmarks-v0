import React, { useState } from 'react';
import StyledButton from './components/StyledButton'
import { ValidateUrlFormatPromise, checkUrlExists } from './helpers/validation'
import isEmptyObj from './helpers/isEmptyObj'
import readTime from './helpers/readTime'
import BookmarkEditBox from './components/BookmarkEditBox'


// TODO: break out the validation

export const displayForm = (buttons, bookmark = {}) => {

  // TODO: could group these into one state object
  // if the bookmark is empty initially show the form
  // and init the fields to empty strings.
  const [showForm, setShowForm] = useState(() => isEmptyObj(bookmark));
  const [url, setUrl] = useState(() => isEmptyObj(bookmark) ? '' : bookmark.url);
  const [urlDesc, setUrlDesc] = useState(() => isEmptyObj(bookmark) ? '' : bookmark.urlDesc);
  const [isWaiting, setIsWaiting] = useState(false);
  const [validationMessage, setValidationMessage] = useState('')

  function setTimedValidationMessage(flashMessage) {
    setValidationMessage(flashMessage)
    const delay = readTime(flashMessage)
    setTimeout(() => { setValidationMessage('') }, delay)
  }

  //TODO: change this
  // NOTE: is presumed that the first button is the submit button 
  // and only the submit button runs validation
  async function handleSubmit(e) {
    e.preventDefault();
    const passes = await validation().catch(v => {
      //uhg: this is why catch is bad for busniss logic it breaks the flow.
      setTimedValidationMessage(v.errorMessage)
      setIsWaiting(false)
    })
    if (passes) {
      bookmark.url = url
      bookmark.urlDesc = urlDesc
      bookmark.created = ('created' in bookmark) ? bookmark.created : + new Date()
      buttons[0].func(bookmark)
      callAfterFunc(buttons[0].afterFunc)
    } else {
      console.log('validation failed')
      //validation message will be displayed to user in catch statment above.
    }
  }

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
        console.warn('hit default')
    }
  }

  function handleButtonClick(e, func, afterFunc, bookmark) {
    e.preventDefault();
    //pass the current bookmark to the buttons onClick function
    func && func(bookmark)
    afterFunc && callAfterFunc(afterFunc)
  }

  //TODO: map over an array of validation rules.
  //not crazy about using try catch to report validation errors.
  async function validation() {
    setIsWaiting(true)
    const test1Result = await ValidateUrlFormatPromise(url)
    const test2Result = await checkUrlExists(url)
    //TODO: make this all nicer
    setIsWaiting(false)
    return temp = (test1Result.passed && test2Result.passed)
  }

  function readView() {
    return (
      <div>
        <a target='_blank' href={bookmark.url}>{bookmark.url}</a>
        &nbsp;<StyledButton onClick={() => setShowForm(true)}>edit</StyledButton>
      </div>
    )
  }

  //NOTE: presumes the first button is the submit button.
  //TODO: filter on the buttons type proprty
  function DisplayFormButtons() {
    return (
      <React.Fragment>
        <StyledButton key={'key' + bookmark.created + '-submit'} type='submit' wait={isWaiting} disabled={isWaiting}>
          {isWaiting ? 'wait' : buttons[0].value}
        </StyledButton>
        {
          buttons.slice(1).map((button, i) => {
            return (
              <StyledButton key={'key' + bookmark.created + '-' + i} onClick={(e) => handleButtonClick(e, button.func, button.afterFunc, bookmark)}>
                {button.value}
              </StyledButton>
            )
          })
        }
      </React.Fragment>
    )
  }

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

