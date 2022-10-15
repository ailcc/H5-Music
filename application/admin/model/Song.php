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
            $song = json_decode($api->format(true)->song($songId),true)[0];
            $songs = $this->radio_urls($song['name'],$song['artist'][0],['tencent','migu','kugou','netease']);
            if(strpos($songs['url'],'http') !== false){
            }
        }
		return $songs;
	}
	

	public function radio_urls($name,$author,$type){
		$mp3_url = false;
		foreach ($type as $v) {
			$api = new Meting($v);
			$data = json_decode($api->format(true)->search($name.$author),true)[0];
			if($data['artist'][0] == $author || strstr($data['artist'][0],$author) || strstr($author,$data['artist'][0])){
				if($v=='migu'){
					$mp3_url = str_replace('http://tyst.migu.cn/', 'https://mg.yaode.xyz/', $data['location']);
				}else{
					$mp3_url = $api->format(true)->url($data['id']);
				}
				if(isset($mp3_url)){
					break;
				}
			}
		}
		return $mp3_url;
	}
}
?>