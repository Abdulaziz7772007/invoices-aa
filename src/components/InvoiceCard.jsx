import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../functions'
import StatusBadge from './StatusBadge'

export default function InvoiceCard({
	id,
	paymentDue,
	clientName,
	total,
	status,
}) {
	const navigate = useNavigate()

	function handleClick(id) {
		navigate(`/${id}`)
	}

	return (
		<div
			onClick={() => handleClick(id)}
			className='cursor-pointer border-2 border-transparent rounded-xl shadow-md p-4 sm:p-6 grid grid-cols-2 md:grid-cols-5 gap-4  hover:border-blue-500 group'
		>
			<span className='font-bold text-sm sm:text-base text-[#0C0E16]'>
				<span className='text-[#7E88C3]'>#</span>
				{id}
			</span>

			<time
				className='text-[#7E88C3] text-sm sm:text-base'
				dateTime={paymentDue}
			>
				{paymentDue ? `Due ${formatDate(paymentDue)}` : '---'}
			</time>

			<h3 className='text-[#0C0E16] text-sm sm:text-base truncate max-w-[150px] sm:max-w-[200px]'>
				{clientName || '---'}
			</h3>

			<span className='text-[#0C0E16] font-bold text-lg sm:text-xl'>
				£{total}
			</span>

			<div className='flex items-center gap-3'>
				<StatusBadge status={status} />
				<ArrowRight className='opacity-0 group-hover:opacity-100 transition' />
			</div>
		</div>
	)
}
