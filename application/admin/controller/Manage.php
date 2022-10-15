<?php
namespace app\admin\controller;
use app\common\controller\BackendBaseController;
use think\Db;
use think\facade\View;
use think\facade\Session;
class Manage extends BackendBaseController
{
    public function index()
    {
        // $this->getSide();
        return View::fetch();
    }
    
    /* invite */
    public function invite(){
        // 获取邀请码列表
        $this->isAdmin();
        $type = input('get.type');
        $page = input('get.page') ?? 1;
        $limit = input('get.limit') ?? 50;
        if($type == 'all'){
        	$Total = Db::table('invite')->count();
            $invite = Db::table('invite')->page($page,$limit)->order('id DESC')->select();
            return json(['code'=> 0,'msg'=>'获取成功','count'=>$Total,'data'=>$invite]);
        }
        return View::fetch();
    } 

    /**
     * 用户列表
     * @return mixed
     */
    public function userList(){
        // 获取用户列表
        $this->isAdmin();
        $type = input('get.type');
        $page = input('get.page') ?? 1;
        $limit = input('get.limit') ?? 50;
        if($type == 'all'){
        	$Total = Db::table('user')->count();
            $userList = Db::table('user')->page($page,$limit)->order('last_login_time DESC')->select();
            return json(['code'=> 0,'msg'=>'获取成功','count'=>$Total,'data'=>$userList]);
        }
        return View::fetch();
    }   
    
    // 管理用户
    public function user() {
    	
        $this->isAdmin();
        $userList = Db::table('user')->order('last_login_time DESC')->select();
        $this->assign('userList',$userList);
        if ($this->request->isPost()) {
            $id = input('post.id');
            $action = input('post.action');
            $category = input('post.category');
            $value = input('post.value');
            if($value == 'true'){
                $value = '1';
            }elseif($value == 'false'){
                $value = '0';
            }
            switch ($action) {
                case 'songsList':
                    if($category == 'del'){
                        // 管理员删除歌单
                        Db::table('song_sheet')->delete($id);
                        Db::table('song')->where('song_sheet_id',$id)->delete();
                    }else{
                        Db::table('song_sheet')->update([$category => $value,'id'=>$id]);
                    }
                    break;
                    
                case 'playerList':
                    if($category == 'del'){
                        // 管理员删除播放器
                        Db::table('player_song_sheet')->where('player_id',$id)->delete();
                        // 删除播放器
                        Db::table('player')->delete($id);
                    }else{
                        Db::table('player')->update([$category => $value,'id'=>$id]);
                    }
                    break;
                    
                case 'user':
                    if($category == 'del'){
                        if($id == 1){
                            return $this->error('管理员账户禁止删除');
                        }
                        //删除用户
                        Db::table('user')->delete($id);
                        
                        $userplayer = Db::table('player')->where('user_id',$id)->select();
                        foreach ($userplayer as $v) {
                            //删除播放器关联歌单
                            Db::table('player_song_sheet')->where('player_id',$v['id'])->delete();
                        }
                        
                        $song_sheet = Db::table('song_sheet')->where('user_id',$id)->select();
                        foreach ($song_sheet as $v) {
                            //删除歌单关联歌曲
                            Db::table('song')->where('song_sheet_id',$v['id'])->delete();
                        }
                        
                        //删除关联歌单
                        Db::table('song_sheet')->where('user_id',$id)->delete();
                        
                        //删除关联播放器
                        Db::table('player')->where('user_id',$id)->delete();
                    }else{
                        // 更新用户信息
                        Db::table('user')->update([$category => $value,'id'=>$id]);
                    }
                    break;
                
                default:
                    return $this->error('错误参数！');
                    break;
            }
            if($category == 'del'){
                return $this->success('删除成功！');
            }else{
                return $this->success('保存成功！');
            }
        }
        $this->getSide();
        return $this->fetch();
    }
    
    /* 随机生成一串字符串 并存储 */
    function invite_log($length=18, $type='all', $convert=0){
        $config = array(
            'number'=>'1234567890',
            'letter'=>'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            'string'=>'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789',
            'all'=>'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        );
        if(!isset($config[$type])) $type = 'string';
        $string = $config[$type];
     
        $code = '';
        $strlen = strlen($string) -1;
        for($i = 0; $i < $length; $i++){
            $code .= $string{mt_rand(0, $strlen)};
        }
        if(!empty($convert)){
            $code = ($convert > 0)? strtoupper($code) : strtolower($code);
        }
        $data = [
            'invite'    => $code,
            'user_id'   => Session::get('loginUser')['id'],
            'status'    => '0',
            'sort'      =>'0',
            'last_login_time' =>date("Y-m-d H:i:s"),
            ];
        Db::name('invite')->data($data)->insert();
        return json(['code'=> 0,'msg'=>'生成成功 '.$code]);
    }
}