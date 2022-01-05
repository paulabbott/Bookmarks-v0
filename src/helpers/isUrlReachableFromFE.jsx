//File not used. 

//I found a solution that could somewhat differentiate between an unreachable domain and one blocked by CORS from the front end using browsers that have a native window fetch but couldn't prove that it was dependable enough to use so spun up a cors-anywhere instance instead.

export async function testIfReachableFE(url) {
  console.log('try ', url)
  let result = await myFetch(url)
    .catch(async e => {
      //console.log('There has been a problem with your fetch operation: ' + e.message);
      //try and see if we we blocked by CORS
      return await testForCORS(url)
    });
  return result
}

async function myFetch(url) {
  //only get HEAD
  let response = await fetch(url);
  //if the fetch fails ie invalid or blocked by cors we fall into the catch block in testIfReachable and don't progress.
  //hences response.ok will always = true.
  if (response.ok) {
    return {
      canFetch: response.ok,
      probablyCORS: false,
      info: "site reachable and open"
    }
  } else {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

// Working with Chrome Version 96.0.4664.93 (Official Build) (x86_64)
async function testForCORS(url) {
  console.log('testForCORS', url)
  let returnValue = {}
  if (window.fetch) {
    // must be chrome or firefox which have native fetch
    await fetch(url, {
        'mode': 'no-cors'
      })
      .then(function() {
        returnValue = {
          canFetch: false,
          probablyCORS: true,
          info: 'probably reachable but blocked by CORS'
        }
      })
      .catch(function() {
        console.log()
        // external is _not_ reachable
        returnValue = {
          canFetch: false,
          probablyCORS: false,
          info: 'probably NOT reachable'
        }

      });
  } else {
    // must be non-updated safari or older IE...
    // I don't know how to find error type in this case
    returnValue = {
      canFetch: false,
      probablyCORS: false,
      info: 'unknowen - browser without native fetch'
    }
  }
  return returnValue
}