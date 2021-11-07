import React from 'react';

const Search = ({inputValue, onChange, key, onSubmit,sent}) => {
    let searchingFor = ''
    if(inputValue===``){
        
    }else if(sent === false){
        searchingFor = `Searching for ${inputValue}`
    }else if(sent === true){
        searchingFor = `${inputValue} did not return and results. Try gin and tonic.`
    }
    return (
        <form className='searchdrink' onSubmit={onSubmit}>
            <input placeholder='Enter a drink to search for' onChange = {onChange} key = {key}></input>
            <input type='submit'value='Search for drink'></input>
            <p>{searchingFor}</p>
        </form>
    );
};

export default Search;