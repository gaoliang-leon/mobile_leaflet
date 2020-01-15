
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
function setScreenAnimate(screenCls){
    var screen=document.querySelector(screenCls);
    var animateElements=screenAnimateElements[screenCls];
    var isSetInit=false; //是否已经初始化？
    var isDone=false;//状态是否为done？

    screen.onclick=function(){
    //    动画元素初始化
        if (isSetInit===false){
            for(var i=0;i<animateElements.length;i++){
                var element=document.querySelector(animateElements[i]);
                var baseCls=element.getAttribute("class");
                //element.setAttribute("class", baseCls+" "+baseCls+"_animate_init");
                // 这里不能用baseCls+animate_init因为会动态变化
                element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init');
            };
            isSetInit=true;
            return;
        };
    //切换所有animateElements init-->done
        if(isDone===false){
            for(var i=0;i<animateElements.length;i++){
                var element=document.querySelector(animateElements[i]);
                var baseCls=element.getAttribute("class");
                element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
            };
            isDone=true;
            return;
        };
    //    切换所有animateElements done-->init
        if(isDone===true){
            for(var i=0;i<animateElements.length;i++){
                var element=document.querySelector(animateElements[i]);
                var baseCls=element.getAttribute("class");
                element.setAttribute('class',baseCls.replace('_animate_done','_animate_init'));
            };
            isDone=false;
            return;
        };
    }
};

for(k in screenAnimateElements){
    setScreenAnimate(k);
}
