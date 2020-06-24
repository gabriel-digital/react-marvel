import React, { useState } from 'react';

const Card = ({ type, item, favorites, setFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  let name = '';
  if (type === 'character' || type === 'favorite') {
    name = item.name;
  } else {
    name = item.title;
  }
  let fav = [];
  if (localStorage['favorites']) {
    fav = JSON.parse(localStorage['favorites']);
  }
  const target = (element) => element.name === name;

  const handleFavorites = (e) => {
    e.preventDefault();
    // update favorite array with new item
    // need to code how to remove item from favorites with splice

    let newFavorites = [...fav];
    if (fav.findIndex(target) === -1) {
      newFavorites.push({
        type: type,
        name: name,
        description: item.description,
        thumbnail: item.thumbnail,
      });
      setFavorites(newFavorites);
      // set item is favorite or not
      // how to make it persitent on refresh ?!
    } else {
      newFavorites.splice(fav.findIndex(target), 1);
      setFavorites(newFavorites);
    }

    setIsFavorite(!isFavorite);
    // store to local storage
    localStorage['favorites'] = JSON.stringify(newFavorites);
  };

  return (
    <div className="card">
      <img
        src={item.thumbnail.path + '.' + item.thumbnail.extension}
        alt={name}
      />
      <div>
        <h2>{name}</h2>
        <p>{item.description}</p>
        <button
          className="favorites"
          onClick={(e) => {
            handleFavorites(e);
          }}
        >
          <svg
            width="25px"
            height="25px"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="star"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill={
                fav.findIndex(target) === -1
                  ? 'rgba(32, 32, 32, 1)'
                  : 'rgba(230, 36, 41, 1)'
              }
              d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
