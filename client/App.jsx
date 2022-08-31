import React, { Component } from 'react';
import Quote from './quote';

class App extends Component {
  constructor() {
    super();
    this.numQuotes = 3; 
    this.state = {
      quote: Array(this.numQuotes).fill(''),
      author: Array(this.numQuotes).fill(''),
      id: Array(this.numQuotes).fill('')
    };
    this.refreshQuote = this.refreshQuote.bind(this);
  }
  refreshQuote (i) {
    // console.log(i)
    const url = 'https://programming-quotes-api.herokuapp.com/quotes/random';
    fetch(url)
      .then(data => data.json())
      .then(data => {
        const quote = Array.from(this.state.quote);
        const author = Array.from(this.state.author);
        const id = Array.from(this.state.id);
        quote[i] = data.en;
        author[i] = data.author;
        id[i] = data.id;
        this.setState({quote:quote, author:author, id:id});
      })
      .catch(err => console.log(err));
  }
  render() {
    const quotes = [];
    for (let i = 0; i < this.numQuotes; i++){
      quotes.push(<Quote key ={i} refreshQuote = {this.refreshQuote} index = {i}
        quote={this.state.quote[i]} author={this.state.author[i]}
        id={this.state.id[i]} />);
    }
    return(
      <div className="App">
        {quotes}
      </div>
    );
  }
}

export default App;