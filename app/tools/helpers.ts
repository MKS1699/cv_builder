function cleanURL(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

//  this function is good but it is making the display very hard
// function checkTextToTruncate(
//   text: string,
//   textWidth: number,
//   maxWidth: number
// ): string {
//   let truncatedText: string = text;

//   if (textWidth > maxWidth) {
//     truncatedText = truncatedText + " ";
//   }

//   if (truncatedText.length > text.length) {
//     truncatedText = truncatedText.slice(0, -1);
//     console.log(truncatedText.length, text.length);

//     truncatedText = truncatedText.slice(0, -6) + ".....";
//   }

//   return truncatedText;
// }

export {
  cleanURL,
  // checkTextToTruncate
};
