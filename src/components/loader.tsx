import React from 'react';
import { Spinner } from './loader.styles';

const Loader: React.FC = () => (
  <Spinner data-testid="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </Spinner>
);

export default Loader;
  