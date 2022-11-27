<?php
/**
 * Created by PhpStorm.
 * User: Zing
 * Date: 2018/9/2
 * Time: 8:47
 */

namespace app\api\controller;


use app\admin\model\SongSheet;
use ilt\ImageUtils;
use think\Db;
use think\Response;
use ilt\Meting;
use think\Controller;
use think\facade\Request;
use think\facade\Cache;

/**
 * api获取控制器
 * Class Index
 * @package app\api\controller
 */
class Index extends Controller
{
    
    /**
     * 初始化
     */
    protected function initialize()
    {
        $request = request();
        $action = $request->action();
        $this->newsqyz($request->action());
        
    }
    /**
     * 获取播放器基础信息以及歌单
     * @param $id string 播放器歌单
     * @return string script
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function info($id){
        // 读取缓存
        // $cache = Cache::get('info'.$id);
        // if($cache){
        //     return response($cache);
        // }
        $result = '';
        $playerModel = model('admin/Player');
        
        // 获取播放器详情
        $player = $playerModel->get($id);
        if(empty($id)||empty($player)){
            $site = Db::table('config')->where('type','in','site')->field('code,value')->column('value','code');
            $id = $site['default'];
            $player = $playerModel->get($id);
        }
        $result .= "var playerName = '".$player->name."',";
        $result .= "domain = '".$player->domain."',";
        $result .= "autoPlayer = ".$player->auto_player.",";
        $result .= "randomPlayer = ".$player->random_player.",";
        $result .= "defaultVolume = ".$player->default_volume.",";
        $result .= "showLrc = ".$player->show_lrc.",";
        $result .= "showMsg = ".$player->show_msg.",";
        $result .= "greeting = '".$player->greeting."',";
        $result .= "showGreeting = ".$player->show_greeting.",";
        $result .= "defaultAlbum = ".$player->default_album.",";
        $result .= "siteName = '".$player->site_name."',";
        $result .= "background = ".$player->background.",";
        $result .= "playerWidth = ".$player->player_width.",";
        $result .= "playerColors = '".$player->player_color."',";
        $result .= "coverWidth = ".$player->cover_width.",";
        $result .= "showNotes = ".$player->show_notes.",";
        $result .= "showDown = ".$player->show_down.",";
        $result .= "showSearch = ".$player->show_search.",";
        $result .= "autoPopupPlayer = ".$player->auto_popup_player.";";
        // 获取播放器歌单
        $playerSongSheets = $playerModel->songSheets($id);
        // 获取歌单歌曲
        $songSheetList = [];
        foreach ($playerSongSheets as $key => $item){
            $songSheetModel = new SongSheet($item);
            // if(empty($player->error)){
                $songs = $songSheetModel->songs()->order('taxis asc')->select();
            // }else{
            //     $songs = $songSheetModel->songs()->where('location','<>', '-1')->order('taxis asc')->select();
            // }
            $songIds = [];$songNames = [];$songTypes = [];$albumNames = [];
            $artistNames = [];$albumCovers = [];$locations = [];$lyric = [];
            foreach ($songs->toArray() as $key2 => $item2){
                $songIds[$key2] = $item2['song_id'];
                $songNames[$key2] = $item2['name'];
                $songTypes[$key2] = $item2['type'];
                $albumNames[$key2] = $item2['album_name'];
                $artistNames[$key2] = $item2['artist_name'];
                $albumCovers[$key2] = $item2['album_cover'];
                $locations[$key2] = $item2['location'];
                $lyric[$key2] = $item2['lyric'];
            }
            $songSheetList[$key] = [
                'songSheetName' => $item['name'],
                'author' => $item['author'],
                'songIds' => $songIds,
                'songNames' => $songNames,
                'songTypes' => $songTypes,
                'albumNames' => $albumNames,
                'artistNames' => $artistNames,
                'albumCovers' => $albumCovers,
                'locations' => $locations,
                'lyric' => $lyric
            ];
        }

        $result .= "var songSheetList = ".json_encode($songSheetList);
        // 设置缓存
        // Cache::set('info'.$id,$result);
        return response($result);
    }

    /**
     * 获取歌曲
     * @param $type string 歌曲类型
     * @param $songId string 歌曲id
     * @return \think\response\Redirect
     */
    public function musicUrl($id,$type,$songId){
        if($type == 'local'){
            $url = Db::table('song')->where('song_id',$songId)->value('location');
        }
        
        // 查询所属用户ID
        $playerModel = model('admin/Player');
        $player = $playerModel->get($id);
        $user_IDS = json_decode($player,true);
        $user_IDSs = $user_IDS['user_id'];
        // 读取缓存
        $url = Cache::connect(['path'  =>  '../runtime/'.$user_IDSs.'/musicUrl'])->get('music'.$type.$songId);
        if(!$url){
            $songs = model('admin/Song')->findMusicInfo($type,$songId,'url');
            $type = $songs['source'] == '' ? $type : $songs['source'];
            if(empty($songs['url'])){
                $res['loc'] = -1;
            }else{
                    $url = $songs['url'];
                    // 设置缓存
                    Cache::connect(['path'  =>  '../runtime/'.$user_IDSs.'/musicUrl'])->set('music'.$type.$songId,$url,60*20);
                    $res['loc'] = 1;
            }
            Db::table('song')->where('type',$type)->where('song_id',$songId)->update(['location' => $res['loc']]);
    	    if($type=='kw'||$type=='kuwo'){
    	        return files($url);
            }
        }
        
        return redirect($url);
    }

