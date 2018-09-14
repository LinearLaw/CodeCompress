/*
 * @Author: zhengwei
 * @Date:   2017-01-19 15:16:10
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2017-01-20 11:49:12
 */

'use strict';
//点击删除按钮，遮罩层显示和隐藏
$(function () {
	$('.product-delete').on('click',function () {
		$('#mask').show();
	});
	$('.btn-cancel').on('click',function () {
		$('#mask').hide();
	});
});

