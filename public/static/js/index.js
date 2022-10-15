/** index.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */
layui.config({
    base: 'js/'
}).use(['element', 'layer', 'form'], function () {
    var element = layui.element,
        $ = layui.jquery,
        form = layui.form;
        layer = layui.layer;
    //iframe自适应
    $(window).on('resize', function () {
        var $content = $('.admin-nav-card .layui-tab-content');
        $content.height($(this).height() - 147);
        $content.find('iframe').each(function () {
            $(this).height($content.height());
        });
    }).resize();

    $('.layui-nav-item').find('a').removeClass('layui-this');
    var wl = String(window.location);
    $('.layui-nav-child dd').each(function () {
        //alert();
        if (wl.indexOf($(this).find('a').attr('href')) > 0) {
            $(this).find('a').parent().addClass('layui-this');
        }

    });
	$('#addPlayer').click(function () {
		//默认prompt
		layer.prompt({title: '请输入播放器名称'},function (val, index) {
			$.post("/admin/player/add", {name:val}, function (data) {
				if (data.code === 1) {
                    layer.msg("播放器《" + val + "》添加成功！", {icon: 6, time: 1000},function() {
						window.parent.location.reload();
					});
				} else {
                    layer.msg(data.msg, {icon: 2, time: 2000},function() {
						window.parent.location.reload();
					});
				}
				layer.close(index);
			});
		});
	});
	$('#addSongSheet').click(function () {
		//默认prompt
		layer.prompt({title: '请输入歌单名称'},function (val, index) {
			$.post("/admin/songSheet/add", {name:val}, function (data) {
                if (data.code === 1) {
                    layer.msg("歌单《" + val + "》添加成功！", {icon: 6, time: 1000},function() {
						window.parent.location.reload();
					});
				} else {
                    layer.alert('添加失败！');
				}
				layer.close(index);
			});
		});
	});  
	form.on('submit(updPwd)', function (data) {
        var beforePwd = $("#beforePwd").val();
        var newPwd = $("#newPwd").val();
        var chkPwd = $("#chkPwd").val();

        if(newPwd !=chkPwd ){
        	layer.msg("两次密码输入不一致！");
        	return false;
		}
        if(newPwd.length < 6){
			layer.msg("密码长度不能小于6位！");
			return false;
		}
      layer.confirm('确定要修改新密码为：' + newPwd, {
            title: '修改密码：',
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            var index = layer.load(3);
            $.post("/admin/user/resetPwd", {beforePwd:beforePwd,newPwd:newPwd}, function (data) {
                layer.close(index);
                if (data.code === 1) {
                    layer.open({
                        content: data.msg ? data.msg : '操作失败！',
                        title: '修改成功',
                        btn: ['确认'],
                        yes: function (index, layero) {
                            window.location.href = location.href;
                        },
                        cancel: function () {
                            window.location.href = location.href;
                        }
                    });
                } else {
                    layer.alert(data.msg);
                }
            });
        });
        return false;
    });
	
	form.on('submit(updqq)', function (data) {
        var newqq = $("#newqq").val();
        var chkqq = $("#chkqq").val();

        if (newqq != chkqq) {
            layer.msg("两次QQ输入不一致！");
            return false;
        }
        layer.confirm('确定要修改新QQ为：' + newqq, {
            title: '修改QQ：',
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            var index = layer.load(3);
            $.post("/admin/user/resetqq", {newqq: newqq}, function (data) {
                layer.close(index);
                if (data.code === 1) {
                    layer.open({
                        content: data.msg ? data.msg : '操作失败！',
                        title: '修改成功',
                        btn: ['确认'],
                        yes: function (index, layero) {
                            window.location.href = location.href;
                        },
                        cancel: function () {
                            window.location.href = location.href;
                        }
                    });
                } else {
                    layer.alert(data.msg);
                }
            });
        });
        return false;
    });

	form.on('submit(updmail)', function (data) {
        var newmail = $("#newmail").val();
        var chkmail = $("#chkmail").val();

        if (newmail != chkmail) {
            layer.msg("两次邮箱输入不一致！");
            return false;
        }
        layer.confirm('确定要修改新邮箱为：' + newmail, {
            title: '修改邮箱：',
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            var index = layer.load(3);
            $.post("/admin/user/resetmail", {newmail: newmail}, function (data) {
                layer.close(index);
                if (data.code === 1) {
                    layer.open({
                        content: data.msg ? data.msg : '操作失败！',
                        title: '修改成功',
                        btn: ['确认'],
                        yes: function (index, layero) {
                            window.location.href = location.href;
                        },
                        cancel: function () {
                            window.location.href = location.href;
                        }
                    });
                } else {
                    layer.alert(data.msg);
                }
            });
        });
        return false;
    });
});

