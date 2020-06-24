import React from 'react';
import Card from '../components/Card';

const Favorites = ({ favorites, setFavorites }) => {
  let fav = [];
  if (localStorage['favorites']) {
    fav = JSON.parse(localStorage['favorites']);
  }
  return (
    <main>
      <h1>Mes favoris Marvel</h1>
      <div className="container">
        {fav.length === 0 ? (
          <p>Vous n'avez pas encore de favoris</p>
        ) : (
          fav.map((item, index) => {
            return (
              <section key={index}>
                <Card
                  type="favorite"
                  item={item}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              </section>
            );
          })
        )}
      </div>
    </main>
  );
};

export default Favorites;
