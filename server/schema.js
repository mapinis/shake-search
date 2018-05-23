const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
const htmlparser = require('htmlparser');

const plays = {};

// Loading of play contents
fs.readdir('plays', (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      const parser = new htmlparser.Parser(new htmlparser.DefaultHandler((err, dom) => {
        if (err) {
          console.log(err);
        } else {
          const lines = [];
          dom.forEach(line => {
            lines.push({
              text: line.children[0].data,
              details: {
                act: parseInt(line.attribs.act),
                scene: parseInt(line.attribs.scene),
                line: parseInt(line.attribs.line),
                speaker: line.attribs.speaker
              }
            });
          });
          plays[file] = lines;
        }
      }), { verbose: false });

      fs.readFile('plays/' + file, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          parser.parseComplete(data);
        }
      });
    });

  }
});

// Define Types of Data and Query and Resolvers
const typeDefs = `
  type Query {
    lines(play: String!, searchQuery: String!): Result
  }

  type Result {
    number: Int
    lines: [Line]
  }

  type Line {
    text: String
    details: LineDetails
  }

  type LineDetails {
    act: Int
    scene: Int
    line: Int
    speaker: String
  }
`;

// Define the resolvers for these types
const resolvers = {
  Query: {
    lines: (obj, args, context) => {
      matches = [];

      plays[args.play].forEach(line => {
        if (line.text.includes(args.searchQuery)) {
          matches.push(line);
        }
      });

      return {number: matches.length, lines: matches};
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema: schema };
