import { ArrowLeft, RefreshCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import EditElementSheet from '../components/EditElementSheet'
import Empty from '../components/Empty'
import StatusBadge from '../components/StatusBadge'
import { Button } from '../components/ui/button'

export default function Details() {
	const navigate = useNavigate()
	const [invoice, setInvoice] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [deleteLoading, setDeleteLoading] = useState(false)
	const { id } = useParams()

	function handleDelete() {
		setDeleteLoading(true)
		fetch(`https://json-api.uz/api/project/invoice-app-fn43/invoices/${id}`, {
			method: 'DELETE',
		})
			.then(res => {
				return res.text()
			})
			.then(res => {
				toast.success(res)
				back()
			})
			.catch(() => {
				setError('Xatolik')
			})
			.finally(() => {
				setDeleteLoading(false)
			})
	}

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
				status: 'paid',
			}),
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
		return (
			<div>
				<Button onClick={back} variant='secondary' className='mb-5'>
					<ArrowLeft />
					Back
				</Button>
				<Empty />
			</div>
		)
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
						<span className='inline-flex gap-5  items-center ' >
							Status <StatusBadge status={invoice.status} />
						</span>
						<div className='hidden md:flex gap-5 '>
							<EditElementSheet setInvoice={setInvoice} invoice={invoice} />
							<Button
								variant={'destructive'}
								disabled={deleteLoading}
								onClick={handleDelete}
							>
								{deleteLoading && <RefreshCcw className='animate-spin mr-4' />}{' '}
								Delete
							</Button>
							{invoice.status === 'pending' && (
								<Button onClick={setPaid}>Mark as Paid </Button>
							)}
						</div>
					</div>

					<div className='mt-10 p-5 shadow'>
						<div className='flex flex-col sm:flex-row justify-between'>
							<div>
								<h2 className='text-3xl'>
									<span className='text-[#7E88C3]'>#</span>
									{invoice.elId}
								</h2>
								<p className='text-[#7E88C3]'>{invoice.description}</p>
							</div>
							<div className='text-[#7E88C3] text-right'>
								<p>{invoice.senderAddress?.street}</p>
								<p>{invoice.senderAddress?.city}</p>
								<p>{invoice.senderAddress?.postCode}</p>
								<p>{invoice.senderAddress?.country}</p>
							</div>
						</div>
						<div className='flex flex-col sm:flex-row justify-between mt-5 mb-5 text-[#7E88C3]'>
							<div className='flex justify-between gap-10'>
								<div className='mb-3'>
									<span>Invoice Date</span>
									<p className='text-[#0C0E16] text-2xl'>
										{invoice.paymentDue}
									</p>
								</div>
								<div className='mb-3'>
									<span>Bill To</span>
									<p className='text-[#0C0E16] text-2xl'>
										{invoice.clientName}
									</p>
									<p>{invoice.clientAddress?.city}</p>
									<p>{invoice.clientAddress?.postCode}</p>
									<p>{invoice.clientAddress?.country}</p>
								</div>
							</div>
							<div className='mb-3'>
								<span>Sent To</span>
								<p className='text-[#0C0E16] text-2xl'>{invoice.clientEmail}</p>
							</div>
						</div>

						<div className='w-full mt-6 p-10 bg-[#F9FAFE]'>
							<div className='flex flex-col gap-4 mt-5'>
								{invoice.items?.map(item => (
									<div key={item.id} className='bg-[#F9FAFE] p-4 rounded-lg'>
										<div className='hidden md:grid md:grid-cols-4 md:items-center'>
											<span className='font-medium text-[#0C0E16]'>
												{item.name}
											</span>
											<span className='text-center text-[#7E88C3]'>
												{item.quantity}
											</span>
											<span className='text-center text-[#7E88C3]'>
												£ {item.price}
											</span>
											<span className='text-right font-semibold text-[#0C0E16]'>
												£ {item.total}
											</span>
										</div>

										<div className='md:hidden flex flex-col gap-1'>
											<div className='flex justify-between'>
												<span className='font-medium text-[#0C0E16]'>
													{item.name}
												</span>
												<span className='font-semibold text-[#0C0E16]'>
													£ {item.total}
												</span>
											</div>

											<span className='text-[#7E88C3]'>
												{item.quantity} x £ {item.price}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className='bg-[#373B53] rounded-md flex justify-between p-5 '>
							<span className='text-white'>Amount Due</span>
							<p className='text-4xl text-white'>£ {invoice.total}</p>
						</div>
					</div>
				</div>
			</div>
		)
	)
}
