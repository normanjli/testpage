import React from 'react';

const Input = ({inputValue, onChange}) => {

    return (
        <div>
            <input className='inputtest' placeholder='Hello' value ={inputValue} onChange = {onChange}></input>
            <p>'{inputValue}'</p>
        </div>
    );
};

export default Input;