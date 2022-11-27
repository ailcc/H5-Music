<?php
/**
 * Meting music framework
 * https://i-meto.com
 * https://github.com/metowolf/Meting
 * Version 1.5.7.
 *
 * Copyright 2019, METO Sheel <i@i-meto.com>
 * Released under the MIT license
 */

namespace ilt;
error_reporting(0);
class Meting
{
    const VERSION = '1.5.7';

    public $raw;
    public $data;
    public $info;
    public $error;
    public $status;

    public $server;
    public $proxy = null;
    public $format = false;
    public $header;
    public $uin = '0';

    public function __construct($value = 'netease')
    {
        $this->site($value);
    }

    public function site($value)
    {
        $suppose = array('netease', 'tencent', 'kugou', 'baidu', 'migu', 'kuwo');
        $this->server = in_array($value, $suppose) ? $value : 'netease';
        $this->header = $this->curlset();

        return $this;
    }

    public function cookie($value)
    {
        $this->header['Cookie'] = $value;

        return $this;
    }

    public function format($value = true)
    {
        $this->format = $value;

        return $this;
    }

    public function proxy($value)
    {
        $this->proxy = $value;

        return $this;
    }
    
    public function uin($value)
    {
        $value = intval($value);
        if ($value) {
            $this->uin = str_pad($value, 10, '0', STR_PAD_LEFT);
        }
        return $this;
    }
    
    private function exec($api)
    {
        if (isset($api['encode'])) {
            $api = call_user_func_array(array($this, $api['encode']), array($api));
        }
        if ($api['method'] == 'GET') {
            if (isset($api['body'])) {
                $api['url'] .= '?'.http_build_query($api['body']);
                $api['body'] = null;
            }
        }

        $this->curl($api['url'], $api['body']);
        // return $api;

        if (!$this->format) {
            return $this->raw;
        }

        $this->data = $this->raw;

        if (isset($api['decode'])) {
            $this->data = call_user_func_array(array($this, $api['decode']), array($this->data));
        }
        if (isset($api['format'])) {
            $this->data = $this->clean($this->data, $api['format']);
        }

        return $this->data;
    }

    private function curl($url, $payload = null, $headerOnly = 0)
    {
        $header = array_map(function ($k, $v) {
            return $k.': '.$v;
        }, array_keys($this->header), $this->header);
        $curl = curl_init();
        if (!is_null($payload)) {
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, is_array($payload) ? http_build_query($payload) : $payload);
        }
    // 	$cookie = $_SESSION['think']['loginUser']['id'];
        // $cookie_file = 'cookie/'.$cookie.'_cookie.txt';
        curl_setopt($curl, CURLOPT_HEADER, $headerOnly);
        curl_setopt($curl, CURLOPT_TIMEOUT, 20);
        curl_setopt($curl, CURLOPT_ENCODING, 'gzip');
        curl_setopt($curl, CURLOPT_IPRESOLVE, 1);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        
        // curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie_file);
        
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        if ($this->proxy) {
            curl_setopt($curl, CURLOPT_PROXY, $this->proxy);
        }
        for ($i = 0; $i < 3; $i++) {
            $this->raw = curl_exec($curl);
            $this->info = curl_getinfo($curl);
            $this->error = curl_errno($curl);
            $this->status = $this->error ? curl_error($curl) : '';
            if (!$this->error) {
                break;
            }
        }
        curl_close($curl);

