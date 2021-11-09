import React from 'react';

const Search = ({searchType, inputValue, onChange, onSubmit, sent, placeholder, text}) => {
    let searchingFor = ''
    if (searchType===`ingredient`){
        let ingredients = inputValue.split(`,`)
        if(inputValue ===``){
            searchingFor=``
        }
        else if (sent=== false){
            searchingFor= `Searching for drinks with: ${ingredients}`
        }else if(sent ===true){
            searchingFor = `${ingredients} did not return any results.`
        }    
    }else if (searchType===`drink`){
        if(inputValue===``){
            searchingFor = ''
        }else if(sent === false){
            searchingFor = `Searching for ${inputValue}`
        }else if(sent === true){
            searchingFor = `${inputValue} did not return any results. Try gin and tonic.`
        }
    }
    return (
        <form className='searchdrink' onSubmit={onSubmit}>
            <label>{`${text}: `}</label>
            <input placeholder={placeholder} onChange = {onChange}></input>
            <input type='submit'value='Search the database'></input>
            <p>{searchingFor}</p>
        </form>
    );
};

export default Search;