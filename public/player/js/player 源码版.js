/**
 * Html5 音乐播放器
 * 
 * webSite: https://ailcc.com
 * time: 2019/12/26
 * 编译完成于2019/12/26
 * 
 * 源码来源于 明月浩空 Limh.Me  本站不提供任何服务  请前往明月浩空播放器官网注册使用
 */
// 检查jQuery插件是否安装
if(typeof jQuery === 'undefined'){
    throw new Error('请先加载jQuery插件！');
}
/*mousewheel plugin*/
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{if(typeof exports==="object"){module.exports=a}else{a(jQuery)}}}(function(c){var d=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],k=("onwheel" in document||document.documentMode>=9)?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],h=Array.prototype.slice,j,b;if(c.event.fixHooks){for(var e=d.length;e;){c.event.fixHooks[d[--e]]=c.event.mouseHooks}}var f=c.event.special.mousewheel={version:"3.1.9",setup:function(){if(this.addEventListener){for(var m=k.length;m;){this.addEventListener(k[--m],l,false)}}else{this.onmousewheel=l}c.data(this,"mousewheel-line-height",f.getLineHeight(this));c.data(this,"mousewheel-page-height",f.getPageHeight(this))},teardown:function(){if(this.removeEventListener){for(var m=k.length;m;){this.removeEventListener(k[--m],l,false)}}else{this.onmousewheel=null}},getLineHeight:function(i){return parseInt(c(i)["offsetParent" in c.fn?"offsetParent":"parent"]().css("fontSize"),10)},getPageHeight:function(i){return c(i).height()},settings:{adjustOldDeltas:true}};c.fn.extend({mousewheel:function(i){return i?this.bind("mousewheel",i):this.trigger("mousewheel")},unmousewheel:function(i){return this.unbind("mousewheel",i)}});function l(i){var n=i||window.event,r=h.call(arguments,1),t=0,p=0,o=0,q=0;i=c.event.fix(n);i.type="mousewheel";if("detail" in n){o=n.detail*-1}if("wheelDelta" in n){o=n.wheelDelta}if("wheelDeltaY" in n){o=n.wheelDeltaY}if("wheelDeltaX" in n){p=n.wheelDeltaX*-1}if("axis" in n&&n.axis===n.HORIZONTAL_AXIS){p=o*-1;o=0}t=o===0?p:o;if("deltaY" in n){o=n.deltaY*-1;t=o}if("deltaX" in n){p=n.deltaX;if(o===0){t=p*-1}}if(o===0&&p===0){return}if(n.deltaMode===1){var s=c.data(this,"mousewheel-line-height");t*=s;o*=s;p*=s}else{if(n.deltaMode===2){var m=c.data(this,"mousewheel-page-height");t*=m;o*=m;p*=m}}q=Math.max(Math.abs(o),Math.abs(p));if(!b||q<b){b=q;if(a(n,q)){b/=40}}if(a(n,q)){t/=40;p/=40;o/=40}t=Math[t>=1?"floor":"ceil"](t/b);p=Math[p>=1?"floor":"ceil"](p/b);o=Math[o>=1?"floor":"ceil"](o/b);i.deltaX=p;i.deltaY=o;i.deltaFactor=b;i.deltaMode=0;r.unshift(i,t,p,o);if(j){clearTimeout(j)}j=setTimeout(g,200);return(c.event.dispatch||c.event.handle).apply(this,r)}function g(){b=null}function a(m,i){return f.settings.adjustOldDeltas&&m.type==="mousewheel"&&i%120===0}}));
/*scrollbar plugin*/
(function(c){var b={init:function(e){var f={set_width:false,set_height:false,horizontalScroll:false,scrollInertia:950,mouseWheel:true,mouseWheelPixels:"auto",autoDraggerLength:true,autoHideScrollbar:false,alwaysShowScrollbar:false,snapAmount:null,snapOffset:0,scrollButtons:{enable:false,scrollType:"continuous",scrollSpeed:"auto",scrollAmount:40},advanced:{updateOnBrowserResize:true,updateOnContentResize:false,autoExpandHorizontalScroll:false,autoScrollOnFocus:true,normalizeMouseWheelDelta:false},contentTouchScroll:true,callbacks:{onScrollStart:function(){},onScroll:function(){},onTotalScroll:function(){},onTotalScrollBack:function(){},onTotalScrollOffset:0,onTotalScrollBackOffset:0,whileScrolling:function(){}},theme:"light"},e=c.extend(true,f,e);return this.each(function(){var m=c(this);if(e.set_width){m.css("width",e.set_width)}if(e.set_height){m.css("height",e.set_height)}if(!c(document).data("mCustomScrollbar-index")){c(document).data("mCustomScrollbar-index","1")}else{var t=parseInt(c(document).data("mCustomScrollbar-index"));c(document).data("mCustomScrollbar-index",t+1)}m.wrapInner("<div class='mCustomScrollBox mCS-"+e.theme+"' id='mCSB_"+c(document).data("mCustomScrollbar-index")+"' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_"+c(document).data("mCustomScrollbar-index"));var g=m.children(".mCustomScrollBox");if(e.horizontalScroll){g.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");var k=g.children(".mCSB_h_wrapper");k.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({width:k.children().outerWidth(),position:"relative"}).unwrap()}else{g.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")}var o=g.children(".mCSB_container");if(c.support.touch){o.addClass("mCS_touch")}o.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");var l=g.children(".mCSB_scrollTools"),h=l.children(".mCSB_draggerContainer"),q=h.children(".mCSB_dragger");if(e.horizontalScroll){q.data("minDraggerWidth",q.width())}else{q.data("minDraggerHeight",q.height())}if(e.scrollButtons.enable){if(e.horizontalScroll){l.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>")}else{l.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")}}g.bind("scroll",function(){if(!m.is(".mCS_disabled")){g.scrollTop(0).scrollLeft(0)}});m.data({mCS_Init:true,mCustomScrollbarIndex:c(document).data("mCustomScrollbar-index"),horizontalScroll:e.horizontalScroll,scrollInertia:e.scrollInertia,scrollEasing:"mcsEaseOut",mouseWheel:e.mouseWheel,mouseWheelPixels:e.mouseWheelPixels,autoDraggerLength:e.autoDraggerLength,autoHideScrollbar:e.autoHideScrollbar,alwaysShowScrollbar:e.alwaysShowScrollbar,snapAmount:e.snapAmount,snapOffset:e.snapOffset,scrollButtons_enable:e.scrollButtons.enable,scrollButtons_scrollType:e.scrollButtons.scrollType,scrollButtons_scrollSpeed:e.scrollButtons.scrollSpeed,scrollButtons_scrollAmount:e.scrollButtons.scrollAmount,autoExpandHorizontalScroll:e.advanced.autoExpandHorizontalScroll,autoScrollOnFocus:e.advanced.autoScrollOnFocus,normalizeMouseWheelDelta:e.advanced.normalizeMouseWheelDelta,contentTouchScroll:e.contentTouchScroll,onScrollStart_Callback:e.callbacks.onScrollStart,onScroll_Callback:e.callbacks.onScroll,onTotalScroll_Callback:e.callbacks.onTotalScroll,onTotalScrollBack_Callback:e.callbacks.onTotalScrollBack,onTotalScroll_Offset:e.callbacks.onTotalScrollOffset,onTotalScrollBack_Offset:e.callbacks.onTotalScrollBackOffset,whileScrolling_Callback:e.callbacks.whileScrolling,bindEvent_scrollbar_drag:false,bindEvent_content_touch:false,bindEvent_scrollbar_click:false,bindEvent_mousewheel:false,bindEvent_buttonsContinuous_y:false,bindEvent_buttonsContinuous_x:false,bindEvent_buttonsPixels_y:false,bindEvent_buttonsPixels_x:false,bindEvent_focusin:false,bindEvent_autoHideScrollbar:false,mCSB_buttonScrollRight:false,mCSB_buttonScrollLeft:false,mCSB_buttonScrollDown:false,mCSB_buttonScrollUp:false});if(e.horizontalScroll){if(m.css("max-width")!=="none"){if(!e.advanced.updateOnContentResize){e.advanced.updateOnContentResize=true}}}else{if(m.css("max-height")!=="none"){var s=false,r=parseInt(m.css("max-height"));if(m.css("max-height").indexOf("%")>=0){s=r,r=m.parent().height()*s/100}m.css("overflow","hidden");g.css("max-height",r)}}m.mCustomScrollbar("update");if(e.advanced.updateOnBrowserResize){var i,j=c(window).width(),u=c(window).height();c(window).bind("resize."+m.data("mCustomScrollbarIndex"),function(){if(i){clearTimeout(i)}i=setTimeout(function(){if(!m.is(".mCS_disabled")&&!m.is(".mCS_destroyed")){var w=c(window).width(),v=c(window).height();if(j!==w||u!==v){if(m.css("max-height")!=="none"&&s){g.css("max-height",m.parent().height()*s/100)}m.mCustomScrollbar("update");j=w;u=v}}},150)})}if(e.advanced.updateOnContentResize){var p;if(e.horizontalScroll){var n=o.outerWidth()}else{var n=o.outerHeight()}p=setInterval(function(){if(e.horizontalScroll){if(e.advanced.autoExpandHorizontalScroll){o.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:o.outerWidth(),position:"relative"}).unwrap()}var v=o.outerWidth()}else{var v=o.outerHeight()}if(v!=n){m.mCustomScrollbar("update");n=v}},300)}})},update:function(){var n=c(this),k=n.children(".mCustomScrollBox"),q=k.children(".mCSB_container");q.removeClass("mCS_no_scrollbar");n.removeClass("mCS_disabled mCS_destroyed");k.scrollTop(0).scrollLeft(0);var y=k.children(".mCSB_scrollTools"),o=y.children(".mCSB_draggerContainer"),m=o.children(".mCSB_dragger");if(n.data("horizontalScroll")){var A=y.children(".mCSB_buttonLeft"),t=y.children(".mCSB_buttonRight"),f=k.width();if(n.data("autoExpandHorizontalScroll")){q.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:q.outerWidth(),position:"relative"}).unwrap()}var z=q.outerWidth()}else{var w=y.children(".mCSB_buttonUp"),g=y.children(".mCSB_buttonDown"),r=k.height(),i=q.outerHeight()}if(i>r&&!n.data("horizontalScroll")){y.css("display","block");var s=o.height();if(n.data("autoDraggerLength")){var u=Math.round(r/i*s),l=m.data("minDraggerHeight");if(u<=l){m.css({height:l})}else{if(u>=s-10){var p=s-10;m.css({height:p})}else{m.css({height:u})}}m.children(".mCSB_dragger_bar").css({"line-height":m.height()+"px"})}var B=m.height(),x=(i-r)/(s-B);n.data("scrollAmount",x).mCustomScrollbar("scrolling",k,q,o,m,w,g,A,t);var D=Math.abs(q.position().top);n.mCustomScrollbar("scrollTo",D,{scrollInertia:0,trigger:"internal"})}else{if(z>f&&n.data("horizontalScroll")){y.css("display","block");var h=o.width();if(n.data("autoDraggerLength")){var j=Math.round(f/z*h),C=m.data("minDraggerWidth");if(j<=C){m.css({width:C})}else{if(j>=h-10){var e=h-10;m.css({width:e})}else{m.css({width:j})}}}var v=m.width(),x=(z-f)/(h-v);n.data("scrollAmount",x).mCustomScrollbar("scrolling",k,q,o,m,w,g,A,t);var D=Math.abs(q.position().left);n.mCustomScrollbar("scrollTo",D,{scrollInertia:0,trigger:"internal"})}else{k.unbind("mousewheel focusin");if(n.data("horizontalScroll")){m.add(q).css("left",0)}else{m.add(q).css("top",0)}if(n.data("alwaysShowScrollbar")){if(!n.data("horizontalScroll")){m.css({height:o.height()})}else{if(n.data("horizontalScroll")){m.css({width:o.width()})}}}else{y.css("display","none");q.addClass("mCS_no_scrollbar")}n.data({bindEvent_mousewheel:false,bindEvent_focusin:false})}}},scrolling:function(i,q,n,k,A,f,D,w){var l=c(this);if(!l.data("bindEvent_scrollbar_drag")){var o,p,C,z,e;if(c.support.pointer){C="pointerdown";z="pointermove";e="pointerup"}else{if(c.support.msPointer){C="MSPointerDown";z="MSPointerMove";e="MSPointerUp"}}if(c.support.pointer||c.support.msPointer){k.bind(C,function(K){K.preventDefault();l.data({on_drag:true});k.addClass("mCSB_dragger_onDrag");var J=c(this),M=J.offset(),I=K.originalEvent.pageX-M.left,L=K.originalEvent.pageY-M.top;if(I<J.width()&&I>0&&L<J.height()&&L>0){o=L;p=I}});c(document).bind(z+"."+l.data("mCustomScrollbarIndex"),function(K){K.preventDefault();if(l.data("on_drag")){var J=k,M=J.offset(),I=K.originalEvent.pageX-M.left,L=K.originalEvent.pageY-M.top;G(o,p,L,I)}}).bind(e+"."+l.data("mCustomScrollbarIndex"),function(x){l.data({on_drag:false});k.removeClass("mCSB_dragger_onDrag")})}else{k.bind("mousedown touchstart",function(K){K.preventDefault();K.stopImmediatePropagation();var J=c(this),N=J.offset(),I,M;if(K.type==="touchstart"){var L=K.originalEvent.touches[0]||K.originalEvent.changedTouches[0];I=L.pageX-N.left;M=L.pageY-N.top}else{l.data({on_drag:true});k.addClass("mCSB_dragger_onDrag");I=K.pageX-N.left;M=K.pageY-N.top}if(I<J.width()&&I>0&&M<J.height()&&M>0){o=M;p=I}}).bind("touchmove",function(K){K.preventDefault();K.stopImmediatePropagation();var N=K.originalEvent.touches[0]||K.originalEvent.changedTouches[0],J=c(this),M=J.offset(),I=N.pageX-M.left,L=N.pageY-M.top;G(o,p,L,I)});c(document).bind("mousemove."+l.data("mCustomScrollbarIndex"),function(K){if(l.data("on_drag")){var J=k,M=J.offset(),I=K.pageX-M.left,L=K.pageY-M.top;G(o,p,L,I)}}).bind("mouseup."+l.data("mCustomScrollbarIndex"),function(x){l.data({on_drag:false});k.removeClass("mCSB_dragger_onDrag")})}l.data({bindEvent_scrollbar_drag:true})}function G(J,K,L,I){if(l.data("horizontalScroll")){l.mCustomScrollbar("scrollTo",(k.position().left-(K))+I,{moveDragger:true,trigger:"internal"})}else{l.mCustomScrollbar("scrollTo",(k.position().top-(J))+L,{moveDragger:true,trigger:"internal"})}}if(c.support.touch&&l.data("contentTouchScroll")){if(!l.data("bindEvent_content_touch")){var m,E,s,t,v,F,H;q.bind("touchstart",function(x){x.stopImmediatePropagation();m=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];E=c(this);s=E.offset();v=m.pageX-s.left;t=m.pageY-s.top;F=t;H=v});q.bind("touchmove",function(x){x.preventDefault();x.stopImmediatePropagation();m=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];E=c(this).parent();s=E.offset();v=m.pageX-s.left;t=m.pageY-s.top;if(l.data("horizontalScroll")){l.mCustomScrollbar("scrollTo",H-v,{trigger:"internal"})}else{l.mCustomScrollbar("scrollTo",F-t,{trigger:"internal"})}})}}if(!l.data("bindEvent_scrollbar_click")){n.bind("click",function(I){var x=(I.pageY-n.offset().top)*l.data("scrollAmount"),y=c(I.target);if(l.data("horizontalScroll")){x=(I.pageX-n.offset().left)*l.data("scrollAmount")}if(y.hasClass("mCSB_draggerContainer")||y.hasClass("mCSB_draggerRail")){l.mCustomScrollbar("scrollTo",x,{trigger:"internal",scrollEasing:"draggerRailEase"})}});l.data({bindEvent_scrollbar_click:true})}if(l.data("mouseWheel")){if(!l.data("bindEvent_mousewheel")){i.bind("mousewheel",function(K,M){var J,I=l.data("mouseWheelPixels"),x=Math.abs(q.position().top),L=k.position().top,y=n.height()-k.height();if(l.data("normalizeMouseWheelDelta")){if(M<0){M=-1}else{M=1}}if(I==="auto"){I=100+Math.round(l.data("scrollAmount")/2)}if(l.data("horizontalScroll")){L=k.position().left;y=n.width()-k.width();x=Math.abs(q.position().left)}if((M>0&&L!==0)||(M<0&&L!==y)){K.preventDefault();K.stopImmediatePropagation()}J=x-(M*I);l.mCustomScrollbar("scrollTo",J,{trigger:"internal"})});l.data({bindEvent_mousewheel:true})}}if(l.data("scrollButtons_enable")){if(l.data("scrollButtons_scrollType")==="pixels"){if(l.data("horizontalScroll")){w.add(D).unbind("mousedown touchstart MSPointerDown pointerdown mouseup MSPointerUp pointerup mouseout MSPointerOut pointerout touchend",j,h);l.data({bindEvent_buttonsContinuous_x:false});if(!l.data("bindEvent_buttonsPixels_x")){w.bind("click",function(x){x.preventDefault();r(Math.abs(q.position().left)+l.data("scrollButtons_scrollAmount"))});D.bind("click",function(x){x.preventDefault();r(Math.abs(q.position().left)-l.data("scrollButtons_scrollAmount"))});l.data({bindEvent_buttonsPixels_x:true})}}else{f.add(A).unbind("mousedown touchstart MSPointerDown pointerdown mouseup MSPointerUp pointerup mouseout MSPointerOut pointerout touchend",j,h);l.data({bindEvent_buttonsContinuous_y:false});if(!l.data("bindEvent_buttonsPixels_y")){f.bind("click",function(x){x.preventDefault();r(Math.abs(q.position().top)+l.data("scrollButtons_scrollAmount"))});A.bind("click",function(x){x.preventDefault();r(Math.abs(q.position().top)-l.data("scrollButtons_scrollAmount"))});l.data({bindEvent_buttonsPixels_y:true})}}function r(x){if(!k.data("preventAction")){k.data("preventAction",true);l.mCustomScrollbar("scrollTo",x,{trigger:"internal"})}}}else{if(l.data("horizontalScroll")){w.add(D).unbind("click");l.data({bindEvent_buttonsPixels_x:false});if(!l.data("bindEvent_buttonsContinuous_x")){w.bind("mousedown touchstart MSPointerDown pointerdown",function(y){y.preventDefault();var x=B();l.data({mCSB_buttonScrollRight:setInterval(function(){l.mCustomScrollbar("scrollTo",Math.abs(q.position().left)+x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var j=function(x){x.preventDefault();clearInterval(l.data("mCSB_buttonScrollRight"))};w.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout",j);D.bind("mousedown touchstart MSPointerDown pointerdown",function(y){y.preventDefault();var x=B();l.data({mCSB_buttonScrollLeft:setInterval(function(){l.mCustomScrollbar("scrollTo",Math.abs(q.position().left)-x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var h=function(x){x.preventDefault();clearInterval(l.data("mCSB_buttonScrollLeft"))};D.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout",h);l.data({bindEvent_buttonsContinuous_x:true})}}else{f.add(A).unbind("click");l.data({bindEvent_buttonsPixels_y:false});if(!l.data("bindEvent_buttonsContinuous_y")){f.bind("mousedown touchstart MSPointerDown pointerdown",function(y){y.preventDefault();var x=B();l.data({mCSB_buttonScrollDown:setInterval(function(){l.mCustomScrollbar("scrollTo",Math.abs(q.position().top)+x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var u=function(x){x.preventDefault();clearInterval(l.data("mCSB_buttonScrollDown"))};f.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout",u);A.bind("mousedown touchstart MSPointerDown pointerdown",function(y){y.preventDefault();var x=B();l.data({mCSB_buttonScrollUp:setInterval(function(){l.mCustomScrollbar("scrollTo",Math.abs(q.position().top)-x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var g=function(x){x.preventDefault();clearInterval(l.data("mCSB_buttonScrollUp"))};A.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout",g);l.data({bindEvent_buttonsContinuous_y:true})}}function B(){var x=l.data("scrollButtons_scrollSpeed");if(l.data("scrollButtons_scrollSpeed")==="auto"){x=Math.round((l.data("scrollInertia")+100)/40)}return x}}}if(l.data("autoScrollOnFocus")){if(!l.data("bindEvent_focusin")){i.bind("focusin",function(){i.scrollTop(0).scrollLeft(0);var x=c(document.activeElement);if(x.is("input,textarea,select,button,a[tabindex],area,object")){var J=q.position().top,y=x.position().top,I=i.height()-x.outerHeight();if(l.data("horizontalScroll")){J=q.position().left;y=x.position().left;I=i.width()-x.outerWidth()}if(J+y<0||J+y>I){l.mCustomScrollbar("scrollTo",y,{trigger:"internal"})}}});l.data({bindEvent_focusin:true})}}if(l.data("autoHideScrollbar")&&!l.data("alwaysShowScrollbar")){if(!l.data("bindEvent_autoHideScrollbar")){i.bind("mouseenter",function(x){i.addClass("mCS-mouse-over");d.showScrollbar.call(i.children(".mCSB_scrollTools"))}).bind("mouseleave touchend",function(x){i.removeClass("mCS-mouse-over");if(x.type==="mouseleave"){d.hideScrollbar.call(i.children(".mCSB_scrollTools"))}});l.data({bindEvent_autoHideScrollbar:true})}}},scrollTo:function(e,f){var i=c(this),o={moveDragger:false,trigger:"external",callbacks:true,scrollInertia:i.data("scrollInertia"),scrollEasing:i.data("scrollEasing")},f=c.extend(o,f),p,g=i.children(".mCustomScrollBox"),k=g.children(".mCSB_container"),r=g.children(".mCSB_scrollTools"),j=r.children(".mCSB_draggerContainer"),h=j.children(".mCSB_dragger"),t=draggerSpeed=f.scrollInertia,q,s,m,l;if(!k.hasClass("mCS_no_scrollbar")){i.data({mCS_trigger:f.trigger});if(i.data("mCS_Init")){f.callbacks=false}if(e||e===0){if(typeof(e)==="number"){if(f.moveDragger){p=e;if(i.data("horizontalScroll")){e=h.position().left*i.data("scrollAmount")}else{e=h.position().top*i.data("scrollAmount")}draggerSpeed=0}else{p=e/i.data("scrollAmount")}}else{if(typeof(e)==="string"){var v;if(e==="top"){v=0}else{if(e==="bottom"&&!i.data("horizontalScroll")){v=k.outerHeight()-g.height()}else{if(e==="left"){v=0}else{if(e==="right"&&i.data("horizontalScroll")){v=k.outerWidth()-g.width()}else{if(e==="first"){v=i.find(".mCSB_container").find(":first")}else{if(e==="last"){v=i.find(".mCSB_container").find(":last")}else{v=i.find(e)}}}}}}if(v.length===1){if(i.data("horizontalScroll")){e=v.position().left}else{e=v.position().top}p=e/i.data("scrollAmount")}else{p=e=v}}}if(i.data("horizontalScroll")){if(i.data("onTotalScrollBack_Offset")){s=-i.data("onTotalScrollBack_Offset")}if(i.data("onTotalScroll_Offset")){l=g.width()-k.outerWidth()+i.data("onTotalScroll_Offset")}if(p<0){p=e=0;clearInterval(i.data("mCSB_buttonScrollLeft"));if(!s){q=true}}else{if(p>=j.width()-h.width()){p=j.width()-h.width();e=g.width()-k.outerWidth();clearInterval(i.data("mCSB_buttonScrollRight"));if(!l){m=true}}else{e=-e}}var n=i.data("snapAmount");if(n){e=Math.round(e/n)*n-i.data("snapOffset")}d.mTweenAxis.call(this,h[0],"left",Math.round(p),draggerSpeed,f.scrollEasing);d.mTweenAxis.call(this,k[0],"left",Math.round(e),t,f.scrollEasing,{onStart:function(){if(f.callbacks&&!i.data("mCS_tweenRunning")){u("onScrollStart")}if(i.data("autoHideScrollbar")&&!i.data("alwaysShowScrollbar")){d.showScrollbar.call(r)}},onUpdate:function(){if(f.callbacks){u("whileScrolling")}},onComplete:function(){if(f.callbacks){u("onScroll");if(q||(s&&k.position().left>=s)){u("onTotalScrollBack")}if(m||(l&&k.position().left<=l)){u("onTotalScroll")}}h.data("preventAction",false);i.data("mCS_tweenRunning",false);if(i.data("autoHideScrollbar")&&!i.data("alwaysShowScrollbar")){if(!g.hasClass("mCS-mouse-over")){d.hideScrollbar.call(r)}}}})}else{if(i.data("onTotalScrollBack_Offset")){s=-i.data("onTotalScrollBack_Offset")}if(i.data("onTotalScroll_Offset")){l=g.height()-k.outerHeight()+i.data("onTotalScroll_Offset")}if(p<0){p=e=0;clearInterval(i.data("mCSB_buttonScrollUp"));if(!s){q=true}}else{if(p>=j.height()-h.height()){p=j.height()-h.height();e=g.height()-k.outerHeight();clearInterval(i.data("mCSB_buttonScrollDown"));if(!l){m=true}}else{e=-e}}var n=i.data("snapAmount");if(n){e=Math.round(e/n)*n-i.data("snapOffset")}d.mTweenAxis.call(this,h[0],"top",Math.round(p),draggerSpeed,f.scrollEasing);d.mTweenAxis.call(this,k[0],"top",Math.round(e),t,f.scrollEasing,{onStart:function(){if(f.callbacks&&!i.data("mCS_tweenRunning")){u("onScrollStart")}if(i.data("autoHideScrollbar")&&!i.data("alwaysShowScrollbar")){d.showScrollbar.call(r)}},onUpdate:function(){if(f.callbacks){u("whileScrolling")}},onComplete:function(){if(f.callbacks){u("onScroll");if(q||(s&&k.position().top>=s)){u("onTotalScrollBack")}if(m||(l&&k.position().top<=l)){u("onTotalScroll")}}h.data("preventAction",false);i.data("mCS_tweenRunning",false);if(i.data("autoHideScrollbar")&&!i.data("alwaysShowScrollbar")){if(!g.hasClass("mCS-mouse-over")){d.hideScrollbar.call(r)}}}})}if(i.data("mCS_Init")){i.data({mCS_Init:false})}}}function u(w){if(i.data("mCustomScrollbarIndex")){this.mcs={top:k.position().top,left:k.position().left,draggerTop:h.position().top,draggerLeft:h.position().left,topPct:Math.round((100*Math.abs(k.position().top))/Math.abs(k.outerHeight()-g.height())),leftPct:Math.round((100*Math.abs(k.position().left))/Math.abs(k.outerWidth()-g.width()))};switch(w){case"onScrollStart":i.data("mCS_tweenRunning",true).data("onScrollStart_Callback").call(i,this.mcs);break;case"whileScrolling":i.data("whileScrolling_Callback").call(i,this.mcs);break;case"onScroll":i.data("onScroll_Callback").call(i,this.mcs);break;case"onTotalScrollBack":i.data("onTotalScrollBack_Callback").call(i,this.mcs);break;case"onTotalScroll":i.data("onTotalScroll_Callback").call(i,this.mcs);break}}}},stop:function(){var g=c(this),e=g.children().children(".mCSB_container"),f=g.children().children().children().children(".mCSB_dragger");d.mTweenAxisStop.call(this,e[0]);d.mTweenAxisStop.call(this,f[0])},disable:function(e){var j=c(this),f=j.children(".mCustomScrollBox"),h=f.children(".mCSB_container"),g=f.children(".mCSB_scrollTools"),i=g.children().children(".mCSB_dragger");f.unbind("mousewheel focusin mouseenter mouseleave touchend");h.unbind("touchstart touchmove");if(e){if(j.data("horizontalScroll")){i.add(h).css("left",0)}else{i.add(h).css("top",0)}}g.css("display","none");h.addClass("mCS_no_scrollbar");j.data({bindEvent_mousewheel:false,bindEvent_focusin:false,bindEvent_content_touch:false,bindEvent_autoHideScrollbar:false}).addClass("mCS_disabled")},destroy:function(){var e=c(this);e.removeClass("mCustomScrollbar _mCS_"+e.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove();c(document).unbind("mousemove."+e.data("mCustomScrollbarIndex")+" mouseup."+e.data("mCustomScrollbarIndex")+" MSPointerMove."+e.data("mCustomScrollbarIndex")+" MSPointerUp."+e.data("mCustomScrollbarIndex"));c(window).unbind("resize."+e.data("mCustomScrollbarIndex"))}},d={showScrollbar:function(){this.stop().animate({opacity:1},"fast")},hideScrollbar:function(){this.stop().animate({opacity:0},"fast")},mTweenAxis:function(g,i,h,f,o,y){var y=y||{},v=y.onStart||function(){},p=y.onUpdate||function(){},w=y.onComplete||function(){};var n=t(),l,j=0,r=g.offsetTop,s=g.style;if(i==="left"){r=g.offsetLeft}var m=h-r;q();e();function t(){if(window.performance&&window.performance.now){return window.performance.now()}else{if(window.performance&&window.performance.webkitNow){return window.performance.webkitNow()}else{if(Date.now){return Date.now()}else{return new Date().getTime()}}}}function x(){if(!j){v.call()}j=t()-n;u();if(j>=g._time){g._time=(j>g._time)?j+l-(j-g._time):j+l-1;if(g._time<j+1){g._time=j+1}}if(g._time<f){g._id=_request(x)}else{w.call()}}function u(){if(f>0){g.currVal=k(g._time,r,m,f,o);s[i]=Math.round(g.currVal)+"px"}else{s[i]=h+"px"}p.call()}function e(){l=1000/60;g._time=j+l;_request=(!window.requestAnimationFrame)?function(z){u();return setTimeout(z,0.01)}:window.requestAnimationFrame;g._id=_request(x)}function q(){if(g._id==null){return}if(!window.requestAnimationFrame){clearTimeout(g._id)}else{window.cancelAnimationFrame(g._id)}g._id=null}function k(B,A,F,E,C){switch(C){case"linear":return F*B/E+A;break;case"easeOutQuad":B/=E;return -F*B*(B-2)+A;break;case"easeInOutQuad":B/=E/2;if(B<1){return F/2*B*B+A}B--;return -F/2*(B*(B-2)-1)+A;break;case"easeOutCubic":B/=E;B--;return F*(B*B*B+1)+A;break;case"easeOutQuart":B/=E;B--;return -F*(B*B*B*B-1)+A;break;case"easeOutQuint":B/=E;B--;return F*(B*B*B*B*B+1)+A;break;case"easeOutCirc":B/=E;B--;return F*Math.sqrt(1-B*B)+A;break;case"easeOutSine":return F*Math.sin(B/E*(Math.PI/2))+A;break;case"easeOutExpo":return F*(-Math.pow(2,-10*B/E)+1)+A;break;case"mcsEaseOut":var D=(B/=E)*B,z=D*B;return A+F*(0.499999999999997*z*D+-2.5*D*D+5.5*z+-6.5*D+4*B);break;case"draggerRailEase":B/=E/2;if(B<1){return F/2*B*B*B+A}B-=2;return F/2*(B*B*B+2)+A;break}}},mTweenAxisStop:function(e){if(e._id==null){return}if(!window.requestAnimationFrame){clearTimeout(e._id)}else{window.cancelAnimationFrame(e._id)}e._id=null},rafPolyfill:function(){var f=["ms","moz","webkit","o"],e=f.length;while(--e>-1&&!window.requestAnimationFrame){window.requestAnimationFrame=window[f[e]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[f[e]+"CancelAnimationFrame"]||window[f[e]+"CancelRequestAnimationFrame"]}}};d.rafPolyfill.call();c.support.touch=!!("ontouchstart" in window);c.support.pointer=window.navigator.pointerEnabled;c.support.msPointer=window.navigator.msPointerEnabled;var a=("https:"==document.location.protocol)?"https:":"http:";c.event.special.mousewheel||document.write('<script src="'+a+'//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"><\/script>');c.fn.mCustomScrollbar=function(e){if(b[e]){return b[e].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof e==="object"||!e){return b.init.apply(this,arguments)}else{c.error("Method "+e+" does not exist")}}}})(jQuery);
/*cookie plugin*/
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
//*核心*//
window.timer = new Array();
jQuery.fn.extend({
	Rolling: function() {
		var Rollobj = $(this);
		var fontW = Rollobj.width();
		var divW = Rollobj.parent().width();
		if(window.timer){
			for(var each in window.timer){
				clearInterval(window.timer[each]);
			}
			window.timer = new Array();
		}
		if(fontW > divW){
			Rollobj.Rollx();
		}else{
			Rollobj.css('margin-left','0px');
		}
	},
    Rollx: function () {
    	var Rollobj = $(this);
        var step = 0;
        var timer = setInterval(function () {
            step++;
            Rollobj.css('margin-left',-step + 'px');
            if (0-parseInt(Rollobj.css("margin-left")) >= Rollobj.width() - Rollobj.parent().width()){
                clearInterval(timer);
                setTimeout(function () {
                    Rollobj.Rolly();
                },1000)
            }
        },88);
        window.timer.push(timer);
    },
    Rolly: function () {
    	var Rollobj = $(this);
        var step = parseInt(Rollobj.css('margin-left'));
        var timer = setInterval(function () {
            step++;
            Rollobj.css('margin-left',step + 'px');
            if (step == 0){
                clearInterval(timer);
                setTimeout(function () {
                    step = 0;
                    Rollobj.Rollx(Rollobj);
                },1000)
            }
        },88);
        window.timer.push(timer);
    }
});
var mobile = $("#ailcc").attr("m");
if (typeof mobile === "undefined") {
    mobiles = "no"
} else {
    mobiles = "yes"
};
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|Nokia|Black Berry|MIDP|Phone)/i) && mobiles === "no") {
    $("#ailccPlayer").hide()
} else {
var ailccPlayerInit = function () {
    var isPhone = false;
    if(navigator.userAgent.match(/(iPhone|iPod|Android|ios|Nokia|Black Berry|MIDP|Phone)/i)){
        isPhone = true
    }

    var ailcc_player_IsTest = typeof ailccPlayerTest !== "undefined" && ailccPlayerTest;
    var testKey = typeof ailccPlayerTestKey !== "undefined" ? ailccPlayerTestKey : null;
    var styleLoaded = typeof ailccPlayerStyleLoaded !== "undefined" && ailccPlayerStyleLoaded;
    if(!ailcc_player_IsTest){
        var ailcc_player_IsLoad = localStorage.getItem("ailcc_player_IsLoad");
        var ailcc_player_Feed = localStorage.getItem("ailcc_player_Feed");
        ailcc_player_IsLoad = typeof ailcc_player_IsLoad === "undefined" ? false : ailcc_player_IsLoad === "true";
        ailcc_player_IsLoad = ailcc_player_IsLoad && typeof ailcc_player_Feed !== "undefined" && new Date().getTime() - parseInt(ailcc_player_Feed) < 2000;
        //禁止iframe嵌套 || 是否已加载
        if (top.location !== self.location || ailcc_player_IsLoad) {
            return
        }
        localStorage.setItem("ailcc_player_IsLoad", "true");
    }
    if(ailcc_player_IsTest && testKey == null){
        return;
    }

    var jsUrl = $("#ailcc").attr("src");
    var webURL = jsUrl.startsWith("http") ? jsUrl.substring(0,jsUrl.indexOf("/",8)) : window.location.origin;
    var keyId = ailcc_player_IsTest ? testKey : $("#ailcc").attr("key");
    console.clear();
    console.log("%c%c沛霖主页 Html5音乐播放器 控制面板地址：https://music.ailcc.com/admin ", "line-height:28px;", "line-height:14px;padding:4px;background:#222;color:#fff;font-size:14px;margin-right:15px");
    

    if(!styleLoaded){
        $("head").append('<link rel="stylesheet" type="text/css" href="' + webURL + '/player/css/player.css?id='+keyId+'">');
        var span = document.createElement("span");
        span.className = "fa";
        span.style.display = "none";
        document.body.insertBefore(span, document.body.firstChild);

        function css(a, b) {
            return window.getComputedStyle(a, null).getPropertyValue(b)
        }
        if (css(span, "font-family") === "FontAwesome") {
            console.log("%c站内存在FontAwesome，从站内加载！", "text-shadow: 3px 1px 1px grey");
        } else {
            console.log("%c站内未找到FontAwesome，从播放器加载！", "text-shadow: 3px 1px 1px grey");
            $("head").append("<link href=\"https://libs.baidu.com/fontawesome/4.2.0/css/font-awesome.css\" rel=\"stylesheet\" type=\"text/css\">")
        };
        ailccPlayerStyleLoaded = true;
    }
    $("body").append('<div id="ailccPlayer">\n' +
    '    <div class="player">\n' +
    '        <canvas class="blur-img" width="365" height="155" id="canvas">您的浏览器不支持canvas，请更换高级版的浏览器！</canvas>\n' +
    '        <div class="blur-img">\n' +
    '            <img src="#" class="blur" style="top: 0; display: inline;"></div>\n' +
    '        <div class="infos">\n' +
    '            <div class="songstyle">\n' +
    '                <span>\n' +
    '                    <i class="fa fa-music"></i>\n' +
    '                    <div class="songx"><span class="song"></span></div>\n' +
    '                </span>\n' +
    '                <span style="float: right;">\n' +
    '                    <i class="fa fa-clock-o"></i>\n' +
    '                    <span class="time">00:00 / 00:00</span></span>\n' +
    '            </div>\n' +
    '            <div class="artiststyle">\n' +
    '                <i class="fa fa-user"></i>\n' +
    '                <span class="artist"></span>\n' +
    '                <span class="qhms moshi" title="循环模式">\n' +
    '                    <i class="loop fa fa-random current"></i></span>\n' +
    '            </div>\n' +
    '            <div class="artiststyle">\n' +
    '                <i class="fa fa-folder"></i>\n' +
    '                <span class="artist1"></span>\n' +
    '                <span class="switch-ksclrc geci" title="歌词模式"></span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="control">\n' +
    '            <span style="float:left">\n' +
    '                <i class="aprev fa fa-fast-backward" title="上一专辑"></i>\n' +
    '                <i class="prev fa fa-backward" title="上一首"></i>\n' +
    '            </span>\n' +
    '            <span style="float:right">\n' +
    '                <i class="next fa fa-forward" title="下一首"></i>\n' +
    '                <i class="anext fa fa-fast-forward" title="下一专辑"></i>\n' +
    '            </span>\n' +
    '        </div>\n' +
    '        <div class="status">\n' +
    '            <b>\n' +
    '                <i class="play fa fa-play" title="播放"></i>\n' +
    '                <i class="pause fa fa-pause" title="暂停"></i>\n' +
    '            </b>\n' +
    '            <div id="div1" class="note">\n' +
    '                <i class="fa fa-music" aria-hidden="true"></i>\n' +
    '            </div>\n' +
    '            <div id="div2" class="note">\n' +
    '                <i class="fa fa-music" aria-hidden="true"></i>\n' +
    '            </div>\n' +
    '            <div id="div3" class="note">\n' +
    '                <i class="fa fa-music" aria-hidden="true"></i>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="musicbottom">\n' +
    '            <div class="rate">\n' +
    '                <div class="progress">\n' +
    '                    <div class="rate-buffered"></div>' +
    '                    <div class="rate-on" style="width: 0;">\n' +
    '                        <div class="drag"></div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="icons">\n' +
    '                <div class="switch-playlist">\n' +
    '                    <i class="fa fa-bars" title="播放列表"></i>\n' +
    '                </div>\n' +
    '                <div class="switch-search">\n' +
    '                    <i class="fa fa-search search" title="搜索"></i>\n' +
    '                </div>\n' +
    '                <div class="new-volume">\n' +
    '                    <i class="volumeup fa fa-volume-up" title="音量"></i>\n' +
    '                    <div class="volume-controls" style="">\n' +
    '                        <div class="slider" data-direction="vertical">\n' +
    '                            <div class="progress2" style="height: 66%;">\n' +
    '                                <div class="drag" id="volume-drag"></div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="cover"></div>\n' +
    '    </div>\n' +
    '    <div class="playlist">\n' +
    '        <div class="playlist-bd">\n' +
    '            <div class="album-list">\n' +
    '                <div class="musicheader"></div>\n' +
    '                <div class="list"></div>\n' +
    '            </div>\n' +
    '            <div class="song-list">\n' +
    '                <div class="musicheader">\n' +
    '                    <i class="fa fa-angle-right"></i>\n' +
    '                    <span></span>\n' +
    '                </div>\n' +
    '                <div class="list">\n' +
    '                    <ul></ul>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="switch-player">\n' +
    '        <i class="fa fa-angle-right" style="margin-top: 20px;"></i>\n' +
    '    </div>\n' +
    '    <div class="searchbox">\n' +
    '        <input type="text" placeholder="输入歌手+歌曲名并回车..."><i title="清空列表" class="delsearchlist fa fa-trash"></i>\n' +
    '        <div class="searchlistbox">\n' +
    '            <ul></ul>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div id="ailccTips"></div>\n' +
    '<div id="ailccLrc"></div>');

    // 全局主色
    mainColor = '0,0,0';
    var protocol = 'https:' == document.location.protocol ? 'https' : 'http';
    var audio = new Audio(),
    $player = $('#ailccPlayer'),
    $tips = $('#ailccTips'),
    $lk = $('#ailccKsc,#ailccLrc'),
    $switchPlayer = $('.switch-player', $player),
    $btns = $('.status', $player),
    $songName = $('.song', $player),
    $cover = $('.cover', $player),
    $songTime = $('.time', $player),
    $songList = $('.song-list .list', $player),
    $albumList = $('.album-list', $player),
    $songFrom = $('.player .artist', $player),
    $songFrom1 = $('.player .artist1', $player),
    $songFrom2 = $('.player .moshi', $player),
    $songFrom3 = $('.player .geci', $player),
    $songFrom4 = $('.player .switch-ksclrc', $player),
    $volumeSlider = $('.volume-controls .slider', $player);
    $rateBuffered = $('.musicbottom .rate-buffered', $player);
    $rateSlider = $('.rate .progress', $player);
    $SearchBox = $('.searchbox', $player);
    ailccqq = "66257875",
    songFrom33 = '开启',
    songFrom44 = '',
    songFrom55 = '',
    roundcolor = '#6c6971',
    lightcolor = '#81c300',
    cur = 'current',
    ycgeci = true,
    first = 1,
    volume = localStorage.getItem('ailcc_player_volume') ? localStorage.getItem('ailcc_player_volume') : '0.666',
    albumId = 0,
    songId = 0,
    songTotal = 0,
    random = true,
    rateIsDown = false,
    rateMouse = {},
    rateTouch = {},
    hasgeci = true,
    errjc = true,
    errCount = 0,
    currentFrameId = 0, 
    playisTsMoving = !1, 
    pass = true,
    hasLrc = false,
    lrcTimeLine = [],
    lrcHeight = 40,
    lrcTime = null,
    lrcCont = '',
    loop = false,
    dogInterval = null;
    playing = true;
    autoswitch = false;
    ailccplaytime = localStorage.getItem("ailcc_player_time") ? localStorage.getItem("ailcc_player_time") : false;
    ailccplaying = localStorage.getItem("ailcc_player_times") ? localStorage.getItem("ailcc_player_times") : false;
    playingalbumId = localStorage.getItem("ailcc_player_album") ? localStorage.getItem("ailcc_player_album") : false;
    playingsongId = localStorage.getItem("ailcc_player_song") ? localStorage.getItem("ailcc_player_song") : false;
    ailcc_player_songid = localStorage.getItem("ailcc_player_songid") ? localStorage.getItem("ailcc_player_songid") : false;
        
    function ailccCicle() {
        $songTime.text(formatSecond(audio.currentTime) + " / " + formatSecond(audio.duration))
    }
    if(isPhone){$('#ailccLrc').addClass('phone');$player.addClass('phone');$(".new-volume",$player).hide();}

    function formatSecond(t) {
        return ('00' + Math.floor(t / 60)).substr(-2) + ':' + ('00' + Math.floor(t % 60)).substr(-2)
    }
    var cicleTime = null;
    $songName.html('<a style="color:#f00">正在加载播放</a>');
    $songFrom.html('<a style="color:#f00">Ailcc.Com</a>');
    $songFrom1.html('<a href="https://ailcc.com" target="_blank" style="color:#f00">沛霖主页</a>');
    $songFrom3.html('<i class="fa fa-times-circle"></i> 欢迎光临');
    $cover.html('<img src=\"' + webURL + '/player/css/plzy.png\">');
    var ailccMedia = {
        play: function () {
            $cover.addClass('coverplay');
            $player.addClass('playing');
            $rateBuffered.width(0);
            // 播放进度更新秒表
            cicleTime = setInterval(function(){
                if(!rateMouse.isDown && !rateTouch.isTouchDown){
                    $songTime.text(formatSecond(audio.currentTime) + ' / ' + formatSecond(audio.duration));
                    $(".rate-on",$rateSlider).width(audio.currentTime / audio.duration * 100+"%");
                }
                // 以下为删除 播放暂停按钮中绿色进度条
                // if (audio.currentTime < audio.duration / 2) {
                //     $btns.css('background-image', 'linear-gradient(90deg, ' + roundcolor + ' 50%, transparent 50%, transparent), linear-gradient(' + (90 + (270 - 90) / (audio.duration / 2) * audio.currentTime) + 'deg, ' + lightcolor + ' 50%, ' + roundcolor + ' 50%, ' + roundcolor + ')')
                // } else {
                //     $btns.css('background-image', 'linear-gradient(' + (90 + (270 - 90) / (audio.duration / 2) * audio.currentTime) + 'deg, ' + lightcolor + ' 50%, transparent 50%, transparent), linear-gradient(270deg, ' + lightcolor + ' 50%, ' + roundcolor + ' 50%, ' + roundcolor + ')')
                // }
                var timeRanges = audio.buffered;
                // 获取已缓存的时间  timeRanges.end(timeRanges.length - 1)

                // 计算百分比 展示进度
                if(timeRanges.length !== 0){
                    $rateBuffered.width(parseInt(timeRanges.end(timeRanges.length - 1) * 100 / audio.duration * 100) / 100 + '%')
                }
            }, 800);
            if (hasLrc) {
                lrcTime = setInterval(ailccLrc.lrc.play, 500);
                $('#ailccLrc').addClass('show');
                $('.switch-down').css('right', '65px');
                $('.switch-ksclrc').show()
            }
        },
        pause: function () {
            clearInterval(cicleTime);
            $player.removeClass('playing');
            //$('.switch-ksclrc').hide();
            $('.switch-down').css('right', '35px');
            if (hasLrc) {
                ailccLrc.lrc.hide()
            }
        },
        error: function() {
            clearInterval(cicleTime);
            $player.removeClass("playing");
                if (errCount > 2) {
                    ailccTips.show("连续播放失败超过3次！已停止播放！");
                    errCount = 0;
                    errjc = true
                } else {
                    errCount++;
                    errjc = false;
                    ailccTips.show(songSheetList[albumId].songNames[songId] + " - 资源获取失败！尝试获取下一首...");
                    console.log('%c播放失败 '+ errCount + '次!', 'text-shadow: 3px 1px 1px grey');
                    setTimeout(function() {
                        $cover.removeClass("coverplay");
                        localStorage.setItem("ailcc_player", "no", {
                            path: "/",
                            expires: -1
                        });
                        hasgeci = true;
                        auto = "";
                        ailccMedia.next()
                    }, 1500)
                }
            },
        seeking: function () {
            if (audio.paused === true) {
                audio.play()
            };
            $player.addClass("playing");
            $cover.addClass("coverplay");
            ailccLrc.load();
            ailccTips.show("歌曲缓冲中...")
        },
        volumechange: function () {
            var vol = window.parseInt(audio.volume * 100);
            $('.progress2', $volumeSlider).height(vol + '%');
            ailccTips.show('音量：' + vol + '%');
            localStorage.setItem("ailcc_player_volume", audio.volume);
        },
        getInfos: function (id, b) {
            $cover.removeClass('coverplay');
            songId = id;
            albumId = b;
            allmusic();
            localStorage.setItem("ailcc_player_album", albumId);
            localStorage.setItem("ailcc_player_song", songId);
            localStorage.setItem("ailcc_player_songid", songSheetList[albumId].songTypes[songId] + songSheetList[albumId].songIds[songId]);
            if (songSheetList[albumId].songTypes[songId] == "wy") {
                songFrom55 = "网易音乐";
                musictype = "wy";
                netmusic()
                } else {
                    if (songSheetList[albumId].songTypes[songId] == "kg") {
                        songFrom55 = "酷狗音乐";
                        musictype = "kg";
                        netmusic()
                    } else {
                        if (songSheetList[albumId].songTypes[songId] == "qq") {
                            songFrom55 = "QQ音乐";
                            musictype = "qq";
                            netmusic()
                        } else {
                            if (songSheetList[albumId].songTypes[songId] == "mg") {
                                songFrom55 = "咪咕音乐";
                                musictype = "mg";
                                netmusic()
                            } else {
                                if (songSheetList[albumId].songTypes[songId] == "local") {
                                    songFrom55 = "本地音乐";
                                    musictype = "local";
                                    netmusic()
                                }
                            }
                        }
                    }
                }
            },
            getSongId: function (n) {
                return n >= songTotal ? 0 : n < 0 ? songTotal - 1 : n
            },
            nexts: function() {
                if (loop) {
                    ailccMedia.getInfos(songId, albumId)
                } else {
                    ailccMedia.next()
                }
            },
            next: function() {
                pass = false;
                    songTotal = songSheetList[albumId].songIds.length;
                    if (random) {
                        rid = parseInt(Math.random() * songTotal);
                        if (songTotal > 1) {
                            if (rid != songId) {
                                ailccMedia.getInfos(rid, albumId)
                            } else {
                                if (rid + 1 >= songTotal) {
                                    ailccMedia.getInfos(0, albumId)
                                } else {
                                    ailccMedia.getInfos(rid + 1, albumId)
                                }
                            }
                        } else {
                            ailccMedia.getInfos(0, albumId)
                        }
                    } else {
                        if (parseInt(songId) + 1 >= songTotal) {
                                ailccMedia.getInfos(0, albumId)
                            } else {
                                ailccMedia.getInfos(parseInt(songId) + 1, albumId)
                            }
                    };
                    setTimeout(function() {
                        pass = true
                    }, 1500)
                },
                prev: function() {
                    pass = false;
                    songTotal = songSheetList[albumId].songIds.length;
                    if (random) {
                        rid = parseInt(Math.random() * songTotal);
                        if (songTotal > 1) {
                            if (rid != songId) {
                                    ailccMedia.getInfos(rid, albumId)
                            } else {
                                if (rid + 1 >= songTotal) {
                                    ailccMedia.getInfos(0, albumId)
                                } else {
                                    ailccMedia.getInfos(rid + 1, albumId)
                                }
                            }
                        } else {
                            ailccMedia.getInfos(0, albumId)
                        }
                    } else {
                        if (parseInt(songId) - 1 < 0) {
                                ailccMedia.getInfos(songTotal - 1, albumId)
                            } else {
                                ailccMedia.getInfos(parseInt(songId) - 1, albumId)
                            }
                    };
                    setTimeout(function() {
                        pass = true
                    }, 1500)
                },
                anext: function() {
                    pass = false;
                    albumTotal = songSheetList.length;
                    if (random || loop) {
                        rid = parseInt(Math.random() * albumTotal);
                        if (albumTotal > 1) {
                            if (rid != albumId) {
                                songTotals = songSheetList[rid].songIds.length;
                                rids = parseInt(Math.random() * songTotals);
                                ailccMedia.getInfos(rids - 1, rid)
                            } else {
                                if (rid + 1 >= albumTotal) {
                                    songTotals = songSheetList[0].songIds.length;
                                    rids = parseInt(Math.random() * songTotals);
                                    ailccMedia.getInfos(rids - 1, 0)
                                } else {
                                    songTotals = songSheetList[rid + 1].songIds.length;
                                    rids = parseInt(Math.random() * songTotals);
                                    ailccMedia.getInfos(rids - 1, rid + 1)
                                }
                            }
                        } else {
                            songTotals = songSheetList[0].songIds.length;
                            rids = parseInt(Math.random() * songTotals);
                            ailccMedia.getInfos(rids, 0)
                        }
                    } else {
                        if (albumTotal > 1) {
                            if (parseInt(albumId) + 1 >= albumTotal) {
                                ailccMedia.getInfos(0, 0)
                            } else {
                                ailccMedia.getInfos(0, parseInt(albumId) + 1)
                            }
                        } else {
                            songTotals = songSheetList[0].songIds.length;
                            rids = parseInt(Math.random() * songTotals);
                            ailccMedia.getInfos(rids, 0)
                        }
                    };
                    $player.removeClass("showSongList");
                    setTimeout(function() {
                        pass = true
                    }, 1500)
                },
                aprev: function() {
                    pass = false;
                    albumTotal = songSheetList.length;
                    if (random || loop) {
                        rid = parseInt(Math.random() * albumTotal);
                        if (albumTotal > 1) {
                            if (rid != albumId) {
                                songTotals = songSheetList[rid].songIds.length;
                                rids = parseInt(Math.random() * songTotals);
                                ailccMedia.getInfos(rids - 1, rid)
                            } else {
                                if (rid + 1 >= albumTotal) {
                                    songTotals = songSheetList[0].songIds.length;
                                    rids = parseInt(Math.random() * songTotals);
                                    ailccMedia.getInfos(rids - 1, 0)
                                } else {
                                    songTotals = songSheetList[rid + 1].songIds.length;
                                    rids = parseInt(Math.random() * songTotals);
                                    ailccMedia.getInfos(rids - 1, rid + 1)
                                }
                            }
                        } else {
                            songTotals = songSheetList[0].songIds.length;
                            rids = parseInt(Math.random() * songTotals);
                            ailccMedia.getInfos(rids, 0)
                        }
                    } else {
                        if (albumTotal > 1) {
                            if (parseInt(albumId) - 1 < 0) {
                                ailccMedia.getInfos(0, albumTotal - 1)
                            } else {
                                ailccMedia.getInfos(0, parseInt(albumId) - 1)
                            }
                        } else {
                            songTotals = songSheetList[0].songIds.length;
                            rids = parseInt(Math.random() * songTotals);
                            ailccMedia.getInfos(rids, 0)
                        }
                    };
                    $player.removeClass("showSongList");
                    setTimeout(function() {
                        pass = true
                    }, 1500)
                },
                timeupdate: function() {
                    if (audio.buffered.length) {
                        if (!errjc) {
                            errCount = 0;
                            errjc = true
                        };
                        var a = 100 * audio.buffered.start(currentFrameId) / audio.duration,
                            b = 100 * audio.buffered.end(currentFrameId) / audio.duration;
                        $(".playprogress .progressbg .progressbg2", $player).css({
                            left: a + "%",
                            width: b - a + "%"						});
                            localStorage.setItem("ailcc_player_time", audio.currentTime)
                    };
                playisTsMoving || ($(".playprogress .progressbg .ts", $player).css("left", 100 * (audio.currentTime / audio.duration).toFixed(2) + "%"), $(".playprogress .progressbg .progressbg1", $player).css("width", 100 * (audio.currentTime / audio.duration).toFixed(2) + "%"), $(".time", $player).text(formatSecond(audio.currentTime) + " / " + formatSecond(audio.duration)))
				}
    };
    var ailccTipsTime = null;
    var ailccTips = {
        show: function (cont) {
            clearTimeout(ailccTipsTime);
            $('#ailccTips').text(cont).addClass('show');
            this.hide()
        },
        hide: function () {
            ailccTipsTime = setTimeout(function () {
                $('#ailccTips').removeClass('show');
            }, 3000)
        }
    };
    //给audio添加监听事件  执行相应的函数
    audio.addEventListener('play', ailccMedia.play, false);
    audio.addEventListener('pause', ailccMedia.pause, false);
    audio.addEventListener('ended', ailccMedia.nexts, false);
    audio.addEventListener('playing', ailccMedia.playing, false);
    audio.addEventListener('volumechange', ailccMedia.volumechange, false);
    audio.addEventListener('error', ailccMedia.error, false);
    audio.addEventListener('seeking', ailccMedia.seeking, false);
    audio.addEventListener("timeupdate", ailccMedia.timeupdate, !1);
    
    //侧边按钮点击事件
    $switchPlayer.click(function() {
		$player.toggleClass("show");
		autoswitch = true
	});
	
	//搜索按钮点击事件
    $('.search', $player).click(function() {
    	ailccPlayer.SearchList.CreateVoid();
    	$(this).toggleClass(cur);
    	if ($(this).hasClass(cur)) {
    		$SearchBox.show();
    		$SearchBox.addClass('show');
    		$player.removeClass('showAlbumList showSongList').addClass('showAlbumList showSongList');
    		$('.list', $albumList).mCustomScrollbar('update');
    		$($("li", '.album-list').eq(ailccPlayer.SearchList.ListId)).hasClass('current') ? ailccPlayer.playList.creat.song(ailccPlayer.SearchList.ListId, true) : ailccPlayer.playList.creat.song(ailccPlayer.SearchList.ListId, false);
    	} else {
    		$SearchBox.removeClass('show');
    		setTimeout(function() {
    			$SearchBox.hide()
    		}, 200)
    	}
    });
    $('.delsearchlist').click(function() {
    	ailccPlayer.SearchList.Clean();
    	ailccPlayer.playList.creat.song(0, true);
    	$('.search', $player).removeClass(cur);
		$SearchBox.removeClass('show');
    	$SearchBox.hide();
    });
    $('input', $SearchBox).keyup(function() {
    	var search = $(this).val();
    	if (event.keyCode == 13) {
    		$('.searchlistbox', $SearchBox).hide();
    		$SearchBox.css('height', );
    		$.ajax({
    			url: 'https://api.ailcc.com/song/search.php?types=search',
    			//url: 'https://cloud.yaode.xyz/search?',
    			data: {
    				keywords: search
    			},
    			method: 'get',
    			dataType: 'json',
    			success: function(searchId) {
    				if (searchId.code !== 200) {
    					$('input', $SearchBox).val().attr('disabled', false).attr('placeholder', '未找到歌曲...')
    				} else {
    					$('.searchlistbox', $SearchBox).show();
    					$SearchBox.css('height', 289);
    					$('input', $SearchBox).attr('disabled', false).attr('placeholder', '搜索'  + search +  '的结果').val();
    					console.log('%c搜索 %c'+ search +' %c的歌曲', 'color:orange', 'color:red', 'color:orange');
    					a = searchId.result.songs.length;
    					var searchName = '';
    					for (var searchAlbum = 0; searchAlbum < a; searchAlbum++) {
    					    searchName += '<li SongName=' + searchId.result.songs[searchAlbum].name + ' SongId=' + searchId.result.songs[searchAlbum].id + '><span class="index">' + (searchAlbum + 1) + '</span>'  + searchId.result.songs[searchAlbum].name + '-' + searchId.result.songs[searchAlbum].ar[0].name +  '</li>'
    					};
    					$('.searchlistbox', $SearchBox).html('<ul>' + searchName + '</ul>').mCustomScrollbar();
    					$('#ailccPlayer .searchlistbox ul','#ailccPlayer .searchlistbox .mCSB_draggerContainer').css({
    						background: 'rgba(' + mainColor + ', .8)'
    					});
    					$('.searchlistbox li').click(function() {
    						ailccPlayer.SearchList.New('wy', $(this).attr('SongId'));
    						$('input', $SearchBox).val('').attr('disabled', false).attr('placeholder', '正在播放'  + $(this).attr('SongName'));
    						$(this).remove();
    						$('.searchlistbox', $SearchBox).mCustomScrollbar('update')
    					});
    				}
    			}
    		});
    		$(this).val('').attr('disabled', true).attr('placeholder', 'Loading...');
    	}
    });
    ailccPlayer.SearchList = {
    	List: null,
    	IsShow: false,
    	ListId: 0,
    	CreateVoid: function() {
    	    if(localStorage.ailcc_searchlist == null){
    			ailccPlayer.SearchList.ListId = songSheetList.push({
        			"songSheetName": '我搜索的歌曲',
        			"author": 'Me',
                    'songIds':[],
                    'songNames':[],
                    'songTypes':[],
                    'albumNames':[],
                    'artistNames':[],
                    'albumCovers':[],
    			}) - 1;
    			localStorage.ailcc_searchlist = JSON.stringify(songSheetList[ailccPlayer.SearchList.ListId]);
    			ailccPlayer.playList.creat.album1(ailccPlayer.SearchList.ListId);
    	    }
    	},
    	New: function(type,id) {
        	$.ajax({
        		url: 'https://api.ailcc.com/song/song.php?type=song&media=netease&id='+ id ,
        		//url: 'https://music.yaode.xyz/song/'+ type +'_'+ id +'.json',
        		type: 'GET',
        		dataType: 'json',
        		success: function(data) {
        		    if(data.code != 400){
                    	albumId = ailccPlayer.SearchList.ListId;
                    	songSheetList[albumId].songIds.unshift(id);
                    	songSheetList[albumId].songNames.unshift(data.name);
                    	songSheetList[albumId].songTypes.unshift('wy');
                    	songSheetList[albumId].albumNames.unshift(data.album_name);
                    	songSheetList[albumId].artistNames.unshift(data.artist_name);
                    	songSheetList[albumId].albumCovers.unshift(data.album_cover);
        				ailccPlayer.playList.creat.song(ailccPlayer.SearchList.ListId, 1);
        				ailccPlayer.playList.creat.song1(0,ailccPlayer.SearchList.ListId);
        				localStorage.ailcc_searchlist = JSON.stringify(songSheetList[ailccPlayer.SearchList.ListId]);
        		    }else{
        		        $('#Tips').text(data.info).addClass('show');
            		        setTimeout(function () {
                            $('#Tips').removeClass('show');
                        }, 3000)
        		    }
        
        		},
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#Tips').text('歌曲列表获取失败').addClass('show');
                }
        	})
    	},
    	Clean: function() {
    		if (localStorage.ailcc_searchlist == null||localStorage.ailcc_searchlist == '[]') {
    			return
    		};
            songSheetList.splice(ailccPlayer.SearchList.ListId,1)
    		localStorage.removeItem('ailcc_searchlist');
    		albumId = 0;
    		songId = 0;
    // 		$SearchBox.hide()
    		ailccPlayer.playList.creat.album();
    	},
    	Save: function(searchId) {
    		localStorage.setItem('ailcc_searchlist', JSON.stringify(ailccPlayer.SearchList.List))
    	}
    };
    //音乐暂停事件
    $('.pause', $player).click(function () {
        hasgeci = false;
        var albumTotal = songSheetList.length;
            if (albumTotal == 1) {
                $("li", $albumList).eq(songId).addClass(cur).find(".artist").html("暂停播放 > ").parent().siblings().removeClass(cur).find(".artist").html("").parent()
            } else {
                $("li", $albumList).eq(albumId).addClass(cur).find(".artist").html("暂停播放 > ").parent().siblings().removeClass(cur).find(".artist").html("").parent()
            };
        ailccTips.show('暂停播放 - ' + songSheetList[albumId].songNames[songId]);
        $cover.removeClass('coverplay');
        audio.pause();
        localStorage.setItem("ailcc_player_auto", "no")
    });
    //音乐播放事件
    $('.play', $player).click(function () {
        hasgeci = true;
        var albumTotal = songSheetList.length;
            if (albumTotal == 1) {
                $("li", $albumList).eq(songId).addClass(cur).find(".artist").html("当前播放 > ").parent().siblings().removeClass(cur).find(".artist").html("").parent()
            } else {
                $("li", $albumList).eq(albumId).addClass(cur).find(".artist").html("当前播放 > ").parent().siblings().removeClass(cur).find(".artist").html("").parent()
            };
        $('#ailccLrc,#ailccKsc').show();
        startPlay();
        localStorage.setItem("ailcc_player_auto", "yes")
    });
    //上一首事件
    $('.prev', $player).click(function () {
        hasgeci = true;
        $('#ailccLrc,#ailccKsc').show();
        ailccMedia.prev();
        localStorage.setItem("ailcc_player_auto", "yes");
    });
    //下一首事件
    $('.next', $player).click(function () {
        hasgeci = true;
        $('#ailccLrc,#ailccKsc').show();
        ailccMedia.next();
        localStorage.setItem("ailcc_player_auto", "yes");
    });
    //上一专辑事件
    $('.aprev', $player).click(function () {
        hasgeci = true;
        $('#ailccLrc,#ailccKsc').show();
        ailccMedia.aprev();
        localStorage.setItem("ailcc_player_auto", "yes");
    });
    //下一专辑事件
    $('.anext', $player).click(function () {
        hasgeci = true;
        $('#ailccLrc,#ailccKsc').show();
        ailccMedia.anext();
        localStorage.setItem("ailcc_player_auto", "yes");
    });
    $(".qhms", $player).click(function() {
        random ? (random = false, ailccTips.show("专辑循环"), $(this).html("<i class = \"random fa fa-retweet\" title=\"专辑循环\"></i>"), $songFrom2.html("<i class=\"fa fa-retweet current\"></i> 专辑循环")) : (loop ? (random = true, loop = false, ailccTips.show("随机播放"), $(this).html("<i class = \"random fa fa-random\" title=\"随机播放\"></i>"), $songFrom2.html("<i class=\"fa fa-random current\"></i> 随机播放")) : (random = false, loop = true, ailccTips.show("单曲循环"), $(this).html("<i class = \"random fa fa-refresh\" title=\"单曲循环\"></i>"), $songFrom2.html("<i class=\"fa fa-refresh current\"></i> 单曲循环")));
        musicTooltip();
            if (autoswitch) {
                autoswitch = false;
                setTimeout(function() {
                    autoswitch = true
                }, 500)
            }
        });
    //随机播放按钮事件
    $('.random', $player).click(function () {
        $(this).addClass(cur);
        $('.loop', $player).removeClass(cur);
        random = true;
        ailccTips.show('随机播放');
        $songFrom2.html('<i class="random fa fa-random"></i> 随机播放')
        localStorage.setItem("random_play", true)
    });
    //专辑循环按钮事件
    $('.loop', $player).click(function () {
        $(this).addClass(cur);
        $('.random', $player).removeClass(cur);
        random = false;
        ailccTips.show('专辑循环');
        $songFrom2.html('<i class="loop fa fa-retweet current"></i> 专辑循环')
        localStorage.setItem("random_play", false)
    });
    //音量组件拖动事件
    $volumeSlider.click(function (e) {
        var documentTop = $(document).scrollTop();
        var progressHeight = $volumeSlider.height(),
            progressOffsetTop = $volumeSlider.offset().top - documentTop;
        var calcVolume = (1 - (e.clientY - progressOffsetTop) / progressHeight).toFixed(2);
        audio.volume = calcVolume > 1 ? 1 : calcVolume;
    });
    $rateSlider.click(function (e) {
        var progressWidth = $rateSlider.width(),
            progressOffsetLeft = $rateSlider.offset().left,
            eClientX = e.clientX;

        audio.currentTime = audio.duration * ((eClientX - progressOffsetLeft) / progressWidth)
    });
    var isDown = false;
    $('.drag', $volumeSlider).mousedown(function () {
        isDown = true;
    });

    $('.drag', $rateSlider).on("touchstart",(function (e) {
        rateTouch.progressWidth = $rateSlider.width();
        rateTouch.isTouchDown = true;
        rateTouch.startX = e.originalEvent.touches[0].clientX;
        rateTouch.rateOnWidth = parseFloat(($(".rate-on",$rateSlider).width() / rateTouch.progressWidth).toFixed(2));
    }));

    $('.drag', $rateSlider).mousedown(function (e) {
        rateMouse.progressWidth = $rateSlider.width();
        rateMouse.isDown = true;
        rateMouse.startX = e.clientX;
        rateMouse.rateOnWidth = parseFloat(($(".rate-on",$rateSlider).width() / rateMouse.progressWidth).toFixed(2));
    });

    window.addEventListener("touchmove",function(e){
        if(rateTouch.isTouchDown){
            var rate = parseFloat(((e.touches[0].clientX - rateTouch.startX) / rateTouch.progressWidth)
                .toFixed(2))+rateTouch.rateOnWidth;
            if(rate >= 0 && rate <= 1){
                $(".rate-on",$rateSlider).width(rate * 100 + '%');
                rateTouch.currentTime = audio.duration * rate;
                $songTime.text(formatSecond(rateTouch.currentTime) + ' / ' + formatSecond(audio.duration));
            }
        }
        return false;
    }, { passive: false });

    $(window).on({
        mousemove: function (e) {
            if (isDown) {
                var documentTop = $(document).scrollTop();
                var progressHeight = $volumeSlider.height(),
                    progressOffsetTop = $volumeSlider.offset().top - documentTop,
                    eClientY = e.clientY;
                if(eClientY >= progressOffsetTop && eClientY <= progressOffsetTop + progressHeight){
                    audio.volume = (1 - (eClientY - progressOffsetTop) / progressHeight).toFixed(2);
                }
            }else if(rateMouse.isDown){
                var rate = parseFloat(((e.clientX - rateMouse.startX) / rateMouse.progressWidth)
                    .toFixed(2))+rateMouse.rateOnWidth;
                if(rate >= 0 && rate <= 1){
                    $(".rate-on",$rateSlider).width(rate * 100 + '%');
                    rateMouse.currentTime = audio.duration * rate;
                    $songTime.text(formatSecond(rateMouse.currentTime) + ' / ' + formatSecond(audio.duration));
                }
            }
        },
        mouseup: function () {
            isDown = false;
            if(rateMouse.isDown){
                audio.currentTime = rateMouse.currentTime;
                rateMouse.isDown = false;
            }
        },
        touchend:function (e) {
            if(rateTouch.isTouchDown){
                audio.currentTime = rateTouch.currentTime;
                rateTouch.isTouchDown = false;
            }
        }
    });
    //设置默认音量
    audio.volume = volume;
    if (volume == 1) {
        $('.volume-on', $player).width('100%');
    }
    //播放列表按钮点击事件
    $('.switch-playlist').click(function () {
        $player.toggleClass('showAlbumList');
		$('.search', $player).removeClass(cur);
		$SearchBox.removeClass('show');
    	$SearchBox.hide()
    });
    //返回专辑列表事件
    $songList.mCustomScrollbar();
    $('.song-list .musicheader,.song-list .fa-angle-right', $player).click(function () {
        $player.removeClass('showSongList');
		$('.search', $player).removeClass(cur);
		$SearchBox.removeClass('show');
    	$SearchBox.hide()
    });
    //打开关闭歌词显示
    $('.switch-ksclrc').click(function () {
        $player.toggleClass('ksclrc');
        $('#ailccLrc').toggleClass('hide');
        $('#ailccKsc').toggleClass('hidePlayer');
        if (!$('#ailccLrc').hasClass('hide')) {
            ycgeci = true;
            if (hasLrc) {
                $songFrom3.html('<i class="fa fa-check-circle"></i> 歌词开启')
            }
            ailccTips.show('歌词显示已开启');
            songFrom33 = '开启';
            $songFrom4.html('<i class="fa fa-check-circle"></i> 歌词开启');
        } else {
            ycgeci = false;
            if (hasLrc) {
                $songFrom3.html('<i class="fa fa-times-circle"></i> 歌词关闭');
            }
            ailccTips.show('歌词显示已关闭');
            songFrom33 = '关闭';
            $songFrom4.html('<i class="fa fa-check-circle"></i> 歌词关闭')
        }
        musicTooltip();
        if (autoswitch) {
            autoswitch = false;
            setTimeout(function() {
                autoswitch = true
            }, 500)
        }
    });
    ailccPlayer.playList = {
        creat: {
            album: function () {
                var albumTotal = songSheetList.length,
                    albumList = '';
                if (typeof ssssid === "undefined") {
                    if (albumTotal == 1) {
                        $(".musicheader", $albumList).html(songSheetList[0].songSheetName + "(" + songSheetList[0].songIds.length + ")")
                    } else {
                        $(".musicheader", $albumList).html(siteName + " - 专辑列表")
                    }
                } else {
                    $(".musicheader", $albumList).html(siteName + " - 专辑列表")
                };
                if (albumTotal == 1) {
                    for (var i = 0; i < songSheetList[0].songIds.length; i++) {
                        albumList += "<li><span class=\"index\">" + (i + 1) + "</span><span class=\"artist\"></span>" + songSheetList[0].songNames[i] + " - " + songSheetList[0].artistNames[i] + "</li>"
                    }
                } else {
                    for (var c = 0; c < albumTotal; c++) {
                        albumList += "<li><i class=\"fa fa-angle-right\"></i><span class=\"index\">" + (c + 1) + "</span><span class=\"artist\"></span>《" + songSheetList[c].songSheetName + "》 - " + songSheetList[c].author + "</li>"
                    }
                };
                $('.list', $albumList).html('<ul>' + albumList + '</ul>').mCustomScrollbar();
				$("li", $albumList).click(function() {
                    if (albumTotal == 1) {
                        hasgeci = true;
                        albumId = 0;
                        if ($(this).hasClass(cur)) {
                            ailccTips.show("正在播放 - " + songSheetList[albumId].songNames[songId].replace(songId + 1 + "#", ""))
                        } else {
                            localStorage.setItem("ailcc_player_auto", "yes");
                            songId = $(this).index();
                            ailccMedia.getInfos(songId, albumId)
                        }
                    } else {
                        var a = $(this).index();
                        $(this).hasClass(cur) ? ailccPlayer.playList.creat.song(a, true) : ailccPlayer.playList.creat.song(a, false);
                        $player.addClass("showSongList")
                    }
                });
                songTotal = songSheetList[albumId].songIds.length;
                playingalbumId && playingsongId && songSheetList[playingalbumId].songTypes[playingsongId] + songSheetList[playingalbumId].songIds[playingsongId] == ailcc_player_songid ? ailccMedia.getInfos(ailccPlayer.playList.creat.getSongId(playingsongId), ailccPlayer.playList.creat.getalbumId(playingalbumId)) : random ? ailccMedia.getInfos(window.parseInt(Math.random() * songTotal), albumId) : ailccMedia.getInfos(0, albumId)
            },
			album1: function() {
                var albumTotal = songSheetList.length,
                    albumList = '';
				$('.musicheader', $albumList).html(siteName + ' - 专辑列表');
				for (var c = 0; c < albumTotal; c++) albumList += "<li><i class=\"fa fa-angle-right\"></i><span class=\"index\">" + (c + 1) + "</span><span class=\"artist\"></span>《" + songSheetList[c].songSheetName + "》 - " + songSheetList[c].author + "</li>"
				$(".list", $albumList).html("<ul>" + albumList + "</ul>").mCustomScrollbar();
				$("li", '.album-list').eq(albumId).addClass('current');
				$("li", $albumList).click(function() {
					var a = $(this).index();
					$(this).hasClass(cur) ? ailccPlayer.playList.creat.song(a, !0) : ailccPlayer.playList.creat.song(a, !1);
					$player.addClass("showSongList")
				});
			},
            getSongId: function(n) {
                return n >= songTotal ? 0 : n < 0 ? songTotal - 1 : n
            },
            getalbumId: function(n) {
                return n >= songSheetList.length ? 0 : n < 0 ? songSheetList.length - 1 : n
            },
            song: function (id, isThisAlbum) {
                songTotal = songSheetList[id].songIds.length;
                $(".song-list .musicheader span", $player).text(songSheetList[id].songSheetName + "(" + songTotal + ")");
                var songList = '';
                for (var i = 0; i < songTotal; i++) {
                    songList += '<li><span class="index">' + (i + 1) + '</span><span class="artist">' + songSheetList[id].songNames[i] + ' - ' + songSheetList[id].artistNames[i] + '</span></li>'
                }
                $('ul', $songList).html(songList);
                $songList.attr("data-album", id);
                $songList.mCustomScrollbar('update');
                if (isThisAlbum) {
                    $("li", $songList).eq(songId).addClass(cur).siblings().removeClass(cur);
                    $songList.mCustomScrollbar("scrollTo", $("li.current", $songList).position()/*.top - 120*/);
                } else {
                    $songList.mCustomScrollbar("scrollTo", "top");
                }
                $('li', $songList).click(function () {
                    hasgeci = true;
                    $('#ailccLrc,#ailccKsc').show();
                    albumId = id;
                    if ($(this).hasClass(cur)) {
                        ailccTips.show('正在播放 - ' + songSheetList[albumId].songNames[songId].replace(songId + 1 + '#', ''))
                    } else {
                        localStorage.setItem("ailcc_player_auto", "yes");
                        songId = $(this).index();
                        ailccMedia.getInfos(songId, albumId);
                    }
                })
            },
            song1: function (a,b) {
                ailccMedia.getInfos(a,b);
            }
        }
    };
    var ailccLrc = {
        load: function () {
            ailccLrc.lrc.hide();
            hasLrc = false;
            $('#ailccLrc,#ailccKsc').html('');
            setTimeout(function () {
                if (hasgeci) {
                    $songFrom3.html('<i class="fa fa-check-circle"></i> 歌词' + songFrom33)
                } else {
                    $songFrom3.html('<i class="fa fa-times-circle"></i> 歌词' + songFrom33)
                }
                $('.switch-down').css('right', '65px');
                $('.switch-ksclrc').show();
                if(songSheetList[albumId].songTypes[songId] == "local" && songSheetList[albumId].lyric[songId] != ''){
                    lrcurl = songSheetList[albumId].lyric[songId];
                    geshi = 'text';
                }else{
                    lrcurl = webURL + "/api/musicLyric?songId=" + songSheetList[albumId].songIds[songId] + "&type=" + songSheetList[albumId].songTypes[songId] + '&id='+keyId;
                    geshi = 'script';
                }
                $.ajax({
                    url: lrcurl,
                    type: 'GET',
                    dataType: 'script',
                    xhrFields:{withCredentials: true},
                    success: function () {
                        if (lrcstr == '') {
                            songFrom44 = ' - 暂无歌词!';
                            $songFrom3.html('<i class="fa fa-times-circle"></i> 暂无歌词');
                            //$('.switch-ksclrc').hide();
                            $('.switch-down').css('right', '35px');
                        } else {
                            if (lrcstr.indexOf('[00') >= 0) {
                                setTimeout(function () {
                                    if (!$('#ailccLrc').hasClass('hide')) {
                                        songFrom44 = ' - 歌词获取成功!'
                                    } else {
                                        songFrom44 = ' - 歌词已关闭！'
                                    }
                                ailccLrc.lrc.format(lrcstr)
                                },
                                500)
                            } else {
                                songFrom44 = ' - 暂无歌词!';
                                $songFrom3.html('<i class="fa fa-times-circle"></i> 暂无歌词');
                                //$('.switch-ksclrc').hide();
                                $('.switch-down').css('right', '35px');
                            }
                        }
                    },
                    error: function () {
                        songFrom44 = ' - 暂无歌词!';
                        $songFrom3.html('<i class="fa fa-times-circle"></i> 暂无歌词');
                        //$('.switch-ksclrc').hide();
                        $('.switch-down').css('right', '35px');
                    }
                })
            }, 50)
        },
        lrc: {
            format: function (cont) {
                hasLrc = true;
                function formatTime(t) {
                    var sp = t.split(':'),
                        min = +sp[0],
                        sec = +sp[1].split('.')[0],
                        ksec = +sp[1].split('.')[1];
                    return min * 60 + sec + Math.round(ksec / 1000)
                }
                var lrcCont = cont.replace(/\[[A-Za-z]+:(.*?)]/g, '').split(/[\]\[]/g),
                    lrcLine = '';
                lrcTimeLine = [];
                for (var i = 1; i < lrcCont.length; i += 2) {
                    var timer = formatTime(lrcCont[i]);
                    lrcTimeLine.push(timer);
                    if (i == 1) {
                        lrcLine += '<li class="ailccLrc' + timer + ' current" style="color:rgba(' + mainColor + ',1)">' + lrcCont[i + 1] + '</li>'
                    } else {
                        lrcLine += '<li class="ailccLrc' + timer + '">' + lrcCont[i + 1] + '</li>'
                    }
                }
                $('#ailccLrc').html('<ul>' + lrcLine + '</ul>');
                setTimeout(function () {
                    if (audio.paused) {
                        //$('.switch-ksclrc').hide();
                        $('.switch-down').css('right', '35px');
                    } else {
                        $('#ailccLrc').addClass('show')
                    }
                },
                500);
                lrcTime = setInterval(ailccLrc.lrc.play, 500)
            },
            play: function () {
                var timeNow = Math.round(audio.currentTime);
                if ($.inArray(timeNow, lrcTimeLine) > 0) {
                    var $lineNow = $('.ailccLrc' + timeNow);
                    if (!$lineNow.hasClass(cur)) {
                        $lineNow.css('color','rgba(' + mainColor + ',1)');
                        $lineNow.addClass(cur).siblings().removeClass(cur).css('color','');
                        $('#ailccLrc').animate({
                            scrollTop: lrcHeight * $lineNow.index()
                        });
                    }
                } else {
                    lrcCont = ''
                }
            },
            hide: function () {
                clearInterval(lrcTime);
                $('#ailccLrc').removeClass('show')
            }
        }
    };
    //获取歌单列表数据
    $.ajax({
        url: webURL + '/api/info?id=' + keyId,
        type: 'GET',
        dataType: 'script',
        xhrFields:{withCredentials: true},
        success: function () {
    		if(localStorage.ailcc_searchlist){
    		    ailccPlayer.SearchList.ListId = songSheetList.length;
    		    songSheetList[songSheetList.length] = JSON.parse(localStorage.ailcc_searchlist);
    		}
            if(playerWidth !== -1){ //播放器宽度
                document.body.style.setProperty('--player-width', playerWidth + 'px');
            }
            if(coverWidth !== -1){ //专辑图片宽度
                document.body.style.setProperty('--cover-width', coverWidth + 'px');
            }
            if(showNotes !== 1){ //飘动音符
                $(".status .note",$player).hide()
            }
            if(autoPopupPlayer !== -1){ //播放器弹出时间
                setTimeout(function () {
                    if (localStorage.getItem("ailcc_player_switch") != "yes") {
                    $player.addClass('show')
                    }
                },autoPopupPlayer * 1000)
            }
            if (localStorage.getItem("random_play") != null) {
                if (localStorage.getItem("random_play") == "true") {
                    $('.loop', $player).removeClass(cur);
                    $('.random', $player).addClass(cur);
                    $songFrom2.html('<i class="random fa fa-random"></i> 随机播放');
                    random = true;
                } else {
                    $('.loop', $player).addClass(cur);
                    $('.random', $player).removeClass(cur);
                    $songFrom2.html('<i class="loop fa fa-retweet"></i> 专辑循环');
                    random = false;
                }
            } else {
                if (randomPlayer != 1) { //随机播放
                    $('.loop', $player).addClass(cur);
                    $('.random', $player).removeClass(cur);
                    $songFrom2.html('<i class="loop fa fa-retweet"></i> 专辑循环');
                    random = false;
                }
            }
            if (localStorage.getItem("ailcc_player_volume") == '0.666') {
                volume = (defaultVolume / 100);
                audio.volume = volume;
            }
            albumTotals = songSheetList.length;
                if (typeof ailccalbum === "undefined") {
                    albumIds = playingalbumId ? playingalbumId : defaultAlbum - 1;
                    if (albumIds >= albumTotals) {
                        albumId = 0
                    } else {
                        albumId = playingalbumId ? playingalbumId : defaultAlbum - 1
                    }
                } else {
                    if (typeof ailccsong === "undefined") {
                        if (ailccalbum >= albumTotals) {
                            albumId = 0;
                            ailccMedia.getInfos(0, 0)
                        } else {
                            albumId = ailccalbum;
                            ailccMedia.getInfos(0, ailccalbum - 1)
                        }
                    } else {
                        if (ailccalbum >= albumTotals) {
                            albumId = 0;
                            ailccMedia.getInfos(ailccsong - 1, 0)
                        } else {
                            albumId = ailccalbum;
                            ailccMedia.getInfos(ailccsong - 1, ailccalbum - 1)
                        }
                    }
                };
            // 防止百分百音量无触发事件
            ailccMedia.volumechange();
            albumId = defaultAlbum - 1;
            if (showLrc == 0) {
                $('#ailccLrc').addClass('hide');
                ycgeci = false;
                if (hasLrc) {
                    $songFrom3.html('<i class="fa fa-times-circle"></i> 歌词关闭');
                }
                ailccTips.show('歌词显示已关闭');
                songFrom33 = '关闭';
                $songFrom4.html('<i class="fa fa-toggle-off" title="打开歌词"></i>')
            }
            if (showGreeting == 1) {
                setTimeout(function(a) {
                    ailccTips.show(greeting);
                }, 5000)
            }
            setTimeout(function (args) {
                ailccPlayer.playList.creat.album()
            }, 500)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            ailccTips.show('歌曲列表获取失败!')
        }
    });

    dogInterval = setInterval(function(){
        if(!ailcc_player_IsTest){
            localStorage.setItem("ailcc_player_Feed", new Date().getTime().toString());
        }
        // 检查css变量
        var currPlayerWidth = document.body.style.getPropertyValue('--player-width');
        if(typeof playerWidth != "undefined" && playerWidth !== -1 && currPlayerWidth != (playerWidth + 'px')){
            document.body.style.setProperty('--player-width', playerWidth + 'px');
        }
        var currCoverWidth = document.body.style.getPropertyValue('--cover-width');
        if(typeof coverWidth != "undefined" && coverWidth !== -1  && currCoverWidth != (coverWidth + 'px')){
            document.body.style.setProperty('--cover-width', coverWidth + 'px');
        }
    },1000);
    // 浏览器关闭事件监听器
    window.addEventListener('beforeunload', function(event){
        localStorage.setItem("ailcc_player_IsLoad", "false");
    }, true);

    function LimitStr(str, num, t) {
        num = num || 6;
        t = t || '...';
        var re = '';
        var leg = str.length;
        var h = 0;
        for (var i = 0; h < num * 2 && i < leg; i++) {
            h += str.charCodeAt(i) > 128 ? 2 : 1;
            re += str.charAt(i)
        }
        if (i < leg) re += t;
        return re
    }
    function netmusic() {
        if (songSheetList[albumId].songTypes[songId] == "local") {
            audio.src = songSheetList[albumId].locations[songId]
        } else {
            audio.src = webURL + "/api/musicUrl?songId=" + songSheetList[albumId].songIds[songId]+"&type="+songSheetList[albumId].songTypes[songId] + '&id='+keyId;
        };
        //lrcurl = songSheetList[albumId].lyrics[songId];
        $songName.html('<span title="' + songSheetList[albumId].songNames[songId] + '">' + songSheetList[albumId].songNames[songId] + '</span>');
        // $songName.text(songSheetList[albumId].songNames[songId]);
        $songName.Rolling();
        $songFrom.html('<span title="' + songSheetList[albumId].artistNames[songId] + '">' + LimitStr(songSheetList[albumId].artistNames[songId]) + '</span>');
        if(songSheetList[albumId].albumNames[songId] == ''){
            $songFrom1.html('<span title="' + songSheetList[albumId].songSheetName + '">' + LimitStr(songSheetList[albumId].songSheetName) + '</span>');
        }else{
            $songFrom1.html('<span title="' + songSheetList[albumId].albumNames[songId] + '">' + LimitStr(songSheetList[albumId].albumNames[songId]) + '</span>');
        }
        var coverImg = new Image();
        var sear = new RegExp('http');
        coverImg.src = sear.test(songSheetList[albumId].albumCovers[songId]) ? songSheetList[albumId].albumCovers[songId] : 'https://player.ailcc.com/player/css/plzy.png';
        
        $cover.addClass('changing');
        coverImg.onload = function () {
            $cover.removeClass('changing');
            $.ajax({
                url: webURL + '/api/mainColor',
                type: 'GET',
                dataType: 'script',
                xhrFields:{withCredentials: true},
                data: {
                    url: coverImg.src,
                    id: keyId
                },
                success: function () {
                    playerColor()
                },
                error: function () {
                    playerColor()
                }
            })
        };
        coverImg.onerror = function () {
            coverImg.src = '/player/css/plzy.png';
            setTimeout(function () {
                ailccTips.show(songSheetList[albumId].songNames[songId] + ' - 专辑图片获取失败！')
            },
            8000)
        };
        $cover.html(coverImg);
        if (background == 1) {
            $('.blur-img .blur', $player).attr("src", songSheetList[albumId].albumCovers[songId]); //虚化背景
        } else {
            if ($(".blur-img").length > 0) {
                $(".blur-img").remove();
            }
        }
        ailccLrc.load(); //加载歌词
        if (first == 1) {
            first = 2;
            if (autoPlayer == 1 && (localStorage.getItem("ailcc_player_auto") == null || localStorage.getItem("ailcc_player_auto") === "yes")) {
                startPlay()
            } else {
                ailccTips.show('播放器自动暂停');
                $cover.removeClass('coverplay');
                audio.pause();
            }
        } else {
            startPlay()
        };
        if (ailccplaytime && ailccplaying && playing && songSheetList[albumId].songTypes[songId] + songSheetList[albumId].songIds[songId] == ailcc_player_songid) {
            $(".playprogress .progressbg .ts", $player).css("left", 100 * (ailccplaytime / ailccplaying).toFixed(2) + "%");
            $(".playprogress .progressbg .progressbg1", $player).css("width", 100 * (ailccplaytime / ailccplaying).toFixed(2) + "%");
            $(".time", $player).text(formatSecond(ailccplaytime) + " / " + formatSecond(ailccplaying))
        };
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(window.document).height();
            var windowHeight = $(this).height();
            if (scrollTop + windowHeight == scrollHeight) {
                if (hasgeci && ycgeci) {
                    $player.addClass('ksclrc');
                    $('#ailccLrc').addClass('hide');
                    $('#ailccKsc').addClass('hidePlayer');
                    $songFrom3.html('<i class="fa fa-times-circle"></i> 歌词隐藏');
                    $songFrom4.html('<i class="fa fa-times-circle"></i> 歌词隐藏');
                    if (hasLrc) {
                        ailccTips.show('歌词自动隐藏')
                    }
                }
            } else {
                if (hasgeci && ycgeci) {
                    $player.removeClass('ksclrc');
                    $('#ailccLrc').removeClass('hide');
                    $('#ailccKsc').removeClass('hidePlayer');
                    if (hasLrc) {
                        $songFrom3.html('<i class="fa fa-check-circle"></i> 歌词开启')
                    }
                    $songFrom4.html('<i class="fa fa-check-circle"></i> 歌词开启')
                }
            }
        });
        musicTooltip();
    }
    function startPlay() {
        var a = audio.play();
        if (a) {
            a.then(() => {
                if (playingalbumId == albumId && playingsongId == songId && ailccplaytime && playing && songSheetList[albumId].songTypes[songId] + songSheetList[albumId].songIds[songId] == ailcc_player_songid) {
                    audio.currentTime = ailccplaytime;
                    playing = false
                };
            var t = audio.duration;
            $cover.addClass("coverplay");
            localStorage.setItem("ailcc_player_times", t);
            ailccTips.show("开始从" + songFrom55 + "播放 - " + songSheetList[albumId].songNames[songId]);
            if (showMsg === 1) { //桌面通知
                showMsgNotification(songSheetList[albumId].songNames[songId], songSheetList[albumId].artistNames[songId] + " - " + songSheetList[albumId].albumNames[songId], songSheetList[albumId].albumCovers[songId])
            };
                console.log('%c当前播放：%c'+ songSheetList[albumId].songNames[songId] +' - ' + songSheetList[albumId].artistNames[songId] + '   %c时长：%c'+ Math.floor(t / 60) + ':'+ (t % 60 / 100).toFixed(2).slice(-2), 'color:orange', 'color:red;font-weight:bold', 'color:orange', 'color:red;font-weight:bold');
            }).catch((e) => {
            	console.log("%c浏览器限制音频自动播放，需要点击播放！", "text-shadow: 3px 1px 1px grey");
            })
        }
    }
   function allmusic() {
        cx = (songSheetList.length == 1)?songId:albumId;
        $("li", $albumList).eq(cx).addClass(cur).find(".artist").html("当前播放&nbsp;>&nbsp;").parent().siblings().removeClass(cur).find(".artist").html("").parent();
        if (songSheetList.length == 1) {
            if (!$(".list", $albumList).html() == "") {
                $(".list", $albumList).mCustomScrollbar("scrollTo", ($("li.current", $albumList).position().top) - 90)
            }
        } else {
            if (!$("ul", $songList).html() == "" && $("[data-album=" + albumId + "]").length) {
                $("[data-album=" + albumId + "]").find("li").eq(songId).addClass(cur).siblings().removeClass(cur);
                $songList.mCustomScrollbar("scrollTo", ($("li.current", $songList).position().top) - 90)
            }
        }
        if (playingalbumId !== albumId || playingsongId !== songId) {
		playing = false
	}
    }
    function playerColor() {
        $player.css({
            background: 'rgba(' + mainColor + ',.8)'
        });
        $switchPlayer.css({
            background: 'rgba(' + mainColor + ',.3)'
        });
        $tips.css({
            background: 'rgba(' + mainColor + ',.6)'
        });
        $lk.css({
            background: 'rgba(' + mainColor + ',.3)'
        });
        $(".infos,.control,.status .note", $player).css({
            color: 'rgb(' + font_color + ')'
        });
    }
    function musicTooltip() {
        if (isPhone){return;}
        $('#ailccPlayer span,#ailccPlayer i').each(function () {
            $('#tooltip').remove();
            if (this.title) {
                var a = this.title;
                $(this).unbind("mouseover mouseout");
                $(this).mouseover(function (b) {
                    this.title = '';
                    $('body').append('<div id="tooltip">' + a + '</div>');
                    $('#tooltip').css({
                        left: b.pageX - 15 + 'px',
                        top: b.pageY + 30 + 'px',
                        opacity: '0.8'
                    }).fadeIn(250)
                }).mouseout(function () {
                    this.title = a;
                    $('#tooltip').remove()
                }).mousemove(function (b) {
                    $('#tooltip').css({
                        left: b.pageX - 15 + 'px',
                        top: b.pageY + 30 + 'px'
                    });
                });
            }
        });
    }
    function showMsgNotification(c, d, e) {
    var f = window.Notification || window.mozNotification || window.webkitNotification;
    if (f) {
        if (f.permission == "granted") {
            var g = new f(c, {
                body: d,
                icon: e
            });
            setTimeout(function() {
                g.close()
            }, 3000);
            g.onclick = function() {
                g.close()
            };
            g.onerror = function() {
                console.log("onerror")
            };
                return false
		} else {
			f.requestPermission(function(a) {
                if (a === "granted") {
                    var b = new f(c, {
                        body: d,
                        icon: e
                    });
                    b.onclick = function() {};
                    b.onerror = function() {};
                    b.onshow = function() {};
                    b.onclose = function() {}
                } else {
                    return false
                }
            })
        }
    }
}
}
ailccPlayerInit();
};