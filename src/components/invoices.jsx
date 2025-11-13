import InvoiceCard from './InvoiceCard'

export default function Invoices({ invoices, loading, error }) {
	if (loading) {
		;<h1 className='container mx-auto text-6xl text-slate-500'>Loading...</h1>
	}
	if (error) {
		;<h1>Xatolik yuz berdi</h1>
	}
	return (
		<div className='flex flex-col gap-4 container mx-auto px-5'>
			{invoices.map(inv => (
				<InvoiceCard
					key={inv.id}
					clientName={inv.clientName}
					paymentDue={inv.paymentDue}
					elId={inv.id}
					total={inv.total}
					status={inv.status}
				/>
			))}
		</div>
	)
}