        return $this;
    }

    private function pickup($array, $rule)
    {
        $t = explode('.', $rule);
        foreach ($t as $vo) {
            if (!isset($array[$vo])) {
                return array();
            }
            $array = $array[$vo];
        }

        return $array;
    }

    private function clean($raw, $rule)
    {
        $raw = json_decode($raw, true);
        if (!empty($rule)) {
            $raw = $this->pickup($raw, $rule);
        }
        if (!isset($raw[0]) && count($raw)) {
            $raw = array($raw);
        }
        $result = array_map(array($this, 'format_'.$this->server), $raw);

        return $result;
    }

    public function search($keyword, $option = null)
    {
        switch ($this->server) {
            case 'netease':
            $api = array(
                'method' => 'POST',
                'url'    => 'http://music.163.com/api/cloudsearch/pc',
                'body'   => array(
                    's'      => $keyword,
                    'type'   => isset($option['type']) ? $option['type'] : 1,
                    'limit'  => isset($option['limit']) ? $option['limit'] : 30,
                    'total'  => 'true',
                    'offset' => isset($option['page']) && isset($option['limit']) ? ($option['page'] - 1) * $option['limit'] : 0,
                ),
                'encode' => 'netease_AESCBC',
                'format' => 'result.songs',
            );
            break;
            case 'tencent':
            $api = array(
                'method' => 'GET',
                'url'    => 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
                'body'   => array(
                    'format'   => 'json',
                    'p'        => isset($option['page']) ? $option['page'] : 1,
                    'n'        => isset($option['limit']) ? $option['limit'] : 30,
                    'w'        => $keyword,
                    'aggr'     => 1,
                    'lossless' => 1,
                    'cr'       => 1,
                    'new_json' => 1,
                ),
                'format' => 'data.song.list',
            );
            break;
            case 'kugou':
            $api = array(
                'method' => 'GET',
                'url'    => 'http://mobilecdn.kugou.com/api/v3/search/song',
                'body'   => array(
                    'api_ver'   => 1,
                    'area_code' => 1,
                    'correct'   => 1,
                    'pagesize'  => isset($option['limit']) ? $option['limit'] : 30,
                    'plat'      => 2,
                    'tag'       => 1,
                    'sver'      => 5,
                    'showtype'  => 10,
                    'page'      => isset($option['page']) ? $option['page'] : 1,
                    'keyword'   => $keyword,
                    'version'   => 8990,
                ),
                'format' => 'data.info',
            );
            break;
            case 'baidu':
            $api = array(
                'method' => 'GET',
                'url'    => 'http://musicapi.taihe.com/v1/restserver/ting',
                'body'   => array(
                    'from'      => 'qianqianmini',
                    'method'    => 'baidu.ting.search.merge',
                    'isNew'     => 1,
                    'platform'  => 'darwin',
                    'page_no'   => isset($option['page']) ? $option['page'] : 1,
                    'query'     => $keyword,
                    'version'   => '11.2.1',
                    'page_size' => isset($option['limit']) ? $option['limit'] : 30,
                ),
                'format' => 'result.song_info.song_list',
            );
            break;
            case 'migu':
            $api = array(
                'method' => 'GET',
                'url'    => 'https://m.music.migu.cn/migu/remoting/scr_search_tag',
                'body'   => array(
                    'keyword'    => $keyword,
                    'type'       => 2,
                    'pgc'        => isset($option['page']) ? $option['page'] : 1,
                    'rows'       => isset($option['limit']) ? $option['limit'] : 30,
                ),
                'format' => 'musics',
            );
            break;
            case 'kuwo':
            $api = array(
                'method' => 'GET',
                'url'    => 'http://www.kuwo.cn/api/www/search/searchMusicBykeyWord',
                'body'   => array(
                    'key'       => $keyword,
                    'pn'        => isset($option['page']) ? $option['page'] : 1,
                    'rn'        => isset($option['limit']) ? $option['limit'] : 30,
                ),
                'format' => 'data.list',
            );
            break;
        }

        return $this->exec($api);
    }

    public function song($id)
    {
        switch ($this->server) {
            case 'netease':
            $api = array(
                'method' => 'POST',
                'url'    => 'http://music.163.com/api/v3/song/detail/',
                'body'   => array(
                    'c' => '[{"id":'.$id.',"v":0}]',
                ),
                'encode' => 'netease_AESCBC',
                'format' => 'songs',
            );
            break;
            case 'tencent':
            $api = array(
                'method' => 'GET',
                'url'    => 'https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg',
                'body'   => array(
                    'songmid'  => $id,
                    'platform' => 'yqq',
                    'format'   => 'json',
                ),
                'format' => 'data',
            );
            break;

            case 'kugou':
            $api = array(
                'method' => 'POST',
                'url'    => 'http://m.kugou.com/app/i/getSongInfo.php',
                'body'   => array(
                    'cmd'  => 'playInfo',
                    'hash' => $id,
                    'from' => 'mkugou',
                ),
                'format' => '',
            );
            break;
            case 'baidu':
            $api = array(
                'method' => 'GET',
                'url'    => 'http://musicapi.taihe.com/v1/restserver/ting',
                'body'   => array(
                    'from'     => 'qianqianmini',
                    'method'   => 'baidu.ting.song.getInfos',
                    'songid'   => $id,
                    'res'      => 1,
                    'platform' => 'darwin',
                    'version'  => '1.0.0',
                ),
                'encode' => 'baidu_AESCBC',
                'format' => 'songinfo',
            );
            break;
			case 'kuwo':
			$api = array(
				'method' => 'GET',
				'url'    => 'http://www.kuwo.cn/api/www/music/musicInfo',
				'body'   => array(
					'mid'         => $id,
					'httpsStatus' => 1,
				),
				'format' => 'data',
			);
			break;
			case 'migu':
			$api = array(
				'method'  => 'GET',
				'url'     => 'https://m.music.migu.cn/migu/remoting/cms_detail_tag',
				'referer' => 'https://m.music.migu.cn/v3/music/song/'.$id,
				'body'   => array(
					'cpid' => $id,
				),
				'format' => 'data',
            );
			break;
        }

        return $this->exec($api);
    }

    public function album($id)
    {
        switch ($this->server) {
            case 'netease':
            $api = array(
                'method' => 'POST',
                'url'    => 'http://music.163.com/api/v1/album/'.$id,
                'body'   => array(
                    'total'         => 'true',
                    'offset'        => '0',
                    'id'            => $id,
                    'limit'         => '1000',
                    'ext'           => 'true',
                    'private_cloud' => 'true',
                ),
                'encode' => 'netease_AESCBC',
                'format' => 'songs',
            );
            break;
            case 'tencent':
            $api = array(
                'method' => 'GET',
                'url'    => 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_detail_cp.fcg',
                'body'   => array(
                    'albummid' => $id,
                    'platform' => 'mac',
                    'format'   => 'json',
                    'newsong'  => 1,
                ),
                'format' => 'data.getSongInfo',
            );
            break;

            case 'kugou':
                $api = array(
                    'method' => 'GET',
                    'url' => 'http://mobilecdn.kugou.com/api/v3/album/song',
                    'body' => array(
                        'albumid' => $id,
                        'area_code' => 1,
                        'plat' => 2,
                        'page' => 1,
                        'pagesize' => -1,
                        'version' => 8990,
                    ),
                    'format' => 'data.info',
                );
                break;
            case 'baidu':
            $api = array(
                'method' => 'GET',
                'url'    => 'http://musicapi.taihe.com/v1/restserver/ting',
                'body'   => array(
                    'from'     => 'qianqianmini',
                    'method'   => 'baidu.ting.album.getAlbumInfo',
                    'album_id' => $id,
                    'platform' => 'darwin',
                    'version'  => '11.2.1',
                ),
                'format' => 'songlist',
            );
            break;
			case 'kuwo':
			$api = array(
				'method' => 'GET',
				'url'    => 'http://www.kuwo.cn/api/www/album/albumInfo',
				'body'   => array(
					'albumId'     => $id,
                    'pn'          => 1,
                    'rn'          => 1000,
					'httpsStatus' => 1,
				),
				'format' => 'data.musicList',
			);
			break;
        }

        return $this->exec($api);
    }

    public function artist($id, $limit = 50)
    {
        switch ($this->server) {
            case 'netease':
            $api = array(
                'method' => 'POST',
                'url'    => 'http://music.163.com/api/v1/artist/'.$id,
                'body'   => array(
                    'ext'           => 'true',
                    'private_cloud' => 'true',
                    'ext'           => 'true',
                    'top'           => $limit,
                    'id'            => $id,
                ),
                'encode' => 'netease_AESCBC',
                'format' => 'hotSongs',
            );
            break;
            case 'tencent':
            $api = array(
                'method' => 'GET',
                'url'    => 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
                'body'   => array(
                    'singermid' => $id,
                    'begin'     => 0,
                    'num'       => $limit,
                    'order'     => 'listen',
                    'platform'  => 'mac',
                    'newsong'   => 1,
                ),
                'format' => 'data.list',
            );
            break;
            case 'kugou':
                $api = array(
                    'method' => 'GET',
                    'url' => 'http://mobilecdn.kugou.com/api/v3/singer/song',
                    'body' => array(
                        'singerid' => $id,
                        'area_code' => 1,
                        'page' => 1,
                        'plat' => 0,
                        'pagesize' => $limit,
                        'version' => 8990,
                    ),
                    'format' => 'data.info',
                );
                break;
            case 'baidu':
            $api = array(
                'method' => 'GET',
                'url'    => 'http://musicapi.taihe.com/v1/restserver/ting',
                'body'   => array(
                    'from'     => 'qianqianmini',
                    'method'   => 'baidu.ting.artist.getSongList',
                    'artistid' => $id,
                    'limits'   => $limit,
                    'platform' => 'darwin',
                    'offset'   => 0,
                    'tinguid'  => 0,
                    'version'  => '11.2.1',
                ),
                'format' => 'songlist',
            );
            break;
			case 'kuwo':
			$api = array(
				'method' => 'GET',
				'url'    => 'http://www.kuwo.cn/api/www/artist/artistMusic',
				'body'   => array(
					'artistid'    => $id,
                    'pn'          => 1,
                    'rn'          => $limit,
					'httpsStatus' => 1,
				),
				'format' => 'data.list',
			);
			break;
        }

        return $this->exec($api);
    }

    public function ranking($topId,$type=1,$num=100,$size = 150)
    {
        switch ($this->server) {
            case 'netease':
            $data = $type==1?'weekData':'allData';
            $api = array(
                'method' => 'POST',
                'url'    => 'https://music.163.com/weapi/v1/play/record?csrf_token=',
                'body'   => array(
                    'uid'           => $topId,
                    'type'          => $type,
                    'limit'         => $num,
                    'offset'        => '0',
                    'total'         => 'true',
                    'csrf_token'    => ''
                ),
                'encode' => 'netease_AESCBC',
                'format' => $data,
            );
            break;
            case 'tencent':
                if($topId == 4){
                    if(date('H')>9){
                        $period = date("Y-m-d");
                    }else{
                        $period = date("Y-m-d",strtotime("-1 day"));
                    }
                }else{
                    $period = date("Y").'_'.date('W', strtotime('-2 week'));
                }
                $body  =  [
                    'detail' => [
                        'module'   => 'musicToplist.ToplistInfoServer',
                        'method'   => 'GetDetail',
                        'param'    => [
                            'topId'  => intval($topId),
                            'offset' => 0,
                            'num'    => $num,
                            'period' => $period,
                        ]
                    ],
                    'comm' =>[
                        'ct' => 24,
                        'cv' => 0,
                        ]
                ];
                $api = array(
                    'method' => 'GET',
                    'url'    => 'https://u.y.qq.com/cgi-bin/musicu.fcg',
                    'body'   => array(
                        'data' => json_encode($body)
                    ),
                    'format' => 'detail.data.songInfoList',
                );
            break;
            case 'kugou':
                $api = array(
                    'method' => 'GET',
                    'url' => 'http://mobilecdn.kugou.com/api/v3/singer/song',
                    'body' => array(
                        'singerid' => $id,
                        'area_code' => 1,
                        'page' => 1,
                        'plat' => 0,
                        'pagesize' => $limit,
                        'version' => 8990,
                    ),
                    'format' => 'data.info',
                );
                break;
            case 'baidu':
            $api = array(
                'method' => 'GET',
                'url'    => 'http://musicapi.taihe.com/v1/restserver/ting',
                'body'   => array(
                    'from'     => 'qianqianmini',
                    'method'   => 'baidu.ting.artist.getSongList',
                    'artistid' => $id,
                    'limits'   => $limit,
                    'platform' => 'darwin',
                    'offset'   => 0,
                    'tinguid'  => 0,
                    'version'  => '11.2.1',
                ),
                'format' => 'songlist',
            );
            break;
        }

        return $this->exec($api);
    }

    public function playlist($id)
    {
        switch ($this->server) {
            case 'netease':
            $api = array(
                'method' => 'POST',
                'url'    => 'http://music.163.com/api/v6/playlist/detail',
                'body'   => array(
                    's'  => '0',
                    'id' => $id,
                    'n'  => '1000',
                    't'  => '0',
                ),
                'encode' => 'netease_AESCBC',
                'format' => 'playlist.tracks',
            );
            break;
            case 'tencent':
            $api = array(
                'method' => 'GET',
                'url'    => 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_playlist_cp.fcg',
                'body'   => array(
                    'id'       => $id,
                    'format'   => 'json',
                    'newsong'  => 1,
                    'platform' => 'jqspaframe.json',
                ),
                'format' => 'data.cdlist.0.songlist',
            );
            break;
            case 'kugou':
                $api = array(
                    'method' => 'GET',
                    'url' => 'http://mobilecdn.kugou.com/api/v3/special/song',
                    'body' => array(
                        'specialid' => $id,
                        'area_code' => 1,
                        'page' => 1,
                        'plat' => 2,
                        'pagesize' => -1,
                        'version' => 8990,
                    ),
                    'format' => 'data.info',
                );
                break;
            case 'baidu':
            $api = array(
                'method' => 'GET',
                'url'    => 'http://musicapi.taihe.com/v1/restserver/ting',
                'body'   => array(
                    'from'     => 'qianqianmini',
                    'method'   => 'baidu.ting.diy.gedanInfo',
                    'listid'   => $id,
                    'platform' => 'darwin',
                    'version'  => '11.2.1',
                ),
                'format' => 'content',
            );
            break;
			case 'kuwo':
			$api = array(
				'method' => 'GET',
				'url'    => 'http://www.kuwo.cn/api/www/playlist/playListInfo',
				'body'   => array(
					'pid'         => $id,
                    'pn'          => 1,
                    'rn'          => 1000,
					'httpsStatus' => 1,
				),
				'format' => 'data.musicList',
			);
			break;
        }

        return $this->exec($api);
    }

    public function url($id, $br = 320)
    {
        switch ($this->server) {
            case 'netease':
            $api = array(
                'method' => 'POST',
                'url'    => 'http://music.163.com/api/song/enhance/player/url',
                'body'   => array(
                    'ids' => array($id),
                    'br'  => $br * 1000,
                ),
                'encode' => 'netease_AESCBC',
                'decode' => 'netease_url',
            );
            break;
            case 'tencent':
            $api = array(
                'method' => 'GET',
                'url'    => 'https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg',
                'body'   => array(
                    'songmid'  => $id,
                    'platform' => 'yqq',
                    'format'   => 'json',
                ),
                'decode' => 'tencent_url',
            );
            break;
            case 'kugou':
            $api = array(
                'method' => 'POST',
                'url'    => 'http://m.kugou.com/app/i/getSongInfo.php',
                'referer'=> 'http://m.kugou.com/play/info/' . $id,
                'body'   => array(
                    'cmd'       => 'playInfo',
                    'hash'      => $id
                ),
                'decode' => 'kugou_url',
            );
            break;
            case 'baidu':
            $api = array(
                'method' => 'GET',
                'url'    => 'http://musicapi.taihe.com/v1/restserver/ting',
                'body'   => array(
                    'from'     => 'qianqianmini',
                    'method'   => 'baidu.ting.song.getInfos',
                    'songid'   => $id,
                    'res'      => 1,
                    'platform' => 'darwin',
                    'version'  => '1.0.0',
                ),
                'encode' => 'baidu_AESCBC',
                'decode' => 'baidu_url',
            );
            break;
            case 'kuwo':
            $api = array(
                'method' => 'GET',
                'url'    => 'https://antiserver.kuwo.cn/anti.s',
                'body'   => array(
                    'rid'       => 'MUSIC_'.$id,
                    'type'      => 'convert_url',
                    'format'    => 'mp3',
                    'response'  => 'url',
                ),
                'decode' => 'kuwo_url',
            );
            break;
			case 'migu':
			$api = array(
				'method'  => 'GET',
				'url'     => 'https://m.music.migu.cn/migu/remoting/cms_detail_tag',
				'referer' => 'https://m.music.migu.cn/v3/music/song/'.$id,
				'body'   => array(
					'cpid' => $id,
				),
				'decode' => 'migu_url',
            );
			break;
        }
        $this->temp['br'] = $br;

        return $this->exec($api);
    }

    public function lyric($id)
    {
        switch ($this->server) {
            case 'netease':
            $api = array(
                'method' => 'POST',
                'url'    => 'http://music.163.com/api/song/lyric',
                'body'   => array(
                    'id' => $id,
                    'os' => 'linux',
                    'lv' => -1,
                    'kv' => -1,
                    'tv' => -1,
                ),
                'encode' => 'netease_AESCBC',
                'decode' => 'netease_lyric',
            );
            break;
            case 'tencent':
            $api = array(
                'method' => 'GET',
                'url'    => 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
                'body'   => array(
                    'songmid' => $id,
                    'g_tk'    => '5381',
                ),
                'decode' => 'tencent_lyric',
            );
            break;
            case 'kugou':
                $api = array(
                    'method' => 'GET',
                    'url' => 'http://krcs.kugou.com/search',
                    'body' => array(
                        'keyword' => '%20-%20',
                        'ver' => 1,
                        'hash' => $id,
                        'client' => 'mobi',
                        'man' => 'yes',
                    ),
                    'decode' => 'kugou_lyric',
                );
                break;
            case 'baidu':
            $api = array(
                'method' => 'GET',
                'url'    => 'http://musicapi.taihe.com/v1/restserver/ting',
                'body'   => array(
                    'from'     => 'qianqianmini',
                    'method'   => 'baidu.ting.song.lry',
                    'songid'   => $id,
                    'platform' => 'darwin',
                    'version'  => '1.0.0',
                ),
                'decode' => 'baidu_lyric',
            );
            break;
			case 'kuwo':
			$api = array(
				'method' => 'GET',
				'url'    => 'http://m.kuwo.cn/newh5/singles/songinfoandlrc',
				'body'   => array(
					'musicId'     => $id,
					'httpsStatus' => 1,
				),
				'decode' => 'kuwo_lyric',
			);
			break;
			case 'migu':
			$api = array(
				'method'  => 'GET',
				'url'     => 'https://music.migu.cn/v3/api/music/audioPlayer/getLyric',
				'referer' => 'https://music.migu.cn/v3/music/player/audio',
				'body'    => array(
					'copyrightId' => $id,
				),
				'decode' => 'migu_lyric',
			);
			break;
        }

        return $this->exec($api);
    }

    public function pic($id, $size = 300, $cover = '')
    {
        switch ($this->server) {
            case 'netease':
                $url = 'https://p3.music.126.net/' . $this->netease_encryptId($id) . '/' . $id . '.jpg?param=' . $size . 'y' . $size;
            break;
            case 'tencent':
                $url = 'https://y.gtimg.cn/music/photo_new/T002R' . $size . 'x' . $size . 'M000' . $id . '.jpg?max_age=2592000';
            break;
            case 'kugou':
                $format = $this->format;
                $data = $this->format(false)->song($id);
                $this->format = $format;
                $data = json_decode($data, true);
                $url = $data['imgUrl'];
                $size = $size >= 300 ? 400 : $size;
                $url = str_replace('{size}', $size, $url);
            break;
            case 'baidu':
                $format = $this->format;
                $data = $this->format(false)->song($id);
                $this->format = $format;
                $data = json_decode($data, true);
                if (isset($data['songinfo'])) {
                    $url = isset($data['songinfo']['pic_radio']) ? $data['songinfo']['pic_radio'] : $data['songinfo']['pic_small'];
                    $url = str_replace('_300', '_' . $size, $url);
                } else {
                    $url = $cover;
                }
            break;
			case 'kuwo':
    			$format = $this->format;
                $data = $this->format(false)->song($id);
                $this->format = $format;
                $data = json_decode($data, true);
    			$url = isset($data['data']['pic']) ? $data['data']['pic'] : $data['data']['albumpic'];
    		break;
        }
        $urls['url'] = $url;
        return $urls;
    }

    private function curlset()
    {
        switch ($this->server) {
            case 'netease':
            return array(
                'Referer'         => 'https://music.163.com/',
                'Cookie'          => 'ppver=8.2.30; os=iPhone OS; osver=15.0; EVNSM=1.0.0; buildver=2206; channel=distribution; machineid=iPhone15.3',
                'User-Agent'      => 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 CloudMusic/0.1.1 NeteaseMusic/8.2.30',
                'X-Real-IP'       => long2ip(mt_rand(1884815360, 1884890111)),
                'Accept'          => '*/*',
                'Accept-Language' => 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
                'Connection'      => 'keep-alive',
                'Content-Type'    => 'application/x-www-form-urlencoded',
            );
            case 'tencent':
            return array(
                'Referer'         => 'http://y.qq.com',
                'User-Agent'      => 'QQ%E9%9F%B3%E4%B9%90/54409 CFNetwork/901.1 Darwin/17.6.0 (x86_64)',
                'Accept'          => '*/*',
                'Accept-Language' => 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
                'Connection'      => 'keep-alive',
                'Content-Type'    => 'application/x-www-form-urlencoded',
            );
            case 'kugou':
            return array(
                'user-agent'      => 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
                'UNI-UserAgent'   => 'iOS11.4-Phone8990-1009-0-WiFi',
                'CLIENT-IP'       => long2ip(mt_rand(1884815360, 1884890111)),
                'X-FORWARDED-FOR' => long2ip(mt_rand(1884815360, 1884890111)),
            );
            case 'baidu':
            return array(
                'Cookie'          => 'BAIDUID='.$this->getRandomHex(32).':FG=1',
                'User-Agent'      => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) baidu-music/1.2.1 Chrome/66.0.3359.181 Electron/3.0.5 Safari/537.36',
                'Accept'          => '*/*',
                'Content-type'    => 'application/json;charset=UTF-8',
                'Accept-Language' => 'zh-CN',
            );
            case 'migu':
            return array(
                'User-Agent'      => 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
                'Referer'         => 'http://m.music.migu.cn',
                // 'X-Real-IP'       => '175.6.24.204',
            );
			case 'kuwo':
            return array(
				'Cookie'		  => 'Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1623339177,1623339183; _ga=GA1.2.1195980605.1579367081; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1623339982; kw_token=3E7JFQ7MRPL; _gid=GA1.2.747985028.1623339179; _gat=1',
                'csrf'            => '3E7JFQ7MRPL',
				'Host'            => 'www.kuwo.cn',
				'Referer'         => 'http://www.kuwo.cn/',
				'User-Agent'      => 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
            );
        }
    }

    private function getRandomHex($length)
    {
        if (function_exists('random_bytes')) {
            return bin2hex(random_bytes($length / 2));
        }
        if (function_exists('mcrypt_create_iv')) {
            return bin2hex(mcrypt_create_iv($length / 2, MCRYPT_DEV_URANDOM));
        }
        if (function_exists('openssl_random_pseudo_bytes')) {
            return bin2hex(openssl_random_pseudo_bytes($length / 2));
        }
    }

    private function getRandom($len = 16){
    	$str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    	$strlen = strlen($str);
    	$randstr = "";
    	for ($i = 0; $i < $len; $i++) {
    		$randstr .= $str[mt_rand(0, $strlen - 1)];
    	}
    	return $randstr;
    }

    private function bchexdec($hex)
    {
        $dec = 0;
        $len = strlen($hex);
        for ($i = 1; $i <= $len; $i++) {
            $dec = bcadd($dec, bcmul(strval(hexdec($hex[$i - 1])), bcpow('16', strval($len - $i))));
        }

        return $dec;
    }

    private function bcdechex($dec)
    {
        $hex = '';
        do {
            $last = bcmod($dec, 16);
            $hex = dechex($last).$hex;
            $dec = bcdiv(bcsub($dec, $last), 16);
        } while ($dec > 0);

        return $hex;
    }

    private function str2hex($string)
    {
        $hex = '';
        for ($i = 0; $i < strlen($string); $i++) {
            $ord = ord($string[$i]);
            $hexCode = dechex($ord);
            $hex .= substr('0'.$hexCode, -2);
        }

        return $hex;
    }

    private function netease_AESCBC($api)
    {
        $modulus = '157794750267131502212476817800345498121872783333389747424011531025366277535262539913701806290766479189477533597854989606803194253978660329941980786072432806427833685472618792592200595694346872951301770580765135349259590167490536138082469680638514416594216629258349130257685001248172188325316586707301643237607';
        $pubkey = '65537';
        $nonce = '0CoJUm6Qyw8W8jud';
        $vi = '0102030405060708';

        if (extension_loaded('bcmath')) {
            $skey = $this->getRandomHex(16);
        } else {
            $skey = 'B3v3kH4vRPWRJFfH';
        }

        $body = json_encode($api['body']);

        if (function_exists('openssl_encrypt')) {
            $body = openssl_encrypt($body, 'aes-128-cbc', $nonce, false, $vi);
            $body = openssl_encrypt($body, 'aes-128-cbc', $skey, false, $vi);
        } else {
            $pad = 16 - (strlen($body) % 16);
            $body = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $nonce, $body.str_repeat(chr($pad), $pad), MCRYPT_MODE_CBC, $vi));
            $pad = 16 - (strlen($body) % 16);
            $body = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $skey, $body.str_repeat(chr($pad), $pad), MCRYPT_MODE_CBC, $vi));
        }

        if (extension_loaded('bcmath')) {
            $skey = strrev(utf8_encode($skey));
            $skey = $this->bchexdec($this->str2hex($skey));
            $skey = bcpowmod($skey, $pubkey, $modulus);
            $skey = $this->bcdechex($skey);
            $skey = str_pad($skey, 256, '0', STR_PAD_LEFT);
        } else {
            $skey = '85302b818aea19b68db899c25dac229412d9bba9b3fcfe4f714dc016bc1686fc446a08844b1f8327fd9cb623cc189be00c5a365ac835e93d4858ee66f43fdc59e32aaed3ef24f0675d70172ef688d376a4807228c55583fe5bac647d10ecef15220feef61477c28cae8406f6f9896ed329d6db9f88757e31848a6c2ce2f94308';
        }

        $api['url'] = str_replace('/api/', '/weapi/', $api['url']);
        $api['body'] = array(
            'params'    => $body,
            'encSecKey' => $skey,
        );
        return $api;
    }

    private function baidu_AESCBC($api)
    {
        $key = 'DBEECF8C50FD160E';
        $vi = '1231021386755796';

        $data = 'songid='.$api['body']['songid'].'&ts='.intval(microtime(true) * 1000);

        if (function_exists('openssl_encrypt')) {
            $data = openssl_encrypt($data, 'aes-128-cbc', $key, false, $vi);
        } else {
            $pad = 16 - (strlen($data) % 16);
            $data = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $data.str_repeat(chr($pad), $pad), MCRYPT_MODE_CBC, $vi));
        }

        $api['body']['e'] = $data;

        return $api;
    }
    private function netease_encryptId($id)
    {
        $magic = str_split('3go8&$8*3*3h0k(2)2');
        $song_id = str_split($id);
        for ($i = 0; $i < count($song_id); $i++) {
            $song_id[$i] = chr(ord($song_id[$i]) ^ ord($magic[$i % count($magic)]));
        }
        $result = base64_encode(md5(implode('', $song_id), 1));
        $result = str_replace(array('/', '+'), array('_', '-'), $result);

        return $result;
    }

    private function netease_url($result)
    {
        $data = json_decode($result, true);
        if (isset($data['data'][0]['uf']['url'])) {
            $data['data'][0]['url'] = $data['data'][0]['uf']['url'];
        }
        if (isset($data['data'][0]['url'])) {
            $url = array(
                'url'  => str_replace('http://', 'https://', $data['data'][0]['url']),
                'size' => $data['data'][0]['size'],
                'br'   => $data['data'][0]['br'] / 1000,
            );
        } else {
            $url = array(
                'url'  => '',
                'size' => 0,
                'br'   => -1,
            );
        }

        return $url;
    }

    private function tencent_url($result)
    {
        $data = json_decode($result, true);
        $guid = mt_rand() % 10000000000;

        $type = array(
            array('size_flac', 999, 'F000', 'flac'),
            array('size_320mp3', 320, 'M800', 'mp3'),
            array('size_192aac', 192, 'C600', 'm4a'),
            array('size_128mp3', 128, 'M500', 'mp3'),
            array('size_96aac', 96, 'C400', 'm4a'),
            array('size_48aac', 48, 'C200', 'm4a'),
            array('size_24aac', 24, 'C100', 'm4a'),
        );

        $uin = '0';
        preg_match('/uin=(\d+)/', $this->header['Cookie'], $uin_match);
        if (count($uin_match)) {
            $uin = $uin_match[1];
        }

        $payload = array(
            'req_0' => array(
                'module' => 'vkey.GetVkeyServer',
                'method' => 'CgiGetVkey',
                'param'  => array(
                    'guid'      => (string) $guid,
                    'songmid'   => array(),
                    'filename'  => array(),
                    'songtype'  => array(),
                    'uin'       => $uin,
                    'loginflag' => 1,
                    'platform'  => '20',
                ),
            ),
        );

        foreach ($type as $vo) {
            $payload['req_0']['param']['songmid'][] = $data['data'][0]['mid'];
            $payload['req_0']['param']['filename'][] = $vo[2].$data['data'][0]['file']['media_mid'].'.'.$vo[3];
            $payload['req_0']['param']['songtype'][] = $data['data'][0]['type'];
        }

        $api = array(
            'method' => 'GET',
            'url'    => 'https://u.y.qq.com/cgi-bin/musicu.fcg',
            'body'   => array(
                'format'      => 'json',
                'platform'    => 'yqq.json',
                'needNewCode' => 0,
                'data'        => json_encode($payload),
            ),
        );
        $response = json_decode($this->exec($api), true);
        $vkeys = $response['req_0']['data']['midurlinfo'];

        foreach ($type as $index => $vo) {
            if ($data['data'][0]['file'][$vo[0]] && $vo[1] <= $this->temp['br']) {
                if (!empty($vkeys[$index]['vkey'])) {
                    $url = array(
                        'url'  => $response['req_0']['data']['sip'][0].$vkeys[$index]['purl'],
                        'size' => $data['data'][0]['file'][$vo[0]],
                        'br'   => $vo[1],
                    );
                    break;
                }
            }
        }
        if (!isset($url['url'])) {
            $url = array(
                'url'  => '',
                'size' => 0,
                'br'   => -1,
            );
        }
        return $url;
    }

    private function kg_https($url){
        $refer = "http://www.kugou.com/";
        $header = array(
        	'Cookie: ' . 'appver=1.5.0.75771;kg_mid=2a9f364a560176956f01d33837d5c571;',
    		'CLIENT-IP:  125.64.107.18',
    		'X-FORWARDED-FOR: 125.64.107.18'
    	);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
        curl_setopt($ch,CURLOPT_ENCODING,'gzip');
        curl_setopt($ch, CURLOPT_REFERER, $refer);
        $output = curl_exec($ch);
        curl_close($ch);
        return $output;
    }
    
    private function kugou_url($result)
    {
        $data = json_decode($result, true);
        if (isset($data['url'])) {
            $url = array(
                'url'  => $data['url'],
                'size' => $data['fileSize'],
                'br'   => $data['bitRate'] / 1000,
            );
        }
        if (!isset($url['url'])) {
            $url = array(
                'url'  => '',
                'size' => 0,
                'br'   => -1,
            );
        }

        return $url;
    }

    private function baidu_url($result)
    {
        $data = json_decode($result, true);

        $max = 0;
        $url = array();
        foreach ($data['songurl']['url'] as $vo) {
            if ($vo['file_bitrate'] <= $this->temp['br'] && $vo['file_bitrate'] > $max) {
                $url = array(
                    'url' => $vo['file_link'],
                    'br'  => $vo['file_bitrate'],
                );
            }
        }
        if (!isset($url['url'])) {
            $url = array(
                'url' => '',
                'br'  => -1,
            );
        }

        return $url;
    }

	private function kuwo_url($result)
    {
        $result = json_decode($result, true);
        $url = array();
        if ($result['code'] == 200 && isset($result['data']['url'])) {
            $url = array(
                'url' => $result['data']['url'],
                'br'  => 128,
            );
        } else {
            $url = array(
                'url' => '',
                'br'  => -1,
            );
        }
        return json_encode($url);
    }

	private function migu_url($result)
    {
        $result = json_decode($result, true)['data'];
        $url = array();
        if (isset($result['listenUrl'])) {
            $url = array(
                'url' => $result['listenUrl'],
                'br'  => 128,
            );
        } else {
            $url = array(
                'url' => '',
                'br'  => -1,
            );
        }
        return json_encode($url);
    }

    private function migu_derive($password, $salt, $keyLength, $ivSize){
        $keySize = $keyLength / 8;
        $repeat = ceil(($keySize + $ivSize * 8) / 32);
        $result = array();
        for($i=0;$i<$repeat;$i++){
            $result[] = md5(hex2bin(end($result)).$password.$salt);
        }
        $buffer = hex2bin(implode($result));
        return array('key'=>substr($buffer,0,$keySize), 'iv'=>substr($buffer,$keySize,$ivSize));
    }

    private function encode_migu_data($data)
    {
        $data = json_encode($data);
        $password = bin2hex($this->getRandom(32));
        $salt = $this->getRandom(8);
        $publicKey = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8asrfSaoOb4je+DSmKdriQJKWVJ2oDZrs3wi5W67m3LwTB9QVR+cE3XWU21Nx+YBxS0yun8wDcjgQvYt625ZCcgin2ro/eOkNyUOTBIbuj9CvMnhUYiR61lC1f1IGbrSYYimqBVSjpifVufxtx/I3exReZosTByYp4Xwpb1+WAQIDAQAB\n-----END PUBLIC KEY-----";
        $secret = $this->migu_derive($password, $salt, 256, 16);
        $data = openssl_encrypt($data, 'aes-256-cbc', $secret['key'], 1, $secret['iv']);
        openssl_public_encrypt($password, $secKey, $publicKey);
        $data = base64_encode('Salted__'.$salt.$data);
        $secKey = base64_encode($secKey);
        return array('dataType' => 2, 'data' => $data, 'secKey' => $secKey);
    }
    
    private function netease_lyric($result)
    {
        $result = json_decode($result, true);
        $data = array(
            'lyric'  => isset($result['lrc']['lyric']) ? $result['lrc']['lyric'] : '',
            'tlyric' => isset($result['tlyric']['lyric']) ? $result['tlyric']['lyric'] : '',
        );

        return $data;
    }

    private function tencent_lyric($result)
    {
        $result = substr($result, 18, -1);
        $result = json_decode($result, true);
        $data = array(
            'lyric'  => isset($result['lyric']) ? base64_decode($result['lyric']) : '',
            'tlyric' => isset($result['trans']) ? base64_decode($result['trans']) : '',
        );

        return $data;
    }
    
    private function kugou_lyric($result)
    {
        $result = json_decode($result, true);
        // die($result);
        $api = array(
            'method' => 'GET',
            'url'    => 'http://lyrics.kugou.com/download',
            'body'   => array(
                'charset'   => 'utf8',
                'accesskey' => $result['candidates'][0]['accesskey'],
                'id'        => $result['candidates'][0]['id'],
                'client'    => 'mobi',
                'fmt'       => 'lrc',
                'ver'       => 1,
            ),
        );
        $data = json_decode($this->exec($api), true);
        $arr = array(
            'lyric'  => base64_decode($data['content']),
        );

        return $arr;
    }

    private function baidu_lyric($result)
    {
        $result = json_decode($result, true);
        $data = array(
            'lyric'  => isset($result['lrcContent']) ? $result['lrcContent'] : '',
            'tlyric' => '',
        );

        return $data;
    }
    
	private function kuwo_lyric($result)
    {
        $result = json_decode($result, true);
        if (count($result['data']['lrclist'])) {
			$kuwolrc = '';
			for ($i = 0; $i < count($result['data']['lrclist']); $i++) {
				$otime = $result['data']['lrclist'][$i]['time'];
				$osec = explode('.', $otime)[0];
				$min = str_pad(floor($osec / 60), 2, "0", STR_PAD_LEFT);
				$sec = str_pad($osec - $min * 60, 2, "0", STR_PAD_LEFT);
				$msec = explode('.', $otime)[1];
				$olyric = $result['data']['lrclist'][$i]['lineLyric'];
				$kuwolrc = $kuwolrc . '[' . $min . ':' . $sec . '.' . $msec . ']' . $olyric . "\n";
			}
			$arr = array(
				'lyric'  => $kuwolrc,
				'tlyric' => '',
			);
        } else {
			$arr = array(
                'lyric'  => '',
                'tlyric' => '',
            );
		}
        return json_encode($arr, JSON_UNESCAPED_UNICODE);
    }

	private function migu_lyric($result)
    {
        $result = json_decode($result, true);
        $data = array(
            'lyric'  => ($result['returnCode'] == '000000') ? $result['lyric'] : '',
            'tlyric' => '',
        );
        return $data;
    }

    private function format_netease($data)
    {
        if (isset($data['song'])) {
            $data = $data['song'];
        }
        foreach ($data['ar'] as $vo) {
            $result[] = $vo['name'];
        }
        $author = implode(',', $result);
        $pic = isset($data['al']['pic_str']) ? $data['al']['pic_str'] : $data['al']['pic'];
        $result = array(
            'song_id'       => $data['id'],
            'name'          => $data['name'],
            'artist_name'   => $author,
            'album_name'    => $data['al']['name'],
            'album_cover'   => $data['al']['picUrl']?str_replace("http://",'https://',$data['al']['picUrl']).'?param=150x150':'https://p3.music.126.net/' . $this->netease_encryptId($pic) . '/' . $pic . '.jpg?param=130y130',
            'duration'      => round($data['dt']/1000),
            // 'pic_id'        => isset($data['al']['pic_str']) ? $data['al']['pic_str'] : $data['al']['pic'],
            'source'        => 'netease',
            'type'          => 'wy',
        );
        return $result;
    }

    private function format_tencent($data)
    {
        if (isset($data['musicData'])) {
            $data = $data['musicData'];
        }
        $result = array(
            'song_id' => $data['mid'],
            'name' => $data['title'],
            'album_name'  => trim($data['album']['title']),
            'album_cover' => 'https://y.gtimg.cn/music/photo_new/T002R150x150M000'.$data['album']['mid'].'.jpg?max_age=2592000',
            'duration'    => $data['interval'],
            'pic_id'      => $data['album']['mid'],
            // 'lyric_id' => $data['mid'],
            'source'      => 'tencent',
            'type'        => 'qq',
        );
        foreach ($data['singer'] as $vo) {
            $artist[] = $vo['name'];
        }
        $result['artist_name'] = implode(',', $artist);
        return $result;
    }

    private function format_kugou($data)
    {
        $data = $this->format(false)->song($data['hash']);
        $this->format = $format;
        $data = json_decode($data, true);
        $img = str_replace('{size}', '400', $data['album_img']);
        $result = array(
            'song_id'     => $data['hash'],
            'name'        => isset($data['filename']) ? $data['filename'] : $data['fileName'],
            'album_name'  => isset($data['album_name']) ? $data['album_name'] : '',
            'album_cover' => str_replace('http://imge.kugou.com/', 'https://p3fx.kgimg.com/', $img),
            'duration'    => $data['duration'],
            'pic_id'      => $data['hash'],
            // 'lyric_id' => $data['hash'],
            'source'      => 'kugou',
            'type' => 'kg',
        );
        list($artist, $result['name']) = explode(' - ', $result['name'], 2);
        $artist = explode('、', $artist);
        $result['artist_name'] = implode(',', $artist);

        return $result;
    }

    private function format_baidu($data)
    {
        $result = array(
            'song_id'       => $data['song_id'],
            'name'          => $data['title'],
            'artist_name'   => $data['author'],
            'album_name'    => $data['album_title'],
            'album_cover'   => str_replace('http://', 'https://', str_replace('_90', '_400', $data['pic_small'])),
            'duration'      => $data['file_duration'],
            // 'url_id'   => $data['song_id'],
            // 'lyric_id' => $data['song_id'],
            'source'        => 'baidu',
            'type'          => 'bd',
            // 'source'   => 'baidu',
        );

        return $result;
    }

	protected function format_kuwo($data)
    {
        $result = array(
            'song_id'       => $data['rid'],
            'name'          => $data['name'],
            'artist_name'   => explode('&', $data['artist']),
            'album_name'    => $data['album'],
            'duration'      => $data['duration'],
            // 'pic_id'   => $data['rid'],
            'album_cover'   => $data['pic'],
            // 'url_id'   => $data['rid'],
            // 'lyric_id' => $data['rid'],
            'source'        => 'kuwo',
            'type'          => 'kw',
        );

        return $result;
    }

    private function format_migu($data)
    {
        $artist = implode(',', $data['singerName']);
        $result = array(
            'song_id'       => $data['copyrightId'],
            'name'          => $data['songName'],
            'artist_name'   => isset($data['artist']) ? $data['artist'] : $artist,
            'album_name'    => isset($data['albumName']) ? $data['albumName'] : '',
            'album_cover'   => isset($data['cover']) ? $data['cover'] : $data['picM'],
            // 'location'      => $data['listenUrl'],
            'source'        => 'migu',
            'type'          => 'mg',
        );
        return $result;
        
    }
    public function is_md5($password)
    {
        // 判断是否是md5
        return (bool)preg_match("/^[a-z0-9]{32}$/", $password);
    }


}