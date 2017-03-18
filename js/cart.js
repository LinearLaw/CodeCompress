/*
 * @Author: zhengwei
 * @Date:   2017-01-19 15:16:10
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2017-01-20 11:49:12
 */

'use strict';
$(function () {
	$('.product-delete').on('click',function () {
		$('#mask').show();
	});
	$('.btn-cancel').on('click',function () {
		$('#mask').hide();
	});
});
// window.addEventListener('load', function() {
//     document.querySelectorAll('.product-delete').addEventListener('click', function() {
//         console.log(this);
//     });
// });
