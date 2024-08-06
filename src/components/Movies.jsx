function ListOfMovies({ movies }) {
	return (
		<ul className='movies'>
			{movies.map(({ id, title, year, poster }) => (
				<li
					className='movie'
					key={id}
				>
					<h3>
						{title} ({year})
					</h3>
					<img
						src={poster}
						alt={title}
					/>
				</li>
			))}
		</ul>
	)
}

function NoMoviesResults() {
	return <p>Not movies founded</p>
}

export function Movies({ movies }) {
	const hasMovies = movies?.length > 0
	return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
}
