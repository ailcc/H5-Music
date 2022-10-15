-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: sql151604
-- ------------------------------------------------------
-- Server version	5.7.27-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) DEFAULT NULL,
  `value` mediumtext,
  `remark` varchar(100) DEFAULT '解释,备注' COMMENT '解释,备注',
  `type` varchar(20) DEFAULT 'site',
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (1,'songSheetName','播放器 - 未授权','未授权播放器名','auth',1),(2,'songNames','沛霖主页','未授权歌曲名','auth',1),(3,'albumNames','未授权','未授权专辑名','auth',1),(4,'artistNames','音乐播放器','未授权名字','auth',1),(5,'albumCovers','https://music.ailcc.com/music/err/err.png','未授权专辑图','auth',1),(6,'locations','https://music.ailcc.com/music/err/err.mp3','未授权音频','auth',1),(7,'lyric','https://music.ailcc.com/music/src/wu.lrc','未授权歌词','auth',1),(8,'greeting','播放器未授权 请授权后使用','未授权提示','auth',1),(9,'empty','true','是否允许为空','auth',1),(10,'overalldomain','ailcc.com','全局域名授权','auth',1),(11,'default','','解释,备注','site',1);
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invite`
--

DROP TABLE IF EXISTS `invite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invite` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `invite` text NOT NULL COMMENT '邀请码',
  `name` text COMMENT '邀请码创建的用户名称	',
  `user_id` text NOT NULL COMMENT '邀请码所属用户',
  `articlenum` text COMMENT '邀请码查询次数',
  `sort` text COMMENT '邀请码有效期',
  `status` tinyint(1) unsigned DEFAULT '0' COMMENT '0未使用   1使用',
  `tag` varchar(30) DEFAULT NULL,
  `last_login_time` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='新闻分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invite`
--

