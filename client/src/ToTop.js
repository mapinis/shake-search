import React from 'react';
import { Icon } from 'antd';

import 'antd/dist/antd.css';
import './ToTop.css';

const ToTop = props => (
  // eslint-disable-next-line
  <a href="#" className="topLink">
    <Icon className="ToTopIcon" type="to-top" />
    Back to Top
  </a>
);

export default ToTop;