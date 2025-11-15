import { useRef, useState } from 'react'
import { Checkbox } from './ui/checkbox'
import AddElementSheet from './AddElementSheet'

export default function Header({ total, filterElement, setFilterElement }) {
	const [open, setOpen] = useState(false)
	const list = useRef()
	const button = useRef()

	function handleClick() {
		setOpen(!open)
	}

	function handleChecker(element) {
		const updated = filterElement.map(el => {
			if(el.text===element){
				return {...el,checked:!el.checked}
			} else {
				return el
			}
		})
		setFilterElement(updated)
		
	}

	return (
		<header className='pt-[72px] pb-[65px]'>
			<div className='mx-auto container px-5 flex justify-between items-start'>
				<div>
					<h1 className='font-bold text-4xl mb-3'>Invoices</h1>
					{total && (
						<p className='text-slate-500'>There are {total} total invoices</p>
					)}
				</div>

				<div className='relative'>
					<button
					ref={button}
						className='inline-flex items-center gap-1 hover:bg-slate-100 py-2 px-4 rounded-md border border-slate-200 mr-3'
						onClick={handleClick}
					>
						Filter by status
						{open ? (
							<svg
								width='15'
								height='15'
								viewBox='0 0 15 15'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711V12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5V3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z'
									fill='currentColor'
									fillRule='evenodd'
									clipRule='evenodd'
								></path>
							</svg>
						) : (
							<svg
								width='15'
								height='15'
								viewBox='0 0 15 15'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M7.5 2C7.77614 2 8 2.22386 8 2.5V11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929V2.5C7 2.22386 7.22386 2 7.5 2Z'
									fill='currentColor'
									fillRule='evenodd'
									clipRule='evenodd'
								></path>
							</svg>
						)}
					</button>

					{open && (
						<div ref={list} className='flex flex-col gap-1 absolute p-2 rounded-md shadow-lg min-w-[180px] bg-white top-12 right-0 border border-slate-200 z-10'>
							{filterElement.map(el => (
								<span
								key={el.text}
									onClick={() => handleChecker(el.text)}
									className='inline-flex gap-2 items-center w-full hover:bg-slate-100 rounded-md p-1 select-none'
								>
									<Checkbox checked={el.checked} />
									<span className='capitalize'>{el.text}</span>
								</span>
							))}
						</div>
					)}
					<AddElementSheet/>
				</div>
			</div>
		</header>
	)
}
