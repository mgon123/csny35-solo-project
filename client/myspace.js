import React, { Component } from 'react';

class MySpace extends Component {
  componentDidMount() {
    this.props.getFavorites(this.props.userID);
  }
  deleteFavorite (userID, quoteID) {
    // console.log(userID, quoteID)
    const body = {userID: userID, quoteID: quoteID};
    fetch('/deletefavorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    });
  }
  render() {
    const { favorites, userID } = this.props;
    const quotes = [];
    for (const quoteObj of favorites) {
      quotes.push(<div>
        <h1> {quoteObj.quote}</h1>
        <p>-- {quoteObj.author}</p>
        <button type="button" onClick={() => this.deleteFavorite(userID, quoteObj.id)}>Remove</button>
      </div>);
    }
    return (
      <div className="myspace">
        {quotes}
      </div>
    );
  }
}


export default MySpace;