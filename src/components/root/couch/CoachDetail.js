import React from 'react';
import WebViewComponent from '../WebViewComponent';

export default ({ coach }) => (
  <WebViewComponent
    title={coach.namecoach}
    url={`https://selfit.ir/Coach/Index/${coach.idcoach}`}
  />
);
