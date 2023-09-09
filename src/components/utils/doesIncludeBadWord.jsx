import React from 'react';
import badWords from '../../data/bad_words.json';
import removeSpacesOfString from './removeSpacesOfString';

function doesIncludeBadWord(passedText) {
  const badWordsArray = badWords.words.map((word) =>
    removeSpacesOfString(word)
  );

  const textToVerify = removeSpacesOfString(passedText);

  const textToVerifyOffensive = badWordsArray.some((badWord) =>
    textToVerify.includes(badWord)
  );

  return textToVerifyOffensive;
}

export default doesIncludeBadWord;
