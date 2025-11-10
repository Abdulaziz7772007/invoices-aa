export function formatDate(date) {
	const year = date.split('-')[0]
	const month = Number(date.split('-')[1])
	const day = date.split('-')[2]

	const months = [
		'',
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

return `${day} ${months[month]} ${year}`

}