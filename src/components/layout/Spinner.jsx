import React from 'react';

const Spinner = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <button className='btn mt-3' aria-disabled='true'>
        <span>Loading</span>
        <span className='AnimatedEllipsis'></span>
      </button>
    </div>
  );
};

export default Spinner;
