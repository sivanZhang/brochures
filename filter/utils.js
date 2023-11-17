import  moment from '@/common/moment';

export function   time(val) { 
	// 日期格式化
		return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
	} 


	export function   date(val) { 
		// 日期格式化
			return moment(val * 1000).format('YYYY-MM-DD')
	} 
	export function   dateNian(val) { 
		// 日期格式化
		if (val){
			return moment(val).format('YY年MM月DD日')
		}
		else{
			return ""
		}
			
	}

export function	toFixed2  (value) {
	// 数字格式化，保留两位小数
		if(!value) return '0.00'
		return Number(value).toFixed(2)
	}

export function feedbackformat(status) {
	switch (status) {
		case 0:
			return "已提交";
		case 1:
			return "采纳";
		case 2:
			return "未采纳";
	}
}
export function repairStatusformat(status) {
	switch (status) {
		case 0:
			return "待处理";
		case 1:
			return "已办结";
	}
}



export function number(orgnumber) {
	let txtnumber = orgnumber + "";
	if (orgnumber > 10000) {
	  txtnumber = (orgnumber / 10000).toFixed(2) + "万";
	  txtnumber = txtnumber.replace(".00", "");
	}
	return txtnumber;
  }


  export function entity_type_txt(entity_type){
	if (entity_type == 1){
	  return "系统通知"
	}
	else if  (entity_type == 10){
	  return "点赞"
	}
	else if  (entity_type == 11){
	  return "维修"
	}
	else if  (entity_type == 12){
	  return "邻里互助"
	}
	else if  (entity_type == 13){
	  return "评论"
	}
	else if  (entity_type == 14){
	  return "有偿服务"
	}
	else if  (entity_type == 15){
	  return "账单"
	} 
	else if  (entity_type == 16){
	  return "提现"
	}
	else if  (entity_type == 17){
	  return "催缴费"
	} 
  } 
  export function entity_type_img(entity_type, baseAppUrl){
	 
	if (entity_type == 1){
	  return baseAppUrl+'icons/zhuce.png'
	}
	else if  (entity_type == 10){
	  return baseAppUrl+'zan.png'
	}
	else if  (entity_type == 11){
	  return baseAppUrl+'wujiny.png'
	}
	else if  (entity_type == 12){
	  return baseAppUrl+'woshouy.png'
	}
	else if  (entity_type == 13){
	  return baseAppUrl+'pinlun.png'
	}
	else if  (entity_type == 14){
	  return baseAppUrl+'youchangy.png'
	}
	else if  (entity_type == 15){
	  return baseAppUrl+'jiedany.png'
	} 
	else if  (entity_type == 16){
	  return baseAppUrl+'qianbao.png'
	}
	else if  (entity_type == 17){
	  return baseAppUrl+'jiaofei.png'
	} 
  }
