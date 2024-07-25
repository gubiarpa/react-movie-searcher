import responseMovies from '../mocks/with-results.json'
// import withoutResults from '../mocks/no-results.json'

export function useMovies() {
	const rawMovies = responseMovies.Search

	const movies = rawMovies?.map(({ imdbID, Title, Year, Poster }) => ({
		id: imdbID,
		title: Title,
		year: Year,
		poster: Poster,
	}))

	return { movies }
}
