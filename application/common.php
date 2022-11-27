<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------
use ilt\Meting;
// 应用公共文件
function query($name,$author,$type = ['tencent','kuwo','migu','netease','kugou']){
    $songs = [];
    $mp3_url = false;
    foreach ($type as $a) {
        $api = new Meting($a);
        if($a == 'kuwo'){
            $new = array_slice($api->format(true)->search($name.' '.$author,$dt),0,3);
            foreach ($new as $v) {
                if($v['artist'][0] == $author){
                    $kw = $api->format(true)->url($v['song_id'])['url'];
                    break;
                }
            }
            if(isset($kw)){
                $songs['url'] = str_replace('https://other.web.ra01.sycdn.kuwo.cn/', 'https://isure.yaode.xyz/kuwo/', $kw);
                $songs['url'] = str_replace('https://other-web-ra01-sycdn.kuwo.cn/', 'https://isure.yaode.xyz/kuwo/', $songs['url']);
                $songs['source'] = $a;
                break;
                return $songs;
            }
        }else{
            $new = $api->format(true)->search($name.$author);
        }die(json_encode($new));
        if($new['artist'][0] == $author){
            $mp3_url = $api->format(true)->url($new['song_id'])['url'];
            if($a == 'migu'){
                $mp3_url = str_replace('http://tyst.migu.cn/', 'https://mg.yaode.xyz/', $new['location']);
            }
            if(isset($mp3_url)){
                $songs['url'] = $mp3_url;
                $songs['source'] = $a;
                break;
            }
        }
    }
    return $songs;
}

function is_url($url){
    $r = "/http[s]?:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&\+\%]*/is";
    if(preg_match($r,$url)){
        return true;
        echo '正确的url地址';
    }else{
        return false;
        echo '不是合法的url地址';
    }
}

function files($url){
	header('Content-Type: audio/mpeg');
    @ob_end_clean();
    @readfile($url);
    @flush(); 
    @ob_flush();
}
function radio_urls($name,$author,$dt,$type = ['kuwo','tencent','migu','netease','kugou']){
    $songs = [];
    $mp3_url = false;
    foreach ($type as $t) {
        $api = new Meting($t);
        $new = $api->format(true)->search($name.$author)[0];
        if(is_array($new['artist_name'])){
            $new['artist_name'] = implode(',', $new['artist_name']);
        }
        if($t == 'kuwo'){
            
            $res = file_get_contents('http://antiserver.kuwo.cn/anti.s?response=url&rid=MUSIC_'.$new['song_id'].'&format=mp3&type=convert_url');
            // die($new['duration']);
            if(is_url($res)){
            // if(is_url($res) && ($dt == $new['duration'] || $new['artist_name'] == $author)){
                $songs['url'] = $res;
                $songs['source'] = $t;
                break;
            }
            continue;
        }
        if($dt == $new['duration'] || $new['artist_name'] == $author){
            $mp3_url = $api->format(true)->url($new['song_id'])['url'];
            if($t == 'migu'){
                $mp3_url = str_replace('http://tyst.migu.cn/', 'https://mg.maeo.cn/', $new['location']);
            }
            if(isset($mp3_url)){
                $songs['url'] = $mp3_url;
                // $songs['duration'] = $new['duration'];
                $songs['source'] = $t;
                break;
            }
        }
    }
    return $songs;
}
function httpcode($url){
    $ch = curl_init();
    $timeout = 3;
    curl_setopt($ch,CURLOPT_FOLLOWLOCATION,1);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch, CURLOPT_HEADER, 1);
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_exec($ch);
    return $httpcode = curl_getinfo($ch,CURLINFO_HTTP_CODE);
    curl_close($ch);
}
function hex2rgb($hexColor) {
    $color = str_replace('#', '', $hexColor);
    if (strlen($color) > 3) {
        $rgb = array(
            'r' => hexdec(substr($color, 0, 2)),
            'g' => hexdec(substr($color, 2, 2)),
            'b' => hexdec(substr($color, 4, 2))
        );
    } else {
        $color = $hexColor;
        $r = substr($color, 0, 1) . substr($color, 0, 1);
        $g = substr($color, 1, 1) . substr($color, 1, 1);
        $b = substr($color, 2, 1) . substr($color, 2, 1);
        $rgb = array(
            'r' => hexdec($r),
            'g' => hexdec($g),
            'b' => hexdec($b)
        );
    }
    return $rgb['r'].', '.$rgb['g'].', '.$rgb['b'];
}
function songsort($type){
    $array = [
        'xm' => '虾米音乐',
        'qq' => 'QQ音乐',
        'wy' => '网易音乐',
        'kg' => '酷狗音乐',
        'local' => '本地音乐',
        ];
    return $array[$type];
}
function songsorts($type){
    $array = [
        'sdtj' => '手动添加歌单',
        'wygd' => '网易云歌单',
        ];
    return $array[$type];
}
//清理缓存函数
if (!function_exists('delete_dir_file'))
{
    /**
     * 循环删除目录和文件
     * @param string $dir_name
     * @return bool
     */
    function delete_dir_file($dir_name) {
        $result = false;
        if(is_dir($dir_name)){ //检查指定的文件是否是一个目录
            if ($handle = opendir($dir_name)) {//打开目录读取内容
                while (false !== ($item = readdir($handle))) {//读取内容
                    if ($item != '.' && $item != '..') {
                        if (is_dir($dir_name  . $item)) {
                            delete_dir_file($dir_name . $item);
                        } else {
                            unlink($dir_name .'/' . $item );//删除文件
                        }
                    }
                }
                closedir($handle);//打开一个目录，读取它的内容，然后关闭
                if (rmdir($dir_name)) {//删除空白目录
                    $result = true;
                }
            }
        }
        return $result;
    }
}