import React from 'react';

const button = ({onClick,key,id}) => {
    return (
        <div>
            <button key = {key} onClick={onClick} id={id}>Hello</button>
        </div>
    );
};

export default button;