import React from 'react';
import badWords from '../../data/bad_words.json';
import removeSpacesOfString from './removeSpacesOfString';

function doesIncludeBadWord(passedText) {
  const badWordsArray = badWords.words.map((word) => word.toLowerCase());

  const textToVerify = removeSpacesOfString(passedText);

  console.log(badWordsArray.find((badWord) => textToVerify.includes(badWord)));
  const textToVerifyOffensive = badWordsArray.some((badWord) =>
    textToVerify.includes(badWord)
  );

  return textToVerifyOffensive;
}

export default doesIncludeBadWord;
