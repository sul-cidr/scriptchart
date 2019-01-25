import React from 'react';
import ReactDOM from 'react-dom';

import MiradorViewer from './components/MiradorViewer';

ReactDOM.render(
  <MiradorViewer />,
  document.getElementById('app')
);

module.hot.accept();
