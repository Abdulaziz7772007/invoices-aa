export function formatDate(date) {
	const year = date?.split('-')[0]
	const month = Number(date?.split('-')[1])
	const day = date?.split('-')[2]

	const months = [
		'',
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]

	return `${day} ${months[month]} ${year}`
}

export function objFormatter(obj) {
	const clientAddress = {}
	const senderAddress = {}

	const result = {}
	for (const key in obj) {
		if (key.includes('.')) {
			const checkKey = key.split('.')
			if (checkKey[0] === 'clientAddress') {
				clientAddress[checkKey[1]] = obj[key]
			} else if (checkKey[0] === 'senderAddress') {
				senderAddress[checkKey[1]] = obj[key]
			}
		} else {
			result[key] = obj[key]
		}
	}

	result.clientAddress = clientAddress
	result.senderAddress = senderAddress

	return result
}

export function formValidation(obj) {
	if (obj['senderAddress.street'] === '') {
		return {
			target: 'senderAddress.street',
			message: "Jo'natuvchi manzilini kiritmadingiz",
		}
	} else if (obj['senderAddress.city'] === '') {
		return {
			target: 'senderAddress.city',
			message: "Jo'natuvchi shahrini kiritmadingiz",
		}
	} else if (obj['senderAddress.postCode'] === '') {
		return {
			target: 'senderAddress.postCode',
			message: "Jo'natuvchi emailini kiritmadingiz",
		}
	} else if (obj['senderAddress.country'] === '') {
		return {
			target: 'senderAddress.country',
			message: "Jo'natuvchi davlatini kiritmadingiz",
		}
	} else if (obj['clientName'] === '') {
		return {
			target: 'clientName',
			message: 'Qabul qiluvchi ismini kiritmadingiz',
		}
	} else if (obj['clientEmail'] === '') {
		return {
			target: 'clientEmail',
			message: 'Qabul qiluvchi emailini kiritmadingiz',
		}
	} else if (obj['clientAddress.street'] === '') {
		return {
			target: 'clientAddress.street',
			message: 'Qabul qiluvchi manzilini kiritmadingiz',
		}
	} else if (obj['clientAddress.city'] === '') {
		return {
			target: 'clientAddress.city',
			message: 'Qabul qiluvchi shahrini kiritmadingiz',
		}
	} else if (obj['clientAddress.postCode'] === '') {
		return {
			target: 'clientAddress.postCode',
			message: 'Qabul qiluvchi emailini kiritmadingiz',
		}
	} else if (obj['clientAddress.country'] === '') {
		return {
			target: 'clientAddress.country',
			message: 'Qabul qiluvchi davlatini kiritmadingiz',
		}
	} else if (!obj['paymentDue']) {
		return {
			target: null,
			message: "To'lo'v sanasini belgilamadingiz",
		}
	} else if (!obj['paymentTerms']) {
		return {
			target: 'paymentTerms',
			message: "To'lo'v muddatini belgilamadingiz",
		}
	} else if (obj['description'] === '') {
		return {
			target: 'description',
			message: "To'lo'v uchun izoh yozmadingiz",
		} 
	} else if (obj.items.length === 0) {
		return {
			target: null,
			message: "Qanday mahsulotlar olganingizni belgilang",
		} 
	} else {
		return false
	}
}
