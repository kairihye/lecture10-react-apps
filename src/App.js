import React from 'react';

var SAMPLE_MOVIES = [
  {
    title: "Star Wars: The Force Awakens", 
    release_date: "2015-12-15", 
    poster_url: "https://image.tmdb.org/t/p/w92/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg"
  },
  {title: "Zootopia", release_date: "2016-02-11", poster_url: "https://image.tmdb.org/t/p/w92/sM33SANp9z6rXW8Itn7NnG1GOEs.jpg"},
  {title: "Inception", release_date: "2010-07-14", poster_url: "https://image.tmdb.org/t/p/w92/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"}
];

//overall App
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1>Movie Search</h1>
        </header>
        <main>
          <MovieTable movies={SAMPLE_MOVIES} />
        </main>
      </div>
    );
  }
}

//table of movie data
class MovieTable extends React.Component {
  render() {

    //can interact with this.props here, the movies array from line22 MovieTable movies = {SAMPLE_MOVIES}
    //make it into a varriable rows
    var rows = this.props.movies.map(function(movieobj){
      return <MovieRow movie={movieobj} />; //pass  movie
    })
    
    return (
      <table className="table table-condensed">
        <thead>
          <tr><th className="col-xs-1">Poster</th><th className="col-xs-4">Title</th><th>Released</th></tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>      
    );
  }
}

class MovieRow extends React.Component {
  render() {
    return (
      //then change this so you can view the movie title, this.props.movie.title to display the movie's title
      //change the poster to {this.props.movie.poster_url} and then release date to {this.props.movie.release_date} look at the var SAMPLE_MOVIES array for the correct item names
      <tr>
        <td><img className="poster-lg" src={this.props.movie.poster_url} alt="poster for movie title"/></td>
        <td>{this.props.movie.title}</td> 
        <td>{this.props.movie.release_date}</td>
      </tr>
    );
  }
}

export default App;
