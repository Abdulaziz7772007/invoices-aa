export default function StatusBadge({ status = 'draft' }) {
	const styles = {
		draft: {
			bg: 'bg-[rgba(55,59,83,6%)]',
			text: 'text-[#373B53]',
			dot: 'bg-[#373B53]',
		},
		pending: {
			bg: 'bg-[rgba(255,142,0,6%)]',
			text: 'text-[#FF8F00]',
			dot: 'bg-[#FF8F00]',
		},
		paid: {
			bg: 'bg-[rgba(51,214,159,6%)]',
			text: 'text-[#33D69F]',
			dot: 'bg-[#33D69F]',
		},
	}
	return (
		<span
			className={`inline-flex gap-2 py-3 px-[18px] items-center justify-center rounded-md min-w-[104px] ${styles[status].bg}`}
		>
			<span
				className={`w-2 h-2 inline-block rounded-full ${styles[status].dot}`}
			></span>
			<span className={`capitalize ${styles[status].text} text-[12px]`}>
				{status}
			</span>
		</span>
	)
}
