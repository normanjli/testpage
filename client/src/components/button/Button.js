import React from 'react';

const button = ({onClick,key,id, text, className}) => {
    return (
            <button className={className}key = {key} onClick={onClick} id={id} >{text}</button>
    );
};

export default button;