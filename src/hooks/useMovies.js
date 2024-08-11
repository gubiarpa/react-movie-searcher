import { useState } from 'react'

import withMovies from '../mocks/with-results.json'
import noMovies from '../mocks/no-results.json'

export function useMovies({ search }) {
	const [responseMovies, setResponseMovies] = useState([])
	const rawMovies = responseMovies?.Search

	const movies = rawMovies?.map(({ imdbID, Title, Year, Poster }) => ({
		id: imdbID,
		title: Title,
		year: Year,
		poster: Poster,
	}))

	const getMovies = () => {
		if (search) {
			fetch(`https://www.omdbapi.com/?apikey=75fbba52&s=${search}`)
				.then((res) => res.json())
				.then((json) => setResponseMovies(json))
		} else {
			setResponseMovies(noMovies)
		}
	}

	return { movies, getMovies }
}
