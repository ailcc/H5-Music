<?php
/**
 * Created by PhpStorm.
 * User: Zing
 * Date: 2018/8/30
 * Time: 10:05
 */

namespace app\common\controller;


use app\admin\library\Auth;
use app\admin\library\traits\Backend;
use think\Controller;
use think\Db;
use think\facade\Session;
use think\facade\View;

class BackendBaseController extends Controller
{
    protected $model = null;
    static protected $roleCheckFailMsg = '权限不足';

    /**
     * 无需登录的方法
     * @var array
     */
    protected $noNeedLogin = [];

    // 引入代码块
    use Backend;

    protected function initialize()
    {
        $usr = $this->request->url();
        //获取用户信息
        $userInfo = model('user')->where('id',Session::get('loginUser')['id'])->find();
        View::assign('userInfo',$userInfo);
        $s_time = session('logintime');
        if (((time() - $s_time) > 3600 && Session::has('loginUser')) || (empty($userInfo)&&Session::has('loginUser'))) {
            session(null);
            $this->error('当前用户异常，请重新登陆','/admin/user/login');
        } else {
        	session('logintime',time());
        }
        // 检查是否需要登陆
        if(!Auth::instance()->match($this->noNeedLogin)){

            // 检查是否登陆
            if(!Auth::instance()->isLogin()){
//                $url = Session::get('referer');
//                $url = $url ? $url : $this->request->url();
                $this->error('登陆超时，请重新登陆。', '/admin/user/login');
            }
        }
        

    }

    /**
     * 检查播放器是否属于用户
     */
    protected function checkPlayerRole($playerId){
        $player = Db::table('player')->where('user_id',session('loginUser.id'))->where('id',$playerId)->find();
        if($player == null && session('loginUser.permissions') !== 0) {
            $this->error(self::$roleCheckFailMsg);
        }
    }
    
    /**
     * 检查是否为管理员
     */
    protected function isAdmin(){
        $songSheet = Db::table('user')->where('id',session('loginUser.id'))->find();
        // die(json_encode(session('loginUser')));
        if($songSheet['permissions'] !== 0){
            $this->error(self::$roleCheckFailMsg);
        }
    }

    /**
     * 检查歌单是否属于用户
     */
    protected function checkSongSheetRole($songSheetId){
        // $songSheetModel = model('SongSheet');
        $songSheet = Db::table('song_sheet')->where('user_id',Session::get('loginUser')['id'])->where('id',$songSheetId)->find();
        if($songSheet == null && session('loginUser.permissions') !== 0) {
            $this->error(self::$roleCheckFailMsg);
        }
    }

    /**
     * 获取侧边所需数据
     */
    protected function getSide(){
        // 获取用户拥有的播放器
        $playerModel = model('Player');
        $userPlayers = $playerModel->where('user_id',Session::get('loginUser')['id'])->select();

        // 获取用户所拥有的歌单
        $songSheetModel = model('SongSheet');
        $userSongSheets = $songSheetModel->where('user_id',Session::get('loginUser')['id'])->select();
        
        // 获取公用歌单
        $openSongSheets = Db::table('song_sheet')->where('public','1')->order('create_time DESC')->select();
        
        $list = [
            'userPlayers' => $userPlayers,
            'userSongSheets' => $userSongSheets,
            'openSongSheets' => $openSongSheets,
            ];
        View::assign($list);
    }

}