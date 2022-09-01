import React, { Component } from 'react';
import Quote from './quote';

class Home extends Component {
  render() {
    // console.log('Home')
    const { refreshQuote, quote, author, id, numQuotes, userID} = this.props;
    // console.log('Home', userID)
    const quotes = [];
    for (let i = 0; i < numQuotes; i++){
      quotes.push(<Quote key ={i} refreshQuote = {refreshQuote} index = {i}
        quote={quote[i]} author={author[i]} userID ={userID}
        id={id[i]} />);
    }
    // console.log(quotes)
    return(
      <div className="Home">
        {quotes}
      </div>
    );
  }
}

export default Home;