import React, { useState, useEffect } from 'react'
import MovieDataService from '../services/movies'
import { Link } from 'react-router-dom'

const MoviesList = props => {
    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Rating"])
}

useEffect(() => {
    retrieveMovies()
    retrieveRatings()
}, [])

const retrieveMovies = () => {
    MovieDataService.getAll()
        .then(response => {
            console.log(response.data)
            setMovies(response.data.movies)
        }).catch(e => {
            console.log(e)
        })
}

const retrieveRatings = () => {
    MovieDataService.getRatings()
        .then(response => {
            console.log(response.data)
            //start with all rafings if user doesnt specify any
            setMovies(["All Ratings"]).concat(response.data)
        }).catch(e => {
            console.log(e)
        })
}

function MoviesList() {
    return (
        <div className="App">
            MovieList
        </div>
    );
}
export default MoviesList;