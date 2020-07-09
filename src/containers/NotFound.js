import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main>
      <div className="container notFound">
        <h1>Page non trouvée</h1>
        <img
          src="https://pbs.twimg.com/media/Dr1bsxnUcAEe9E1?format=jpg&name=small"
          alt="Hulk pleure"
        />
        <Link to="/">Back Home</Link>
      </div>
    </main>
  );
};

export default NotFound;
