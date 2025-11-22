import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Invoices from '../components/invoices'

export default function Home() {
	const [invoices, setInvoices] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [filter, setFilter] = useState('')
	const [filterElement, setFilterElement] = useState([
		{ checked: false, text: 'draft' },
		{ checked: false, text: 'pending' },
		{ checked: false, text: 'paid' },
	])

	// FILTER GENERATOR
	useEffect(() => {
		const result = filterElement
			.filter(el => el.checked)
			.map(el => `status=${el.text}`)
			.join('&')

		setFilter(result)
	}, [filterElement])

	// FETCH DATA
	useEffect(() => {
		setLoading(true)

		const baseUrl =
			'https://json-api.uz/api/project/invoice-app-fn43/collection/invoices'

		const url = filter ? `${baseUrl}?${filter}` : baseUrl

		fetch(url)
			.then(res => res.json())
			.then(res => {
				setInvoices(res.data ?? res)
			})
			.catch(() => setError('something went wrong :('))
			.finally(() => setLoading(false))
	}, [filter])

	return (
		<div>
			<Header
				total={invoices.length > 0 ? invoices.length : null}
				filterElement={filterElement}
				setFilterElement={setFilterElement}
				setInvoices={setInvoices}
			/>
			<Invoices invoices={invoices} loading={loading} error={error} />
		</div>
	)
}
