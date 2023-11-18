import http from '@/utils/request.js'

// 仅演示
export const getBrochureData = params => {
	return http.get('/brochure/anounymous', {
		params
	})
}

 