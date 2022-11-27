<?php
/**
* Created by PhpStorm.
* User: 沛霖主页
* Date: 2020/05/28
* Time: 00:40
*/ 
namespace app\admin\model;
use ilt\Meting;
use think\Db;
use ilt\MusicApi;
use think\Model;

class Song extends Model {
	public function findMusicInfo($type,$songId,$action='url'){
		$songs = [];
		switch ($type) {
			case 'wy': $api = new Meting('netease');
			break;
			case 'kg': $api = new Meting('kugou');
			break;
			case 'qq': $api = new Meting('tencent');
    // 			$cookie = Db::table('options')->where('code','ailcc_qq_cookie')->value('value');
    //             $api->cookie($cookie);
			break;
			case 'kuwo': $api = new Meting('kuwo');
			break;
		}
        if($action == 'url'){
            $songs = $api->format(true)->url($songId);
        }else if ($action=='lrc') {
            $songs = $api->format(true)->lyric($songId);
        }
        if(empty($songs['url']) && $action == 'url'){
            unset($songs);
            $song = $api->format(true)->song($songId)[0];
            // die(json_encode($song));
            $songs = radio_urls($song['name'],$song['artist_name'],$song['duration']);
            if(strpos($songs['url'],'http') !== false){
            }
        }
		return $songs;
	}
}
?>