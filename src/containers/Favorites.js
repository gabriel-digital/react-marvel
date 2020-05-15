import React from "react";
import Card from "../components/Card";

const Favorites = ({ favorites, setFavorites, isFavorite, setIsFavorite }) => {
  const fav = JSON.parse(localStorage["favorites"]);
  return (
    <main>
      <h1>Mes favoris Marvel</h1>
      <div className="container">
        {fav.map((item, index) => {
          return (
            <section key={index}>
              <Card
                item={item}
                favorites={favorites}
                setFavorites={setFavorites}
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
              />
            </section>
          );
        })}
      </div>
    </main>
  );
};

export default Favorites;
