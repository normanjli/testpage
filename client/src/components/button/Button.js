import React from 'react';

const button = ({onClick,key,id, text}) => {
    return (
        <div>
            <button key = {key} onClick={onClick} id={id} >{text}</button>
        </div>
    );
};

export default button;