import React from 'react';
import LinkButton from '../../components/ui/smaller/linkButton';

const SectionOne = ({
  h1Text,
  linkText,
  classesSectionOne,
  srcImg1,
  srcImg2,
}) => (
  <section className={classesSectionOne}>
    <div className="flex-section1">
      <div className="section1-content">
        <h1 className="section1-content__h1">{h1Text}</h1>
        <LinkButton linkText={linkText} />
      </div>

      <div className="section1-images">
        <img src={srcImg1} alt="" className="section1-img" />
        <img src={srcImg2} alt="" className="section1-img" />
      </div>
    </div>

    <div className="section1-change-background">
      <ArrowLeft />
      <ArrowRight />

      <div className="section1-change-background__squares">
        <button
          type="button"
          aria-label="Go to image 1"
          className="square"
          data-square-active
        />
        <button type="button" aria-label="Go to image 2" className="square" />
        <button type="button" aria-label="Go to image 3" className="square" />
        <button type="button" aria-label="Go to image 4" className="square" />
      </div>
    </div>
  </section>
);

export default SectionOne;

const ArrowLeft = () => (
  <button
    type="button"
    aria-label="Go to before image"
    className="arrow-left arrow"
  >
    <i className="fa-solid fa-arrow-left" />
  </button>
);

const ArrowRight = () => (
  <button
    type="button"
    aria-label="Go to next image"
    className="arrow-right arrow"
  >
    <i className="fa-solid fa-arrow-right" />
  </button>
);
