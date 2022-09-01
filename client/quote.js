import React, { Component } from 'react';

class Quote extends Component {
  componentDidMount() {
    const { index } = this.props;
    this.props.refreshQuote(index);
  }
  saveFavorite(userID, quoteID ) {
    const body = {userID: userID, quoteID: quoteID};
    fetch('/savefavorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    });
  }
  
  render() {
    const { index, quote, author } = this.props;
    const quoteID = this.props.id;
    const userID = 'Marco';
    // console.log(index);
    return (
      <div>
        <h1> {quote}</h1>
        <p>-- {author}</p>
        <button type="button" onClick={() => this.props.refreshQuote(index)}>Refresh</button>
        <button type="button" onClick={() => this.saveFavorite(userID, quoteID)}>Save</button>
      </div>
    );
  }
}

export default Quote;