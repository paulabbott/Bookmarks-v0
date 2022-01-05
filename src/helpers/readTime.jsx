export default function readingTime(text) {
  const wordsPerMinute = 200;
  const noOfWords = text.split(' ').length;
  const minutes = noOfWords / wordsPerMinute;
  const seconds = minutes * 60
  const miliSeconds = seconds * 1000
  return Math.ceil(miliSeconds)
}