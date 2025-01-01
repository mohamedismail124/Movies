/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Details() {
  const [itemDetails, setItemDetails] = useState({});
  let params = useParams();

  let getItemDetails = async () => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=c636ed7787cc302d96bf88ccf334e0d8&language=en-US`
    );
    setItemDetails(data);
  };

  useEffect(() => {
    getItemDetails();
  }, []);

  return (
    <div className='row py-4'>
      <div className="col-md-3">
        {params.mediaType == 'person' ? (
          <img
            className='w-100'
            src={itemDetails.profile_path ? `https://image.tmdb.org/t/p/w500${itemDetails.profile_path}` : 'path_to_default_profile_image.jpg'}
            alt={itemDetails.name || 'No image available'}
          />
        ) : (
          <img
            className='w-100'
            src={itemDetails.poster_path ? `https://image.tmdb.org/t/p/w500${itemDetails.poster_path}` : 'path_to_default_poster_image.jpg'}
            alt={itemDetails.title || 'No image available'}
          />
        )}
      </div>
      <div className="col-md-9">
        <h2 className='pb-3'>{itemDetails.title || itemDetails.name}</h2>

        {/* Ensure itemDetails.genres exists and is an array before mapping */}
        {itemDetails.genres && Array.isArray(itemDetails.genres) ? (
          itemDetails.genres.map((value, index) => (
            <span key={index} className='badge bg-info p-2 mx-2'>{value.name}</span>
          ))
        ) : (
          <p>No genres available</p>
        )}

        {/* Conditionally render the list only if mediaType is not 'person' */}
        {params.mediaType !== 'person' && (
          <ul>
            {itemDetails.vote_average && (
              <li className='pb-2 pt-4'>{itemDetails.vote_average}</li>
            )}
            {itemDetails.vote_count && (
              <li className='pb-2 pt-4'>{itemDetails.vote_count}</li>
            )}
            {itemDetails.release_date && (
              <li className='pb-2 pt-4'>{itemDetails.release_date}</li>
            )}
          </ul>
        )}

        <p className='my-3 pt-4'>{itemDetails.overview || itemDetails.biography}</p>
      </div>
    </div>
  );
}

export default Details;
