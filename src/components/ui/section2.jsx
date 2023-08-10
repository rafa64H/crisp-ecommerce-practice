import React from 'react';
import LinkButton from './smaller/linkButton';

const SectionTwo = ({
  textTitleSectionTwo,
  textParaSectionTwo,
  linkText,
  linkHref,
  classesSection2,
}) => (
  <section className={`section2 ${classesSection2}`}>
    <div className="section2-content">
      <h2 className="section2__title">{textTitleSectionTwo}</h2>
      <p className="section2__para">{textParaSectionTwo}</p>
      <LinkButton linkText={linkText} linkHref={linkHref} />
    </div>
  </section>
);

export default SectionTwo;
