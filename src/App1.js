import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";
import "./App.css";
import Loader1 from "./Loader";

const MOVIE_API_URL =
    "http://www.omdbapi.com/?i=tt3896198&apikey=ebd91d5&s=action";
function App() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    // 类似componentDidMount
    useEffect(() => {
        fetch(MOVIE_API_URL)
            .then((res) => res.json())
            .then((jsonResponse) => {
                setMovies(jsonResponse.Search);
                setLoading(false);
            });
    }, []);
    // 搜索
    const search = (searchValue) => {
        setLoading(true);
        setErrorMessage(null);

        fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=ebd91d5&s=${searchValue}`
        )
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (jsonResponse.Response === "True") {
                    setMovies(jsonResponse.Search);
                    setLoading(false);
                } else {
                    setErrorMessage(jsonResponse.Error);
                    setLoading(false);
                }
            });
    };
    return (
        <div className='App'>
            <a href='/'>
                <Header text='ReactHooKs' />
            </a>
            <Search search={search} />
            <p className='App-intro'>Sharing a few of our favourite movies</p>
            <div className='movies'>
                {loading && !errorMessage ? (
                    <div className='loading'>
                        <Loader1 />
                    </div>
                ) : errorMessage ? (
                    <div className='errorMessage'>{errorMessage}</div>
                ) : (
                    movies.map((movie, id) => (
                        <Movie key={`${id}-${movie.Title}`} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
