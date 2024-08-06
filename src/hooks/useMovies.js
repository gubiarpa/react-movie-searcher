import { useState } from 'react'

import responseMovies from '../mocks/with-results.json'
import noMovies from '../mocks/no-results.json'

export function useMovies() {
	const [responseMovies, setResponseMovies] = useState([])
	const rawMovies = responseMovies.Search

	const movies = rawMovies?.map(({ imdbID, Title, Year, Poster }) => ({
		id: imdbID,
		title: Title,
		year: Year,
		poster: Poster,
	}))

	const getMovies = () => {
		if (search) {
			setResponseMovies(rawMovies)
		} else {
			setResponseMovies(noMovies)
		}
	}

	return { movies }
}
