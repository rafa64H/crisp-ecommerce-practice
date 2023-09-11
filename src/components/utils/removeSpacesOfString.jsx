import React from 'react';

function removeSpacesOfString(passedString) {
  return passedString.toLowerCase().replace(/\s/g, '');
}

export default removeSpacesOfString;
