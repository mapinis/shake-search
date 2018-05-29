const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
const htmlparser = require('htmlparser');
const trim = require('trim');

const plays = {};

// Loading of play contents
console.log("Starting to Parse Plays");
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
          plays[file.replace('.txt', '')] = lines;
        }
      }), { verbose: false });

      fs.readFile('plays/' + file, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          parser.parseComplete(data);
          console.log("\tParsed " + file);
        }
      });
    });

  }
});

// Define Types of Data and Query and Resolvers
const typeDefs = `
  type Query {
    lines(play: String!, searchQuery: String!, maxResults: Int, startNum: Int): Result
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

      if (!args.maxResults) {
        args.maxResults = 0;
      }
      if (!args.startNum) {
        args.startNum = 0;
      }

      const searchQuery = trim(args.searchQuery);

      plays[args.play].forEach(line => {
        if (line.text.search(new RegExp('(^|\\W)(' + searchQuery + ')($|\\W)', 'gi')) != -1) {
          matches.push(line);
        }
      });

      return {
        number: matches.length,
        lines: (args.maxResults < 1 ?
          matches.slice(args.startNum) :
          matches.slice(args.startNum, args.startNum + args.maxResults))
      };
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema: schema };
