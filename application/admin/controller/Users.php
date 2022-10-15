<?php
/**
* 
* @Web: 	沛霖主页
* @Url: 	https://blog.ailcc.com
* @DateTime: 	2019-11-16
* @Desc: 	极验
*
*/

namespace app\admin\controller;

use ilt\GeetestLib;
use think\Controller;

/**
 * 用户管理控制器
 * Class User
 * @package app\admin\controller
 */
class Users extends Controller
{
    public function startcaptcha(){
        $GtSdk = new GeetestLib(config('geetest.captcha_id'), config('geetest.private_key'));
        $data = array(
                "user_id" => "test", # 网站用户id
                "client_type" => "web", #web:电脑上的浏览器；h5:手机上的浏览器，包括移动应用内完全内置的web_view；native：通过原生SDK植入APP应用的方式
                "ip_address" => "127.0.0.1" # 请在此处传输用户请求验证时所携带的IP
            );
        $status = $GtSdk->pre_process($data, 1);
        session('gtserver',$status);
        session('user_id',$data['user_id']);
        echo $GtSdk->get_response_str();
    }
    

    
}