import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Character = () => {
  // init sattes and consts
  const [character, setCharacter] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const location = history.location;

  //server resquest: read collection for a marvel character

  // call server request once
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.post("http://localhost:3100/character", {
          collection: location.state.collection,
        });
        console.log(response.data);
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
    <p>en chargement...</p>
  ) : (
    <main className="characters">
      <h1>Les comics avec le personnage Marvel {location.state.name}</h1>
      {character.map((comic, index) => {
        return (
          <section className="characters" key={comic.id}>
            <img
              src={comic.thumbnail.path + "." + comic.thumbnail.extension}
              alt={comic.title}
            />
            <div>
              <h2>{comic.title}</h2>
              <p>{comic.description}</p>
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default Character;
