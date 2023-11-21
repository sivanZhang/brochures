/**
 * 
 * @file 可复用的工具函数
 * 
 */


import dayjs from 'dayjs'

export const time = (val) => {
	// 日期格式化
	return dayjs(val * 1000).format('YYYY-MM-DD HH:mm:ss')
}


export const date = (val) => {
	// 日期格式化
	return dayjs(val * 1000).format('YYYY-MM-DD')
}


export const dateNian = (val) => {
	// 日期格式化
	if (val) {
		return dayjs(val).format('YY年MM月DD日')
	} else {
		return ""
	}

}

export const toFixed2 = (value) => {
	// 数字格式化，保留两位小数
	if (!value) return '0.00'
	return Number(value).toFixed(2)
}



export const number = (orgnumber) => {
	let txtnumber = orgnumber + "";
	if (orgnumber > 10000) {
		txtnumber = (orgnumber / 10000).toFixed(2) + "万";
		txtnumber = txtnumber.replace(".00", "");
	}
	return txtnumber;
}