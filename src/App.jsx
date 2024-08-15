import { useState, useCallback } from 'react'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import { Movies } from './components/Movies'
import debounce from 'just-debounce-it'

import './App.css'

function App() {
	/// States
	const [sort, setSort] = useState(false)
	const { search, updateSearch, error: searchError } = useSearch()
	const {
		movies,
		getMovies,
		loading,
		error: moviesError,
	} = useMovies({ search, sort })

	/// Utils
	const debouncedGetMovies = useCallback(
		debounce((search = '') => {
			getMovies({ search })
		}, 500),
		[]
	)

	/// Handles
	const handleSubmit = (event) => {
		event.preventDefault()
		getMovies({ search })
	}

	const handleSort = () => {
		setSort(!sort)
	}

	const handleChange = (event) => {
		const newSearch = event.target.value
		updateSearch(newSearch)
		debouncedGetMovies(newSearch)
	}

	/// Render
	return (
		<div className='page'>
			<header>
				<h1>Movie Searcher</h1>
				<form
					className='form'
					onSubmit={handleSubmit}
				>
					<input
						onChange={handleChange}
						value={search}
						name='query'
						placeholder='Avengers, Star Wars, The Matrix'
					/>
					<input
						type='checkbox'
						onChange={handleSort}
						checked={sort}
					/>
					<button
						type='submit'
						title='Sort by title'
					>
						Search
					</button>
				</form>
				{searchError && <p style={{ color: 'red' }}>{searchError}</p>}
			</header>

			<main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
		</div>
	)
}

export default App
