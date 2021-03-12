import React from 'react';
import './title.css';

interface TitleProps {
  title: string;
  subTitle: string;
}

const Title = ({ title, subTitle }: TitleProps) => {
  return (
    <div className="title-container">
      <h1 className="title-content">{title}</h1>
      <p className="title-content">{subTitle}</p>
    </div>
  );
};

export default Title;
