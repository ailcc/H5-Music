<?php
/**
 * Created by PhpStorm.
 * User: Zing
 * Date: 2018/9/1
 * Time: 10:43
 */

namespace app\admin\controller;


use app\common\controller\BackendBaseController;
use think\Db;
use think\facade\View;
use think\facade\Session;
use think\facade\Request;

/**
 * 歌单管理控制器
 * Class SongSheet
 * @package app\admin\controller
 */
class Song extends BackendBaseController
{

    protected function initialize()
    {
        parent::initialize();

    }
    
    /**
     * 获取歌曲信息
     * @param $id
     */
    public function index($id)
    {
        $this->getSide();
        $song = Db::table('song')->where('id', $id)->find();
        View::assign('song', $song);
        return View::fetch();
    }
    
    public function edit($id)
    {
        $this->getSide();
        if (Request::isPost()) {
            $data = Request::post();
            foreach ($data as $k=>$v){
                $res =  Db::table('song')->where('id',$data['id'])->update([$k=>$v]);
            }
            $this->success('修改成功');
        } else {
            $this->error('非法操作');
        }
        // View::assign('song', $song);
        return View::fetch();
    }
    
    /**
     * 检查歌曲解析
     * @param $id
     */
    public function check()
    {
        $this->getSide();
        if (Request::isPost()) {
            $id = input('id');
            $taxis = input('taxis');
            $res =  Db::table('song')->where('song_sheet_id',$id)->where('taxis',$taxis)->field('song_id,type,name,location')->find();
            if(empty($res)) return error('参数错误');
            if(strpos($res['location'],'http') !== false){
                if(httpcode($res['location']) == 200){
                    $res['loc'] = $res['location'];
                }
            }else{
                $songs = model('admin/Song')->findMusicInfo($res['type'],$res['song_id']);
                if(empty($songs[0]['url'])){
                    $res['loc'] = -1;
                }else{
                    if(httpcode($songs[0]['url']) == 200 && !strpos($songs[0]['url'],'404')){
                        $res['loc'] = 1;
                    }else{
                        $res['loc'] = -1;
                    }
                }
                Db::table('song')->where('song_sheet_id',$id)->where('taxis',$taxis)->update(['location' => $res['loc']]);
            }
            unset($res['location']);
            return $this->success('success','',$res);
        } else {
            return $this->error('权限不足');
        }
        // View::assign('song', $song);
        return View::fetch();
    }
    
}