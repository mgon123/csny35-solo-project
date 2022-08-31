import React, { Component } from 'react';

class Quote extends Component {
  componentDidMount() {
    const { index } = this.props;
    this.props.refreshQuote(index);
  }
  render() {
    const { index, quote, author } = this.props;
    // console.log(index);
    return (
      <div>
        <h1> {quote}</h1>
        <p>-- {author}</p>
        <button type="button" onClick={() => this.props.refreshQuote(index)}>Refresh</button>
        <button type="button">Save</button>
      </div>
    );
  }
}

export default Quote;