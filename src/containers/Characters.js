import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

const Characters = () => {
  // init states and consts
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagesTotal, setPagesTotal] = useState(0);
  const [page, setPage] = useState(1);
  const history = useHistory();

  // call server request once
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
    <p>en chargement...</p>
  ) : (
    <main className="main">
      <h1>Les personnages Marvel</h1>
      <div className="container">
        <Search setCharacters={setCharacters} setIsLoading={setIsLoading} />
        {characters.length === 0 ? (
          <p>pas de résultats</p>
        ) : (
          <>
            {characters.map((character, index) => {
              return (
                <section key={character.id}>
                  <button
                    onClick={() => {
                      history.push("/character", {
                        collection: character.comics.collectionURI,
                        name: character.name,
                      });
                    }}
                  >
                    <img
                      src={
                        character.thumbnail.path +
                        "." +
                        character.thumbnail.extension
                      }
                      alt={character.name}
                    />
                    <div>
                      <h2>{character.name}</h2>
                      <p>{character.description}</p>
                    </div>
                  </button>
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
