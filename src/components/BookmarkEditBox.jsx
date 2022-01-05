import styled from 'styled-components'

const BookmarkEditBox = styled.div`
  display:block;
  padding:0 0 4px 0;
  margin:8px 2px;
  background:white;
  text-align:left;

  input[type=text]{
    margin-bottom:2px;
  }

  label{
    display:inline-block;
    width:50px;
  }  

  .spacer{
    display:block;
    height:4px;
  }
`
export default BookmarkEditBox