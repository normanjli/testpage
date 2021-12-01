import React from 'react';

const Message = ({message}) => {
  return (
  <div className='errMessage'>
    <h3>{message}</h3>
  </div>
  );
};

export default Message;