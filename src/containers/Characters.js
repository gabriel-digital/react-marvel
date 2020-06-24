import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

const Characters = ({ favorites, setFavorites }) => {
  // init states and consts
  const { results } = useLocation();
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagesTotal, setPagesTotal] = useState(0);
  const [page, setPage] = useState(1);

  // call server request once on loading then on page change
  useEffect(() => {
    // server request : read 100 marvel characters
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ENV}/${page}`
        );
        const items = response.data.results;
        setPagesTotal(response.data.count);
        setCharacters(items);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (!results) {
      fetchdata();
    } else {
      setCharacters(results);
    }
  }, [page, results]);

  console.log(results);
  return isLoading ? (
    // wait for the server to answer
    <Loader />
  ) : (
    <main>
      <h1>Les personnages Marvel</h1>
      <div className="container">
        {/* search form */}
        <Search setIsLoading={setIsLoading} type="characters" />

        {/* no results */}
        {characters.length === 0 ? (
          <div className="noResults">
            <p>
              Pas de résultats... Essayez une autre recherche ou&nbsp;
              <Link
                to="/"
                // new server request if no results from Search
                // need a better way handle no results
                onClick={(event) => {
                  event.preventDefault();
                  const fetchdata = async () => {
                    try {
                      const response = await axios.get(
                        `${process.env.REACT_APP_ENV}/${page}`
                      );
                      const results = response.data.results;
                      setPagesTotal(response.data.count);
                      setCharacters(results);
                      setIsLoading(false);
                    } catch (error) {
                      console.log(error);
                    }
                  };
                  fetchdata();
                }}
              >
                Retournez à la liste des personnages
              </Link>
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
            {!results && (
              <Pagination
                pagesTotal={pagesTotal}
                page={page}
                setPage={setPage}
                setIsLoading={setIsLoading}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Characters;