    /**
     * 获取图片主色及字体颜色
     * @param $url string 图片链接
     * @return string script
     */
    public function mainColor($id,$url){
        
        // 查询所属用户ID
        $playerModel = model('admin/Player');
        $player = $playerModel->get($id);
        $user_IDS = json_decode($player,true);
        $user_IDSs = $user_IDS['user_id'];
        // 读取缓存
        $cache = Cache::connect(['path'  =>  '../runtime/'.$user_IDSs.'/musicColor'])->get('mainColor'.$url);
        if($cache){
            return response($cache);
        }
        $result = "var mainColor =";
        if($url != null && $url != ''){
            list($r,$g,$b) = ImageUtils::mainColor($url);
            $result .= "'".$r.",".$g.",".$b."'";
            $grayLevel = $r * 0.299 + $g * 0.587 + $b * 0.114;
            if ($grayLevel >= 150) {
                $result .= ";font_color='0,0,0';";
            }else{
                $result .= ";font_color='255,255,255';";
            }
        }else{
            $result .= "'0,0,0';font_color='255,255,255';";
        }

        // 设置缓存
        Cache::connect(['path'  =>  '../runtime/'.$user_IDSs.'/musicColor'])->set('mainColor'.$url,$result);
        return response($result);
    }

    /**
     * 获取歌词
     * @param $type string 歌曲类型
     * @param $songId string 歌曲id
     * @return \think\Response
     */
    public function musicLyric($id,$type,$songId){
        // if($songId=='error'){
        //     $error = Db::name('error')->where('id', 1)->find();
        //     $script = "var lrcstr ='".$error['lyric']."'";
        //     return response($script);
        // }
         if($songId=='error'){
        	$group =  ['site','auth'];
            $error = Db::table('config')->where('type','in',$group)->field('code,value')->column('value','code');
            $script = "var lrcstr ='".$error['lyric']."'";
            return response($script);
        }
        

        // 查询所属用户ID
        $playerModel = model('admin/Player');
        $player = $playerModel->get($id);
        $user_IDS = json_decode($player,true);
        $user_IDSs = $user_IDS['user_id'];
        // 读取缓存
        
        // return $songs['lyric'];
        $cache = Cache::connect(['path'  =>  '../runtime/'.$user_IDSs.'/musicLyric'])->get('musicLyric'.$type.$songId);
        $script = "var lrcstr =''";
        if(!$cache){
            $songs = model('admin/Song')->findMusicInfo($type,$songId,'lrc');
            // $songs = json_decode($songs,true);
            if ($songs['lyric'] != '' && count($songs['lyric']) > 0) {
                $lryic = str_replace("\r\n",'',$songs['lyric']);
                $lryic = str_replace("\n",'',$lryic);
                $lryic = str_replace("'","\'",$lryic);
                $script = "var lrcstr ='".$lryic."'";
            }
            // 设置缓存
            Cache::connect(['path'  =>  '../runtime/'.$user_IDSs.'/musicLyric'])->set('musicLyric'.$type.$songId,$script);
        }
        return response($cache ? $cache : $script);
    }
    
