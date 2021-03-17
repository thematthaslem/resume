
var starWarsWrap = $('.star-wars-wrap');
var lastP = starWarsWrap.find('p:last');
starWarsWrap.on('scroll', function(){
  scrollY = $(this).scrollTop();
  var innerH = $(this).innerHeight();

  lastPH = lastP.outerHeight();
  lastPScrollY = lastP.offset().top;


  // If Star-wars-wrap is done scrolling
  if(lastPScrollY < 200 && lastPScrollY > 0 && !(moonWrap.hasClass('open')))
  {
    // Show Moon Content
    moonWrap.addClass('open');

    // Hide overlay
    $('.overlay.about').css('opacity', '0');

    // set Scrollbar
    // Delay is so it doesn't make calculations too early
    setTimeout(
      function(){
        sizeScrollBar(moonWrap);
      }, 550);
  }

  if(lastPScrollY > 200 || lastPScrollY < 0 && moonWrap.hasClass('open'))
  {
    // Hide moon content
    moonWrap.removeClass('open');
    // Show overlay
    $('.overlay.about').css('opacity', '0.6');
  }

});
