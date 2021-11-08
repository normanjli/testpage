import React from 'react';

const Search = ({inputValue, onChange, placeholder, key, onSubmit}) => {
    let searchingFor = ''
    if(inputValue===``){
        
    }else{
        searchingFor = `Searching for ${inputValue}`
    }
    return (
        <form className='searchdrink' onSubmit={onSubmit}>
            <input placeholder={placeholder} value ={inputValue} onChange = {onChange} key = {key}></input>
            <input type='submit'value='Search for drink'></input>
            <p>{searchingFor}</p>
        </form>
    );
};

export default Search;