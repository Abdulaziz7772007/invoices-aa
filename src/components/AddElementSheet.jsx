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

export default function AddElementSheet() {
	const [items, setItems] = useState([])
	const [open, setOpen] = useState(false)
	const [date, setDate] = useState(undefined)

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
	function deleteItems(id) {
		const result = items.filter(el => el.id !== id)
		setItems(result)
	}

	return (
		<Sheet>
			<SheetTrigger
				className={`${buttonVariants({ variant: 'default' })} rounded-full!`}
			>
				<PlusCircleIcon /> New Invoice
			</SheetTrigger>
			<SheetContent className='h-[85vh] ' side='bottom'>
				<SheetHeader>
					<SheetTitle>New Invoice</SheetTitle>
					<SheetDescription>Add a new element</SheetDescription>
				</SheetHeader>
				<div className='px-5 py-10  h-full	 overflow-y-scroll'>
					<form className=''>
						<fieldset>
							<legend className='font-bold text-[#7C5DFA] mb-5'>
								Bill From
							</legend>
							<div className='grid w-full  items-center gap-3 mb-5'>
								<Label htmlFor='senderAdres.street'>Sender adres</Label>
								<Input
									type='text'
									id='senderAdres.street'
									name='senderAdres.street'
								/>
							</div>
							<div className='flex gap-6'>
								<div className='grid w-full  items-center gap-3'>
									<Label htmlFor='senderAdres.city'>City</Label>
									<Input
										type='text'
										id='senderAdres.city'
										name='senderAdres.city'
									/>
								</div>
								<div className='grid w-full  items-center gap-3'>
									<Label htmlFor='senderAdres.postCode'>Post Code</Label>
									<Input
										type='text'
										id='senderAdres.postCode'
										name='senderAdres.postCode'
									/>
								</div>
								<div className='grid w-full  items-center gap-3'>
									<Label htmlFor='senderAdres.country'>Country</Label>
									<Input
										type='text'
										id='senderAdres.country'
										name='senderAdres.country'
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
									placeHolder='e.g. email@example.com'
								/>
							</div>
							<div className='grid w-full  items-center gap-3 mb-5'>
								<Label htmlFor='clientAdres.street'>Client adres</Label>
								<Input
									type='text'
									id='clientAdres.street'
									name='clientAdres.street'
								/>
							</div>
							<div className='flex gap-6 mb-5'>
								<div className='grid w-full  items-center gap-3'>
									<Label htmlFor='clientAdres.city'>City</Label>
									<Input
										type='text'
										id='clientAdres.city'
										name='clientAdres.city'
									/>
								</div>
								<div className='grid w-full  items-center gap-3'>
									<Label htmlFor='clientAdres.postCode'>Post Code</Label>
									<Input
										type='text'
										id='clientAdres.postCode'
										name='clientAdres.postCode'
									/>
								</div>
								<div className='grid w-full  items-center gap-3 '>
									<Label htmlFor='clientAdres.country'>Country</Label>
									<Input
										type='text'
										id='clientAdres.country'
										name='clientAdres.country'
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
												className='w-96 justify-between font-normal'
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
					</form>
					{/* Items */}
					<div className='flex flex-col gap-3 mb-3'>
						{items.length > 0 &&
							items.map(el => {
								return (
									<div className='flex items-center gap-5'>
										<Input
											type='text'
											variant={el.name}
											name='name'
											onChange={evt => {
												handleItems(el.id, 'name', evt.target.value)
											}}
										/>
										<Input
											type='number'
											variant={el.quantity}
											name='quantity'
											onChange={evt => {
												handleItems(el.id, 'quantity', evt.target.value)
											}}
										/>
										<Input
											type='number'
											variant={el.price}
											name='price'
											onChange={evt => {
												handleItems(el.id, 'price', evt.target.value)
											}}
										/>
										<span>{el.total}</span>
										<Button
											onClick={() => {
												deleteItems(el.id)
											}}
											variant='destructive'
										>
											<Trash />
										</Button>
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
