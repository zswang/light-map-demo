地图轻组件示例
==============

## 使用步骤

* 确保 Android 环境已经安装
* 确保 Ant 环境已经安装
* 确保 NodeJS 环境已经安装
* 确保 Cordova 环境已经安装
* 添加 Cordova 项目 *light-map-demo*
  `cordova create light-map-demo`
* 下载示例并复制
  `git clone –bare https://github.com/zswang/light-map-demo.git temp`
  `yes|cp -r deomtemp/www light-map-demo/www`
* 进入工作目录
  `cd light-map-demo`
* 安装平台
  `cordova platform add android`
* 安装 Cordova 插件
  `cordova plugin add https://github.com/zswang/light-map.git`
* 预编译 Cordova 项目
  `cordova build`
* 配置地图开发密钥
  `<meta-data android:name="com.baidu.lbsapi.API_KEY" android:value="开发密钥" /> `
* Android 项目普通开发流程
