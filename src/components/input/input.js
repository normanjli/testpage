import React from 'react';

const Input = ({inputValue, onChange, placeholder, key}) => {

    return (
        <div>
            <input className='inputtest' placeholder={placeholder} value ={inputValue} onChange = {onChange} key = {key}></input>
            <p>{inputValue}</p>
        </div>
    );
};

export default Input;