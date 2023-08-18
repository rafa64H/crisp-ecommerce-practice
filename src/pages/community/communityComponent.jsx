import React from 'react';

const CommunityComponent = () => {
  console.log('hola');
  return (
    <section className="community">
      <ul className="community-list">
        <li className="community-list-li">
          <a
            className="community-list-item"
            href="./community.html"
            draggable="false"
          >
            <div className="community-list-item-div">
              <div className="community-list-item-div-text">
                <h2
                  style={{ fontSize: 'clamp(1.3rem, 1.5vw, 3rem)' }}
                  className="community-list-item__title"
                >
                  This is a good dress!
                </h2>
                <p className="community-list-item__paragraph">
                  fadsjjkfjasdlkfjaw eoifjosiej oiweaf
                  iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej
                  fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa
                </p>
              </div>
            </div>

            <div className="community-list-item__like-dislike-container">
              <button
                onClick={(e) => e.preventDefault()}
                type="button"
                alt="Like"
                className="like-dislike like"
              >
                <i className="fa-solid fa-arrow-up" />
                <p>200</p>
              </button>

              <button
                onClick={(e) => e.preventDefault()}
                type="button"
                alt="Dislike"
                className="like-dislike dislike"
              >
                <i className="fa-solid fa-arrow-down" />
                <p>13</p>
              </button>
            </div>
          </a>
        </li>
        <li className="community-list-li">
          <a
            className="community-list-item"
            href="./community.html"
            draggable="false"
          >
            <div className="community-list-item-div">
              <img
                src="https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg"
                alt="img"
                className="community-list-item__img"
              />
              <div className="community-list-item-div-text">
                <h2
                  style={{ fontSize: 'clamp(1.3rem, 1.5vw, 3rem)' }}
                  className="community-list-item__title"
                >
                  This is a good dress!
                </h2>
                <p className="community-list-item__paragraph">
                  fadsjjkfjasdlkfjaw eoifjosiej oiweaf
                  iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej
                  fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa
                </p>
              </div>
            </div>

            <div className="community-list-item__like-dislike-container">
              <button
                onClick={(e) => e.preventDefault()}
                type="button"
                alt="Like"
                className="like-dislike like"
              >
                <i className="fa-solid fa-arrow-up" />
                <p>200</p>
              </button>

              <button
                onClick={(e) => e.preventDefault()}
                type="button"
                alt="Dislike"
                className="like-dislike dislike"
              >
                <i className="fa-solid fa-arrow-down" />
                <p>13</p>
              </button>
            </div>
          </a>
        </li>{' '}
        <li className="community-list-li">
          <a
            className="community-list-item"
            href="./community.html"
            draggable="false"
          >
            <div className="community-list-item-div">
              <img
                src="https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg"
                alt="img"
                className="community-list-item__img"
              />
              <div className="community-list-item-div-text">
                <h2
                  style={{ fontSize: 'clamp(1.3rem, 1.5vw, 3rem)' }}
                  className="community-list-item__title"
                >
                  This is a good dress!
                </h2>
                <p className="community-list-item__paragraph">
                  fadsjjkfjasdlkfjaw eoifjosiej oiweaf
                  iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej
                  fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa
                </p>
              </div>
            </div>

            <div className="community-list-item__like-dislike-container">
              <button
                onClick={(e) => e.preventDefault()}
                type="button"
                alt="Like"
                className="like-dislike like"
              >
                <i className="fa-solid fa-arrow-up" />
                <p>200</p>
              </button>

              <button
                onClick={(e) => e.preventDefault()}
                type="button"
                alt="Dislike"
                className="like-dislike dislike"
              >
                <i className="fa-solid fa-arrow-down" />
                <p>13</p>
              </button>
            </div>
          </a>
        </li>{' '}
        <li className="community-list-li">
          <a
            className="community-list-item"
            href="./community.html"
            draggable="false"
          >
            <div className="community-list-item-div">
              <img
                src="https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg"
                alt="img"
                className="community-list-item__img"
              />
              <div className="community-list-item-div-text">
                <h2
                  style={{ fontSize: 'clamp(1.3rem, 1.5vw, 3rem)' }}
                  className="community-list-item__title"
                >
                  This is a good dress!
                </h2>
                <p className="community-list-item__paragraph">
                  fadsjjkfjasdlkfjaw eoifjosiej oiweaf
                  iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej
                  fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa
                </p>
              </div>
            </div>

            <div className="community-list-item__like-dislike-container">
              <button
                onClick={(e) => e.preventDefault()}
                type="button"
                alt="Like"
                className="like-dislike like"
              >
                <i className="fa-solid fa-arrow-up" />
                <p>200</p>
              </button>

              <button
                onClick={(e) => e.preventDefault()}
                type="button"
                alt="Dislike"
                className="like-dislike dislike"
              >
                <i className="fa-solid fa-arrow-down" />
                <p>13</p>
              </button>
            </div>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default CommunityComponent;
