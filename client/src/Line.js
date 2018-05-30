import React from "react"

import './Line.css';

const Line = ({ line }) => (
  <div>
    <h2 className="line">
      <div className="location">{line.act +
        '.' +
        line.scene +
        '.' +
        line.line}
      </div>
      <div className="speaker">
        {line.speaker + ':'}
      </div>
      <div className="text">
        {line.text}
      </div>
    </h2>
  </div>
);

export default Line;