import http from '@/utils/request.js'

// 仅演示
export const getPageVar = params => {
	return http.get('/path_a/path_b', {
		params
	})
}

// 仅演示
export const editPage = data => {
	return http.post('/path_a/path_b', data)
}