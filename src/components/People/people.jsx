import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MediaContext } from "../../Context/Mediastore";

function People() {
  let { trendingPersons } = useContext(MediaContext);

  return (
    <>
      <div className="row py-4 gy-3">
        <div className="col-md-4">
          <div className="welcome ">
            <div className="brdr w-25 mb-3"></div>
            <h3>
              Trending <br /> People <br />
              To watch now
            </h3>
            <p className="text-muted mb-3">Most watched People by day</p>
            <div className="brdr"></div>
          </div>
        </div>

        {trendingPersons &&
          Array.isArray(trendingPersons) &&
          trendingPersons.slice(0, 10).map((item, index) => (
            <div key={index} className="col-md-2">
              <Link
                className="nav-link"
                to={`/details/${item.id}/${item.media_type}`}
              >
                <div className="item position-relative">
                  {item.profile_path ? (
                    <img
                      className="w-100"
                      src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                      alt={item.name || "Unnamed Person"}
                    />
                  ) : (
                    <img
                      className="w-100"
                      src="/Tom.jpg" 
                      alt="Unnamed Person"
                    />
                  )}
                  <h2 className="h6">{item.name || "Unnamed Person"}</h2>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}

export default People;
