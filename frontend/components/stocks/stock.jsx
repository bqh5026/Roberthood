import React from 'react';
import { useParams } from 'react-router-dom';

export default ({currentUser, logout}) => {
    const { ticker } = useParams(); 
    return (
      <div>
        <h1>Stocks Page Under Construction</h1>
        <p>{ticker}</p>
      </div>
    );
}