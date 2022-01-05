
import React, { useState, useEffect } from 'react';
import BookmarkList from './BookmarkList';
import AddBookmark from './AddBookmark'
import StyledButton from './components/StyledButton'
import StyledSection from './components/StyledSection'

function App() {

  //NOTE: using a function to set inital value from localStorage
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (bookmark) => {
    setBookmarks([...bookmarks, bookmark]);
  }

  // Use the created timestamp to match the bookmark and update it with the new one
  const editBookmark = (newBookmark) => {
    const updatedBookmarks = bookmarks.map((item) => {
      return (item.created === newBookmark.created) ? newBookmark : item
    })
    setBookmarks(updatedBookmarks);
  }

  const deleteBookmark = (bookmark) => {
    const updated = bookmarks.filter((item) => {
      //return everything except matched
      return (item.created !== bookmark.created)
    });
    setBookmarks(updated);
  }

  const deleteAllClick = () => {
    setBookmarks([]);
  }

  return (
    <StyledSection>
      <StyledButton onClick={deleteAllClick}>delete all</StyledButton>
      <hr />
      <AddBookmark addFunc={addBookmark} />
      <BookmarkList bookmarks={bookmarks} editFunc={editBookmark} deleteFunc={deleteBookmark} />
    </StyledSection>
  );
}

export default App;
