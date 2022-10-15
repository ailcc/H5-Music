{__NOLAYOUT__}<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
  <title>跳转提示</title>
  <link rel="stylesheet" href="/static/layuiadmin/layui/css/layui.css?v=0801" media="all">
 <style type="text/css">
		.layui-fluid {padding: 15px;}
		.layadmin-tips {margin-top: 10%;text-align: center;}
        .layadmin-tips .layui-icon[face] {display: inline-block;font-size: 300px;color: #393D49;}
        .layadmin-tips .layui-text {width: 500px;margin: 30px auto;padding-top: 20px;border-top: 5px solid #009688;font-size: 16px;}
        .success {font-size: 20px;margin-top:20px;width:100%;}
    </style>
</head>
<body>
  <div class="layadmin-tabspage-none">
  	<div class="layui-layout layui-layout-admin">
    	<div class="layadmin-tabsbody-item layui-show">
    		<div class="layui-fluid">
				<div class="layadmin-tips">
					<?php switch ($code) {?>
            <?php case 1:?><h1><i class="layui-icon" face=""></i></h1>
            		<p class="success"><?php echo(strip_tags($msg));?></p>
            <?php break;?>
            <?php case 0:?><h1><i class="layui-icon" face=""></i></h1>
            		<p class="success"><?php echo(strip_tags($msg));?></p>
            <?php break;?>
        <?php } ?>
    		<div class="layui-text" style="font-size: 20px;">
    					<p class="detail"></p>
        				<p class="jump">页面自动 <a id="href" href="/admin/user/login">跳转</a> 等待时间： <b id="wait"><?php echo($wait);?></b></p>
        			</div>
				</div>
			</div>
		</div>
	</div>
</div>
    <script type="text/javascript">
        (function(){
            var wait = document.getElementById('wait'),
                href = document.getElementById('href').href;
            var interval = setInterval(function(){
                var time = --wait.innerHTML;
                if(time <= 0) {
                    location.href = href;
                    clearInterval(interval);
                };
            }, 1000);
        })();
    </script>
    <script type="text/javascript">
    if (window != top)
top.location.href = location.href;
    </script>
</body>
</html>