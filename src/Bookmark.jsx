import React from 'react';
import styled from 'styled-components'
import { displayForm } from './displayForm'

//NOTE: className allows it to be wrapped in a styled component
const Bookmark = ({ className, bookmark = {}, editFunc, deleteFunc }) => {

  //TODO: why not pass in a list of <StyledButtons> ?
  const buttons = [
    {
      type: 'submit',
      value: 'update',
      func: editFunc,
      afterFunc: 'close'
    },
    {
      value: 'delete',
      func: deleteFunc
    },
    {
      value: 'cancel',
      afterFunc: 'close'
    }
  ]

  return (
    <div className={className}>
      {displayForm(buttons, bookmark)}
    </div>
  )
}

//TODO: move to the components folder?
const StyledBookmark = styled(Bookmark)`
  border-bottom: 1px solid lightgrey;
  margin:4px 0 4px 0;
  padding: 0 0 4px 0;
`;

export default StyledBookmark;

