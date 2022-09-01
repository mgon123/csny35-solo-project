import React, { Component } from 'react';
// import Quote from './quote';
import {Route, Routes, NavLink, BrowserRouter } from 'react-router-dom';

import Home from './home';
import MySpace from './myspace';

class App extends Component {
  constructor() {
    super();
    this.numQuotes = 3; 
    this.state = {
      quote: Array(this.numQuotes).fill(''),
      author: Array(this.numQuotes).fill(''),
      id: Array(this.numQuotes).fill(''),
      userFavorites: []
    };
    this.userID = 'Marco';
    // for (let i = 0; i < this.numQuotes; i++) this.refreshQuote(i);
    this.getFavorites(this.userID);
    this.getFavorites = this.getFavorites.bind(this);
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

  async getFavorites(userID) {
    const userObj = { userID: userID };
    const quoteIDs = await fetch('/getfavorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(userObj)
    }).then(data => data.json());
    const quotes =[];
    const url = 'https://programming-quotes-api.herokuapp.com/quotes/';
    for (const id of quoteIDs) {
      const fetchURL = url+id;
      const quoteObj = await fetch(fetchURL)
        .then(data => data.json());
      quotes.push({quote: quoteObj.en, author: quoteObj.author, id: quoteObj.id});
    }
    this.setState({userFavorites: quotes.reverse()});
  }

  render() {

    // const quotes = [];
    // for (let i = 0; i < this.numQuotes; i++){
    //   quotes.push(<Quote key ={i} refreshQuote = {this.refreshQuote} index = {i}
    //     quote={this.state.quote[i]} author={this.state.author[i]}
    //     id={this.state.id[i]} />);
    // }
    return (
      <BrowserRouter>
        <div className="App">
          <div>
            <h1>leetQuote</h1>
            <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/myspace">mySpace</NavLink></li>
              <li><NavLink to="/leetfeed">leetFeed</NavLink></li>
            </ul>
          </div>
          <div className="content">
            <Routes>
              <Route exact path="/" element=
                {<Home
                  refreshQuote={this.refreshQuote}
                  quote={this.state.quote} author={this.state.author}
                  id={this.state.id} numQuotes={this.numQuotes} userID={this.userID}
                />} />
              <Route path="/myspace" element=
                {<MySpace favorites={this.state.userFavorites} userID={this.userID}
                  getFavorites={this.getFavorites} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;