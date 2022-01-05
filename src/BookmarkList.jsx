import React, { useState, useEffect } from 'react';
import StyledBookmark from './Bookmark'
import StyledButton from './components/StyledButton'

//TODO: extract the pagination

function BookmarkList({ bookmarks, editFunc, deleteFunc }) {
  const pageSize = 3
  const [currentPage, setCurrentPage] = useState(0)

  var numOfPages = Math.ceil(bookmarks.length / pageSize)

  const decCurrentPage = () => {
    currentPage > 0 && setCurrentPage(currentPage - 1)
  }

  const incCurrentPage = () => {
    currentPage + 1 < numOfPages && setCurrentPage(currentPage + 1)
  }

  //creates an array of numbers 0 to numOfPages
  //then maps over them to output tags including a selected style.
  const PaginationNumbers = () => {
    return (
      <span>
        {[...Array(numOfPages)].map((e, i) => {
          //TODO: tidy this up and apply a current style
          if (i == currentPage) {
            return <span key={'page' + i+1}>&nbsp;<u>{i+1}</u>&nbsp;</span>
          } else {
            return <span key={'page' + i+1}>&nbsp;{i+1}&nbsp;</span>
          }
        })
        }
      </span>
    )
  }

  //TODO: use unordered list tags?
  return (
    <div>
      <div>
        {bookmarks.slice(currentPage * pageSize, currentPage * pageSize + pageSize).map((v, i) => {
          return <StyledBookmark key={'test' + v.created} bookmark={v} editFunc={editFunc} deleteFunc={deleteFunc} />
        })}
      </div>
      <div>
        <StyledButton onClick={decCurrentPage}>&lt;</StyledButton>
        <PaginationNumbers />
        <StyledButton onClick={incCurrentPage}>&gt;</StyledButton>
      </div>
    </div>

  );
}

export default BookmarkList;