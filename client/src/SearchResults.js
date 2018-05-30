import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const SearchResults = ({ play, searchQuery }) => (
  <Query
    query={gql`
      query lines($play: String!, $searchQuery: String!) {
        lines(play: $play, searchQuery: $searchQuery) {
          number
          lines {
            text
            speaker
            act
            scene
            line
          }
        }
      }
    `}
    variables={{ play, searchQuery }}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return error.message;

      return (
        <div>
          Found {data.lines.number} lines containing "{searchQuery}"
          {data.lines.lines.map(({ text, act, scene, line, speaker }) => (
            <div>
              <h2 className="lineLoc">
                {act +
                  ' ' +
                  scene +
                  ' ' +
                  line}
              </h2>
              <h2 className="lineText">
                {speaker + ': ' + text}
              </h2>
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);

export default SearchResults;
