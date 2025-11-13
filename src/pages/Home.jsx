import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Invoices from '../components/invoices'

export default function Home() {
	const [invoices, setInvoices] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [filter, setFilter] = useState('')
	const [filterElement, setFilterElemant] = useState([
		{
			chacked: false,
			text: 'draft',
		},
		{
			chacked: false,
			text: 'pending',
		},
		{
			chacked: false,
			text: 'paid',
		},
	])

	useEffect(() => {
		filterElement.map((el) => {
			if(el.chacked) {
				return `|${el.text}`
			} else {
				return ''
			}
		})
	}, [JSON.stringify(filterElement)])

	useEffect(() => {
		setLoading(true)
		fetch('https://json-api.uz/api/project/invoice-app-fn43/invoices')
			.then(res => {
				return res.json()
			})
			.then(res => {
				setInvoices(res.data)
			})
			.catch(() => {
				setError('something went wrong :(')
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])
	return (
		<div>
			<Header total={invoices.length > 0 ? invoices.length : null} filterElement={filterElement} setFilterElemant={setFilterElemant} />
			<Invoices invoices={invoices} loading={loading} error={error} />
		</div>
	)
}
