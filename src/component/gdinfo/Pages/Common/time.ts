/*****************************************************
 * GITADORA Info Server
 * Developed by Tae Jun Kang a.k.a Prunus Nira
 * (c) Nira 2016
 *
 * 1. This project is protected under GNU AGPL v3.0
 *    Please refer to LICENSE file on root
 * 2. Also, products and libraries used to implement
 *    this server are on USED-LIBRARIES file on root
 *****************************************************/
export const getTime = () => {
	const now = new Date();
    const time = now.getFullYear() + "/"
		+ ((now.getMonth()+1)<10?'0':'') + (now.getMonth()+1) + "/"
		+ (now.getDate()<10?'0':'') + now.getDate() + " "
		+ now.getHours() + ":"
		+ (now.getMinutes()<10?'0':'') + now.getMinutes() + ":"
		+ (now.getSeconds()<10?'0':'') + now.getSeconds();
	return time;
}

export const getTimeScr = () => {
	const now = new Date();
    const time = now.getFullYear() + "-"
		+ ((now.getMonth()+1)<10?'0':'') + (now.getMonth()+1) + "-"
		+ (now.getDate()<10?'0':'') + now.getDate() + "_"
		+ (now.getHours()<10?'0':'') + now.getHours() + "-"
		+ (now.getMinutes()<10?'0':'') + now.getMinutes() + "-"
		+ (now.getSeconds()<10?'0':'') + now.getSeconds();
	return time;
}

export const unixTimeConverter = (uxtime: number) => {
	const now = new Date(uxtime);
	const time = now.getFullYear() + "/"
		+ ((now.getMonth()+1)<10?'0':'') + (now.getMonth()+1) + "/"
		+ (now.getDate()<10?'0':'') + now.getDate() + " "
		+ now.getHours() + ":"
		+ (now.getMinutes()<10?'0':'') + now.getMinutes() + ":"
		+ (now.getSeconds()<10?'0':'') + now.getSeconds();
	return time;
}