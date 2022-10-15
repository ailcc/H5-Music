<?php
/**
* 
* @Web: 	沛霖主页
* @Url: 	https://blog.ailcc.com
* @DateTime: 	2019-11-16
*
*/

namespace app\admin\controller;


use app\common\controller\BackendBaseController;
use ilt\GeetestLib;
use ilt\MusicApi;
use ilt\Random;
use think\Db;
use think\facade\Cache;
use think\facade\View;
use think\facade\Session;
use useragens\UserAentFactory;

/**
 * 用户管理控制器
 * Class User
 * @package app\admin\controller
 */
class User extends BackendBaseController
{
    protected $noNeedLogin = ['login','register'];

    // 初始化
    protected function initialize()
    {
        parent::initialize();
        $this->model = model("User");
    }

    /**
     * 登陆跳转以及验证
     * @return mixed
     * 登录时记录登录IP与时间
     */
    public function login()
    {
        // 判断是否为ajax
        if ($this->request->isPost()) {
            $qqio = $this->request->post('qq');
            $username = $this->request->post('username');
            $password = md5($this->request->post('password'));
            $logintime =  date('Y-m-d H:i:s');
            
            $user = $this->model->where(['username' => $username, 'password' => $password])->find();
            if($logintime > $user['times_log']){
                Db::name('user')->where('id', $user['id'])->data(['status' => '0'])->update();      //账户状态修改为禁用
                Db::name('player')->where('user_id', $user['id'])->data(['domain' => '["ailcc.com"]'])->update();    //播放器授权域名修改
                $this->error("账号已过期，请联系站长处理");
            }
            if ($user == null) {
            	$this->error('用户名或密码错误');
            } 
            if($user['status'] == 0){
				$this->error("账号被禁用，请联系站长");  //status=0 则提示账户被禁用
			} else {
				$GtSdk = new GeetestLib(config('geetest.captcha_id'), config('geetest.private_key'));
                $data = array(
                        "user_id" => session('user_id'), # 网站用户id
                        "client_type" => "web", #web:电脑上的浏览器；h5:手机上的浏览器，包括移动应用内完全内置的web_view；native：通过原生SDK植入APP应用的方式
                        "ip_address" => "127.0.0.1" # 请在此处传输用户请求验证时所携带的IP
                    );
                    
                if (session('gtserver') == 1) {   //服务器正常
                    $result = $GtSdk->success_validate($_POST['geetest_challenge'], $_POST['geetest_validate'], $_POST['geetest_seccode'], $data);
                    if ($result) {
                        // echo '{"status":"登陆成功！"}';
                        
                    } else {
                        echo '{"status":"登陆失败！"}';
                        return false;
                    }
                }else{  //服务器宕机,走failback模式
                    if ($GtSdk->fail_validate($_POST['geetest_challenge'],$_POST['geetest_validate'],$_POST['geetest_seccode'])) {
                        // echo '{"status":"登陆成功！"}';
                    } else {
                        echo '{"status":"登陆失败！"}';
                        return false;
                    }
                }
			    $con = file_get_contents('https://apis.map.qq.com/ws/location/v1/ip?key=此处为获取IP真实地址的key&ip='.$this->request->ip());
			    $json = json_decode($con,true);
			    	if($json['status'] == 0){
			    		$ipdz = $json['result']['ad_info']['nation'].$json['result']['ad_info']['province'].$json['result']['ad_info']['city'].$json['result']['ad_info']['district'];
			    	} else {
            			$ipdz = "未获取到地址,你可能住在火星";
            		}
                Session::set('loginUser', $user->toArray());
                // 更新登陆信息
                $user->last_login_time = date("Y-m-d H:i:s"); //记录每次登录时间
                $user->create_ipv = $this->request->ip(); //记录每次登录IP
                $user->last_login_site = $ipdz; //记录每次登录位置信息
                $user->save();
                $this->success('登陆成功');
            }
        }
        // 页面跳转
        return $this->fetch();
    }

    /**
     * 用户注册
     * status 账户状态 0禁用 1正常
     * permissions 账户权限 1普通用户 9管理员账户
     * 注册时记录注册IP与注册时间
     */
    public function register()
    {
    	
        // 判断是否为ajax
         if ($this->request->isPost()) {
    		$mteam = $this->request->post('mteam');     //获取提交的邀请码
        	$username = $this->request->post('username');
        	$password = md5($this->request->post('password'));
        	$qq = $this->request->post('qq');
        	
         	$Invite = Db::table('invite')->where('invite',$mteam)->find();      //查询邀请码信息
         	if($mteam != $Invite['invite']){
         	    $this->error('邀请码错误，请检查邀请码');
         	}
    		if($Invite['status'] == 1){      //判断邀请码是否已使用
            	$this->error('邀请码已被使用，请获取新的邀请码');
        	}
        	$users = $this->model->where('username',$username)->select();   // 查询是否存在重复用户名
        	if(count($users) > 0){
            	$this->error('用户名重复');
       		}
        	$qqio = $this->model->where('qq',$qq)->select();    // 查询是否存在重复QQ
        	if(count($qqio) > 0){
            	$this->error('QQ号重复');
        	}
        	if($username&&$password&&$qq){
        	    Db::name('invite')->where('invite', $mteam)->data(['status' => '1','name'=>$username])->update(); //将邀请码设置为已使用状态
            	// 持久化
            	$this->model->save([
                	'id' => Random::uuid(),
                	'username' => $username,
                	'password' => $password,
                	'qq' => $qq,
                	'permissions' => ('1'), //账户权限为普通用户 管理员为9
                	'status' => ('1'), //注册即禁用账户 正常账户为1
                	'token' => md5(sha1(date("Y-m-d H:i:s").rand())),
                	'times_log' => date('Y-m-d H:i:s',strtotime('+1 day',time())), //账户有效期7天
                	"create_time" => date("Y-m-d H:i:s"), //记录注册时间 永久保存
                	'create_ip' => $this->request->ip() //记录注册IP 永久保存
            	]);
            	
            	$this->success('注册成功！');
        	}else{
            	$this->error('非法请求！');
        	}
         }
        // 页面跳转
        return $this->fetch();
    }

