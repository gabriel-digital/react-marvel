import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Loader from '../components/Loader';

const Character = () => {
  // init states and vars
  const [character, setCharacter] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const location = history.location;

  // call server request once
  useEffect(() => {
    const fetchdata = async () => {
      try {
        //server resquest: read collection for a marvel character
        const response = await axios.post(
          `${process.env.REACT_APP_ENV}/character`,
          {
            collection: location.state.collection,
          }
        );
        const results = response.data.results;
        setCharacter(results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [location.state.collection]);

  return isLoading ? (
    <Loader />
  ) : (
    <main>
      <h1>Les comics avec le personnage Marvel {location.state.name}</h1>
      <div className="container">
        {character.map((comic, index) => {
          return (
            <section className="characters" key={comic.id}>
              <div className="card">
                <img
                  src={comic.thumbnail.path + '.' + comic.thumbnail.extension}
                  alt={comic.title}
                />
                <div>
                  <h2>{comic.title}</h2>
                  <p>{comic.description}</p>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
};

export default Character;
