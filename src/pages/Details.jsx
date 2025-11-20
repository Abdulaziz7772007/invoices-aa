import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Details() {
	const [invoice, setInvoice] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const { id } = useParams()

	useEffect(() => {
		setLoading(true)
		fetch(
			`https://json-api.uz/api/project/invoice-app-fn43/invoices/${
				id
			}`
		)
			.then(res => {
				return res.json()
			})
			.then(res => {
				setInvoice(res)
			})
			.catch(() => {
				setError('something went wrong :(')
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])


	return <div>{invoice?.description}</div>
}