    /**
     * 退出登陆
     */
    public function logout()
    {
        Session::clear();
        $this->success('退出成功');
    }

    /**
     * 重设密码
     * @param $beforePwd string 老密码
     * @param $newPwd string 新密码
     * @return mixed
     */
    public function resetPwd($beforePwd = '',$newPwd = ''){
        $this->getSide();
        if($this->request->isPost()){
            $loginUser = Session::get('loginUser');
            if(md5($beforePwd) != $loginUser['password']){
                $this->error('原始密码有误！');
            }

            $md5NewPwd = md5($newPwd);
            $this->model->save(['password'=>$md5NewPwd],['id'=>$loginUser['id']]);
            $loginUser['password'] = $md5NewPwd;
            Session::set('loginUser',$loginUser);

            $this->success('重置成功！');
        }
        return $this->fetch();
    }

    /**  个人信息   */
    public function userinfo() {
        $this->getSide();
        return $this->fetch();
    }
    
    /**
     * 重设绑定QQ
     * @param $beforeqq string 老QQ
     * @param $newqq string 新QQ
     * @return mixed
     */
    public function resetqq($beforeqq = '',$newqq = ''){
        $this->getSide();
        $qq = $this->request->post('qq');
        if($this->request->isPost()){
            $loginUser = Session::get('loginUser');
         // 查询是否存在重复QQ
         $qqio = $this->model->where('qq',$newqq)->select();
         if(count($qqio) > 0){
             $this->error('该QQ已被使用！');
            }
            $this->model->save(['qq'=>$newqq],['id'=>$loginUser['id']]);
            $loginUser['qq'] = $newqq;
            Session::set('loginUser',$loginUser);

            $this->success('重置成功！');
        }
        return $this->fetch();
    }
    /**
     * 重设用户名
     * @param $newname string 新用户名
     * @return mixed
     */
    public function resetname($beforename = '',$newname = ''){
        $this->getSide();
        $name = $this->request->post('username');
        if($this->request->isPost()){
            $loginUser = Session::get('loginUser');
            // 查询是否存在重复用户名
            $users = $this->model->where('username',$newname)->select();
            if(count($users) > 0){
            $this->error('用户名已被使用！');
            }
            $this->model->save(['username'=>$newname],['id'=>$loginUser['id']]);
            $loginUser['username'] = $newname;
            Session::set('loginUser',$loginUser);

            $this->success('重置成功！');
        }
        return $this->fetch();
    }
      /**
     * 重设绑定邮箱
     * @param $beforeqq string 老邮箱
     * @param $newqq string 新邮箱
     * @return mixed
     */
    public function resetmail($beforemail = '',$newmail = ''){
        $this->getSide();
        $mail = $this->request->post('email');
        if($this->request->isPost()){
            $loginUser = Session::get('loginUser');
         // 查询是否存在重复QQ
         $mailio = $this->model->where('email',$newmail)->select();
         if(count($mailio) > 0){
             $this->error('该邮箱已被使用！');
            }
            $this->model->save(['email'=>$newmail],['id'=>$loginUser['id']]);
            $loginUser['email'] = $newmail;
            Session::set('loginUser',$loginUser);

            $this->success('重置成功！');
        }
        return $this->fetch();
    }
    /**
     * 用户详情
     * @param $id string 用户id
     * @return mixed
     */
    public function index($id){
        $this->isAdmin();
        // // 获取用户的所有歌单
        $user = Db::table('user')->where('id',$id)->find();
        if($user == null){
            return error('用户不存在！');
        }
        // // 获取用户的所有歌单
        $SongSheets = Db::table('song_sheet')->where('user_id',$id)->order('create_time DESC')->select();
        $PlayerSheets = Db::table('player')->where('user_id',$id)->order('create_time DESC')->select();
        
        $view = [
            'SongSheets' => $SongSheets,
            'PlayerSheets' => $PlayerSheets,
            'userinfo' => $user
        ];
        View::assign($view);
        $type = $this->request->get('type');
        if($type == 'SongSheets'){
            return json(['code'  => 0,'msg'   => 'success','count'   => count($SongSheets),'data'  => $SongSheets]);
        }elseif($type == 'playerList'){
            return json(['code'  => 0,'msg'   => 'success','count'   => count($PlayerSheets),'data'  => $PlayerSheets]);
        }
        return $this->fetch();
    }
    

    
}