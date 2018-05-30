import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Line from './Line';
import './SearchResults.css'

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
      if (loading) return <div className="loadingResults">Loading...</div>;
      if (error) return error.message;

      return (
        <div>
          <br /> 
          <div className="resultsNum">
            Found {data.lines.number} lines containing the word "{searchQuery}"
          </div>
          {data.lines.lines.map(line => (
            <Line line={line} />
          ))}
        </div>
      );
    }}
  </Query>
);

export default SearchResults;
