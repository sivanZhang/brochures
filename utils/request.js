/**
 *
 * @instance http请求封装
 * @see https://www.quanzhan.co/luch-request
 *
 */

import Request from '@/js_sdk/luch-request/luch-request/index.js'
import define from '@/utils/define'

const OPTIONS = {
	baseURL: define.baseUrl,
	header: {},
	dataType: 'json',
	/* responseType: 'json', */
	// 自定义params 处理函数
	paramsSerializer: null,
	// 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
	custom: {}, // 全局自定义参数默认值
	// #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
	timeout: 60000,
	// #endif
	forcedJSONParsing: true,
}

const http = new Request(OPTIONS)

http.interceptors.request.use(
	config => {
		config.header = {
			...config.header,
		}
		// config.header['Authorization'] = uni.getStorageSync('accessToken');
		// if (config.custom.auth) {
		//   config.header.token = 'token'
		// }
		return config
	},
	config => {
		return Promise.reject(config)
	}
)

const errorCallback = ({
	statusCode,
	data = {}
}) => {
	switch (statusCode) {
		case 400:
			uni.showToast({
				title: '错误的请求',
			})
			break
		case 401:
			uni.showToast({
				title: '登录信息已过期',
			})

			break
		case 405:
			uni.showToast({
				title: '当前操作不被允许',
			})
			break
		case 429:
			uni.showToast({
				title: '请求过多，先休息一下吧',
			})
			break
		case 500:
			uni.showToast({
				title: '服务器打瞌睡了',
			})
			break
		default: // response.data.status !== 0或者statusCode=其他走这里
			/* uni.showToast({
				title: data?.msg || '响应错误',
			}) */
			break
	}
}

http.interceptors.response.use(
	({
		data
	}) => {
		if (data.status !== 0) {
			// 后端返回的code码
			return Promise.reject(data)
		}
		return data // 直接返回data不需要在then中判断是否===200
	},
	error => {
		errorCallback(error)
		return Promise.reject(error)
	}
)

export default http