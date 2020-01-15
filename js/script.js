//设置基本函数
//获取元素
var getElem=function(cls){
    return document.querySelector(cls);
};
//获取所有元素
var getAllElem=function(cls){
    return document.querySelectorAll(cls);
};
//获得元素样式
var getCls=function(element){
    return element.getAttribute("class");
};
//设置元素样式
var setCls=function(element,cls){
    return element.setAttribute("class",cls)
};
//添加元素样式
var addCls=function (element,cls) {
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)===-1){
        element.setAttribute("class",baseCls+" "+cls);
    }
};
//删除元素样式
var delCls=function(element,cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)!==-1){
        element.setAttribute("class",baseCls.split(cls).join(" ").replace(/\s+/g," "));
    }
};
var screenAnimateElements={
    ".screen-1":[
        ".screen-1__heading",
        ".screen-1__phone",
        ".screen-1__shadow"
    ],
    ".screen-2":[
        ".screen-2__heading",
        ".screen-2__subheading",
        ".screen-2__phone",
        ".screen-2__desc__1",
        ".screen-2__desc__2",
        ".screen-2__desc__3"
    ],
    ".screen-3":[
        ".screen-3__heading",
        ".screen-3__subheading",
        ".screen-3__phone",
        ".screen-3__feature"
    ],
    ".screen-4":[
        ".screen-4__heading",
        ".screen-4__subheading",
        ".screen-4__type__item_i_1",
        ".screen-4__type__item_i_2",
        ".screen-4__type__item_i_3",
        ".screen-4__type__item_i_4"
    ],
    ".screen-5":[
        ".screen-5__bg",
        ".screen-5__subheading",
        ".screen-5__heading"
    ]

};
var navItems=getAllElem(".nav__item");
var outlineItems=getAllElem(".outline__item");
//第一步，在网页加载时将所有动画元素初始化
var setAnimateElemInit=function(screenCls){
    var animateElements=screenAnimateElements[screenCls];
    for(var i=0;i<animateElements.length;i++){
        var element=getElem(animateElements[i]);
        var baseCls=element.getAttribute("class")
        element.setAttribute("class",baseCls+" "+animateElements[i].substr(1)+"_animate_init");
    }
};
window.onload=function(){

    for(k in screenAnimateElements){
        if(k==".screen-1"){
            continue;
        }
       setAnimateElemInit(k)
    }
}
//第二步，页面滚动播放动画
var playAnimateElemDone=function(screenCls){
    var animateElements=screenAnimateElements[screenCls];
    for(var i=0;i<animateElements.length;i++){
        var element=getElem(animateElements[i]);
        var baseCls=element.getAttribute("class");
        element.setAttribute("class",baseCls.replace("_animate_init","_animate_done"));
    };
}
//第一屏刷新自动播放
setTimeout(function () {
    playAnimateElemDone(".screen-1");
},500);

//switchNavItemActive
function switchNavItemActive(index){
    for(var i=0;i<navItems.length;i++){
        delCls(navItems[i],"nav__item_active");
        getElem(".nav__tip").style.left=0+"px";
    }
    addCls(navItems[index],"nav__item_active");
    getElem(".nav__tip").style.left=(115*index)+"px";
    for(var i=0;i<outlineItems.length;i++){
        delCls(outlineItems[i],"outline__item_active")
    }
    addCls(outlineItems[index],"outline__item_active");
}

window.onscroll=function(){
    //兼容性写法
    var top=document.documentElement.scrollTop || document.body.scrollTop;
    if(top>100){
        addCls(getElem(".header"),"header_animate_float");
    }else{
        delCls( getElem('.header'),'header_animate_float' );
        switchNavItemActive(0);
    };
    if(top>(800*1-80)){
        playAnimateElemDone(".screen-2");
        switchNavItemActive(1);
    };
    if(top>(800*2-80)){
        playAnimateElemDone(".screen-3");
        switchNavItemActive(2);
    };
    if(top>(800*3-80)){
        playAnimateElemDone(".screen-4");
        switchNavItemActive(3);
    };
    if(top>(800*4-80)){
        playAnimateElemDone(".screen-5");
        switchNavItemActive(4);
    };
}

//滑动门
function setNavTip(index) {
    navItems[index].onmouseover=function(){
        getElem(".nav__tip").style.left=(115*index)+"px";
    }
    var currentIdx=0;
    navItems[index].onmouseout=function(){
        for(var i=0;i<navItems.length;i++){
            if(getCls(navItems[i]).indexOf("nav__item_active")>-1){
                currentIdx=i;
                break;
            }
        }
        getElem(".nav__tip").style.left=(115*currentIdx)+"px";
    }
}
for(var i=0;i<navItems.length;i++){
    setNavTip(i)
}


//导航栏、大纲绑定页面
function navClick(i,lib){
    var elem = lib[i];
    elem.onclick = function(){
        (document.documentElement.scrollTop=(800*i))|| (document.body.scrollTop=(800*i)) ;
        console.log(top)
    }
}

for(var i=0;i<navItems.length;i++){
    navClick(i,navItems);

}
for(var i=0;i<outlineItems.length;i++){
    navClick(i,outlineItems);
}
//学了闭包以后可以用闭包绑定页面和导航栏、大纲
//注意函数外面包一个（）才能执行
// for(var i=0;i<navItems.length;i++){
//     (function(i){
//         navItems[i].onclick=function(){
//             (document.documentElement.scrollTop=(800*i))|| (document.body.scrollTop=(800*i)) ;
//             console.log(top)
//         }
//     })(i);
//
// }