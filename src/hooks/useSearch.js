import { useState, useEffect, useRef } from 'react'

export function useSearch() {
	const [search, setSearch] = useState('')
	const [error, setError] = useState(null)
	const isFirstInput = useRef(true)

	const updateSearch = (newSearch) => {
		setSearch(newSearch)
	}

	useEffect(() => {
		if (isFirstInput.current) {
			isFirstInput.current = search === ''
			return
		}

		if (search === '') {
			setError('We cannot search an empty movie')
			return
		}

		if (search.match(/^\d+$/)) {
			setError('The movie cannot be a number')
			return
		}

		if (search.length < 3) {
			setError('The search should have at least 3 characters')
			return
		}

		setError(null)
	}, [search])

	return { search, updateSearch, error }
}
