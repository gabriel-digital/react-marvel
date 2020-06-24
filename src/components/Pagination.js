import React from 'react';

const Pagination = ({ pagesTotal, page, setPage, setIsLoading }) => {
  const renderPage = () => {
    const pages = []; // le tableau qui contiendra les balises buttons de la pagination
    for (let i = 1; i <= pagesTotal; i++) {
      // à chaque tour, on ajouter un bouton à notre tableau
      pages.push(
        <button
          className={i === page ? 'active' : ''}
          key={i}
          onClick={() => {
            setIsLoading(true);
            setPage(i);
          }}
        >
          {i}
        </button>
      );
    }
    return pages; // on retourne le tableau
  };
  return <div className="pagination">{renderPage()}</div>;
};

export default Pagination;
