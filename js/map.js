
	// 获取用户的token和用户信息是否展示截图页面
	let url = new URL(window.location.href);
	let Authorization = url.searchParams.get("isLogin");//用户token
	let showShare = url.searchParams.get("showShare");
	let userId = url.searchParams.get("userId")//用户id
	let userImage = url.searchParams.get("userImage")//用户图像
	let userName = url.searchParams.get("userName")//用户昵称
	// let phone = url.searchParams.get("phone")//用户图像
	let userToken = '';//存储用户的token
	let newID = '';//存储用户的id
		// console.log(url.searchParams.get("userid"))
		// console.log(userId)
		// console.log(userImage)
		// console.log(userName)
		
	// // 保存此设备上次登陆的用户的token数据：
	// localStorage.setItem(userToken,JSON.stringify(Authorization));
	// console.log(localStorage.getItem(userToken)) 
	// localStorage.setItem(newID,JSON.stringify(userid));
	// console.log(localStorage.getItem(newID)) 
	// console.log(showShare)
		if(showShare == false){
			//对分享的页面内容进行隐藏
		  document.getElementById("sharecard").style.display="none";//隐藏
		  
		}
		//############## 初始化地图 ############## 
		var map = new AMap.Map('container', {
		  resizeEnable: true, //是否监控地图容器尺寸变化
		  mapStyle: "amap://styles/darkblue",//地图的主题颜色
		  // zoom:10, //初始地图级别
		  // center: [108.69159125434028,34.10729899088542],//地图的中心坐标
		});
		
	let currentPage=1;//当前页码
	let pageCount= 1;//总页数
	let routerMaxId = 0;// //存放后端返回的最大路线id
	let storageLine = []//把前端获取到的所有数据存起来
	let keyRouter = []//存放后端返回的所有路线
	
	function getAllMapList(){
		// console.log("获取地图列表")
		// var data = localStorage.getItem(keyRouter)
		// storageLine = JSON.parse(data)
		// routerMaxId = localStorage.getItem(routerMaxId);
		// ##############  调取获取用户自驾的所有路线接口 ##############
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
			let lineArrList = [];
			let lineArr = []//存放所有的points
			$.ajax(settings).done(function (response) {
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
					var arr = new AMap.Polyline({
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
					 localStorage.setItem(keyRouter,JSON.stringify(storageLine));
					 // 获取最大路径id
					 localStorage.setItem(routerMaxId,Math.max(...allRouterId));	
				 }
				 getAllMapList()
			})
		}else{
			return ;
		}
	}
	function drawPolylines(keyRouter){
		var lineArr = []
		keyRouter.map((item,index )=> {
			item.points.map(t =>{
				 lineArr.push(t)
			})
			// console.log(lineArr)
			var polyline = new AMap.Polyline({
			      path: lineArr,          //设置线覆盖物路径
			      strokeColor: "#df5000", //线颜色
			      strokeWeight: 3,        //线宽
			      strokeStyle: "solid",   //线样式
			  	  lineJoin: 'round' // 折线拐点连接处样式
				});
			  map.add(polyline);
			  lineArr = []
		})
	}
	// /*################ 调用后端接口，获取地图路线信息 ###############*/
	map.on('complete', function() {
		// jQuery((document.getElementById("container"))).ready(function(){
		document.getElementById("container").style.visibility="visible";//显示
		document.getElementById("loading").style.visibility="hidden";//隐藏
		console.log("地图加载完成")
		
		
       // ############## 对所有路线进行展示 ##############
		getAllMapList()
		// ############## 获取城市数量和map中心点 #############
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
		
		$.ajax(trackCity).done(function (response) {
		   var cityList = response.msg
		   document.getElementById("all_city").innerHTML=response.msg.length;
		   document.getElementById("share_all_city").innerHTML=response.msg.length;
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
				 // 创建一个 Icon
				var image = '../img/qi.png'
				 marker = new AMap.Marker({
				    icon: './img/qi.png',
				    position: [cityList[i][1],cityList[i][2]],
					// position:new AMap.LngLat(cityList[i][1],cityList[i][2]),
					// anchor: 'center', //设置锚点
				    // offset: new AMap.Pixel(-0,-0)
					// offset: {x:-0,y:-0}
				});
				// 将 markers 添加到地图
				marker.setMap(map);
		   	 }
			 
		   	  
		   	})
		});
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
		
		$.ajax(AllKM).done(function (response) {
		   document.getElementById("all_km").innerHTML=response.msg[0].distance;
		   document.getElementById("share_all_km").innerHTML=response.msg[0].distance;
		});
	}); 
	
	// /*################ 用户分享截图 ###############*/
	function shareScreen(){
		// showShare = true
		// if(showShare == true){
			document.getElementById("card").style.visibility="hidden";//隐藏
			document.getElementById("sharecard").style.display="";//显示
		// }
		var bigImg = document.createElement("img");		//创建一个img元素
		bigImg.src='https://tl.chidict.com/'+userImage;   //给img元素的src属性赋值
		var myDiv = document.getElementById('user_image'); //获得dom对象
		myDiv.appendChild(bigImg);  	//为dom添加子元素img
		document.getElementById("user_name").innerHTML=userName
		// 接下来对显示的内容进行截图
		window.pageYOffset = 0;
		document.documentElement.scrollTop = 0
		document.body.scrollTop = 0
		setTimeout(() =>{
			html2canvas(document.body,{useCORS:true}).then(function (canvas) {
				let img = canvas.toDataURL("image/png");
				// let base=encodeURIComponent(img);//转码
				//向uniapp传值
				uni.postMessage({
					data: {
						img:img
					}
				});
			});
		},1000)
			// $("#cc").html("<img src="+img+" />");
			
		
		// document.getElementById("card").style.visibility="visible";//隐藏
		// document.getElementById("sharecard").style.display="none";//显示
	}
	
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
	// /*################ 获取用户当前位置 ###############*/
	//   var options = {
	//         'showButton': true,//是否显示定位按钮
	// 		'buttonPosition': 'LB',//定位按钮的位置
	// 		/* LT LB RT RB */
	// 		'buttonOffset': new AMap.Pixel(10, 20),//定位按钮距离对应角落的距离
	// 		'showMarker': true,//是否显示定位点
	// 		'markerOptions':{//自定义定位点样式，同Marker的Options
	// 		  'offset': new AMap.Pixel(-18, -36),
	// 		  'content':'<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
	// 		},
	// 		'showCircle': true,//是否显示定位精度圈
	// 		'circleOptions': {//定位精度圈的样式
	// 			'strokeColor': '#0093FF',
	// 			'noSelect': true,
	// 			'strokeOpacity': 0.5,
	// 			'strokeWeight': 1,
	// 			'fillColor': '#02B0FF',
	// 			'fillOpacity': 0.25
	// 		}
	//     }
	//     AMap.plugin(["AMap.Geolocation"], function() {
	//         var geolocation = new AMap.Geolocation(options);
	//         map.addControl(geolocation);
	//         geolocation.getCurrentPosition()
	// 		AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
	//     });