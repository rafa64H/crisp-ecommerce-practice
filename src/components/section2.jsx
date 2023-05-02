import React from 'react';
import LinkButton from './smaller/linkButton';

function SectionTwo({
  backgroundImage,
  textTitleSectionTwo,
  textParaSectionTwo,
  linkText,
  imageToLeft,
  classesSection2,
  classesImg,
  classesContent,
  classesTitle,
  classesPara,
}) {
  return (
    <div className={`section2 ${classesSection2}`}>
      <img
        src={backgroundImage}
        alt=""
        className={`section2-img ${classesImg}`}
        data-image-left={imageToLeft}
      />
      <div className={`section2-content ${classesContent}`}>
        <h2 className={`section2__title ${classesTitle}`}>
          {textTitleSectionTwo}
        </h2>
        <p className={`section2__para ${classesPara}`}>{textParaSectionTwo}</p>
        <LinkButton linkText={linkText} />
      </div>
    </div>
  );
}

export default SectionTwo;
