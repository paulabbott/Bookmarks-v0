import React from "react";
import { displayForm } from './displayForm'

function AddBookmark({ addFunc }) {

  const buttons = [{
    type: 'submit',
    value: 'add',
    func: addFunc,
    afterFunc: 'reset'
  }]

  return displayForm(buttons)
}

export default AddBookmark;