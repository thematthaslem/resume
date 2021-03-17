$('.show-menu').on('click', function(){
  $(this).toggleClass('active');
  $(this).closest('.menu-wrap').toggleClass('open');
});
