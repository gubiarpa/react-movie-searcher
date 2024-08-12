import { appConfig } from '../../appConfig'

export const searchMovies = async ({ search }) => {
	if (search === '') return null

	try {
		const { backendUrl, apiKey } = appConfig

		const response = await fetch(`${backendUrl}/?apikey=${apiKey}&s=${search}`)
		const json = await response.json()

		const movies = json.Search

		return movies
			?.map(({ imdbID, Title, Year, Poster }) => ({
				id: imdbID,
				title: Title,
				year: Year,
				poster: Poster,
			}))
			.toSorted((a, b) => b.year - a.year)
	} catch (err) {
		throw new Error('Error searching movies')
	}
}
