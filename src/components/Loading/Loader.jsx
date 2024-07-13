import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loading-container h-screen w-screen bg-slate-700">
      <div className="typewriter ">
        <h1>Loading Your Blog...</h1>
      </div>
    </div>
  );
};

export default Loader;