    /**
     * 搜索歌曲
     */
    public function search($keywords='',$type=null,$action='',$id=''){
        $songs = [];
        $songs['code'] = 0;
        if($action == 'song'){
            switch ($type) {
                case 'kg':
                    $api = new Meting('kugou');
                    break;
                case 'qq':
                    $api = new Meting('tencent');
                    break;
                case 'wy':default:
                    $api = new Meting('netease');
                    break;
            }
            $song = $api->format(true)->song($id)[0];
            if(is_null($song))return jsonp($songs);
            $songs['code'] = 1;
            $songs['result'] = [
                'songid' => $song['song_id'],
                'singer' => $song['artist_name'],
                'songname' => $song['name'],
                'type' => $type,
                'pic' => $song['album_cover']
            ];
            return jsonp($songs);
        }else{
            if(empty($type) && $keywords != ''){
                $sort = ['kugou','tencent','netease'];
                $json = new Meting($a);
                $con = $json->format(true)->search($keywords);
 
                $cons=[];
                foreach ($sort as $a) {
                    $json = new Meting($a);
                    $con = $json->format(true)->search($keywords,['limit'=>5]);
                    $cons = array_merge($cons,$con);
                }
                foreach ($cons as $k=>$v) {
                    $song[] = [
                        'songid' => $v['song_id'],
                        'songname' => $v['name'],
                        'singer' => $v['artist_name'],
                        'pic' => $v['album_cover'],
                        'type' => $v['type'],
                        ];
                }
                $songs['result'] = $song;
            }
        }
        if(count($songs['result'])>=1)$songs['code'] = 1;
        return jsonp($songs);
    }
    
