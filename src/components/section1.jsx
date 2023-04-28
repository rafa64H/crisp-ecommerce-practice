import React from 'react';

function SectionOne({ h1Text, linkText, classesSectionOne, srcImg1, srcImg2 }) {
  return (
    <section className={classesSectionOne}>
      <div className="flex">
        <div className="section1-content">
          <h1 className="section1-content__h1">{h1Text}</h1>
          <a href="#" className="section1-content__link">
            {linkText}
          </a>
        </div>
        <div className="section1-images">
          <img src={srcImg1} alt="" className="section1-img" />
          <img src={srcImg2} alt="" className="section1-img" />
        </div>
      </div>

      <div className="section1-change-background">
        <button type="button" className="arrow-left arrow">
          <i className="fa-solid fa-arrow-left" />
        </button>
        <button type="button" className="arrow-right arrow">
          <i className="fa-solid fa-arrow-right" />
        </button>
        <div className="section1-change-background__squares">
          <button type="button" className="square" data-square-active />
          <button type="button" className="square" />
          <button type="button" className="square" />
          <button type="button" className="square" />
        </div>
      </div>
    </section>
  );
}

export default SectionOne;
