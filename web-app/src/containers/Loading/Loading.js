import React from 'react';
import { wrapper, img, text } from './Loading.module.css';
import loadingGif from './loading.gif';

const Loading = ({ isVisible }) => (
  isVisible ?
  <div className={wrapper}>
    <img className={img} src={loadingGif} alt="loading"/>
    <span className={text}>Connecting...</span>
  </div> : null
);
  
export default Loading;