LOCK TABLES `invite` WRITE;
/*!40000 ALTER TABLE `invite` DISABLE KEYS */;
INSERT INTO `invite` VALUES (1,'0885a171b30143eb7a4202bcf8f24eb','0885a1aAb301433e','1',NULL,'2022-09-16 13:21:02',1,NULL,'0000-00-00 00:00:00'),(2,'0885a171b30123eb7a4202bcf8f24eb','wangyi123yao','1',NULL,'2022-09-16 13:21:02',1,NULL,'0000-00-00 00:00:00'),(3,'aazIZqGS7KtR2ynNYu','awer33ASD223','e8e60d9126a34076a435dc1ab6265b4a',NULL,'0',1,NULL,'2022-09-16 00:00:00'),(4,'4Ix4pJJTCQht5xcWYb','78741662','1',NULL,'0',1,NULL,'2022-09-16 00:00:00'),(5,'OFkhSxuiUrZM2VxkKR','OFkhSxuiUrZM2Vxk','1',NULL,'0',1,NULL,'2022-09-16 00:00:00'),(6,'DhbA9oZmt8Aaqz89Qd','DhbA9oZmt8Aaqz89','1',NULL,'0',1,NULL,'2022-09-16 00:00:00'),(7,'DGMnef60bF0NSbbNom','1234','1',NULL,'0',1,NULL,'2022-09-16 00:00:00'),(8,'CzMvzb9nhu2IjngcH6',NULL,'1',NULL,'0',0,NULL,'2022-09-16 13:21:02'),(9,'0fZtfbsE6t3BqI05gu',NULL,'1',NULL,'0',0,NULL,'2022-09-16 14:11:24'),(10,'Llj5MO30jhKmyrJtPH',NULL,'1',NULL,'0',0,NULL,'2022-09-16 14:11:42'),(11,'98Md223gqpyxrQApLO',NULL,'1',NULL,'0',0,NULL,'2022-09-16 14:11:52'),(12,'ZyMwvu9db7CYRIxBta',NULL,'1',NULL,'0',0,NULL,'2022-09-16 14:14:21'),(13,'bSmnLNITT0CB7sepkj',NULL,'1',NULL,'0',0,NULL,'2022-09-16 14:15:09'),(14,'10rKIc7ddkgflUoBXf',NULL,'1',NULL,'0',0,NULL,'2022-09-16 14:16:32');
/*!40000 ALTER TABLE `invite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `options` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) DEFAULT NULL,
  `value` mediumtext,
  `remark` varchar(100) DEFAULT '解释,备注' COMMENT '解释,备注',
  `type` varchar(20) DEFAULT 'ailcc',
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
INSERT INTO `options` VALUES (1,'ailcc_name','Html5 音乐播放器','网站名称','ailcc',1),(2,'ailcc_key','刘楚成,个人主页,沛霖,ailcc,音乐播放器,播放器,Html5,music,player,html5 music player','网站关键词','ailcc',1),(3,'ailcc_des','Html5 播放器|一款非常成熟的html5 页面在线播放器！','网站简介','ailcc',1),(4,'ailcc_url','https://music.ailcc.com','网站地址','ailcc',1),(5,'ailcc_img','https://music.ailcc.com/static/images/bg.jpg','网站背景','ailcc',1),(6,'ailcc_ico','','网站ICO','ailcc',1),(7,'ailcc_yqm','','注册邀请码','ailcc',1),(8,'ailcc_gaba','','公安备案','ailcc',1),(9,'ailcc_icp','','ICP备案号','ailcc',1),(10,'ailcc_qq_cookie','pgv_pvi=22038528; pgv_si=s3156287488; pgv_pvid=5535248600; yplayer_open=1; ts_last=y.qq.com/portal/player.html; ts_uid=4847550686; yq_index=0; qqmusic_fromtag=66; player_exist=1; ','解释,备注','ailcc',1);
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `id` varchar(32) NOT NULL,
  `user_id` varchar(32) DEFAULT NULL COMMENT '关联用户id',
  `name` varchar(30) DEFAULT NULL COMMENT '播放器名称',
  `site_name` varchar(30) DEFAULT NULL COMMENT '站点名称  用于播放器显示名称',
  `greeting` varchar(30) DEFAULT NULL COMMENT '欢迎语',
  `domain` text COMMENT '播放器授权域名',
  `player_color` varchar(99) DEFAULT '#009688' COMMENT '播放器颜色',
  `auto_player` int(1) DEFAULT '1' COMMENT '是否自动播放',
  `random_player` int(1) DEFAULT '0' COMMENT '随机播放 1:随机 0:顺序',
  `default_volume` int(3) DEFAULT '75' COMMENT '默认音量',
  `show_lrc` int(1) DEFAULT '1' COMMENT '歌词1:显示 0:不显示',
  `show_mobile` int(1) DEFAULT '1' COMMENT '手机版1:显示 0:不显示',
  `show_greeting` int(1) DEFAULT '1' COMMENT '欢迎语 1:显示 0:不显示',
  `default_album` int(3) DEFAULT '1' COMMENT '默认专辑',
  `background` int(1) DEFAULT '1' COMMENT '模糊背景是否开启',
  `show_msg` int(11) DEFAULT '0' COMMENT '是否允许桌面通知',
  `player_width` int(11) DEFAULT '-1' COMMENT '播放器宽度',
  `cover_width` int(11) DEFAULT '-1' COMMENT '封面图宽度',
  `show_notes` int(1) DEFAULT '0' COMMENT '显示音符：0不显示1显示',
  `auto_popup_player` int(11) DEFAULT '5' COMMENT '几秒后弹出播放器：-1不弹出 >0秒后弹出',
  `error` varchar(10) DEFAULT '1' COMMENT '失效歌曲 默认不显示',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES ('51e72c3fbed14c34ac9c1a63af944150','1','沛霖主页','沛霖主页','欢迎光临沛霖主页！',NULL,'#2d9a90',1,0,50,1,1,1,1,1,1,-1,-1,1,5,'1',NULL);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_song_sheet`
--

DROP TABLE IF EXISTS `player_song_sheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player_song_sheet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` varchar(32) DEFAULT NULL COMMENT '播放器id',
  `song_sheet_id` varchar(32) DEFAULT NULL COMMENT '歌单id',
  `taxis` int(3) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1321 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_song_sheet`
--

LOCK TABLES `player_song_sheet` WRITE;
/*!40000 ALTER TABLE `player_song_sheet` DISABLE KEYS */;
INSERT INTO `player_song_sheet` VALUES (1319,'51e72c3fbed14c34ac9c1a63af944150','5d20eec986fb4f5eaa51b4afb7741167',0),(1320,'51e72c3fbed14c34ac9c1a63af944150','f9edf93e625f4ecb8bc3b53599e7033b',1);
/*!40000 ALTER TABLE `player_song_sheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song`
--

DROP TABLE IF EXISTS `song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `song` (
  `id` varchar(32) NOT NULL,
  `song_id` varchar(32) DEFAULT NULL COMMENT '歌曲id',
  `song_sheet_id` varchar(32) DEFAULT NULL COMMENT '所属歌单',
  `name` varchar(100) DEFAULT NULL COMMENT '歌曲名称',
  `type` varchar(10) DEFAULT NULL COMMENT '歌曲类型',
  `album_name` varchar(100) DEFAULT NULL COMMENT '专辑名称',
  `artist_name` varchar(100) DEFAULT NULL COMMENT '歌手名称',
  `album_cover` varchar(100) DEFAULT NULL COMMENT '专辑图片',
  `location` varchar(9999) DEFAULT '0' COMMENT '歌曲地址',
  `lyric` varchar(100) DEFAULT NULL COMMENT '歌词地址',
  `taxis` int(3) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song`
--

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;
INSERT INTO `song` VALUES ('0145aac17d024bbfafc1274c32522391','108408','5d20eec986fb4f5eaa51b4afb7741167','当爱在靠近','wy','爱情论','刘若英','https://p1.music.126.net/a1uV59DV8OJzn4OVXRlLPw==/109951163071276550.jpg?param=300x300','1','',0),('02b97ce393fe473fb9bf9eadc58d3a00','32807083','5d20eec986fb4f5eaa51b4afb7741167','漂洋过海来看你','wy','热门华语266','刘若英','https://p1.music.126.net/RbJ9YEWzu4bcs0nar35A3w==/109951163926970215.jpg?param=300x300','1','',1),('06e0de4b995c4298','489332929','5d20eec986fb4f5eaa51b4afb7741167','文武英杰宣言','wy','More','Beyond','https://p1.music.126.net/X4azKsU46Nf-I3j0CDrtqQ==/18161733068421188.jpg?param=300x300','1','',8),('088cd1da69c444989dee8e92f1eec38e','254499','5d20eec986fb4f5eaa51b4afb7741167','为爱痴狂','wy','收获 新歌+精选','刘若英','https://p2.music.126.net/nSCOYgdN2yo1e-NdQWa4CQ==/18511377767232313.jpg?param=300x300','1','',4),('1544405125eb405d','489332921','5d20eec986fb4f5eaa51b4afb7741167','Long Way Without Friends','wy','More','Beyond','https://p1.music.126.net/X4azKsU46Nf-I3j0CDrtqQ==/18161733068421188.jpg?param=300x300','1','',3),('21cdc8a6a7db488594a4da75c8cdfb7b','254548','5d20eec986fb4f5eaa51b4afb7741167','成全','wy','年华','刘若英','https://p2.music.126.net/7O6b7GhKZhjPHkw5J3LF8w==/109951163351828303.jpg?param=300x300','1','',6),('32116c70083043d7b906330ac64b83f6','5237745','5d20eec986fb4f5eaa51b4afb7741167','一辈子的孤单','wy','一夜长大','刘若英','https://p2.music.126.net/UqspFYRpPxdxa2-tLPRfAA==/109951163447800775.jpg?param=300x300','1','',8),('5b3cb8f96bd6437db96f5666034c627e','254574','5d20eec986fb4f5eaa51b4afb7741167','后来','wy','我等你','刘若英','https://p2.music.126.net/eBF7bHnJYBUfOFrJ_7SUfw==/109951163351825356.jpg?param=300x300','1','',3),('b7bac29772f14d3b','1827012386','5d20eec986fb4f5eaa51b4afb7741167','The Way IS till LoveYou(抖音热搜版)','wy','神嗨旋律','糖爷','https://p2.music.126.net/K0pPJjc_jlCBujZHY2HUVQ==/109951165796633312.jpg?param=300x300','0','',0),('b8d3cae1b5df46dfa523f8ede0e50394','254589','5d20eec986fb4f5eaa51b4afb7741167','很爱很爱你','wy','很爱很爱你','刘若英','https://p2.music.126.net/9hMNsSmjGiXa1AYrwoSapQ==/109951163200283565.jpg?param=300x300','1','',7),('d1f57e41b96447a6b32fc556bd6e3a66','254460','5d20eec986fb4f5eaa51b4afb7741167','当爱在靠近','wy','Love And The City','刘若英','https://p2.music.126.net/GBvg52NpEcIPXjVHjpUBfA==/109951163069128145.jpg?param=300x300','1','',5),('f1df73b756f54ccfaf9c85f29ea64c65','001lUqtp25ooPM','5d20eec986fb4f5eaa51b4afb7741167','亲爱的路人','qq','亲爱的路人','刘若英','https://y.gtimg.cn/music/photo_new/T002R300x300M000003cp9dx3XB3ye.jpg','-1','',2);
/*!40000 ALTER TABLE `song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song_sheet`
--

DROP TABLE IF EXISTS `song_sheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `song_sheet` (
  `id` varchar(32) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `public` int(1) NOT NULL DEFAULT '0' COMMENT '1公 0私',
  `sheet_id` varchar(20) DEFAULT NULL,
  `user_id` varchar(32) DEFAULT NULL COMMENT '歌单所属用户',
  `name` varchar(30) DEFAULT NULL COMMENT '歌单名称',
  `author` varchar(30) DEFAULT NULL COMMENT '歌单作者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_sheet`
--

LOCK TABLES `song_sheet` WRITE;
/*!40000 ALTER TABLE `song_sheet` DISABLE KEYS */;
INSERT INTO `song_sheet` VALUES ('5d20eec986fb4f5eaa51b4afb7741167','sdtj',1,'','1','大爱奶茶','沛霖主页','2019-11-14 13:37:19'),('f9edf93e625f4ecb8bc3b53599e7033b','wygd',0,'625744730','1','网易云歌单','沛霖主页','2020-05-27 16:45:27');
/*!40000 ALTER TABLE `song_sheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` varchar(32) NOT NULL,
  `username` varchar(20) DEFAULT NULL COMMENT '用户账号',
  `password` varchar(32) DEFAULT NULL COMMENT '用户密码',
  `permissions` int(1) DEFAULT '1' COMMENT '权限 1:普通用户 0：管理员',
  `token` varchar(200) DEFAULT NULL,
  `qq` varchar(15) DEFAULT NULL COMMENT 'QQ号码',
  `email` varchar(30) DEFAULT NULL COMMENT '邮箱地址',
  `status` int(1) DEFAULT '1' COMMENT '状态 1:启用 0:禁用',
  `quota` int(5) NOT NULL DEFAULT '2' COMMENT '播放器配额',
  `times_log` datetime DEFAULT NULL,
  `create_ipv` varchar(32) DEFAULT NULL COMMENT '登陆时IP',
  `last_login_site` text COMMENT '登录时IP真实地址',
  `last_login_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上次登录时间',
  `create_ip` varchar(32) DEFAULT NULL COMMENT '创建时ip',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('0ed9fd35352a4b67af3c5f1849973d08','demo','711d3856a148f31e047c9fb66911fa8c',1,'f321a01c5be06791e15ace8f24f85c6ea','10001',NULL,0,5,'2022-01-10 11:05:08','223.167.205.110','中国上海市上海市浦东新区','2022-09-16 03:51:14','101.224.40.200','2019-09-19 16:48:03'),('1','admin','e10adc3949ba59abbe56e057f20f883e',0,'991d3256332563e8f2d637c23088888','66257875','admin@ailcc.com',1,7,'2099-01-01 01:01:01','223.166.207.212','中国上海市上海市浦东新区','2022-10-14 08:47:37','222.64.174.26','2018-08-30 09:50:10');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sql151604'
--

--
-- Dumping routines for database 'sql151604'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-14 17:11:55
