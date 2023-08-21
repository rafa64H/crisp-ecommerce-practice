import React from 'react';

const CommunityComponent = () => {
  console.log('hola');
  return (
    <section className="community">
      <ul className="community-list">
        <CommunityPostListItem
          thumbnail="https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg"
          title="This is a good dress!"
          paragraph="fadsjjkfjasdlkfjaw eoifjosiej oiweaf
          iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej
          fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa"
          likes="143"
          dislikes="7"
        />
        <CommunityPostListItem
          thumbnail="https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg"
          title="This is a good dress!"
          likes="143"
          dislikes="7"
        />
        <CommunityPostListItem
          title="This is a good dress!"
          paragraph="fadsjjkfjasdlkfjaw eoifjosiej oiweaf
          iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej
          fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa"
          likes="143"
          dislikes="7"
        />
        <CommunityPostListItem
          title="This is a good dress!"
          likes="143"
          dislikes="7"
        />
      </ul>
    </section>
  );
};

export default CommunityComponent;

const CommunityPostListItem = ({
  params,
  thumbnail,
  title,
  paragraph,
  likes,
  dislikes,
}) => (
  <li className="community-list-li">
    <a
      className="community-list-item"
      href="./community.html"
      draggable="false"
    >
      <div className="community-list-item-div">
        {thumbnail ? (
          <img src={thumbnail} alt="img" className="community-list-item__img" />
        ) : (
          ''
        )}
        <div className="community-list-item-div-text">
          <h2
            style={{ fontSize: 'clamp(1.3rem, 1.5vw, 3rem)' }}
            className="community-list-item__title"
          >
            {title}
          </h2>
          {paragraph ? (
            <p className="community-list-item__paragraph">{paragraph}</p>
          ) : (
            ''
          )}
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
          <p>{likes}</p>
        </button>

        <button
          onClick={(e) => e.preventDefault()}
          type="button"
          alt="Dislike"
          className="like-dislike dislike"
        >
          <i className="fa-solid fa-arrow-down" />
          <p>{dislikes}</p>
        </button>
      </div>
    </a>
  </li>
);
