<?php
namespace app\admin\controller;

use app\common\controller\BackendBaseController;
use think\Db;
use think\facade\Request;
use think\facade\View;
class Index extends BackendBaseController
{
   /* 首页 */
    public function index()
    {	
    	$ailcc = Db::table('options')->where('type','in','ailcc')->field('code,value')->column('value','code');
        $this->assign('ailcc',$ailcc);
        $this->getSide();
        return $this->fetch();
    }

  /* help */
    public function help(){
        $this->getSide();
        return $this->fetch();
    }
  
    /* update */
    public function update(){
        $this->getSide();
        return $this->fetch();
    }  
    
    /* info */
    public function info(){
        $user = Db::name('user')->find();
        $this->assign('user',$user);
        $this->getSide();
        return $this->fetch();
        
    }

  /* setting */
    public function setting(){
    	$this->isAdmin();
        $group =  ['site','auth'];
        $list = Db::table('config')->where('type','in',$group)->field('code,value')->column('value','code');
        View::assign('config',json_encode($list));
        $this->getSide();
        return $this->fetch();
    }
    
    //配置修改
    public function site()
    {
        $this->isAdmin();
        if (Request::isPost()) {
            $data = Request::post();
            foreach ($data as $k=>$v){
                $v = $v == 'false' ? null : $v;
                $res =  Db::table('config')->where('code',$k)->update(['value'=>$v]);
            }
            return $this->success('保存成功');
        } else {
            return $this->error('非法操作');
        }
    }

  /* options */
    public function options(){
    	$this->isAdmin();
        $group =  ['ailcc'];
        $list = Db::table('options')->where('type','in',$group)->field('code,value')->column('value','code');
        View::assign('options',json_encode($list));
        $this->getSide();
        return $this->fetch();
    }
    
    //配置修改
    public function ailcc()
    {
        $this->isAdmin();
        if (Request::isPost()) {
            $data = Request::post();
            foreach ($data as $k=>$v){
                $v = $v == 'false' ? null : $v;
                $res =  Db::table('options')->where('code',$k)->update(['value'=>$v]);
            }
            return $this->success('保存成功');
        } else {
            return $this->error('非法操作');
        }
    }
    
    /* 清除缓存 */
    public function qqhc() {
    $this->getSide();
    if($this->request->isPost()){
            $loginUser = Session::get('loginUser');
            $loginUsers = $loginUser['id'];
        }
        return $loginUsers();
    // $CACHE_PATHA = config('cache.runtime_path').'/'.$user_id.'/';
    // if (delete_dir_file($CACHE_PATHA)) {
    //     $this->success('清除缓存成功!');
    // } else {
    //     $this->error('清除缓存失败!');
    // }
}

}