    /**
     * 授权验证
     */
	public function newsqyz($type,$con=''){
        $group =  ['site','auth'];
	    $auth = Db::table('config')->where('type','in',$group)->field('code,value')->column('value','code');
	    //$referer = isset($_SERVER["HTTP_REFERER"])?$_SERVER["HTTP_REFERER"]:false;
	    $referer = isset($_SERVER['HTTP_REFERER'])?$_SERVER["HTTP_REFERER"]:Request::header('origin');  
        $result = 'var domain = "'.$referer.'",
                autoPlayer = 1,
                randomPlayer = 0,
                defaultVolume = 75,
                autoPopupPlayer = 5;
                switchopen = 1,
                time = 5,
                show_mobile = 1,
                showLrc = 1,
                font = 1,
                greeting = "'.$auth['greeting'].'",
                showGreeting = 1,
                defaultAlbum = 1,
                background = 1,
                coverWidth = -1,
                playerWidth = -1,
                showNotes = 1,
                showMsg = 1,
                showSearch = 1,
                showDown = 1;
                var songSheetList = [{"songSheetName":"'.$auth['songSheetName'].'","author":"\u672a\u6388\u6743","songIds":["error"],"songNames":["'.$auth['songNames'].'"],"songTypes":["local"],"albumNames":["'.$auth['albumNames'].'"],"artistNames":["'.$auth['artistNames'].'"],"albumCovers":["'.$auth['albumCovers'].'"],"locations":["'.$auth['locations'].'"],"lyric":["'.$auth['lyric'].'"]}]';

        if ($type =='info' || empty($_COOKIE)) {
        	// if(!input('get.id')){
        	// 	if($empty){
        	// 		return $result;
        	// 	}
        	// }
	        if ($referer) {
	            $refererhost = parse_url($referer);
	            //来源地址的主域名
	            $hosts = trim(strtolower($refererhost['host']));
	            // $host = $this->get_domain($hosts);
	            $domain = model('admin/Player')->where('id',Request::param('id'))->value('domain');
	            $domain = empty($domain) ?'[]':$domain;
		        //授权域名列表
		        $domain = json_decode($domain,true);
	        	$is_allow = false;
	        	//全局授权域名
	        	$overalldomain = empty($auth['overalldomain'])?[]:explode('|',$auth['overalldomain']);
	        	//遍历数组
	        	foreach(array_merge($overalldomain,$domain) as $value){
	        		$value = trim($value);
	        		$domains = explode($value,$hosts);
	        		if(count($domains)>1){
	        			$is_allow = true;
	        			break;
	        		}
	        	}
	        	if($is_allow||in_array('*',$domain)){
	        		return true;
	        	}else{
                    if($type =='info'){
                        die($result);
                    }else{
                        return true;
                    }
	        	}
            }else if(empty($auth['empty'] == null)){
                if($type =='info'){
                    die($result);
                }else{
                    return true;
                }
            }else{
            	return true;
            }
        }

        $ailcc_player_token = isset($_COOKIE['ailcc_player_token'])?$_COOKIE['ailcc_player_token']:false;
        $ailcc_player_playerid = isset($_COOKIE['ailcc_player_playerid'])?$_COOKIE['ailcc_player_playerid']:'';
        if($auth['default'] == $ailcc_player_playerid) return true;
        $user = model('admin/Player')->where('id',$ailcc_player_playerid)->find();
        $user_id = model("admin/User")->where('id',$user['user_id'])->find();
        if($user_id['token'] !== $ailcc_player_token || (!$referer && $auth['empty'])){
            // die(json_encode(input('cookie.')));
            if ($type == 'musiclyric') {
                $script = "var lrcstr ='".$auth['lyric']."'";
                die($script);
            }
            elseif($type == 'musicurl'){
                header('location:' . $auth['locations']);
                exit;
            }
        }else{
            return true;
        }
    }

    // public function reset_cookie(){
    //     $con = file_get_contents('https://music.ya1ode.xyz/api/cookie?token=fd482d0eaba0a423309a83173c998c57', false);
    //     $con = json_decode($con,true);
    //     $cookie = $con['tencent']['value'];
    //     $ck  = 'pgv_pvi=22038528; pgv_si=s3156287488; pgv_pvid=5535248600; yplayer_open=1; ts_last=y.qq.com/portal/player.html; ts_uid=4847550686; yq_index=0; qqmusic_fromtag=66; player_exist=1; '.$cookie;
    //     $a = Db::table('options')->where('code','ailcc_qq_cookie')->update(['value' => $ck]);
    //     if($a || $ck){
    //         return $ck;
    //     }else{
    //         return $con;
    //     }
    // }
    
    public function css(){
        header("Content-Type:text/css; charset=utf-8");
        $res = new Response;
        $id = $_GET['id'] ?? 0;
        $buffer = file_get_contents('player/css/player.css');
        if(isset($id)){
            $results = Db::table("player")->where('id',$id)->find();
            $user_id = Db::table("user")->where('id',$results['user_id'])->find();
            if(isset($user_id) && isset($results)){
                session_start();
                setcookie('ailcc_player_playerid', $id,time()+2678400,'/');
                setcookie('ailcc_player_token', $user_id['token'], time()+86400, '/');
                $color = $results['player_color'];
                $buffer = str_replace(['#009688','0, 150, 136'],[$color,hex2rgb($color)],$buffer);
            }
        }
        $res->content($buffer)->contentType('text/css')->send();
    }
}