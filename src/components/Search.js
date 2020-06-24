import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const Search = ({ type, setIsLoading }) => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  let path = '/';
  if (type === 'comics') {
    path = '/comics';
  }
  const fetchdata = async () => {
    if (search) {
      try {
        setIsLoading(true);
        // need to change method becouse "post" not allowed by Marvel API
        let response = {};
        if (type === 'characters') {
          response = await axios.post(`${process.env.REACT_APP_ENV}/`, {
            name: search,
          });
        } else {
          response = await axios.post(`${process.env.REACT_APP_ENV}/comics`, {
            name: search,
          });
        }

        setIsLoading(false);
        history.push({
          pathname: path,
          results: response.data.results,
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setError('Que cherches-tu? ');
    }
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        fetchdata();
      }}
    >
      <input
        type="text"
        placeholder={
          type === 'characters'
            ? 'Rechercher un personnage'
            : 'Rechercher un comics'
        }
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <input type="submit" value="Rechercher" />
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Search;
