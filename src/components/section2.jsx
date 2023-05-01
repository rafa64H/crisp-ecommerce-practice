import React from 'react';
import LinkButton from './smaller/linkButton';

function SectionTwo({
  backgroundImage,
  textTitleSectionTwo,
  textParaSectionTwo,
}) {
  return (
    <div className={('section2', backgroundImage)}>
      <div className="section2-content">
        <h2 className="section2__title">{textTitleSectionTwo}</h2>
        <p className="section2__para">{textParaSectionTwo}</p>
        <LinkButton linkText="SEE OFFERS" />
      </div>
    </div>
  );
}

export default SectionTwo;
