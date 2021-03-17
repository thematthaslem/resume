var portItem = $('.port-icons-wrap').find('.item');
var itName, phpStat, jqueryStat, ajaxStat, targURL;

portItem.on('click', function(){
  // Select item on bottom
  $('.item.selected').removeClass('selected');
  $(this).addClass('selected');

  // Hide select message
  if(!$('.select-msg').hasClass('hide')){
    $('.select-msg').addClass('hide');
  }

  // If this is on mobile, close the bottom wrap
    // Then scroll the top part up
  if($(this).closest('.port-icons-wrap').hasClass('mobile'))
  {
    $(this).closest('.side-wrap').removeClass('up');
    $('.site-wrap').animate({ scrollTop: 0 });
  }


  // Get stat data from element
  phpStat = $(this).attr('data-php-stat');
  jqueryStat = $(this).attr('data-jquery-stat');
  ajaxStat = $(this).attr('data-ajax-stat');

  // If top side isn't activated yet, do it.
  if($('.site-wrap').hasClass('hide')){
    $('.site-wrap').removeClass('hide');
  }

  // Update top side
  itName = $(this).attr('data-targ');
  targURL = $(this).attr('data-url');
  showItem(itName, phpStat, jqueryStat, ajaxStat, targURL);
  sizeScrollBar($('.site-wrap'));

});



//////////////////////////////////////
// Update top side
///////////////////////////////////
var backdrop = $('.side-wrap.top > .backdrop');
var logoWrap = $('.site-wrap').find('.logo');
var accoladesWrap = $('.site-wrap').find('.accolades');
var descWrap = $('.site-wrap').find('.desc-wrap');
var phpWrap = $('.item.box.php').find('.stat-bar');
var jqueryWrap = $('.item.box.jquery').find('.stat-bar');
var ajaxWrap = $('.item.box.ajax').find('.stat-bar');
var seeMore = $('.see-more.visit');
var i, phpiter, jqueryiter, ajaxiter, accoladeToShow;

function showItem(itName, phpStat, jqueryStat, ajaxStat, targURL){
  // Show Background
    if(backdrop.find('.item.show').length){
      backdrop.find('.item.show').removeClass('show');
    }
    backdrop.find('.item[data-name="' + itName + '"]').addClass('show');

  // Show logo
    if(logoWrap.find('.item.show').length){
      logoWrap.find('.item.show').removeClass('show');
    }
    logoWrap.find('.item[data-name="' + itName + '"]').addClass('show');

  // Show Desc
    if(descWrap.find('.item.show').length){
      descWrap.find('.item.show').removeClass('show');
    }
    descWrap.find('.item[data-name="' + itName + '"]').addClass('show');

  // Update stats
    //update php
      phpWrap.addClass('reverse');
      phpiter = phpWrap.find('.item:last');
      for(i=0;i<phpStat;i++){
        phpiter.removeClass('selected');
        phpiter = phpiter.prev('.item');
      }
      phpWrap.removeClass('reverse');
      phpiter = phpWrap.find('.item:first');
      for(i=0;i<phpStat;i++){
        phpiter.addClass('selected');
        phpiter = phpiter.next('.item');
      }

    // Update jQuery
      jqueryiter = jqueryWrap.find('.item:last');
      for(i=0;i<jqueryStat;i++){
        jqueryiter.removeClass('selected');
        jqueryiter = jqueryiter.prev('.item');
      }

      jqueryiter = jqueryWrap.find('.item:first');
      for(i=0;i<jqueryStat;i++){
        jqueryiter.addClass('selected');
        jqueryiter = jqueryiter.next('.item');
      }
    //update php
      ajaxiter = ajaxWrap.find('.item:last');
      for(i=0;i<ajaxStat;i++){
        ajaxiter.removeClass('selected');
        ajaxiter = ajaxiter.prev('.item');
      }
      ajaxiter = ajaxWrap.find('.item:first');
      for(i=0;i<ajaxStat;i++){
        ajaxiter.addClass('selected');
        ajaxiter = ajaxiter.next('.item');
      }


  // Show accolades
    if(accoladesWrap.find('.item.show').length){
      accoladesWrap.find('.item.show').removeClass('show');
    }
    accoladeToShow = accoladesWrap.find('.item[data-name="' + itName + '"]')
    accoladeToShow.addClass('show');
    //updateAccoladeHeight( accoladeToShow );

    // Change height of accoladesWrap to match height
    // (all the content are position:absolute, so it won't update automattically)
    accoladesWrap.css('min-height', accoladeToShow.height());
  // Update See More button
  seeMore.attr('href', targURL);

}



/*********************

    Open bottom part on  mobile

*********************/
$('.open-button.portfolio').on('click',
  function()
  {
    $(this).closest('.side-wrap').toggleClass('up');
    var txt = $(this).find('.txt');

  }
);

// Change height of accoladesWrap to match height
// (all the content are position:absolute, so it won't update automattically)
// Param: accoladeShown = the accolade that's coming
/*
var newHeight;
function updateAccoladeHeight( accoladeShown )
{
  accoladeShown.height();
}
*/
