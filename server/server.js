const dotenv = require('dotenv');
const dotenvParse = require('dotenv-parse-variables');

const env = dotenvParse(dotenv.config().parsed);

const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const schema = require('./schema').schema;

const PORT = env.PORT || 8000;

const app = express();

app.use(require('morgan')('dev'));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

if(env.DEV) {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));
}

app.get('/*', express.static('../client/build/'));

app.listen(PORT, () => {
  console.log('Server listening on ' + PORT);
});
