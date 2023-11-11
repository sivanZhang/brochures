/**
 * 
 *@desc  定义环境变量 
 * 
 * 
  */


let baseUrl = 'https://property.chidict.com/api'

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
	},
	//生产环境配置
	production: {
		assetsPath: '/static',
		baseUrl,
	}
};
export default CONFIG[process.env.NODE_ENV];