//to create the SearchMovies component
//form with a class of form
//label with htmlFor="query" and a class of Label
//input of type text with a name of "query" and a placeholder
//button class of button and a type of submit

import React, {useState} from 'react';
import MovieCard from './movieCard.js';
import './estilo.css';

export default function SearchMovies(){

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();

   

        const url = `https://api.themoviedb.org/3/search/movie?api_key=3508dda2e7702e01ff20e1a1bcf6298f&language=pt-BR&&query=${query}&page=1`;

       
        try{
            const res = await fetch(url);
            const data = await res.json();
    
           // console.log(data.results);
            setMovies(data.results);

        }catch(err){
            console.error(err);
        }
    }

    return (
        <>
            <form className='form' onSubmit={searchMovies}>
                <label className='label' htmlFor='query' >Nome do Filme</label>
                <input className='input' type='text' name='query' 
                placeholder='ex.: Star Wars'
                value={query} onChange={(e) => setQuery(e.target.value)}></input>
                <button className='button' type='submit'> Busque </button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </>
    );

}