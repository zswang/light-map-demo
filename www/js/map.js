void function() {
	var instances = {};
	var guid = 0;

	var LightMapPrototype = Object.create(HTMLDivElement.prototype);
	LightMapPrototype.createdCallback = function() {
		var self = this;
		var div = document.createElement('div');
		var zoom = 11;
		var center = [ 116.404, 39.915 ];
		this.setZoom = function(value) {
			zoom = value;
			map.setZoom(zoom);
		};
		this.setCenter = function(value) {
			center = String(value).split(',');
			map.setCenter(new BMap.Point(center[0], center[1]));
		};

		div.style.width = (this.getAttribute('width') || '300') + 'px';
		div.style.height = (this.getAttribute('height') || '300') + 'px';
		this.appendChild(div);

		var runtime = (typeof cordova != 'undefined')
				&& (typeof light != 'undefined')
				&& (typeof light.map != 'undefined') ? 'cordova' : 'browser';

		var map;
		switch (runtime) {
		case 'cordova':
			var obj = div.getBoundingClientRect()
			light.map.init({
				guid : guid,
				center : center,
				zoom : zoom,
				left : obj.left + window.pageXOffset,
				top : obj.top + window.pageYOffset,
				width : Math.round(obj.width),
				height : Math.round(obj.height)
			});

			instances[guid] = this;
			guid++;
			break;
		case 'browser':
			map = new BMap.Map(div); // 创建Map实例
			map.enableScrollWheelZoom(); // 启用滚轮放大缩小
			map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
			map.addControl(new BMap.OverviewMapControl()); // 添加缩略地图控件
			map.centerAndZoom(new BMap.Point(center[0], center[1]), zoom); // 初始化地图,设置中心点坐标和地图级别

			map.addEventListener('moveend', function() {
				var value = map.getCenter();
				center = [ value.lng, value.lat ];
				self.setAttribute('center', center);
				var e = document.createEvent('Event');
				e.initEvent('moveend', true, true);
				self.dispatchEvent(e);
			});
			map.addEventListener('zoomend', function() {
				var value = map.getZoom();
				zoom = value;
				self.setAttribute('zoom', zoom);
				var e = document.createEvent('Event');
				e.initEvent('zoomend', true, true);
				self.dispatchEvent(e);
			});

			break;
		}
		this.map = map;
	};

	LightMapPrototype.attributeChangedCallback = function(attributeName,
			oldValue, newValue) {
		var self = this;
		switch (attributeName) {
		case 'center':
			self.setCenter(newValue);
			break;
		case 'zoom':
			self.setZoom(newValue);
			break;
		default:
			return false;
		}
		return true;
	};

	document.registerElement = document.registerElement || document.register;
	function init() {
		var LightMap = document.registerElement('light-map', {
			prototype : LightMapPrototype
		});
	}
	console.log(typeof cordova);
	if (typeof cordova != 'undefined') {
		document.addEventListener('deviceready', init, false); // 等待设备初始化完成
	} else {
		init();
	}

}();