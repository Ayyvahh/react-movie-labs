import React from "react";
import {getUpcomingMovies} from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToMustWatch from "../components/cardIcons/addToMustWatch";

const UpcomingMoviesPage = (props) => {

    const {  data, error, isLoading, isError }  = useQuery('upcomingMovies', getUpcomingMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;

    const mustWatch = movies.filter(m => m.mustWatch)

    localStorage.setItem('mustWatch', JSON.stringify(mustWatch))
    const addToMustWatch = (movieId) => true

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={movies}
            action={(movie) => {
                return <AddToMustWatch movie={movie} />
            }}
        />
    );
};
export default UpcomingMoviesPage;