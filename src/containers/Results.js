import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useLocation } from 'react-router-dom';

const Results = ({ favorites, setFavorites }) => {
  const { results } = useLocation();

  return (
    <main>
      <h1>Résultats de votre recherche</h1>
      <div className="container">
        {/* no results for term searched... try again ! */}
        {!results || results.length === 0 ? (
          <div className="noResults">
            <p>
              Pas de résultats...
              <Link to="/">&nbsp;Retournez à la liste des personnages</Link>
            </p>
            <img
              src="https://pbs.twimg.com/profile_images/1019869958732505088/nAZC4AaM_400x400.jpg"
              alt="Hulk casse son ordi de colère !"
            />
          </div>
        ) : (
          <>
            {/* we have results, show them */}
            {results.map((item, index) => {
              return (
                <section key={item.id}>
                  {/* link to comics where the character appears */}
                  <Link
                    to={(location) => ({
                      ...location,
                      pathname: '/character',
                      state: {
                        collection: item.comics.collectionURI,
                        name: item.name,
                      },
                    })}
                  >
                    {/* result detail */}
                    <Card
                      type="character"
                      item={item}
                      favorites={favorites}
                      setFavorites={setFavorites}
                    />
                  </Link>
                </section>
              );
            })}
          </>
        )}
      </div>
    </main>
  );
};

export default Results;
