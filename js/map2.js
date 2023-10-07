	// 解决一个js文件引入两个版本的jquery问题
	var $2 = $.noConflict(); // 第二个加载的jQuery对象变成了 $2
	// 获取用户的token和用户信息是否展示截图页面
	let url = new URL(window.location.href);
	let Authorization = url.searchParams.get("isLogin");//用户token
	let showShare = url.searchParams.get("showShare");
	let userId = url.searchParams.get("userId")//用户id
	let userToken = '';//存储用户的token
	let newID = '';//存储用户的id		
	let citySearch = url.searchParams.get("citySearch")
	let timeSearch = url.searchParams.get("timeSearch")
	// console.log(citySearch)
	// console.log(timeSearch)
	//############## 初始化地图 ##############
	// window.init = function(){
   var map = new AMap.Map('container', {
	   resizeEnable: true, //是否监控地图容器尺寸变化
	   mapStyle: "amap://styles/darkblue",//地图的主题颜色
	   zoom:6, //初始地图级别
	   // center: [108.69159125434028,34.10729899088542],//地图的中心坐标
	});
	// /*################ 调用后端接口，获取地图路线信息 ###############*/
	map.on('complete', function() {
	// $2((document.getElementById("container"))).ready(function(){
		
		console.log("地图加载完成")
	   // ############## 对所有路线进行展示 ##############
	   if(timeSearch != "自定义时间"){
		   document.getElementById("input_date").style.display="none";//隐藏
	   }
	   
	if(citySearch != "null"){
		getAllMapList('all')
	}
		// ############## 获取城市数量和map中心点 #############
	if(citySearch != "null"){
		var trackCity = {
		  "url": "https://tl.chidict.com/track/stat/?locations",
		  "method": "GET",
		  "timeout": 0, 
		  "headers": {
			// "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IjEzMDMyOTg1Njg1IiwiZXhwIjoxNjAxMzAzOTE1LCJlbWFpbCI6bnVsbCwicGhvbmUiOiIxMzAzMjk4NTY4NSJ9.jtz7jka5PpAEcL1XYKyJIvRnaTehPZtFgh1__DjW9w0",
			"Authorization": Authorization,
			"Content-Type": "application/json", 
		  },  
		  "crossDomain": true,
		};
		
		$2.ajax(trackCity).done(function (response) {
		   var cityList = response.msg
		   // console.log(response.msg)
		   cityNumber = response.msg.length
		   // document.getElementById("all_city").innerHTML=response.msg.length;
		   // document.getElementById("share_all_city").innerHTML=response.msg.length;
		   for(var i=0;i<response.msg[0].length;i++){
			   var lng = response.msg[0][1]
			   var lat = response.msg[0][2]
			   //设置地图中心点为自驾路线列表中的第一个城市
			   map.setCenter([lng, lat]); 
		   }
		   // /*################ 绘制行政区 ###############*/
			AMap.plugin('AMap.DistrictSearch', function () {
			  // 创建行政区查询对象
			  var city = new AMap.DistrictSearch({
				// 返回行政区边界坐标等具体信息
				extensions: 'all',
				// 设置查询行政区级别为 市
				level: 'city'
			  })
			  // cityList是当前自驾城市的列表
			 for(var i=0;i<cityList.length;i++){
				 city.search(cityList[i][0], function(status, result) {
					// 获取当前自驾城市(级别为市级)的边界信息
					var bounds = result.districtList[0].boundaries
					var polygons = []
					if (bounds) {
					  for (var i = 0, l = bounds.length; i < l; i++) {
					   //生成行政区划polygon
					   var polygon = new AMap.Polygon({
						 map: map,
						 strokeWeight: 1,
						 path: bounds[i],
						 fillOpacity: 0.7,
						 fillColor: '#355050',
						 strokeColor: '#1c7294'
					   })
					   polygons.push(polygon)
					 }
					 // 地图自适应
					 // map.setFitView()
				   }
				 })
				 // // 添加marker
				 marker = new AMap.Marker({
					// icon: "./img/qiIcon.png",
					position: [cityList[i][1],cityList[i][2]],
						content: '<img src="./img/qiIcon.png" style="width: 30px;height:30px" />', //自定义点标记覆盖物内容
						offset: new AMap.Pixel(-12, -30)
				});
				// 将 markers 添加到地图
					map.add(marker);
			 }
			})
		});
	}
		// ############# 获取总里程和总积分 #############
		var AllKM = {
		  "url": "https://tl.chidict.com/track/track/?distance",
		  "method": "GET",
		  "timeout": 0, 
		  "headers": {
			// "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IjEzMDMyOTg1Njg1IiwiZXhwIjoxNjAxMzAzOTE1LCJlbWFpbCI6bnVsbCwicGhvbmUiOiIxMzAzMjk4NTY4NSJ9.jtz7jka5PpAEcL1XYKyJIvRnaTehPZtFgh1__DjW9w0",
			"Authorization": Authorization,
			"Content-Type": "application/json", 
		  },  
		  "crossDomain": true,
		};
		
		$2.ajax(AllKM).done(function (response) {
			// console.log(response.msg)
			allKm = response.msg[0].distance
			coin = response.msg[1].coin
		   document.getElementById("text_km").innerHTML=response.msg[0].distance;
		   // document.getElementById("share_all_km").innerHTML=response.msg[0].distance;
		});
		// 获取用户的token和用户信息是否展示截图页面
		let userImage = url.searchParams.get("userImage")//用户图像
		let userName = url.searchParams.get("userName")//用户昵称
		// 显示用户图像和昵称
		var bigImg = document.createElement("img");		//创建一个img元素
		bigImg.style.width="55px"
		bigImg.style.height="55px"
		bigImg.style.borderRadius = '50%'
		bigImg.src='https://tl.chidict.com/'+userImage;   //给img元素的src属性赋值
		var myDiv = document.getElementById('user_image'); //获得dom对象
		myDiv.appendChild(bigImg);  	//为dom添加子元素img
		document.getElementById("user_name").innerHTML=userName
		setTimeout("showCard()", 500 )
	});
	function showCard(){
		document.getElementById("loading").style.visibility="hidden";//隐藏
		document.getElementById("card").style.visibility="visible";//隐藏
		document.getElementById("cityCardList").style.visibility="visible";//显示
		document.getElementById("container").style.visibility="visible";//显示
	}
	let currentPage=1;//当前页码
	let pageCount= 1;//总页数
	let routerMaxId = 0;// //存放后端返回的最大路线id
	let storageLine = []//把前端获取到的所有数据存起来
	let keyRouter = []//存放后端返回的所有路线
	let cityNumber = 0;//城市总数
	let allKm = 0;//走过的总路程
	let coin = 0;//总积分数
	let lineArrList = [];
	let lineArr = []//存放所有的points
	let arr ={}
	// 搜索时的参数
	let searchPage = 1//查询时从第一页开始查
	let searchPageCount= 1;//总页数
	let searchLineArrList = [];
	let searchLineArr = []//存放所有的points
	function getAllMapList(type){
		// console.log("获取地图列表")
		// var data = localStorage.getItem(keyRouter)
		// storageLine = JSON.parse(data)
		// routerMaxId = localStorage.getItem(routerMaxId);
		// ##############  调取获取用户自驾的所有路线接口 ##############
		if(type =="all"){
			var settings = {
			  "url": "https://tl.chidict.com/track/display/?id="+routerMaxId+'&page='+currentPage+'&pagenum=10',
			  "method": "GET",
			  "timeout": 0, 
			  "headers": {
				// "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNSwidXNlcm5hbWUiOiIxODg4ODg4ODg4OCIsImV4cCI6MTYwMTA5MTUzMiwiZW1haWwiOm51bGwsInBob25lIjoiMTg4ODg4ODg4ODgifQ.vKNCatWUriGnpwNibSgzgwltF0YF0CvTouSWSQVUrPM",
				"Authorization": Authorization,
				// "Authorization":"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IjEzMDMyOTg1Njg1IiwiZXhwIjoxNjAxMzAzOTE1LCJlbWFpbCI6bnVsbCwicGhvbmUiOiIxMzAzMjk4NTY4NSJ9.jtz7jka5PpAEcL1XYKyJIvRnaTehPZtFgh1__DjW9w0",
				"Content-Type": "application/json", 
			  },  
			  "crossDomain": true,
			};
			// // // 保存此设备上次登陆的用户的token数据：
			// localStorage.setItem(userToken,JSON.stringify(Authorization));
			// console.log(localStorage.getItem(userToken)) 
			if(currentPage<=pageCount){
				// let lineArrList = [];
				// let lineArr = []//存放所有的points
				$2.ajax(settings).done(function (response) {
					pageCount = response.page_count
					if(currentPage == 1){
						if(pageCount==0){
							// 证明已经是最新的路线了，直接把storage中的路线绘制
							drawPolylines(storageLine)
							return ;
						}else {
							lineArrList = [...response.msg]
							// 不是最新的路线，需要把最新的路线和storage中的路线拼接一起绘制
							storageLine  = [...storageLine,...response.msg]
						}
							
					}else{
						lineArrList = response.msg
						// 不是最新的路线，需要把最新的路线和storage中的路线拼接一起绘制
						storageLine = [...storageLine,...response.msg]
					}
					 currentPage++
					 lineArrList.map((item,index )=> {
						// 进行画线
						item.points.map(t =>{
							lineArr.push([t[0],t[1]])
						})
						arr = new AMap.Polyline({
							path: lineArr,          //设置线覆盖物路径
							strokeColor: "#df5000", //线颜色橘色：df5000蓝色：2faeea
							strokeWeight: 3,        //线宽
							strokeStyle: "solid",   //线样式
							lineJoin: 'round' // 折线拐点连接处样式
						})
						map.add(arr);
						lineArr = []
					})	
					 if(currentPage==pageCount+1){
						 var allRouterId = []////存放返回的所有路径的id
						 //  // 把返回的路径的id都存储起来
						 storageLine.map(item =>{
							 allRouterId.push(item.id)
						 })
						 //保存storageLine数据：
						 // localStorage.setItem(keyRouter,JSON.stringify(storageLine));
						 // 获取最大路径id
						 localStorage.setItem(routerMaxId,Math.max(...allRouterId));	
					 }
					 getAllMapList('all')
				})
			}else{
				return ;
			}
		}else if(type == 'search'){
			// console.log("search")
			// 按时间搜索
			var settings = {
			  "url": "https://tl.chidict.com/track/display/?id="+0+'&page='+searchPage+'&pagenum=10'+'&start='+start+'&end='+end,
			  "method": "GET",
			  "timeout": 0, 
			  "headers": {
				// "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNSwidXNlcm5hbWUiOiIxODg4ODg4ODg4OCIsImV4cCI6MTYwMTA5MTUzMiwiZW1haWwiOm51bGwsInBob25lIjoiMTg4ODg4ODg4ODgifQ.vKNCatWUriGnpwNibSgzgwltF0YF0CvTouSWSQVUrPM",
				"Authorization": Authorization,
				// "Authorization":"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IjEzMDMyOTg1Njg1IiwiZXhwIjoxNjAxMzAzOTE1LCJlbWFpbCI6bnVsbCwicGhvbmUiOiIxMzAzMjk4NTY4NSJ9.jtz7jka5PpAEcL1XYKyJIvRnaTehPZtFgh1__DjW9w0",
				"Content-Type": "application/json", 
			  },  
			  "crossDomain": true,
			};
			if(searchPage<=searchPageCount){
				$2.ajax(settings).done(function (response) {
					searchPageCount = response.page_count
					searchLineArrList = response.msg
					searchPage++
					 searchLineArrList.map((item,index )=> {
						// 进行画线
						item.points.map(t =>{
							searchLineArr.push([t[0],t[1]])
						})
						var searcharr = new AMap.Polyline({
							path: searchLineArr,          //设置线覆盖物路径
							strokeColor: "#df5000", //线颜色橘色：df5000蓝色：2faeea
							strokeWeight: 3,        //线宽
							strokeStyle: "solid",   //线样式
							lineJoin: 'round' // 折线拐点连接处样式
						})
						map.add(searcharr);
						searchLineArr = []
					})
					getAllMapList('search')
				})
			}else{
				searchPage=1
				searchPageCount= 1
				return ;
			}
		}
	}
	function drawPolylines(keyRouter){
		var linearr = []
		keyRouter.map((item,index )=> {
			item.points.map(t =>{
				 linearr.push(t)
			})
			// console.log(lineArr)
			var polyline = new AMap.Polyline({
			      path: linearr,          //设置线覆盖物路径
			      strokeColor: "#df5000", //线颜色
			      strokeWeight: 3,        //线宽
			      strokeStyle: "solid",   //线样式
			  	  lineJoin: 'round' // 折线拐点连接处样式
				});
			  map.add(polyline);
			  linearr = []
		})
	}
	// /*################ 用户分享截图 ###############*/
	// let count = 0
	var ws=null;
	var share = ''
	function showshare(){
		console.log("show share")
		document.getElementById("showshare").style.visibility = "hidden"
		document.getElementById("shareImage").style.visibility = "visible"
		document.getElementById("cardKm").style.marginTop = "30px"
		document.getElementById("shareImage").style.marginTop = "30px"
		share = false
		//向uniapp传值
		uni.postMessage({
			data: {
				share:share
				// img:img
			}
		});
	}
	function shareScreen(){
		console.log("share")
		document.getElementById("showshare").style.visibility = "hidden"
		document.getElementById("shareImage").style.visibility = "hidden"
		document.getElementById("card").style.visibility="hidden";//隐藏
		document.getElementById("sharecard").style.display="";//显示
		document.getElementById("cityCardList").style.visibility="hidden";	
		share =true
		//向uniapp传值
		uni.postMessage({
			data: {
				share:share
				// img:img
			}
		});
		setTimeout(() =>{
			document.getElementById("card").style.visibility="visible";//显示
			document.getElementById("sharecard").style.display="none";//隐藏
			document.getElementById("cityCardList").style.visibility="visible";
			document.getElementById("showshare").style.visibility = "visible"
			document.getElementById("cardKm").style.marginTop = "0"
		},5000)
	}
	// // /*################ 判断城市卡片是否展示 ###############*/
	// 		// ###### 点击对应的城市卡片，跳转到该城市经纬度中心点 ######
	// 				 var lng = item.center[0]
	// 				 var lat = item.center[1]
	// 				 map.setCenter([lng, last]); 
	// ################### 绘制行政区 ##################
	if(citySearch != "null"){
		AMap.plugin('AMap.DistrictSearch', function () {
		  // 创建行政区查询对象
		  var districtSearch = new AMap.DistrictSearch({
			 // 返回行政区边界坐标等具体信息
			 extensions: 'all',
			 // 设置查询行政区级别为 市
			 level: 'city'
		  })
		  if(citySearch == ' '){
			  
		  }else{
			  // 搜索所有省/直辖市信息
			  districtSearch.search(citySearch, function(status, result) {
			    // 查询成功时，result即为对应的行政区信息
				// 获取对应的城市的边界信息
				   var bounds = result.districtList[0].boundaries
				   var polygons = []
				   if (bounds) {
					 for (var i = 0, l = bounds.length; i < l; i++) {
					  //生成行政区划polygon
					  var polygon = new AMap.Polygon({
						   map: map,
						   strokeWeight: 1,
						   path: bounds[i],
						   fillOpacity: 0.7,
						   fillColor: '#355050',
						   strokeColor: '#1c7294'
					  })
					  polygons.push(polygon)
					}
				   // document.getElementById("city_card").style.display="none";//隐藏
				  }
			  })
		  }
		 
		})
	}
					
	// 日期选择器
	let start = new Date(),end = new Date();
	var now = new Date(); //当前日期
	var nowDayOfWeek = now.getDay(); //今天本周的第几天
	var nowDay = now.getDate(); //当前日
	var nowMonth = now.getMonth(); //当前月
	var nowYear = now.getYear(); //当前年
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
	var lastYear = lastMonthDate.getYear();
	var lastMonth = lastMonthDate.getMonth();
	if(timeSearch!=null){
		if(timeSearch == "本周"){
			map.clearMap();
			// 获取本周周一时间
		    start = new Date(new Date() - (new Date().getDay() - 1) * 86400000).toLocaleDateString();
			//本周日的日期 ，默认是今天（结束日期）
			end = new Date().toLocaleDateString(); // 日期变换
			// 清除地图上所有添加的覆盖物
			map.clearMap();
			// 掉后端接口
			getAllMapList('search')
		}else if(timeSearch == "本月"){
			// 获取本月日期
			start = new Date(nowYear, nowMonth, 1).toLocaleDateString();
			end = new Date().toLocaleDateString(); // 日期变换
			 // 清除地图上所有添加的覆盖物
			 map.clearMap();
			 // 掉后端接口
			 getAllMapList('search')
		}else if(timeSearch == "本年"){
			start = new Date(nowYear, 0, 1).toLocaleDateString();
			 end = new Date().toLocaleDateString(); // 日期变换
			 // 清除地图上所有添加的覆盖物
			 map.clearMap();
			 // 掉后端接口
			 getAllMapList('search')
		}else{
			// console.log("自定义时间")
			// 自定义时间
			 document.getElementById("input_date").style.display="";//显示日期选择器
			 var date = dataFormat(new Date())
			 $('input[name="daterange"]').daterangepicker({maxDate: date}, function(start, end, label) {
				 start = start.format('YYYY/MM/DD')
				 end = end.format('YYYY/MM/DD')
			 });
			 $('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
			   start = picker.startDate.format('YYYY/MM/DD')
			   end =picker.endDate.format('YYYY/MM/DD')
			   // 清除地图上所有添加的覆盖物
			   map.clearMap();
			   // 掉后端接口
			   getAllMapList('search')
			   document.getElementById("input_date").style.display="none";//隐藏
			 });
		}
	}
   
	
	function dataFormat(time) {
	  var d = new Date(time);
	  var curr_date = d.getDate();
	  var curr_month = d.getMonth() + 1;
	  var curr_year = d.getFullYear();
	  String(curr_month).length < 2 ? (curr_month = "0" + curr_month) : curr_month;
	  String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
	  var timeformat = curr_year + "-" + curr_month + "-" + curr_date ;// YY:MM:DD
	  return timeformat;
	};
	// /*################ 跳转到路线列表页 ###############*/
	function target(){
			uni.navigateTo({
			    url: '/pages/track/list'
			});
	}
	function backImage(){
		uni.switchTab({
			url:'/pages/track/main'
		});
	}