<?php
/**
 * Created by PhpStorm.
 * User: Zing
 * Date: 2018/8/30
 * Time: 15:18
 */

namespace app\admin\model;

use ilt\Meting;
use ilt\MusicApi;
use think\Model;

/**
 * 歌曲模型
 * Class Song
 * @package app\admin\model
 */
class Song extends Model
{

    /**
     * 获取歌曲详情
     * @param $type
     * @param $songId
     * @return array|string
     */
    public function findMusicInfo($type,$songId){
        $musicApi = new MusicApi();
        $songs = [];
        switch ($type) {
            case 'wy':
                $songs = $musicApi->mc_get_song_by_id($songId, 'netease');
                break;
            case  'kg':
                $songs = $musicApi->mc_get_song_by_id($songId, 'kugou');
                break;
            case 'qq':
                $songs = $musicApi->mc_get_song_by_id($songId, 'qq');
                break;
        }
        // if (empty($songs[0]['url'])) {
        //     unset($songs);
        //     // $api = new Meting(type($type));
        //     $song = $api->format(true)->song($songId)[0];
        //     $songs['url'] = radio_urls($song['name'],$song['artist_name'],['tencent','migu','kugou','xiami','netease']);
        //     die($songs['url']);
        // } else {
        // 	// code...
        // }
        
        return $songs;
    }
    
    // public function radio_urls($name,$author,$type){
    //     $mp3_url = false;
    //     foreach ($type as $v) {
    //         $api = new Meting($v);
    //         $data = $api->format(true)->search($name.$author)[0];
    //         if($data['artist_name'] == $author || strstr($data['artist_name'],$author) || strstr($author,$data['artist_name'])){
    //             if($v=='migu'){
    //                 $mp3_url = str_replace('http://tyst.migu.cn/', 'https://mg.yaode.xyz/', $data['location']);
    //             }else{
    //                 $mp3_url = $api->format(true)->url($data['song_id'])['url'];
    //             }
    //             if(isset($mp3_url)){
    //                 break;
    //             }
    //         }
    //     }
    //     return $mp3_url;
    // }
}