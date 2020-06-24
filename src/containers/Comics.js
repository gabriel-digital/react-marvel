import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Pagination from '../components/Pagination';

// init states and consts

const Comics = ({ favorites, setFavorites }) => {
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
        console.log(response.data);
        const results = response.data.results;
        setPagesTotal(response.data.count);
        setComics(results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [page]);
  return isLoading ? (
    <Loader />
  ) : (
    <main>
      <h1>Les comics Marvel</h1>
      <div className="container">
        <>
          {/* we have results, show them */}
          {comics.map((item, index) => {
            return (
              <section key={item.digitalId}>
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
          <Pagination
            pagesTotal={pagesTotal}
            page={page}
            setPage={setPage}
            setIsLoading={setIsLoading}
          />
        </>
      </div>
    </main>
  );
};

export default Comics;
