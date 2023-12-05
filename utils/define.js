/**
 * 
 *@desc  定义环境变量 
 * 
 */
let HOST = "https://property.chidict.com"
let HOSTimage = "https://property.chidict.com/images/"
let baseUrl = HOST + '/api'

//  H5代理
// #ifdef H5
if (process.env.NODE_ENV === 'development') {
	baseUrl = '/api'
}
// #endif


const CONFIG = {
	//开发环境配置
	development: {
		assetsPath: '/static',
		baseUrl,
		HOSTimage
	},
	//生产环境配置
	production: {
		assetsPath: '/static',
		baseUrl,
		HOSTimage,
	}
};
export default CONFIG[process.env.NODE_ENV];