const path = require('path');
const express = require('express');
const controller = require('./controller.js');

const app = express();

const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
// app.use(express.static(path.resolve(__dirname, '../client')));

//handle requests to save favorites
app.post('/savefavorite', controller.saveFavorite, (req, res)=>{
  return res.status(200).send('post saveFavorite');
});
//handle requests to get favorites
app.post('/getfavorites', controller.getFavorites, (req, res)=>{
  return res.status(200).json(res.locals.quoteIDs);
});

app.post('/deletefavorite', controller.deleteFavorite, (req, res)=>{
  return res.status(200).json(res.locals.quoteIDs);
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).sendFile(path.resolve(__dirname,'Error-404-Pithy.jpeg')));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
