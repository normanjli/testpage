import React from 'react';
import Navbar from '../components/NavBar/Navbar';
const Home = () => {
    return (
        <>
        <Navbar title="Welcome to Norman's test page"/>
        <div style={{width:'50vw', marginTop:'5em'}}>
            <h2>Here you can view random drinks queried from the <a href="https://www.thecocktaildb.com" target='_blank' rel="noreferrer">cocktail api</a>. You will be able to make an account, save favorites, review them and keep notes on the drink</h2>
        </div>
        </>
    );
};

export default Home;