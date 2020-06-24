import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

// init states and consts

const Comics = ({ favorites, setFavorites }) => {
  const { results } = useLocation();
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagesTotal, setPagesTotal] = useState(0);
  const [page, setPage] = useState(1);

  // call server request once on loading then on page change
  useEffect(() => {
    // server request : read 100 marvel comics
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ENV}/comics/${page}`
        );
        const items = response.data.results;
        setPagesTotal(response.data.count);
        setComics(items);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (!results) {
      fetchdata();
    } else {
      setComics(results);
    }
  }, [page, results]);
  console.log(results);
  return isLoading ? (
    <Loader />
  ) : (
    <main>
      <h1>Les comics Marvel</h1>
      <div className="container">
        {/* search form */}
        <Search setIsLoading={setIsLoading} type="comics" />

        {/* no results */}
        {comics.length === 0 || (results && results.length === 0) ? (
          <div className="noResults">
            <p>
              Pas de résultats... Essayez une autre recherche ou&nbsp;
              <Link
                to="/comics"
                // new server request if no results from Search
                // need a better way handle no results
                onClick={(event) => {
                  event.preventDefault();
                  const fetchdata = async () => {
                    try {
                      const response = await axios.get(
                        `${process.env.REACT_APP_ENV}/comics/${page}`
                      );
                      const results = response.data.results;
                      setPagesTotal(response.data.count);
                      setComics(results);
                      setIsLoading(false);
                    } catch (error) {
                      console.log(error);
                    }
                  };
                  fetchdata();
                }}
              >
                Retournez à la liste des comics
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
            {comics.map((item, index) => {
              return (
                <section key={item.id}>
                  {/* result detail */}
                  <Card
                    type="comic"
                    item={item}
                    favorites={favorites}
                    setFavorites={setFavorites}
                  />
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

export default Comics;
