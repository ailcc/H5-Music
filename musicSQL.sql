-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2022-11-27 19:06:09
-- 服务器版本： 5.7.39-log
-- PHP 版本： 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `sql151604`
--

-- --------------------------------------------------------

--
-- 表的结构 `config`
--

CREATE TABLE `config` (
  `id` smallint(5) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `value` mediumtext,
  `remark` varchar(100) DEFAULT '解释,备注' COMMENT '解释,备注',
  `type` varchar(20) DEFAULT 'site',
  `status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `config`
--

INSERT INTO `config` (`id`, `code`, `value`, `remark`, `type`, `status`) VALUES
(1, 'songSheetName', '播放器 - 未授权', '未授权播放器名', 'auth', 1),
(2, 'songNames', '沛霖主页', '未授权歌曲名', 'auth', 1),
(3, 'albumNames', '未授权', '未授权专辑名', 'auth', 1),
(4, 'artistNames', '音乐播放器', '未授权名字', 'auth', 1),
(5, 'albumCovers', 'https://music.ailcc.com/music/err/err.png', '未授权专辑图', 'auth', 1),
(6, 'locations', 'https://music.ailcc.com/music/err/err.mp3', '未授权音频', 'auth', 1),
(7, 'lyric', 'https://music.ailcc.com/music/src/wu.lrc', '未授权歌词', 'auth', 1),
(8, 'greeting', '播放器未授权 请授权后使用', '未授权提示', 'auth', 1),
(9, 'empty', NULL, '是否允许为空', 'auth', 1),
(10, 'overalldomain', 'ailcc.com|yaode.xyz', '全局域名授权', 'auth', 1),
(11, 'default', '', '解释,备注', 'site', 1);

-- --------------------------------------------------------

--
-- 表的结构 `invite`
--

CREATE TABLE `invite` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `invite` text NOT NULL COMMENT '邀请码',
  `name` text COMMENT '邀请码创建的用户名称	',
  `user_id` text NOT NULL COMMENT '邀请码所属用户',
  `articlenum` text COMMENT '邀请码查询次数',
  `sort` text COMMENT '邀请码有效期',
  `status` tinyint(1) UNSIGNED DEFAULT '0' COMMENT '0未使用   1使用',
  `tag` varchar(30) DEFAULT NULL,
  `last_login_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='新闻分类表' ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `invite`
--

INSERT INTO `invite` (`id`, `invite`, `name`, `user_id`, `articlenum`, `sort`, `status`, `tag`, `last_login_time`) VALUES
(1, '0885a171b30143eb7a4202bcf8f24eb', '0885a1aAb301433e', '1', NULL, '2022-09-16 13:21:02', 1, NULL, '0000-00-00 00:00:00'),
(2, '0885a171b30123eb7a4202bcf8f24eb', 'wangyi123yao', '1', NULL, '2022-09-16 13:21:02', 1, NULL, '0000-00-00 00:00:00'),
(3, 'aazIZqGS7KtR2ynNYu', 'awer33ASD223', 'e8e60d9126a34076a435dc1ab6265b4a', NULL, '0', 1, NULL, '2022-09-16 00:00:00'),
(4, '4Ix4pJJTCQht5xcWYb', '78741662', '1', NULL, '0', 1, NULL, '2022-09-16 00:00:00'),
(5, 'OFkhSxuiUrZM2VxkKR', 'OFkhSxuiUrZM2Vxk', '1', NULL, '0', 1, NULL, '2022-09-16 00:00:00'),
(6, 'DhbA9oZmt8Aaqz89Qd', 'DhbA9oZmt8Aaqz89', '1', NULL, '0', 1, NULL, '2022-09-16 00:00:00'),
(7, 'DGMnef60bF0NSbbNom', '1234', '1', NULL, '0', 1, NULL, '2022-09-16 00:00:00'),
(8, 'CzMvzb9nhu2IjngcH6', NULL, '1', NULL, '0', 0, NULL, '2022-09-16 13:21:02'),
(9, '0fZtfbsE6t3BqI05gu', NULL, '1', NULL, '0', 0, NULL, '2022-09-16 14:11:24'),
(10, 'Llj5MO30jhKmyrJtPH', NULL, '1', NULL, '0', 0, NULL, '2022-09-16 14:11:42'),
(11, '98Md223gqpyxrQApLO', NULL, '1', NULL, '0', 0, NULL, '2022-09-16 14:11:52'),
(12, 'ZyMwvu9db7CYRIxBta', NULL, '1', NULL, '0', 0, NULL, '2022-09-16 14:14:21'),
(13, 'bSmnLNITT0CB7sepkj', NULL, '1', NULL, '0', 0, NULL, '2022-09-16 14:15:09'),
(14, '10rKIc7ddkgflUoBXf', NULL, '1', NULL, '0', 0, NULL, '2022-09-16 14:16:32');

-- --------------------------------------------------------

--
-- 表的结构 `options`
--

CREATE TABLE `options` (
  `id` smallint(5) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `value` mediumtext,
  `remark` varchar(100) DEFAULT '解释,备注' COMMENT '解释,备注',
  `type` varchar(20) DEFAULT 'ailcc',
  `status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `options`
--

INSERT INTO `options` (`id`, `code`, `value`, `remark`, `type`, `status`) VALUES
(1, 'ailcc_name', 'Html5 音乐播放器', '网站名称', 'ailcc', 1),
(2, 'ailcc_key', '刘楚成,个人主页,沛霖,ailcc,音乐播放器,播放器,Html5,music,player,html5 music player', '网站关键词', 'ailcc', 1),
(3, 'ailcc_des', 'Html5 播放器|一款非常成熟的html5 页面在线播放器！', '网站简介', 'ailcc', 1),
(4, 'ailcc_url', 'https://music.ailcc.com', '网站地址', 'ailcc', 1),
(5, 'ailcc_img', 'https://music.ailcc.com/static/images/bg.jpg', '网站背景', 'ailcc', 1),
(6, 'ailcc_ico', '', '网站ICO', 'ailcc', 1),
(7, 'ailcc_yqm', '', '注册邀请码', 'ailcc', 1),
(8, 'ailcc_gaba', '', '公安备案', 'ailcc', 1),
(9, 'ailcc_icp', '', 'ICP备案号', 'ailcc', 1),
(10, 'ailcc_qq_cookie', 'pgv_pvi=22038528; pgv_si=s3156287488; pgv_pvid=5535248600; yplayer_open=1; ts_last=y.qq.com/portal/player.html; ts_uid=4847550686; yq_index=0; qqmusic_fromtag=66; player_exist=1; ', '解释,备注', 'ailcc', 1);

-- --------------------------------------------------------

--
-- 表的结构 `player`
--

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
  `show_search` int(1) NOT NULL DEFAULT '1',
  `show_down` int(1) NOT NULL DEFAULT '1',
  `error` varchar(10) DEFAULT '1' COMMENT '失效歌曲 默认不显示',
  `create_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `player`
--

INSERT INTO `player` (`id`, `user_id`, `name`, `site_name`, `greeting`, `domain`, `player_color`, `auto_player`, `random_player`, `default_volume`, `show_lrc`, `show_mobile`, `show_greeting`, `default_album`, `background`, `show_msg`, `player_width`, `cover_width`, `show_notes`, `auto_popup_player`, `show_search`, `show_down`, `error`, `create_time`) VALUES
('51e72c3fbed14c34ac9c1a63af944150', '1', '沛霖主页', '沛霖主页', '欢迎光临沛霖主页！', NULL, '#2d9a90', 1, 0, 50, 1, 1, 1, 1, 1, 1, -1, -1, 1, 5, 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `player_song_sheet`
--

CREATE TABLE `player_song_sheet` (
  `id` int(11) NOT NULL,
  `player_id` varchar(32) DEFAULT NULL COMMENT '播放器id',
  `song_sheet_id` varchar(32) DEFAULT NULL COMMENT '歌单id',
  `taxis` int(3) DEFAULT NULL COMMENT '排序'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `player_song_sheet`
--

INSERT INTO `player_song_sheet` (`id`, `player_id`, `song_sheet_id`, `taxis`) VALUES
(1307, '6e7e596fe53340f3', '4c1cc5b825854dff', 0),
(1308, '50a5a464ac9e4d1c', '4c1cc5b825854dff', 0),
(1315, '8442c2ffa40e4bc7bbf4ee44d3ae85ea', '5d20eec986fb4f5eaa51b4afb7741167', 0),
(1316, '42bdeaae58834248', '42a3abc86b2c4879', 0),
(1317, '6b4ee054c9234a7f', 'c9d903f961d54ca0', 0),
(1332, '51e72c3fbed14c34ac9c1a63af944150', 'cc7e6bb7853a4001ac50bf137dcacf56', 0),
(1333, '51e72c3fbed14c34ac9c1a63af944150', '9cbfbc42a8a345178462926d2a584ae1', 1),
(1334, '51e72c3fbed14c34ac9c1a63af944150', '0885a171b301433eb7a4202bcf8f24eb', 2),
(1335, '51e72c3fbed14c34ac9c1a63af944150', 'f9edf93e625f4ecb8bc3b53599e7033b', 3);

-- --------------------------------------------------------

--
-- 表的结构 `song`
--

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
  `taxis` int(3) DEFAULT NULL COMMENT '排序'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `song`
--

INSERT INTO `song` (`id`, `song_id`, `song_sheet_id`, `name`, `type`, `album_name`, `artist_name`, `album_cover`, `location`, `lyric`, `taxis`) VALUES
('0251eef236c04f79', '003xl9d83fVzUJ', 'cc7e6bb7853a4001ac50bf137dcacf56', '你的酒馆对我打了烊', 'qq', '你的酒馆对我打了烊', '陈雪凝', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004NDHly42oXD2.jpg', '1', '', 15),
('05a7889b5d8249ec', '545947179', '9cbfbc42a8a345178462926d2a584ae1', 'Flames', 'wy', 'Flames', 'David Guetta,Sia', 'https://p1.music.126.net/jzZQFQdFrb89H22tUA1Qlg==/109951163369745204.jpg?param=300x300', '1', '', 10),
('06e0de4b995c4298', '489332929', 'f9edf93e625f4ecb8bc3b53599e7033b', '文武英杰宣言', 'wy', 'More', 'Beyond', 'https://p1.music.126.net/X4azKsU46Nf-I3j0CDrtqQ==/18161733068421188.jpg?param=300x300', '1', '', 8),
('08c208b2a44740e6', '1336856777', 'cc7e6bb7853a4001ac50bf137dcacf56', '我曾', 'wy', '我曾', '隔壁老樊', 'https://p1.music.126.net/gNbAlXamNjhR2j3aOukNhg==/109951164232796511.jpg?param=300x300', '1', '', 9),
('0bec67b820b746a1', '000lLaWX2QNE9Q', '9cbfbc42a8a345178462926d2a584ae1', 'Reality', 'qq', 'Less Is More', 'Lost Frequencies,Janieck Devy', 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000034eqW23UOShL.jpg', '1', '', 1),
('0ca230d4635a4cb2', '003uQ83U33Afwt', '0885a171b301433eb7a4202bcf8f24eb', '大眠(DJ) (改编版Cover: 王心凌)', 'qq', 'dy最火歌曲', '软', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002qSjFh44w1F3.jpg', '1', '', 8),
('0cd0910de16e4f59', '1807381939', '4c1cc5b825854dff', '星星在唱歌', 'wy', '星星在唱歌（网易云音乐2020年度听歌报告主题曲）', '司南', 'https://p1.music.126.net/sKikAjTxCmWnWTKoul6Sqg==/109951165574428569.jpg?param=300x300', '1', '', 3),
('0e4a2ec30820429e', '1331192365', '9cbfbc42a8a345178462926d2a584ae1', 'Wait Another Day', 'wy', 'Wait Another Day', 'Mike Williams,Mesto', 'https://p1.music.126.net/fWupqMiZwFhGcLzHgqAvZg==/109951163733625365.jpg?param=300x300', '1', '', 21),
('12efa4bcc46e4bc0', '1382359170', '9cbfbc42a8a345178462926d2a584ae1', 'Torches', 'wy', 'Torches', 'Aimer', 'https://p2.music.126.net/fRrWn8k1nt-lKTJrW-j7SA==/109951164287225139.jpg?param=300x300', '1', '', 8),
('13090252e3a0466a', '000qM5m83dNbHd', '0885a171b301433eb7a4202bcf8f24eb', '根本你不懂得爱我 (DJ版)', 'qq', 'Kok Aspan', '耀仔', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000xB7AR1Dq6bl.jpg', '1', '', 6),
('1544405125eb405d', '489332921', 'f9edf93e625f4ecb8bc3b53599e7033b', 'Long Way Without Friends', 'wy', 'More', 'Beyond', 'https://p1.music.126.net/X4azKsU46Nf-I3j0CDrtqQ==/18161733068421188.jpg?param=300x300', '1', '', 3),
('1548eb6e377941f8', '493394429', '9cbfbc42a8a345178462926d2a584ae1', 'Home', 'wy', 'Futuresque - The Future House Collection', 'ThimLife,Bibiane Z', 'https://p2.music.126.net/HTm72bS6Bt1WK8bgHTQNPw==/17950626835333921.jpg?param=300x300', '1', '', 17),
('1c425536f59a41df', '489332925', 'f9edf93e625f4ecb8bc3b53599e7033b', '灰色的心', 'wy', 'More', 'Beyond', 'https://p1.music.126.net/X4azKsU46Nf-I3j0CDrtqQ==/18161733068421188.jpg?param=300x300', '1', '', 6),
('20d81d7a1a384eb2', '354799', 'cc7e6bb7853a4001ac50bf137dcacf56', '123', 'wy', '如果未来', 'Fusion乐团,张震岳', 'https://p1.music.126.net/mmxNijLGL8v3TK8XDRW_dg==/38482906984174.jpg?param=300x300', '1', '', 10),
('21d4a3f2a2d74727', '489332922', 'f9edf93e625f4ecb8bc3b53599e7033b', '旧日的足迹 (全长版本)', 'wy', 'More', 'Beyond', 'https://p1.music.126.net/X4azKsU46Nf-I3j0CDrtqQ==/18161733068421188.jpg?param=300x300', '1', '', 4),
('23de0c77f8b8411f', '406072775', '9cbfbc42a8a345178462926d2a584ae1', 'Move Up (Lost Gravity)', 'wy', 'Move Up (Lost Gravity)', 'Mr. Polska', 'https://p2.music.126.net/d_SnAKbhTnN0nSuwykq6xw==/109951163400223028.jpg?param=300x300', '1', '', 16),
('25b192896d45433d', '447281026', '9cbfbc42a8a345178462926d2a584ae1', 'Nevada', 'wy', 'Monstercat - Best of 2016', 'Vicetone,Cozi Zuehlsdorff', 'https://p1.music.126.net/ifxF9yxIzU1-lZAm9GscWg==/109951163311434257.jpg?param=300x300', '1', '', 7),
('2c04e41769f04556', '403711269', '9cbfbc42a8a345178462926d2a584ae1', 'Cheap Thrills', 'wy', 'Cheap Thrills (feat. Sean Paul)', 'Sia,Sean Paul', 'https://p1.music.126.net/DZDbe0oT0Nkk0l5ko6HR9w==/3408486051720554.jpg?param=300x300', '1', '', 23),
('2d4ef2c35ad7412b', '0021rBlZ1gQiLy', 'cc7e6bb7853a4001ac50bf137dcacf56', '绿色', 'qq', '绿色', '陈雪凝', 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000010UePb4dyfoi.jpg', '1', '', 4),
('3033c8c636604321', '1444849750', 'cc7e6bb7853a4001ac50bf137dcacf56', 'Fly Away With Me', 'wy', 'Fly Away With Me', 'Anders Sohn', 'https://p1.music.126.net/CuVH96zHUKZHj1wV4oEkcg==/109951164952584028.jpg?param=300x300', '1', '', 5),
('31a6c00874334ffa', '346729', 'f9edf93e625f4ecb8bc3b53599e7033b', 'Fading Away(Demo)', 'wy', '真的Beyond Ⅱ', 'Beyond', 'https://p1.music.126.net/8cZdmv0W4wKGtE8hViS-aA==/73667279073747.jpg?param=300x300', '1', '', 1),
('3333b40c06544fca', '003WAFcF3CK7Ml', '0885a171b301433eb7a4202bcf8f24eb', '她的微笑', 'qq', '野性直男', '精彩樊兵', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003zdWT9315Xcz.jpg', '1', '', 7),
('359415a3e41c4f2e', '515453363', '9cbfbc42a8a345178462926d2a584ae1', 'All Falls Down', 'wy', 'All Falls Down', 'Alan Walker,Noah Cyrus,Digital Farm Animals', 'https://p1.music.126.net/rTb28CZeLWxIRuSlJWkPLQ==/18850027346628137.jpg?param=300x300', '1', '', 25),
('3b4a501e1f03404e', '001LrM7Q2mM7ZO', 'cc7e6bb7853a4001ac50bf137dcacf56', '风的季节', 'qq', 'Canto', 'Soler', 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000030CEZk2l4ToN.jpg', '1', '', 16),
('43c8f0de37b84aed', '002gtYtr3EMLGm', 'cc7e6bb7853a4001ac50bf137dcacf56', '伪装', 'qq', '伪装', '大壮', 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000027MdnT1xXRwE.jpg', '1', '', 18),
('45602f04791d483f', '000SjcnL120PEy', '0885a171b301433eb7a4202bcf8f24eb', '爱自己更深remix', 'qq', '爱自己更深remix', 'Dior大颖', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001vDCcp0y25NX.jpg', '1', '', 4),
('47f1fb5c64744839', '1811921555', '4c1cc5b825854dff', '星辰大海', 'wy', '星辰大海', '黄霄雲', 'https://p1.music.126.net/0mRcGJSq93o83Q32i7EuIw==/109951167277470394.jpg?param=300x300', '0', '', 0),
('494e2f3355b44de7', '001IpbDW34m1Gy', 'cc7e6bb7853a4001ac50bf137dcacf56', '她说', 'qq', '她说 概念自选辑', '林俊杰', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000TuW8h0AH2n4.jpg', '0', NULL, 0),
('4a0de5d39f5745c5', '30987703', '9cbfbc42a8a345178462926d2a584ae1', 'Frontier', 'wy', 'Level Up', 'Doctor Vox', 'https://p1.music.126.net/mmS-tTW7hV_72ukeeuVefw==/2882919490208929.jpg?param=300x300', '1', '', 9),
('4a50b92786b34cdb', '1369601580', 'cc7e6bb7853a4001ac50bf137dcacf56', '祝你爱我到天荒地老', 'wy', '祝你爱我到天荒地老', '颜人中,VaVa毛衍七', 'https://p1.music.126.net/HUndbFyGT5_Eiei0pbiK-w==/109951164124732670.jpg?param=300x300', '1', '', 7),
('4f4783ddbccc4950', '472219715', '9cbfbc42a8a345178462926d2a584ae1', 'Superstar (Dirty Rush & Gregor Es Remix)', 'wy', 'Superstar (Remixes)', 'Mandee,Dirty Rush & Gregor Es,Maria Mathea', 'https://p1.music.126.net/OF-ZVE_oPqzC_92-Nv3I3Q==/18846728811717413.jpg?param=300x300', '1', '', 13),
('4f61a3d3446f4d4b', '1981300888', '4c1cc5b825854dff', '妈妈的话', 'wy', 'v', '命劫', 'https://p1.music.126.net/-nQ5BZ3nT82a-A22u151hg==/109951167128468982.jpg?param=300x300', '0', '', 12),
('57e14910afc94293', '1325896666', '9cbfbc42a8a345178462926d2a584ae1', 'Fiery Sky', 'wy', 'Fiery Sky', 'Jarico', 'https://p2.music.126.net/YTgFICsNnx6pneo74KgkPg==/109951163683611891.jpg?param=300x300', '1', '', 18),
('5ac45b1a71934c5d', '345936', 'f9edf93e625f4ecb8bc3b53599e7033b', '离开我吧', 'wy', '黄贯中 x 黄家强 x Beyond - Rock & Roll Collection', '黄贯中', 'https://p1.music.126.net/sOo0ZFbNlbYlZc2aRIuCcA==/109951162789726.jpg?param=300x300', '1', '', 0),
('5dbe0afbde714d83', '004AxZur0wQjFR', 'cc7e6bb7853a4001ac50bf137dcacf56', '可惜没如果', 'qq', '新地球', '林俊杰', 'https://y.qq.com/music/photo_new/T002R300x300M0000033R2xQ2I0Uyf_2.jpg?max_age=2592000', '', '', 3),
('5f0f4cbb94fd4568', '1952086749', '4c1cc5b825854dff', '感谢你曾经来过', 'wy', '感谢你曾经来过', '张九离', 'https://p1.music.126.net/TLHOxeRrdLFk2isGIiFwnw==/109951165806292720.jpg?param=300x300', '1', '', 7),
('607269fa9a754364', '1394618776', 'cc7e6bb7853a4001ac50bf137dcacf56', '孤芳自赏 (原版)', 'wy', '孤芳不自赏', '刘雨Key', 'https://p1.music.126.net/WCNaejSRRaMHkB2XFvLuKQ==/109951164401848344.jpg?param=300x300', '1', '', 6),
('63a708e82cca4040', '000DKlIm46NhD9', 'cc7e6bb7853a4001ac50bf137dcacf56', '广东爱情故事', 'qq', '广东爱情故事', '广东雨神', 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000002BuyF2RXR5U.jpg', '1', '', 19),
('669f1c0d1cad4ef7', '28285910', '4c1cc5b825854dff', '岁月神偷', 'wy', '完美世界', '金玟岐', 'https://p1.music.126.net/gWNsPDBbQCQXVNvMdnAH8A==/18815942487303143.jpg?param=300x300', '0', '', 2),
('6c7c8e17a74b49f0', '515453363', '9cbfbc42a8a345178462926d2a584ae1', 'All Falls Down', 'wy', 'All Falls Down', 'Alan Walker,Noah Cyrus,Digital Farm Animals', 'https://p1.music.126.net/rTb28CZeLWxIRuSlJWkPLQ==/18850027346628137.jpg?param=300x300', '1', '', 4),
('6e345f2c156d435e', '000BhSTw1ye9tl', '9cbfbc42a8a345178462926d2a584ae1', 'Believer (翻唱)', 'qq', '歌曲合辑', 'One Voice Children\'s Choir', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001ZaCQY2OxVMg.jpg', '1', '', 3),
('71f521676f4e434c', '492145159', '9cbfbc42a8a345178462926d2a584ae1', 'Superstar', 'wy', 'Superstar', 'Beatrich', 'https://p2.music.126.net/kM-9kKS4YHdO3Vf4rWKS1w==/18195817928623495.jpg?param=300x300', '1', '', 11),
('72274dfa6cda4ac5', '1596504795016', '9cbfbc42a8a345178462926d2a584ae1', 'honey take my hand', 'local', 'Rose In The Garden', 'Cody Francis', 'https://music.ailcc.com/music/img/honey take my hand.jpg', 'https://music.ailcc.com/music/mp3/honey take my hand.mp3', 'https://music.ailcc.com/music/src/honey take my hand.lrc', 0),
('780a5b4576be4659', '003Qtssx4eWdIw', '0885a171b301433eb7a4202bcf8f24eb', '怎么做怎么过怎么活 (DJ.House咚鼓版)', 'qq', '怎么做怎么过怎么活', '黄静美', 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000045jcPa1KIfYD.jpg', '1', '', 5),
('7a08e6caac2c44ee', '489332920', 'f9edf93e625f4ecb8bc3b53599e7033b', '永远等待 (全长版本)', 'wy', 'More', 'Beyond', 'https://p1.music.126.net/X4azKsU46Nf-I3j0CDrtqQ==/18161733068421188.jpg?param=300x300', '1', '', 2),
('7a7fe2ed5d5f42a7', '1966126092', '4c1cc5b825854dff', '大海（抖音热播）', 'wy', '不要留下我', '梦毅学长', 'https://p1.music.126.net/oYSBwKwjuETTZvV70hcnnQ==/109951167304214154.jpg?param=300x300', '1', '', 9),
('7d2362c2e36b47e4', 'B51D760C5D4FD0CE77BD7B58A8804D41', '4c1cc5b825854dff', '等雾散去', 'kg', '等雾散去', '覆予', 'https://p3fx.kgimg.com//stdmusic/150/20210203/20210203154203564610.jpg', '1', '', 4),
('7d8899c742584826', '445665094', '4c1cc5b825854dff', '过客', 'wy', '过客', '周思涵', 'https://p2.music.126.net/ai-tIcR1c69_tXCoDy8hyA==/18770862510931326.jpg?param=300x300', '1', '', 6),
('7d8ffdddaa08488b', '1444849750', '9cbfbc42a8a345178462926d2a584ae1', 'Fly Away With Me', 'wy', 'Fly Away With Me', 'Anders Sohn', 'https://p1.music.126.net/CuVH96zHUKZHj1wV4oEkcg==/109951164952584028.jpg?param=300x300', '1', '', 6),
('81e5d3e595b64f48', '1363948882', 'cc7e6bb7853a4001ac50bf137dcacf56', '世间美好与你环环相扣', 'wy', '听闻余生', '柏松', 'https://p2.music.126.net/DK1_4sP_339o5rowMdPXdw==/109951164071024476.jpg?param=300x300', '1', '', 8),
('840bc097b9bd4c80', '0049FHAV06nSRN', 'cc7e6bb7853a4001ac50bf137dcacf56', '讲不出再见', 'qq', '梦幻的笑容', '谭咏麟', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003vT1FQ0TOj1T.jpg', '1', '', 11),
('8877ab3dffd446bf', '004AeIvh4ML0Bz', 'cc7e6bb7853a4001ac50bf137dcacf56', '需要人陪', 'qq', '十八般武艺', '王力宏', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002iWU6B2ZvA8V.jpg', '1', '', 12),
('8a69c8c374c0423c', '1329903751', '9cbfbc42a8a345178462926d2a584ae1', '六亲不认的步伐', 'wy', '六亲不认的步伐2', '李寒', 'https://p2.music.126.net/5ofz5eHC76k9YZ9xCY0X4g==/109951163696766997.jpg?param=300x300', '1', '', 24),
('8a98e9e7eb5b44c5', '1838970399', '4c1cc5b825854dff', '记忆停留', 'wy', '记忆停留', '篮心羽', 'https://p1.music.126.net/LwHZ5Gq6_aao8QGDKd__4A==/109951165909568882.jpg?param=300x300', '1', '', 5),
('92abd4e73d9a4b87', '1500569811', '4c1cc5b825854dff', '阿拉斯加海湾', 'wy', '阿拉斯加海湾', '蓝心羽', 'https://p1.music.126.net/CbWwREaA22LmAv1oOtJt2w==/109951165518862422.jpg?param=300x300', '1', '', 10),
('9a394691e91645b2', '401249910', '9cbfbc42a8a345178462926d2a584ae1', 'We Don\'t Talk Anymore', 'wy', 'Nine Track Mind', 'Charlie Puth,Selena Gomez', 'https://p2.music.126.net/OVHar05vedbWFEWHuArbGA==/3295236348738229.jpg?param=300x300', '1', '', 19),
('9b73080114264e43', '515269424', '9cbfbc42a8a345178462926d2a584ae1', 'Wolves', 'wy', 'Wolves', 'Selena Gomez,Marshmello', 'https://p1.music.126.net/-nQ2E-8ZjuwGtMipBTYzBw==/17902248323721194.jpg?param=300x300', '1', '', 12),
('9e6df002cff04bcc', '427142481', '9cbfbc42a8a345178462926d2a584ae1', 'Clsr (Aash Mehta Flip)', 'wy', 'Clsr (Aash Mehta Flip)', 'The Chainsmokers,Aash Mehta,Halsey', 'https://p1.music.126.net/G55kQ5H7MQValAuI1_etcg==/3437073357923134.jpg?param=300x300', '1', '', 20),
('a0169df56ccc41ba', '001PgQMX0ksuZl', '0885a171b301433eb7a4202bcf8f24eb', '我热情如火，你冰冻成河 (DJheap九天版)', 'qq', '我热情如火，你冰冻成河', '黄静美', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001h3dz93buWXN.jpg', '1', '', 1),
('a4e7c7cf928b4b5f', '28481189', '9cbfbc42a8a345178462926d2a584ae1', 'Monsters', 'wy', 'Monsters', 'Katie Sky', 'https://p2.music.126.net/YPh291Jw4Lzy7x1iT_Aw5A==/109951163510035145.jpg?param=300x300', '1', '', 22),
('a62c9871fd9b412c', '004PQlS20Nf04H', '0885a171b301433eb7a4202bcf8f24eb', '你的答案 (DJ何鹏版)', 'qq', '你的答案', '阿冗', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000D5qVb3bLw2I.jpg', '1', '', 3),
('a9f4dabe0af84b61', '000JW5rA1UujjX', 'cc7e6bb7853a4001ac50bf137dcacf56', '胆小鬼', 'qq', '梁咏琪 同名专辑', '梁咏琪', 'https://y.gtimg.cn/music/photo_new/T002R300x300M00000272lB30lRrSJ.jpg', '1', '', 17),
('afb686a3c58249a1', '489332923', 'f9edf93e625f4ecb8bc3b53599e7033b', '昔日舞曲 (首版)', 'wy', 'More', 'Beyond', 'https://p1.music.126.net/X4azKsU46Nf-I3j0CDrtqQ==/18161733068421188.jpg?param=300x300', '1', '', 5),
('b67b1cf8e9a64f3f', '400876320', 'fdb5519bc1c04976', 'Unstoppable', 'wy', 'This Is Acting', 'Sia', 'https://p2.music.126.net/zmDE8IMf0QKDLVQc1xh4RA==/109951165973312283.jpg?param=300x300', '0', '', 0),
('b7bac29772f14d3b', '1827012386', 'c9d903f961d54ca0', 'The Way IS till LoveYou(抖音热搜版)', 'wy', '神嗨旋律', '糖爷', 'https://p2.music.126.net/K0pPJjc_jlCBujZHY2HUVQ==/109951165796633312.jpg?param=300x300', '0', '', 0),
('c7003b4f0fc34e19', '002OuxeC0KIS1S', '0885a171b301433eb7a4202bcf8f24eb', '上上之策 ( DJ Ab Remix)', 'qq', '上上之策', '秦博', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003w7ame4WMw3Y.jpg', '1', '', 0),
('c7039efea21b4d50', '002afwcR2qzs3y', 'cc7e6bb7853a4001ac50bf137dcacf56', '勉为其难', 'qq', '勉为其难', '王冕', 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000048Pthf2KOhgc.jpg', '1', '', 14),
('ca14dad54d884a41', '29009655', '9cbfbc42a8a345178462926d2a584ae1', 'East of Eden', 'wy', 'East of Eden', 'Zella Day', 'https://p1.music.126.net/orDs-AZ0jJjB06uoP0pdMw==/6667438510952720.jpg?param=300x300', '1', '', 14),
('d5ddf037479d45b8', '000BmkNh3uvtyV', 'cc7e6bb7853a4001ac50bf137dcacf56', '讲真的', 'qq', '讲真的', '曾惜', 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000010Lyq627ycJQ.jpg', '1', '', 21),
('d85f0ddee5644c63', '1966155051', '4c1cc5b825854dff', '遗失的心跳', 'wy', '遗失的心跳', '糯米Nomi', 'https://p2.music.126.net/zCzWab80KDVzgByRsSNY6Q==/109951167703996704.jpg?param=300x300', '1', '', 1),
('e06801233b4b4300', '002CxSLT41D5tD', 'cc7e6bb7853a4001ac50bf137dcacf56', '修炼爱情', 'qq', '因你 而在', '林俊杰', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001gqOnU3DTg2S.jpg', '0', NULL, 2),
('e7d93fe6c9174f89', '531295576', '4c1cc5b825854dff', '最美的期待', 'wy', '最美的期待', '周笔畅', 'https://p1.music.126.net/mwCUI0iL3xEC2a4WVICHlA==/109951163115369030.jpg?param=300x300', '1', '', 8),
('eb3f4a34c0274d70', '493735012', '4c1cc5b825854dff', '无人之岛', 'wy', '没有发生的爱情', '任然', 'https://p1.music.126.net/mIUtHBPTJ52H78_FhHzcWg==/19188676928210304.jpg?param=300x300', '1', '', 11),
('eb906a25239543a3', '002OEJhS3HevcL', '9cbfbc42a8a345178462926d2a584ae1', 'Dancing With Your Ghost', 'qq', 'Dancing With Your Ghost', 'Sasha Sloan', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002G0MjC1C1DzQ.jpg', '1', '', 2),
('f34c72cc93194699', '1441097233', '9cbfbc42a8a345178462926d2a584ae1', 'Salt (Syn Cole Remix)', 'wy', 'Salt (The Remixes)', 'Ava Max,Syn Cole', 'https://p1.music.126.net/dntPpej_HoH6CyAogRnbew==/109951164911660483.jpg?param=300x300', '-1', '', 5),
('f76220ad629746cc', '004TXEXY2G2c7C', 'cc7e6bb7853a4001ac50bf137dcacf56', '江南', 'qq', '第二天堂', '林俊杰', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000y5gq7449K9I.jpg', '0', NULL, 1),
('f7e5f05666ac4dda', '002GD4Pv2ynFBm', '0885a171b301433eb7a4202bcf8f24eb', '爱不得忘不舍 (DJ大禹版)', 'qq', '爱不得忘不舍', '白小白', 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000008leq12aiwhc.jpg', '1', '', 2),
('f84fc900beb34ab0', '0033N6Jr4DvOl9', 'cc7e6bb7853a4001ac50bf137dcacf56', '不再犹豫', 'qq', '犹豫', 'BEYOND', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001Gikfw1MiLRm.jpg', '1', '', 13),
('f89bc806df164180', '489332928', 'f9edf93e625f4ecb8bc3b53599e7033b', '勇闯新世界 (电台节目宣传版本）', 'wy', 'More', 'Beyond', 'https://p1.music.126.net/X4azKsU46Nf-I3j0CDrtqQ==/18161733068421188.jpg?param=300x300', '1', '', 7),
('fd2fb198be7c448b', '002NwUd73d9ONO', 'cc7e6bb7853a4001ac50bf137dcacf56', '庸人自扰', 'qq', '庸人自扰', '王理文', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003mlbxl4FXWzN.jpg', '1', '', 20),
('fe329a15014e4484', '500410102', '9cbfbc42a8a345178462926d2a584ae1', 'Run Free (feat. IVIE)', 'wy', 'Run Free (feat. IVIE)', 'Deep Chills,IVIE', 'https://p1.music.126.net/jMnLWocFxdIk4N2gugEYTg==/109951163007824283.jpg?param=300x300', '1', '', 15);

-- --------------------------------------------------------

--
-- 表的结构 `song_sheet`
--

CREATE TABLE `song_sheet` (
  `id` varchar(32) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `public` int(1) NOT NULL DEFAULT '0' COMMENT '1公 0私',
  `sheet_id` varchar(20) DEFAULT NULL,
  `user_id` varchar(32) DEFAULT NULL COMMENT '歌单所属用户',
  `name` varchar(30) DEFAULT NULL COMMENT '歌单名称',
  `author` varchar(30) DEFAULT NULL COMMENT '歌单作者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `song_sheet`
--

INSERT INTO `song_sheet` (`id`, `type`, `public`, `sheet_id`, `user_id`, `name`, `author`, `create_time`) VALUES
('0885a171b301433eb7a4202bcf8f24eb', 'sdtj', 1, '', '1', '自用车载DJ - 陆续添加', 'admin', '2020-04-20 04:25:40'),
('9cbfbc42a8a345178462926d2a584ae1', 'sdtj', 1, '', '1', '英文歌单', '沛霖主页', '2019-11-14 13:37:08'),
('cc7e6bb7853a4001ac50bf137dcacf56', 'sdtj', 0, '', '1', '站长推荐', '沛霖主页', '2022-10-28 11:34:16'),
('f9edf93e625f4ecb8bc3b53599e7033b', 'wygd', 0, '625744730', '1', '网易云歌单', '沛霖主页', '2020-05-27 16:45:27');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

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
  `create_time` datetime DEFAULT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `permissions`, `token`, `qq`, `email`, `status`, `quota`, `times_log`, `create_ipv`, `last_login_site`, `last_login_time`, `create_ip`, `create_time`) VALUES
('0', 'administrator', 'e4eb10702b963e789526d8fea3d302d5', 1, 'b029913ce4694c273084c802edb73d2e', '66257980', NULL, 0, 2, '2022-01-10 11:05:08', NULL, NULL, NULL, '227.151.111.1', NULL),
('0ed9fd35352a4b67af3c5f1849973d08', 'demo', '711d3856a148f31e047c9fb66911fa8c', 1, 'f321a01c5be06791e15ace8f24f85c6ea', '10001', NULL, 0, 5, '2022-01-10 11:05:08', '223.167.205.110', '中国上海市上海市浦东新区', '2022-09-16 03:51:14', '101.224.40.200', '2019-09-19 16:48:03'),
('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 0, '991d3256332563e8f2d637c23088888', '66257875', 'admin@ailcc.com', 1, 7, '2099-01-01 01:01:01', '223.167.120.64', '中国上海市上海市松江区', '2022-11-27 11:05:46', '222.64.174.26', '2018-08-30 09:50:10'),
('11893fe851234c33b3016ab3d6f38a42', '332101017', '84ace58801f64b4f0648d7fb28d08a95', 1, '33e0b362ca45d52a7e521434fbdd41be', '332101017', NULL, 0, 2, '2022-01-10 11:05:08', NULL, NULL, '2020-01-01 04:47:15', '25.168.101.77', '2020-01-01 12:47:15'),
('168e205c138d408c9d0f1eecb0bb679d', '4VTu3oofYW1', '83b3e900b0cb4bf2262faa7979dc5004', 1, '5336305abefd9c89985b5735ae3ccd37', '23412312', NULL, 0, 2, '2022-01-10 11:05:08', NULL, NULL, '2020-01-01 04:41:48', '25.107.1.22', '2020-01-01 12:41:48'),
('2099ec02511a4d558d02e7f336dd911d', 'dome', '711d3856a148f31e047c9fb66911fa8c', 1, '010e26c630fed4da0b9c8aadfb3ac951', '33751231', NULL, 0, 2, '2023-01-10 11:05:08', NULL, NULL, '2020-01-01 04:47:40', '197.101.71.7', '2020-01-01 12:47:40'),
('29c4511908674b95a054f703a2cd984f', '7591833', 'e10adc3949ba59abbe56e057f20f883e', 1, '991d0879c38f589fa19964023f27f399', '7591833', NULL, 0, 2, '2022-01-10 11:05:08', '183.197.79.31', '中国河北省邯郸市', '2020-03-10 10:05:15', '101.88.241.170', '2019-11-14 20:10:18'),
('3f562856bcf34c8c825b8266932514c2', '1003622854', '711d3856a148f31e047c9fb66911fa8c', 1, '9d2b1cff63b0ce472a081c02fb7ae07a', '1003622854', NULL, 0, 2, '2022-01-10 11:05:08', '101.88.208.169', '中国湖南省常德市汉寿县', '2019-10-16 15:07:20', '223.150.2.166', '2019-09-06 23:07:14'),
('423617dc88ca4035b4af814135c8eeb4', 'yangxin', '711d3856a148f31e047c9fb66911fa8c', 1, '369d9c24414bce1e52727cb96bc9360c', '1019709947', NULL, 0, 2, '2022-01-10 11:05:08', '47.98.215.250', '中国浙江省杭州市', '2019-10-16 14:56:59', '47.98.215.250', '2019-09-16 22:56:50'),
('65f8780b2a12429f9dddea52301de062', 'qq1003611278', '84ace58801f64b4f0648d7fb28d08a95', 1, '5bfdc76f493c2d9724861e0616968849', '1003611278', NULL, 0, 2, '2022-01-10 11:05:08', NULL, NULL, '2020-01-01 04:46:19', '47.99.215.250', '2020-01-01 12:46:19'),
('664d2dd389914a31a212fa55177c6a4f', '1024435333', '711d3856a148f31e047c9fb66911fa8c', 1, 'aa954145dea81e09219a6f6d00f3714b', '1024435333', NULL, 0, 2, '2022-01-10 11:05:08', '47.99.215.250', '中国浙江省杭州市', '2019-09-27 06:55:20', '101.224.40.200', '2019-09-19 16:25:52'),
('6c97df7357dc40a19e85f975cfd0bacd', 'xinjin', '84ace58801f64b4f0648d7fb28d08a95', 1, '8c861fd14616cf7684176311b44e3ad1', '1657186134', NULL, 0, 2, '2022-01-10 11:05:08', NULL, NULL, '2020-01-01 04:46:58', '45.99.175.1', '2020-01-01 12:46:58'),
('71b8c25574a9417e', '15928996369', 'ec21e604f4ceed4b3a13029534100115', 1, 'cdc8531e8130fee427e12f86256ff567', '3186506437', NULL, 0, 2, '2022-09-22 17:05:08', '101.35.244.3', '中国上海市上海市', '2022-09-16 01:14:10', '101.35.244.3', '2022-09-15 17:05:08'),
('7945c57bbcb8402988300930b5a1819e', '4VTu3oofYW', '07713f194ff669bc7268d5cd0c4b13fd', 1, 'a28ab472d242f88733f37f18db4aeae3', '1231231231', NULL, 0, 2, '2022-01-10 11:05:08', NULL, NULL, '2019-11-15 02:43:11', '116.227.97.244', '2019-11-15 10:43:11'),
('7ff1b4700cb4479f', 'OFkhSxuiUrZM2Vxk', '945dc914c1d72637ab8b6d4d7fa309ab', 1, '0a0334093be7f77f39479e904944182d', '1231231', NULL, 0, 2, '2022-09-26 10:09:27', NULL, NULL, '2022-09-19 02:09:27', '223.166.207.212', '2022-09-19 10:09:27'),
('98c22d32552f4563909287064ec41e7f', 'kingtrader.cn', '84ace58801f64b4f0648d7fb28d08a95', 1, '245eb9e552a1226a9849f39fb7b44dcc', '1019709941', NULL, 0, 2, '2022-01-10 11:05:08', NULL, NULL, '2020-01-03 09:21:37', '180.158.177.128', '2020-01-03 17:21:37'),
('a5a14a7e562345e3ac641c3aa548f4c9', 'yamad', 'f47ebd38de0d94585e31b51c562f0c05', 1, 'b5ed3fd2a09d4ef4ccfb4207cc1162dc', '123123', NULL, 0, 2, '2022-01-10 11:05:08', NULL, NULL, '2020-01-03 10:02:39', '180.158.177.128', '2020-01-03 18:02:39'),
('bcce43ebbe2d4c9b', 'DhbA9oZmt8Aaqz89', '9f23cf8ab085e346fc37b914f19390a7', 1, 'e1b42fe676831c1e6ef78c601e28ec44', '12312311', NULL, 0, 2, '2022-09-26 10:10:23', NULL, NULL, '2022-09-19 02:10:23', '223.166.207.212', '2022-09-19 10:10:23'),
('beb4786c044b4b3caaebac6c5dc8c62f', 'xiaoqiao', '84ace58801f64b4f0648d7fb28d08a95', 1, 'aa8ca25875306a8776bdb0bd6b82ccec', '557983141', NULL, 0, 2, '2022-01-10 11:05:08', NULL, NULL, '2020-01-01 04:46:38', '211.1.3.57', '2020-01-01 12:46:38'),
('d0434ec1d61b4adf8ffc3512455629c5', '100012', '84ace58801f64b4f0648d7fb28d08a95', 1, '8bacaa25e0c1c7bd8310f9420d9ee656', '1000121', NULL, 0, 2, '2022-01-10 11:05:08', NULL, NULL, '2020-01-01 04:48:22', '241.88.107.111', '2020-01-01 12:48:22'),
('da0ff997a2464bb7bd3d7d0dd952f375', '100011', '84ace58801f64b4f0648d7fb28d08a95', 1, '4a3aab1c5c343de8afa719865cc016fc', '100011111', NULL, 0, 2, '2022-01-10 11:05:08', NULL, NULL, '2020-01-01 04:48:12', '257.1.252.1', '2020-01-01 12:48:12'),
('dd24fe6a446a43c09b4f5ff6d65fe615', 'toubis', '6209804952225ab3d14348307b5a4a27', 1, 'b029913ce4694c273084c802edb73d2e', '4527091', NULL, 0, 2, '2022-01-10 11:05:08', '101.88.243.112', '四川省凉山彝族自治州', '2019-09-21 15:38:37', '101.88.243.112', '2019-09-21 21:20:38'),
('dd3cd80771fd47c0', 'wangyi123yao', '89339d5927b6d1957f8f110a0697daef', 1, '74a1fa1e44c4229911a2adbcfac64822', '1274737286', NULL, 0, 2, '2022-09-23 12:20:46', '111.226.193.214', '中国河北省沧州市运河区', '2022-09-16 04:20:57', '111.226.193.214', '2022-09-16 12:20:46'),
('e804526fef75413b', '1234', 'e2ab9daccb531e934ef30717a992c5eb', 1, '2687176b3fa8dd3d2673dab66e062e1c', '2063105186', NULL, 0, 2, '2022-09-26 19:59:43', '175.153.168.3', '中国四川省成都市', '2022-09-19 12:00:05', '175.153.168.3', '2022-09-19 19:59:43'),
('e8e60d9126a34076a435dc1ab6265b4a', 'amanda', '711d3856a148f31e047c9fb66911fa8c', 1, 'aad5c4af1f13bb7b92b4a1e18799e6c9', '662579801', '66257980@qq.com', 0, 2, '2022-01-10 11:05:08', '223.167.205.110', '中国上海市上海市浦东新区', '2022-09-16 02:28:29', '101.224.40.200', '2019-09-19 16:25:35'),
('f1c9159def3947aca74cfe73b4eafaf5', 'yaoda', '9d47ae370c060cfe9be22456469ecd26', 1, '432563d66c7ebe302eff94b9d1919ab9', '289923351', NULL, 0, 2, '2022-01-10 11:05:08', '117.165.42.68', '中国江西省赣州市章贡区', '2019-11-24 14:14:08', '101.224.40.200', '2019-09-20 18:05:21');

--
-- 转储表的索引
--

--
-- 表的索引 `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `invite`
--
ALTER TABLE `invite`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- 表的索引 `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `player_song_sheet`
--
ALTER TABLE `player_song_sheet`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `song_sheet`
--
ALTER TABLE `song_sheet`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `config`
--
ALTER TABLE `config`
  MODIFY `id` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 使用表AUTO_INCREMENT `invite`
--
ALTER TABLE `invite`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `options`
--
ALTER TABLE `options`
  MODIFY `id` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `player_song_sheet`
--
ALTER TABLE `player_song_sheet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1336;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
