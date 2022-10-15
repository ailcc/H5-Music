# 宅音乐播放器 二次开发修订版
--------
宅音乐播放器-二次开发修订版，HTML5网页播放器，集成后台管理及API调用!
## 技术栈
- 后端：thinkphp 5.1
- 前端：layui
- 数据库：mysql

### 依赖
- composer
- php 5.6+
- mysql 5.5+

## 演示站
https://music.ailcc.com/  该网站将于近期下线 后期不做维护及功能更新

## 需要注意的地方
1. app/admin/user.php中 需要添加获取IP真实地址的key 否则无法获取真实的IP地址。
2. config/geetest.php中 需要添加极验的ID和Key 否则无法使用极验登陆验证。
3. config/database.php中 需要添加数据库的用户名、密码、名称，否则无法连接服务器。

## 安装
### 安装教程
1. 下载文件，上传至服务器，建议使用宝塔面板部署。
2. 添加网站，设置域名，运行目录修改为public 伪静态设置为thinkphp
3. 设置ssl
4. 添加数据库，导入 H5Sql.sql
5. 配置数据库链接用户名密码等信息。
6. 默认管理密码为admin/123456


### 步骤
安装php依赖包
```
composer install
```
配置数据库，配置链接数据库名以及用户名密码
````
/config/database.php
````
创建数据库
```
字符编码：utf8 -- UTF-8 Unicode
导入数据库脚本，脚本位置extend/database
```
### 伪静态配置
#### nginx
```
rewrite ^/player/css/player.css$ /css?id=$1;
location / {
	if (!-e $request_filename){
		rewrite  ^(.*)$  /index.php?s=$1  last;   break;
	}
}
```
#### apache
项目自带apache静态化无需配置
### 启动项目
- 添加public为web根目录
- 若为apache服务器则默认伪静态，nginx可自行配置伪静态