import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditElementSheet from '../components/EditElementSheet'
import StatusBadge from '../components/StatusBadge'
import { Button } from '../components/ui/button'

export default function Details() {
	const navigate = useNavigate()
	const [invoice, setInvoice] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const { id } = useParams()

	function back() {
		navigate(-1)
	}

	function setPaid() {
		setLoading(true)
		fetch(`https://json-api.uz/api/project/invoice-app-fn43/invoices/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				status: "paid"
			})
		})
			.then(res => {
				return res.json()
			})
			.then(res => {
				setInvoice(res)
			})
			.catch(() => {
				setError('Xatolik')
			})
			.finally(() => {
				setLoading(false)
			})
	}

	useEffect(() => {
		setLoading(true)
		fetch(`https://json-api.uz/api/project/invoice-app-fn43/invoices/${id}`)
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

	if (error) {
		return <p>Xatolik yuz berdi</p>
	}
	if (loading) {
		return <h1>Loading...</h1>
	}

	return (
		invoice && (
			<div className=' py-10 '>
				<div className='container mx-auto px-5'>
					<Button onClick={back} variant='secondary' className='mb-5'>
						<ArrowLeft />
						Back
					</Button>
					<div className='flex rounded-md justify-between shadow p-3'>
						<span className='inline-flex gap-5 items-center'>
							Status <StatusBadge status={invoice.status} />
						</span>
						<div className='flex gap-5 '>
							<EditElementSheet setInvoice={setInvoice} invoice={invoice} />
							<Button variant={'destructive'}> Delete</Button>
							{invoice.status === 'pending' && (
								<Button onClick={setPaid}>Mark as Paid </Button>
							)}
						</div>
					</div>

					{invoice?.senderAddress?.street}
				</div>
			</div>
		)
	)
}
