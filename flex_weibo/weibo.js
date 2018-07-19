  var mySwiper = new Swiper('.swiper-container', {
  	loop: true,
  	autoplay: true,

  	// 如果需要分页器
  	pagination: {
  		el: '.swiper-pagination',
  	},

  	// 如果需要滚动条
  	scrollbar: {
  		el: '.swiper-scrollbar',
  	},
  });


    new BScroll(".scroll-box", {
      /*
        click: 作用：better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
      */
      click: true,
      scrollX: true
    })