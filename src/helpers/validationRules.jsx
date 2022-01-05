import { isUrlReachableFromBE } from './isUrlReachableFromBE'


export const ValidateUrlFormatPromise = (input) => {
  const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(input);
  const returnObj = {rule:"format", passed: valid, errorMessage: valid ? '' : 'badly formatted url' }
  //TODO: don't use reject/catch for validation failures. there not real errors.
  return new Promise((resolve, reject) => {
    // valid ? resolve(returnObj) : reject(returnObj)
    //TODO: try only returning resolve.
    resolve(returnObj)
  })
}

export const checkUrlExists = async (input) => {
  const result = await isUrlReachableFromBE(input)
  const returnObj = {rule:"livecheck", passed: result.ok, errorMessage: result.ok ? '' : 'url is unreachable' }
  return new Promise((resolve, reject) => {
    // result.ok ? resolve(returnObj) : reject(returnObj)
    //TODO: try only returning resolve.
    resolve(returnObj)
  })
}
