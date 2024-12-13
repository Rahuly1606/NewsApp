import React, { Component } from 'react';
import Loading from './Loading.gif';

class Spinner extends Component {
  render() {
    return (
      <div
        className="text-center"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100
        }}>
          <img src={Loading} alt="Loading..." style={{ width: '50px', height: '50px' }}/>
      </div>
    );
  }
}

export default Spinner;
