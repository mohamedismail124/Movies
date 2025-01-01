/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MediaContext } from "../../Context/Mediastore";

function Tvshows() {
  let { trendingTvs } = useContext(MediaContext);
  return (
    <>
      <div className="row py-4 gy-3">
        <div className="col-md-4">
          <div className="welcome">
            <div className="brdr w-25 mb-3"></div>
            <h3>
              Trending <br /> Tv <br />
              To watch now
            </h3>
            <p className="text-muted mb-3">most watched tv shows by day</p>
            <div className="brdr"></div>
          </div>
        </div>

        {trendingTvs.slice(0, 10).map((item, index) => (
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
                <h2 className="h6">{item.name || "Untitled"} </h2>
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

export default Tvshows;
