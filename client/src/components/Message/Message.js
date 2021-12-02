import React from 'react';

const Message = ({message}) => {
  return (
  <div className='errMessage'>
    <h1>{message}</h1>
  </div>
  );
};

export default Message;