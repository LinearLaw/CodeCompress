/*
 * @Author: zhengwei
 * @Date:   2017-01-18 11:19:35
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2017-01-20 09:29:11
 */

'use strict';

window.addEventListener('load', function() {

    /**
     * 1. 实现顶部搜索框的背景色渐变 (当滚动条滚动的距离在轮播以内的时候会从透明度从0-1) 
     *  当超过了滚动的距离超过了轮播图的区域就固定一个透明度
     * 1. 获取滚动条的滚动距离
     * 2. 添加一个滚动条的滚动事件 不断获取滚动条的距离
     * 3. 获取轮播图的高度 和 滚动条距离对比
     * 4. 如果滚动条距离小于轮播图的高度 设置头部的透明度为0-1(最大透明度* 滚动条距离/轮播图的高度) 
     * 5. 如果滚动条距离大于轮播图的高度 设置一个最大的透明度
     */
    //1. 添加一个滚动条的滚动事件
    window.addEventListener('scroll', function() {
        //2.获取滚动条的距离
        var scrollTop = document.body.scrollTop;
        //3.获取轮播图容器的高度
        var slideHeight = document.querySelector('#slide').offsetHeight;
        if (scrollTop > slideHeight) {
            document.querySelector('#header').style.backgroundColor = "rgba(201,21,35,1)";
        } else {
            var opcity = scrollTop / slideHeight * 1;
            document.querySelector('#header').style.backgroundColor = "rgba(201,21,35,1" + opcity + ")";
        }
    });

    /**
     * 1. 实现秒杀倒计时 用总时间 每秒减1秒总时间 减完之后 
     * 分别求出时分秒 并且分别求出十位个位设置到对应的span
     * 1. 定义一个总时间(秒数)
     * 2. 设置一个定时器每秒执行一次 在定时器里面执行 总时间--
     * 3. 分别求出时分秒
     *  时:  10800 / 3600 == 3  总时间 / 3600 == 时
     *  分: 7300 % 3600 == 100    3800 % 3600 == 200 / 60 总时间 % 3600 / 60 == 分
     *  秒: 100 % 60 == 40  3640 % 60  == 40  总时间 % 60
     *  十位: 21 / 10 == 2 十位
     *  个位: 21 % 10 == 1 个位
     *  4. 获取所有span分别设置到时分秒对应的区域
     *  5. 获取当前 时间  和 获取未来时间 (今天中午12点)  用未来时间 - 当前时间
     */
    // 获取今天中午12点的 毫秒数
    var futureTime = new Date("January 19,2017 12:00:00").getTime();
    var nowTime = new Date().getTime();
    // 未来时间 - 当前时间的秒数 因为他们都是毫秒 所以 / 1000
    var time = (futureTime - nowTime) / 1000;
    //总时间
    // var time = 5 * 60 * 60;
    //设置定时器 每秒执行一次
    setInterval(timer, 1000);
     timer();
    function timer() {
        time--;
        var shi = Math.floor(time / 3600);
        var fen = Math.floor(time % 3600 / 60);
        var miao = Math.floor(time % 60);
        var downTimes = document.querySelectorAll('.seckill-downtime > span');
        downTimes[0].innerHTML = Math.floor(shi / 10);
        downTimes[1].innerHTML = Math.floor(shi % 10);
        downTimes[3].innerHTML = Math.floor(fen / 10);
        downTimes[4].innerHTML = Math.floor(fen % 10);
        downTimes[6].innerHTML = Math.floor(miao / 10);
        downTimes[7].innerHTML = Math.floor(miao % 10);
    }
   
});
