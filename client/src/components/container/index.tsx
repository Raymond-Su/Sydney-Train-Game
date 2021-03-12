import React, { HTMLProps } from 'react';
import './container.css';

const Container = ({ children }: HTMLProps<HTMLDivElement>) => {
  return <div className="container">{children}</div>;
};

export default Container;