function delPlayer(id) {
    layui.config({
        base: 'js/'
    }).use(['layer'], function () {
        var $ = layui.jquery,
            layer = layui.layer;
        layer.confirm('确定删除播放器？</br>删除后播放器数据不可恢复！', {
            title:'提示：',
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            layer.closeAll();
            var index = layer.load(3);
            var bfqsl = parseInt(top.$("#bfqsl").val()) - 1;
            $.post("/admin/player/del", {id: id}, function (data) {
                if (data.code === 1) {
                    top.layer.msg("删除成功！", {icon: 6, time: 2000});
                    window.parent.location.reload();
                    top.layui.admin.closeThisTabs();
                    top.document.getElementById(id).remove();
                    top.$("#bfqsl").val(bfqsl);
                    top.$(".bfqsl").html(bfqsl);
                } else {
                    layer.alert('删除失败！');
                }
            });
        }, function () {
        });
    });
}
function delSongSheet(id) {
    layui.config({
        base: 'js/'
    }).use(['layer'], function () {
        var $ = layui.jquery,
            layer = layui.layer;
        layer.confirm('确定删除歌单？</br>删除后歌单数据不可恢复！', {
            title:'提示：',
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            var index = layer.load(3);
            var gdsl = parseInt(top.$("#gdsl").val()) - 1;
            $.post("/admin/songSheet/del", {id: id}, function (data) {
                if (data.code === 1) {
                    top.layer.msg("删除成功！", {icon: 6, time: 2000});
                    window.parent.location.reload();
                    top.layui.admin.closeThisTabs();
                    top.document.getElementById(id).remove();
                    top.$("#gdsl").val(gdsl);
                    top.$(".gdsl").html(gdsl);
                } else {
                    layer.alert('删除失败！');
                }
            });
        }, function () {
        });
    });
}

function qun(lx,id) {
        if(lx == "qq"){
            title = "QQ";
            text = "https://jq.qq.com/?_wv=";
        }else{
            title = "微信";
            text = "https://weixin.qq.com/g/";
        }
    layui.config({
        base: 'js/'
    }).use(['layer'], function () {
        var $ = layui.jquery,
            layer = layui.layer;
        layer.ready(function () {
            layer.open({
                type: 1,
                btnAlign: 'c',
                shadeClose: true,
                area: ['230px', '285px'],//宽高
                content: '<div id="qrcode" style="margin:18px 0 0 15px"></div>',
                title: '手机'+title+'扫码加群'
            });
            jQuery('#qrcode').qrcode({
                render: "canvas",
                text: text + id,
                width: "200",//二维码的宽度
                height: "200",//二维码的高度
                background: "#ffffff",//二维码的后景色
                foreground: "#000000",//二维码的前景色
                src: "/static/images/"+lx+".png"//二维码中间的图片
            });
        });
    });
}
function cmoney(pay,text) {
        if(pay == "alipay"){
            title = "支付宝";
        }else if(pay == "wxpay"){
        	title = "微信";
        }else{
            title = "QQ";
        }
    layui.config({
        base: 'js/'
    }).use(['layer'], function () {
        var $ = layui.jquery,
            layer = layui.layer;
        layer.ready(function () {
            layer.open({
                type: 1,
                btnAlign: 'c',
                shadeClose: true,
                area: ['230px', '328px'],//宽高
                content: '<div id="qrcode" style="margin:18px 0 0 15px"></div></br><div class="layui-layer-title">'+title+'扫码支付</div>',
                title: '捐赠我们'
            });
            jQuery('#qrcode').qrcode({
                render: "canvas",
                text: text,
                width: "200",//二维码的宽度
                height: "200",//二维码的高度
                background: "#ffffff",//二维码的后景色
                foreground: "#000000",//二维码的前景色
                src: "/static/images/"+pay+".png"//二维码中间的图片
            });
        });
    });
}

var sweetTitles = {
	x: 10,
	y: 20,
	tipElements: "a,span,img,div,strong",
	noTitle: false,
	init: function() {
		var b = this.noTitle;
		$(this.tipElements).each(function() {
			$(this).mouseover(function(e) {
				if (b) {
					isTitle = true
				} else {
					isTitle = $.trim(this.title) != ''
				}
				if (isTitle) {
					this.myTitle = this.title;
					this.title = "";
					var a = "<div class='tooltip'><div class='tipsy-arrow tipsy-arrow-n'></div><div class='tipsy-inner'>" + this.myTitle + "</div></div>";
					$('body').append(a);
					$('.tooltip').css({
						"top": (e.pageY + 30) + "px",
						"left": (e.pageX - 15) + "px"
					}).show('fast')
				}
			}).mouseout(function() {
				if (this.myTitle != null) {
					this.title = this.myTitle;
					$('.tooltip').remove()
				}
			}).mousemove(function(e) {
				$('.tooltip').css({
					"top": (e.pageY + 30) + "px",
					"left": (e.pageX - 15) + "px"
				})
			})
		})
	}
};
	$("body").on('mouseenter', '*[lay-tips]', function(){
		var othis = $(this);
		if(othis.parent().hasClass('layui-nav-item')) return;
		var tips = othis.attr('lay-tips'),
		offset = othis.attr('lay-offset'),
		direction = othis.attr('lay-direction'),
		index = layer.tips(tips, this, {
			tips: direction || 1
			,time: -1
			,success: function(layero, index){
				if(offset){
					layero.css('margin-left', offset + 'px');
				}
			}
		});
		othis.data('index', index);
	})
	.on('mouseleave', '*[lay-tips]', function(){
		layer.close($(this).data('index'));
	});
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|Nokia|Black Berry|MIDP|Phone)/i)){
	}else{
		sweetTitles.init()
	}