import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LinkButton from "./ui/linkButton";

const SectionOne = ({ h1Texts, links, classesSectionOne, pairSrcImgs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className={classesSectionOne}>
      {h1Texts.map((title, index) => (
        <SectionOneElement
          key={uuidv4()}
          h1Text={title}
          link={links[index]}
          srcImg1={pairSrcImgs[index][0]}
          srcImg2={pairSrcImgs[index][1]}
          showSectionOneElement={index === currentIndex}
        />
      ))}

      <div className="section1-change-background">
        <ArrowLeft
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          arrayOfElements={h1Texts}
        />
        <ArrowRight
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          arrayOfElements={h1Texts}
        />

        <div className="section1-change-background__squares">
          {h1Texts.map((title, index) => (
            <button
              key={uuidv4()}
              type="button"
              aria-label={`Go to image ${index + 1}`}
              className="square"
              data-square-active={currentIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionOne;

const ArrowLeft = ({ currentIndex, setCurrentIndex, arrayOfElements }) => (
  <button
    type="button"
    aria-label="Go to before image"
    className="arrow-left arrow"
    onClick={() => {
      if (currentIndex === 0)
        return setCurrentIndex((prevValue) => arrayOfElements.length - 1);
      setCurrentIndex((prevValue) => prevValue - 1);
    }}
  >
    <i className="fa-solid fa-arrow-left" />
  </button>
);

const ArrowRight = ({ currentIndex, setCurrentIndex, arrayOfElements }) => (
  <button
    type="button"
    aria-label="Go to next image"
    className="arrow-right arrow"
    onClick={() => {
      if (currentIndex === arrayOfElements.length - 1)
        return setCurrentIndex((prevValue) => 0);
      setCurrentIndex((prevValue) => prevValue + 1);
    }}
  >
    <i className="fa-solid fa-arrow-right" />
  </button>
);

const SectionOneElement = ({
  h1Text,
  link,
  srcImg1,
  srcImg2,
  showSectionOneElement,
}) => (
  <div
    className="flex-section1"
    data-show-section1-element={showSectionOneElement}
    aria-hidden={!showSectionOneElement}
  >
    <div className="section1-content">
      <h1 className="section1-content__h1">{h1Text}</h1>
      <LinkButton linkText={link[0]} linkHref={link[1]} />
    </div>

    <div className="section1-images">
      <img src={srcImg1} alt="" className="section1-img" />
      <img src={srcImg2} alt="" className="section1-img" />
    </div>
  </div>
);
