import React from 'react';
import {Form, FormControl, InputGroup, Button, Glyphicon, Image} from 'react-bootstrap';
import MovieController from './MovieController';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {movies:[], totalResults:0};
    this.fetchData = this.fetchData.bind(this);
    this.fetchData("star wars");
  }

  fetchData(searchTerm) {
    var thisComponent = this; //work around for scope!
    MovieController.searchTMDB(searchTerm)
      .then(function(data) {
        thisComponent.setState({movies:data.results, totalResults:data.total_results})
      })
      // .then((data) => this.setState({movies:data})); //cleaner with arrow func!
      .catch( (err) => this.setState({movies:[], totalResults:0}));
  }


  render() {
    return (
      <div className="container">
        <header>
          <h1>Movie Data Browser</h1>
        </header>
        <SearchForm searchFunction={this.fetchData} resultCount={this.state.totalResults} />
        <main>
          <MovieTable movies={this.state.movies} />
        </main>
      </div>
    );
  }
}

class MovieTable extends React.Component {

  render() {

    var movieRows = this.props.movies.map(function(movie){
      return <MovieRow movie={movie} key={movie.id} />;
    })

    return (
      <table className="table table-condensed">
        <thead>
          <tr><th className="col-xs-1">Poster</th><th className="col-xs-4">Title</th><th>Released</th></tr>
        </thead>
        <tbody>
          {movieRows}
        </tbody>
      </table>      
    );
  }
}

class MovieRow extends React.Component {
  render() {
    return (
      <tr>
        <td><Image thumbnail responsive src={MovieController.getPosterUrl(this.props.movie)} alt="poster for {this.props.movie.title}"/></td>
        <td>{this.props.movie.title}</td>
        <td>{this.props.movie.release_date}</td>
      </tr>
    );
  }
}

class SearchForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {value:''}
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value:event.target.value});
    //this.props.searchFunction(searchTerm);
  }

  handleClick(event) {
    this.props.searchFunction(this.state.value);
  }

  render() {
    return (
      <Form inline>
        <InputGroup>
          <InputGroup.Button>
            <Button onClick={this.handleClick}><Glyphicon glyph="search" aria-label="Search" /></Button>
          </InputGroup.Button>
          <FormControl type="text" placeholder="Search for a movie..." onChange={this.handleChange} />
          <InputGroup.Addon>
            {this.props.resultCount} results
          </InputGroup.Addon>
        </InputGroup>
      </Form>
    );
  }
}

export default App;
