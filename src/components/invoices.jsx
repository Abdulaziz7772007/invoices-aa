import { useEffect, useState } from 'react'
import InvoiceCard from './InvoiceCard'

export default function Invoices() {
	const [invoices, setInvoices] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [filter, setFilter] = useState('')

	useEffect(() => {
		setLoading(true)
		fetch('https://json-api.uz/api/project/invoices-app-fn43/invoices')
		.then(res => {
			return res.json()
		})
		.then(res => {
			setInvoices(res.data)
		})
		.catch(() => {
			setError("something went wrong :(")
		})
		.finally(() => {
			setLoading(false)
		})
	}, [])

	if(loading) {

	}
	if(error) {}
	return <div className='flex flex-col gap-4'>
		{invoices.map((el) => {
			<InvoiceCard clientName={el.clientName} paymentDue={el.paymentDue} elId={el.elId} total={el.total} status={el.status} key={el.id}/>
		})}
	</div>
}
