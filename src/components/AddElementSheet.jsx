import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { ChevronDownIcon, PlusCircleIcon, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { formValidation, objFormatter } from '../functions'
import { buttonVariants } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from './ui/select'
import { SheetClose } from './ui/sheet'

export default function AddElementSheet({ setInvoices }) {
	const [items, setItems] = useState([])
	const [open, setOpen] = useState(false)
	const [date, setDate] = useState(undefined)
	const [loading, setLoading] = useState(false)

	function sendData(data) {
		setLoading(true)
		fetch('https://json-api.uz/api/project/invoice-app-fn43/invoices', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(res => res.json)
			.then(res => {
				toast.success("Backendga ma'lumot muvaffaqqiyatli qo'shildi")
				setInvoices(prev => {
					return [res, ...prev]
				})
			})
			.catch(() => {
				toast.error("Backendga ma'lumot jo'natishda xatolik yuz berdi")
			})
			.finally(() => {
				setLoading(false)
			})
	}

	function handleItems(id, key, value) {
		const updatedElement = items.find(el => el.id === id)
		const result = items.map(el => {
			if (el.id == id) {
				updatedElement[key] = value
				updatedElement.total = updatedElement.quantity * updatedElement.price
				return updatedElement
			} else {
				return el
			}
		})
		setItems(result)
	}

	function handleSubmit(evt) {
		evt.preventDefault()
		const result = {}
		const formData = new FormData(evt.target)
		formData.forEach((value, key) => {
			result[key] = value
		})
		result.status = event.submitter.id
		result.elId = window.crypto.randomUUID()
		result.items = items
		result.paymentDue = date
		result.total = items.reduce((acc, el) => {
			return (acc += el.total)
		}, 0)

		const check = formValidation(result)
		if (check && result.status === 'pending') {
			const { message, target } = check
			evt.target[target]?.focus()
			toast.error(message)
		} else {
			const readyData = objFormatter(result)
			sendData(readyData)
		}
	}
	function deleteItems(id) {
		const result = items.filter(el => el.id !== id)
		setItems(result)
	}

	return (
		<Sheet>
			<SheetTrigger
				className={`${buttonVariants({ variant: 'default' })} rounded-full! mb-2`}
			>
				<PlusCircleIcon /> New 
			</SheetTrigger>
			<SheetContent className='h-[85vh] ' side='bottom'>
				<SheetHeader>
					<SheetTitle>New Invoice</SheetTitle>
					<SheetDescription>Add a new element</SheetDescription>
				</SheetHeader>
				<div className='px-5 pt-10 pb-24  h-full	 overflow-y-scroll'>
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend className='font-bold text-[#7C5DFA] mb-5'>
								Bill From
							</legend>
							<div className='grid w-full  items-center gap-3 mb-5'>
								<Label htmlFor='senderAddress.street'>Sender adres</Label>
								<Input
									type='text'
									id='senderAddress.street'
									name='senderAddress.street'
								/>
							</div>
							<div className='flex gap-6'>
								<div className='grid w-full  items-center gap-3'>
									<Label htmlFor='senderAddress.city'>City</Label>
									<Input
										type='text'
										id='senderAddress.city'
										name='senderAddress.city'
									/>
								</div>
								<div className='grid w-full  items-center gap-3'>
									<Label htmlFor='senderAddress.postCode'>Post Code</Label>
									<Input
										type='text'
										id='senderAddress.postCode'
										name='senderAddress.postCode'
									/>
								</div>
								<div className='grid w-full  items-center gap-3'>
									<Label htmlFor='senderAddress.country'>Country</Label>
									<Input
										type='text'
										id='senderAddress.country'
										name='senderAddress.country'
									/>
								</div>
							</div>
						</fieldset>
						<fieldset className='mb-10'>
							<legend className='font-bold text-[#7C5DFA] mb-5'>Bill To</legend>
							<div className='grid w-full  items-center gap-3 mb-5'>
								<Label htmlFor='clientName'>Client's Name</Label>
								<Input type='text' id='clientName' name='clientName' />
							</div>
							<div className='grid w-full  items-center gap-3 mb-5'>
								<Label htmlFor='clientEmail'>Client's Email</Label>
								<Input
									type='email'
									id='clientEmail'
									name='clientEmail'
									placeholder='e.g. email@example.com'
								/>
							</div>
							<div className='grid w-full  items-center gap-3 mb-5'>
								<Label htmlFor='clientAddress.street'>Client adres</Label>
								<Input
									type='text'
									id='clientAddress.street'
									name='clientAddress.street'
								/>
							</div>
							<div className='flex gap-6 mb-5'>
								<div className='grid w-full  items-center gap-3'>
									<Label htmlFor='clientAddress.city'>City</Label>
									<Input
										type='text'
										id='clientAddress.city'
										name='clientAddress.city'
									/>
								</div>
								<div className='grid w-full  items-center gap-3'>
									<Label htmlFor='clientAddress.postCode'>Post Code</Label>
									<Input
										type='text'
										id='clientAddress.postCode'
										name='clientAddress.postCode'
									/>
								</div>
								<div className='grid w-full  items-center gap-3 '>
									<Label htmlFor='clientAddress.country'>Country</Label>
									<Input
										type='text'
										id='clientAddress.country'
										name='clientAddress.country'
									/>
								</div>
							</div>

							{/* Calendar */}
							<div className='flex gap-5'>
								<div className='flex flex-col gap-3'>
									<Label htmlFor='date' className='px-1'>
										Invoice Date
									</Label>
									<Popover open={open} onOpenChange={setOpen}>
										<PopoverTrigger asChild>
											<Button
												variant='outline'
												id='date'
												className='w-30 sm:w-48 md:w-96 justify-between font-normal'
											>
												{date ? date.toLocaleDateString() : 'Select date'}
												<ChevronDownIcon />
											</Button>
										</PopoverTrigger>
										<PopoverContent
											className='w-auto overflow-hidden p-0'
											align='start'
										>
											<Calendar
												mode='single'
												selected={date}
												captionLayout='dropdown'
												onSelect={date => {
													setDate(date)
													setOpen(false)
												}}
											/>
										</PopoverContent>
									</Popover>
								</div>
								{/* Select */}
								<div className='grid w-full items-center gap-3 mb-5'>
									<Label htmlFor='paymentTerms'>Terms</Label>
									<Select id='paymentTerms' name='paymentTerms'>
										<SelectTrigger className='w-full!'>
											<SelectValue placeholder='Select a term' />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Terms</SelectLabel>
												<SelectItem value='1'>Net 1 Day</SelectItem>
												<SelectItem value='7'>Net 7 Days</SelectItem>
												<SelectItem value='14'>Net 14 Days</SelectItem>
												<SelectItem value='30'>Net 30 Days</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className='grid w-full  items-center gap-3 '>
								<Label htmlFor='description'>Project Description</Label>
								<Input type='text' id='description' name='description' />
							</div>
						</fieldset>
						<div className='flex flex-col sm:flex-row gap-3 justify-between absolute bottom-0 p-3  bg-white border w-full'>
							<SheetClose
								className={buttonVariants({ variant: 'outline' })}
								type='reset'
							>
								Discard
							</SheetClose>
							<div className='flex gap-1 mr-10'>
								<Button
									disabled={loading}
									id='draft'
									variant='secondary'
									type='submit'
								>
									Save as Draft
								</Button>
								<Button disabled={loading} id='pending' type='submit'>
									Sava & Pending
								</Button>
							</div>
						</div>
					</form>
					{/* Items */}
					<div className='flex flex-col gap-3 mb-3'>
						{items.length > 0 &&
							items.map(el => {
								return (
									<div
										key={el.id}
										className='flex flex-col sm:flex-row items-center gap-5'
									>
										<div className='w-full flex flex-col gap-3'>
											<span className='text-[#7E88C3]'>Item Name</span>
											<Input
												type='text'
												variant={el.name}
												name='name'
												onChange={evt => {
													handleItems(el.id, 'name', evt.target.value)
												}}
											/>
										</div>
										<div className='flex gap-3 w-full items-center mb-5'>
											<div>
												<span className='text-[#7E88C3]'>Qty.</span>
												<Input
													type='number'
													variant={el.quantity}
													name='quantity'
													onChange={evt => {
														handleItems(el.id, 'quantity', evt.target.value)
													}}
												/>
											</div>
											<div>
												<span className='text-[#7E88C3]'>Price</span>
												<Input
													type='number'
													variant={el.price}
													name='price'
													onChange={evt => {
														handleItems(el.id, 'price', evt.target.value)
													}}
												/>
											</div>

											<div className='flex flex-col '>
												<span className='text-[#7E88C3]'>Total</span>
												<span>{el.total}</span>
											</div>
											<Button
												onClick={() => {
													deleteItems(el.id)
												}}
												variant='destructive'
											>
												<Trash />
											</Button>
										</div>
									</div>
								)
							})}
						<Button
							className='w-full p-6 rounded-full'
							variant='outline'
							type='button'
							onClick={() => {
								setItems([
									...items,
									{
										name: '',
										quantity: 0,
										price: 0,
										total: 0,
										id: window.crypto.randomUUID(),
									},
								])
							}}
						>
							+Add New Item
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
