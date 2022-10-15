// 根据参数名获得该参数 pname等于想要的参数名 
    function getParam(pname) { 
        var params = location.search.substr(1); // 获取参数 平且去掉？ 
        var ArrParam = params.split('&'); 
        if (ArrParam.length == 1) { 
            //只有一个参数的情况 
            return params.split('=')[1]; 
        } else { 
            //多个参数参数的情况 
            for (var i = 0; i < ArrParam.length; i++) { 
                if (ArrParam[i].split('=')[0] == pname) { 
                    return ArrParam[i].split('=')[1]; 
                } 
            }
        }
    }

    var reMethod = "GET",
        reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,16}$/;
    $(document).ready(function() {
    $('#reg').click(function() {
        if($("#mteam").val() === ''){
            layer.msg("邀请码不能为空", {icon: 5});
            return false;
        }
        if ($('#user').val() == "") {
            $('#user').focus().css({
                border: "1px solid red",
                boxShadow: "0 0 2px red"
            });
            layer.msg("用户名不能为空", {icon: 5});
            return false;
        }
        if ($('#user').val().length < 4 || $('#user').val().length > 16) {
            $('#user').focus().css({
                border: "1px solid red",
                boxShadow: "0 0 2px red"
            });
            layer.msg("用户名位4-16字符", {icon: 5});
            return false;
        } 
        if ($('#passwd').val().length < 8) {
            $('#passwd').focus();
            layer.msg("密码不能小于 8 位", {icon: 5});
            return false;
        }
        if (!reg.test($('#passwd').val())) {
            layer.msg('密码必须包含英文大小写+数字或特殊字符', {icon: 5});
            return false;
        }
        if ($('#passwd2').val() != $('#passwd').val()) {
            $('#passwd2').focus();
            layer.msg("两次密码不一致", {icon: 5});
            return false;
        }
        var sqq = /^[1-9]{1}[0-9]{4,9}$/;
        if (!sqq.test($('#qq').val()) || $('#qq').val().length < 5 || $('#qq').val().length > 12) {
            $('#qq').focus().css({
                border: "1px solid red",
                boxShadow: "0 0 2px red"
            });
            layer.msg("QQ号不正确", {icon: 5});
            return false;
        } else {
            $('#qq').css({
                border: "1px solid #D7D7D7",
                boxShadow: "none"
            });
        }
		
        $.post($('#regUser').attr('action'), $('#regUser').serialize(), function (data) {
            if (data.code === 1) {
                layer.open({
                    content: data.msg,
                    btnAlign: 'c',
                    closeBtn: 0,
                    title: '注册成功',
                    btn: ['返回登录'],
                    yes: function (index, layero) {
                        location.href = "/admin/user/login";
                    },
                    cancel: function () {
                        location.href = "/admin/user/login";
                    }
                });
            } else {
                layer.msg(data.msg ? data.msg : '注册失败！');
            }
        });
    });
    });
    //检测当前窗口是否为顶级窗口,如不是，强制修改为顶级窗口
    if (window != top)
    top.location.href = location.href;