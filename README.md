地图轻组件示例
==============

## 使用步骤

确保 Android 环境已经安装

确保 Ant 环境已经安装

确保 NodeJS 环境已经安装

确保 Cordova 环境已经安装

添加 Cordova 项目 *light-map-demo*

```shell
cordova create light-map-demo
```

下载示例并复制

```shell
git clone –bare https://github.com/zswang/light-map-demo.git temp
yes|cp -r deomtemp/www light-map-demo/www
```

进入工作目录
```shell
cd light-map-demo
```

安装开发平台

```shell
cordova platform add android
```

安装地图 Cordova 插件

```shell
cordova plugin add https://github.com/zswang/light-map.git
```

预编译 Cordova 项目

```shell
cordova build
```

配置地图开发密钥

```xml
<meta-data android:name="com.baidu.lbsapi.API_KEY" android:value="开发密钥" />
```

Android 项目普通开发流程
