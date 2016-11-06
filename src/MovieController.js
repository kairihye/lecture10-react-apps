// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

import 'whatwg-fetch'; //for polyfill

//TMDB constants
const apiKey = "d37398a8fa01ed9f121f9074b614e320";
const baseApiUrl = "https://api.themoviedb.org/3";
const baseImageUrl = "https://image.tmdb.org/t/p/w92"; //small posters

//module with functions to download a model from online
export default {
  searchTMDB: function(query) {
    var resource = '/search/movie'
    var tmdbUri = baseApiUrl+resource+'?api_key='+apiKey+'&query='+query;
    return fetch(tmdbUri)
      .then(function(res) { return res.json()})
      //re-render after searching
      // .then(function(data){
      //   ReactDOM.render(
      //     <App movies={data} />,
      //     document.getElementById('root')
      //   );
      //   return data;
      // })
  },

  getPosterUrl: function(movie){
    if(movie.poster_path) {
      return baseImageUrl + movie.poster_path;
    }
    else {
      return ''; //don't load bad image'
    }
  }
}