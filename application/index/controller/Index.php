<?php
/**
 * Created by PhpStorm.
 * User: Zing
 * Date: 2018/8/30
 * Time: 16:33
 */

namespace app\index\controller;

use think\Db;
use app\common\controller\FrontendBaseController;

/**
 * 前端控制器首页
 * Class Index
 * @package app\index\controller
 */
class Index extends FrontendBaseController
{
    /**
     * 播放器首页
     * @param $ailcc 
     * @ailcc.com 沛霖主页
     */
    public function index(){
        $ailcc = Db::table('options')->where('type','in','ailcc')->field('code,value')->column('value','code');
        $this->assign('ailcc',$ailcc);
        return $this->fetch();
    }
}