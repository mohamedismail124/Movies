/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MediaContext } from "../../Context/Mediastore";


function Movies() {
  let { trendingMovies } = useContext(MediaContext);

  return (
    <>
      <div className="row py-4 gy-3">

        <div className="col-md-4">
          <div className="welcome">
            <div className="brdr w-25 mb-3"></div>
            <h3>
              Trending <br />
              Movies <br />
              To watch now
            </h3>
            <p className="text-muted mb-3">Most watched movies by day</p>
            <div className="brdr"></div>
          </div>
        </div>

        {trendingMovies.slice(0, 10).map((item, index) => (
          <div key={index} className="col-md-2">
            <Link
              className="nav-link"
              to={`/details/${item.id}/${item.media_type}`}
            >
              <div className="item position-relative">
                {item.poster_path ? (
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.name || "Unnamed Person"}
                  />
                ) : (
                  <div>
                    <img src="" alt="" />
                  </div>
                )}
                <h2 className="h6">{item.title || "Untitled"}</h2>
                {/* Check if vote_average exists */}
                <span className="position-absolute top-0 end-0 p-2 bg-info">
                  {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Movies;
