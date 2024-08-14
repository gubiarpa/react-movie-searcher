import { useState } from 'react'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import { Movies } from './components/Movies'

import './App.css'

function App() {
	const [sort, setSort] = useState(false)
	const { search, updateSearch, error: searchError } = useSearch()
	const {
		movies,
		getMovies,
		loading,
		error: moviesError,
	} = useMovies({ search, sort })

	const handleSubmit = (event) => {
		event.preventDefault()
		getMovies({ search })
	}

	const handleSort = () => {
		setSort(!sort)
	}

	const handleChange = (event) => {
		updateSearch(event.target.value)
	}

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
