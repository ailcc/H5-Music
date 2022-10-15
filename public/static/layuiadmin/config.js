/**

 @Name：layuiAdmin iframe版全局配置
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL（layui付费产品协议）
    
 */
 
layui.define(['laytpl', 'layer', 'element', 'util'], function(exports){
  exports('setter', {
    container: 'LAY_app' //容器ID
    ,base: layui.cache.base //记录静态资源所在路径
    ,views: layui.cache.base + 'tpl/' //动态模板所在目录
    ,entry: 'index' //默认视图文件名
    ,engine: '.html' //视图文件后缀名
    ,pageTabs: true //是否开启页面选项卡功能。iframe版推荐开启
    
    ,name: 'layuiAdmin'
    ,tableName: 'layuiAdmin' //本地存储表名
    ,MOD_NAME: 'admin' //模块事件名
    
    ,debug: true //是否开启调试模式。如开启，接口异常时会抛出异常 URL 等信息

    //自定义请求字段
    ,request: {
      tokenName: false //自动携带 token 的字段名（如：access_token）。可设置 false 不携带。
    }
    
    //自定义响应字段
    ,response: {
      statusName: 'code' //数据状态的字段名称
      ,statusCode: {
        ok: 0 //数据状态一切正常的状态码
        ,logout: 1001 //登录状态失效的状态码
      }
      ,msgName: 'msg' //状态信息的字段名称
      ,dataName: 'data' //数据详情的字段名称
    }
    
    //扩展的第三方模块
    ,extend: [
      'echarts', //echarts 核心包
      'echartsTheme' //echarts 主题
    ]
    
    //主题配置
    ,theme: {
      //内置主题配色方案
      color: [{
        main: '#344058' //主题色
        ,logo: '#1E9FFF' //logo色
        ,selected: '#1E9FFF' //选中色
        ,header: '#ffffff' //顶部色
        ,alias: '默认颜色' //默认别名
      },{
        main: '#3A3D49' //主题色
        ,logo: '#2F9688' //logo色
        ,selected: '#2F9688' //选中色
        ,header: '#ffffff' //顶部色
        ,alias: '墨绿色' //默认别名
      },{
        main: '#20222A' //主题色
        ,logo: '#F78400' //logo色
        ,selected: '#F78400' //选中色
        ,header: '#ffffff' //顶部色
        ,alias: '橙色' //默认别名
      },{
        main: '#28333E' //主题色
        ,logo: '#AA3130' //logo色
        ,selected: '#AA3130' //选中色
        ,header: '#ffffff' //顶部色
        ,alias: '时尚红' //默认别名
      },{
        main: '#20222A' //主题色
        ,logo: '#8C8C8C' //logo色
        ,selected: '#8C8C8C' //选中色
        ,header: '#ffffff' //顶部色
        ,alias: '海洋色' //默认别名
      },{
        main: '#50314F' //主题色
        ,logo: '#7A4D7B' //logo色
        ,selected: '#7A4D7B' //选中色
        ,header: '#ffffff' //顶部色
        ,alias: '紫红色' //默认别名
      },{
        main: '#226A62' //主题色
        ,logo: '#2F9688' //logo色
        ,selected: '#2F9688' //选中色
        ,header: '#2F9688' //顶部色
        ,alias: '墨绿色' //默认别名
      },{
        main: '#344058' //主题色
        ,logo: '#0085E8' //logo色
        ,selected: '#0085E8' //选中色
        ,header: '#0085E8' //顶部色
        ,alias: '海洋色' //默认别名
      },{
        main: '#393D49' //主题色
        ,logo: '#828282' //logo色
        ,selected: '#828282' //选中色
        ,header: '#828282' //顶部色
        ,alias: '经典黑色' //默认别名
      },{
        main: '#50314F' //主题色
        ,logo: '#CD69C9' //logo色
        ,selected: '#CD69C9' //选中色
        ,header: '#CD69C9' //顶部色
        ,alias: '紫红色' //默认别名
      },{
        main: '#AA3130' //主题色
        ,logo: '#AA3130' //logo色
        ,selected: '#FF6347' //选中色
        ,header: '#AA3130' //顶部色
        ,alias: '时尚红色' //默认别名
      },{
        main: '#28333E' //主题色
        ,logo: '#009688' //logo色
        ,selected: '#009688' //选中色
        ,header: '#009688' //顶部色
        ,alias: '墨绿色' //默认别名
      }]
      
      //初始的颜色索引，对应上面的配色方案数组索引
      //如果本地已经有主题色记录，则以本地记录为优先，除非请求本地数据（localStorage）

      ,initColorIndex: 0
    }
  });
});