var popupTargets;
$('.close-popup').on('click', function(e){
  popupTarget = $(this).closest('.pop-up');
  popupTarget.removeClass('open');

  setTimeout(
    function(){
      popupTarget.css('display', 'none');
    }, 400);
});

// Temporary function to show popup when page laods
// TODO: Remove on final site
setTimeout(
  function(){
    $('.site-not-done').addClass('open');
  },
  600
)
