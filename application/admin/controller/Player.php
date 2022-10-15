<?php
/**
 * Created by PhpStorm.
 * User: Zing
 * Date: 2018/8/30
 * Time: 17:12
 */

namespace app\admin\controller;


use app\common\controller\BackendBaseController;
use ilt\Random;
use think\Db;
use think\facade\Cache;
use think\facade\Session;

/**
 * 播放器管理控制器
 * Class Player
 * @package app\admin\controller
 */
class Player extends BackendBaseController
{
    protected function initialize()
    {
        parent::initialize();
        $this->model = model('Player');
    }

    /**
     * 添加播放器
     */
    public function add()
    {
    	$quota = Db::table('user')->where('id',session('loginUser.id'))->value('quota');
    	$C_player = Db::table('player')->where('user_id',session('loginUser.id'))->count();
    	if($C_player >= $quota && session('loginUser.id') !== '0'){
    		$this->error('您的账户只能添加'.$quota.'个播放器!</br>请升级版本，或购买播放器额度！');
    	}
        $this->model->save([
            'id'=>Random::uuid(),
            'user_id'=> Session::get('loginUser')['id'],
            'name'=> $this->request->post('name'),
            'site_name'=> '沛霖主页',
            'greeting'=> '欢迎光临沛霖主页！']);
        $this->success('添加播放器成功！');
    }

    /**
     * 删除播放器
     * @param $id string 播放器id
     * @throws \Exception
     */
    public function del($id)
    {
        $this->checkPlayerRole($id);
        // 删除播放器关联歌单数据  但并未删除歌单
        model('PlayerSongSheet')->where('player_id',$id)->delete();
        // 删除播放器
        $this->model->get($id)->delete();
        $this->success('删除成功！');
    }

    /**
     * 获取播放器
     * @param $id
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function index($id)
    {
        $this->checkPlayerRole($id);
        $this->getSide();

        $entity = $this->model->get($id);
        $this->assign('entity', $entity);

        // 获取播放器歌单
        $list = $this->model->songSheets($id);
        $this->assign('selectedSongSheetList', $list);

        // 获取用户的所有歌单
        $userSongSheet = Db::table('song_sheet')
            ->where('user_id', $entity->user_id)
            ->select();
        $this->assign('userSongSheet', $userSongSheet);

        // 获取播放器授权域名
        $domain = $this->model->where('id', $id)->find()['domain'];
        if($domain==null||$domain==''||$domain=='null'){
            $domain = [];
        }else{
            $domain = json_decode($domain);
        }
        
        $this->assign('domain', $domain);
        return $this->fetch();
    }
    
    /**
     * 用户编辑歌单
     * @param $playerId string|int 播放器id
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function editPlayerSongSheet($playerId){
        $this->checkPlayerRole($playerId);
        // 删除api缓存
        Cache::rm('info'.$playerId);
        $ids = $this->request->post('ids/a');
        $dms = input('post.dms/a');
        $dms = $dms ? json_encode($dms) : null;
        $this->model->where('id',$playerId)->update(['domain' => $dms]);

        // 删除之前的关联
        Db::table('player_song_sheet')->where('player_id',$playerId)->delete();
        
        if($ids != null){
            $joins = [];
            for($i = 0;$i < count($ids);$i++){
                $joins[$i] = ['player_id' => $playerId,'song_sheet_id' => $ids[$i],'taxis'=>$i];
            }

            //插入编辑之后的数据
            db('player_song_sheet')->insertAll($joins);
        }

        $this->success('保存成功！');
    }

    /**
     * 更新播放器
     */
    public function edit()
    {
       $this->checkPlayerRole($this->request->post('id'));
        // 删除api缓存
        Cache::rm('info'.$this->request->post('id'));

        $this->model->save([
            'auto_player'=> $this->request->post('auto_player',0),
            'random_player'=> $this->request->post('random_player',0),
            'name'=> $this->request->post('name',''),
            'site_name'=> $this->request->post('site_name',''),
            'greeting'=> $this->request->post('greeting',''),
            'show_greeting'=> $this->request->post('show_greeting',0),
            'background'=> $this->request->post('background',0),
            'default_volume'=> $this->request->post('default_volume',100),
            'default_album'=> $this->request->post('default_album',0),
            'show_lrc'=> $this->request->post('show_lrc',0),
            'show_mobile'=> $this->request->post('show_mobile',0),
            'player_width'=> $this->request->post('player_width')==0?-1:$this->request->post('player_width'),
            'cover_width'=> $this->request->post('cover_width')==0?-1:$this->request->post('cover_width'),
            'player_color'=> $this->request->post('player_color',-1),
            'show_notes'=> $this->request->post('show_notes',0),
            'show_msg'=> $this->request->post('show_msg',0),
            'error'=> $this->request->post('error',null),
            'auto_popup_player'=> $this->request->post('auto_popup_player',-1),
        ],
            ['id'=> $this->request->post('id')]);
        $this->success('保存成功！');
    }

}