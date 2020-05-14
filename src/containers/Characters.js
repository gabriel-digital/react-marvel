import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

const Characters = ({ favorites, setFavorites, isFavorite, setIsFavorite }) => {
  // init states and consts
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagesTotal, setPagesTotal] = useState(0);
  const [page, setPage] = useState(1);

  // call server request once on loading then on page change
  useEffect(() => {
    // server request : read 100 marvel characters
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/${page}`);
        const results = response.data.results;
        setPagesTotal(response.data.count);
        setCharacters(results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [page]);

  return isLoading ? (
    // wait for the server to answer
    <p>en chargement...</p>
  ) : (
    <main>
      <h1>Les personnages Marvel</h1>
      <div className="container">
        {/* search form */}
        <Search setCharacters={setCharacters} setIsLoading={setIsLoading} />

        {/* no results for term searched... try again ! */}
        {characters.length === 0 ? (
          <div className="noResults">
            <p>
              Pas de résultats... Essayez une autre recherche ou{" "}
              <Link to="/">retournez à l'acceuil</Link>
            </p>
            <img
              src="https://pbs.twimg.com/profile_images/1019869958732505088/nAZC4AaM_400x400.jpg"
              alt="Hulk casse son ordi de colère !"
            />
          </div>
        ) : (
          <>
            {/* we have results, show them */}
            {characters.map((item, index) => {
              return (
                <section key={item.id}>
                  {/* link to comics where the character appears */}
                  <Link
                    to={(location) => ({
                      ...location,
                      pathname: "/character",
                      state: {
                        collection: item.comics.collectionURI,
                        name: item.name,
                      },
                    })}
                  >
                    {/* result detail */}
                    <Card
                      item={item}
                      favorites={favorites}
                      setFavorites={setFavorites}
                      isFavorite={isFavorite}
                      setIsFavorite={setIsFavorite}
                    />
                  </Link>
                </section>
              );
            })}
            <Pagination pagesTotal={pagesTotal} page={page} setPage={setPage} />
          </>
        )}
      </div>
    </main>
  );
};

export default Characters;
