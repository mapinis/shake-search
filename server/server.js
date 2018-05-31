const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

require('dotenv').config();

const schema = require('./schema').schema;

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(require('morgan')('dev'));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

if (process.env.DEV === 'true') {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  console.log("DEV enabled");
}

app.get('/*', express.static('../client/build/'));

app.listen(PORT, () => {
  console.log('Server listening on ' + PORT);
});
