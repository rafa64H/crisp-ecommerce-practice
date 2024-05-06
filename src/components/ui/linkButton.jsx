import React from 'react';

const LinkButton = ({ linkText, linkHref }) => (
  <a href={linkHref} className="transparent-btn">
    {linkText}
  </a>
);

export default LinkButton;
