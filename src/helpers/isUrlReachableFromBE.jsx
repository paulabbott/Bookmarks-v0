//NOTE: white listed https://eafdceab-1243-4b06-9497-7930dc82c606.id.repl.co for bookmarks.paul161.repl.co
export async function isUrlReachableFromBE(inputUrl) {
  let urlParts = new URL(inputUrl)
  let url = 'https://cors-anywhere.paul161.repl.co/' + urlParts.host + urlParts.pathname
  //NOTE: only trying to get headers not whole page.
  let response = await fetch(url, { method: 'HEAD' })
    .catch(async e => {
      console.log('There has been a problem with your fetch operation: ')
      return (e);
    });
  return response
}
