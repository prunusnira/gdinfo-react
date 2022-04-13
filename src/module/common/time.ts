export const getTime = () => {
	return unixTimeConverter(Date.now())
}

export const getTimeScr = () => {
	const now = new Date()
    const time =
		`${now.getFullYear()}-${((now.getMonth()+1)<10?'0':'')}${(now.getMonth()+1)}-${(now.getDate()<10?'0':'')}${now.getDate()}` +
		`_${(now.getHours()<10?'0':'')}${now.getHours()}-${(now.getMinutes()<10?'0':'')}${now.getMinutes()}-${(now.getSeconds()<10?'0':'')}${now.getSeconds()}`
	return time
}

export const unixTimeConverter = (uxtime: number) => {
	const now = new Date(uxtime)
	const time =
		`${now.getFullYear()}/${((now.getMonth()+1)<10?'0':'')}${(now.getMonth()+1)}/${(now.getDate()<10?'0':'')}${now.getDate()} ` +
		`${now.getHours()}:${(now.getMinutes()<10?'0':'')}${now.getMinutes()}:${(now.getSeconds()<10?'0':'')}${now.getSeconds()}`
	return time
}