$(document).ready(function(){var portItem = $('.port-icons-wrap').find('.item');
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
var menuLink = $('[data-targ-page]');

var targPageURL, targPage, pageiter;

function changePage(targPageURL)
{

  //targPageURL = $(this).attr('data-targ-page');
  targPage = $('.page.' + targPageURL);

  // Remove Current class from current page
  $('.curr').removeClass('curr');

  // If targ page is already open, that means it's underneath current page. So close everyother page
  // OR it might not be open. Check if the target page is before current
  if(targPage.hasClass('open') || $('.page.open:last').prevAll('.' + targPageURL).length != 0){
    pageiter = $('.page.open:last');
    pageiter.removeClass('open');
    pageiter.prevUntil('.' + targPageURL).removeClass('open');
    $('.page.' + targPageURL).addClass('open curr');
  }
  else{
    targPage.addClass('open curr');

    // If the skills page opens, show text
    if(targPageURL == 'skills')
    {
      openSkills();
    }
  }

  // Remove Show menu stuff
  $('.show-menu.active').closest('.menu-wrap').removeClass('open');
  $('.show-menu.active').removeClass('active');
}


menuLink.on('click', function(e)
  {

    e.stopPropagation();
    targPageURL = $(this).attr('data-targ-page');
    changePage(targPageURL);
  }
);

/*
menuLink.on('click', function(e){
  e.stopPropagation();
  targPageURL = $(this).attr('data-targ-page');
  targPage = $('.page.' + targPageURL);


  // If targ page is already open, that means it's underneath current page. So close everyother page

  if(targPage.hasClass('open')){
    pageiter = $('.page.open:last')
    pageiter.removeClass('open');
    pageiter.prevUntil('.' + targPageURL).removeClass('open');
  }
  else{
    targPage.addClass('open');
  }

  // Remove Show menu stuff
  $('.show-menu.active').closest('.menu-wrap').removeClass('open');
  $('.show-menu.active').removeClass('active');

});
*/


/*
  *
  // Change page if it's already defined in the URL
  *
*/
var url = window.location.href;
var targPageURL = url.split('#')[1];
if(typeof targPageURL != 'undefined' && targPageURL != '')
{
  changePage(targPageURL);
}
$('.show-menu').on('click', function(){
  $(this).toggleClass('active');
  $(this).closest('.menu-wrap').toggleClass('open');
});
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
// Add a scroll bar
// to activate:
//    Wrapper -> data-has-scroll="true"
//      |-> .scroll-bar
//          |-> .tracer

//  data-scroll-bar="scroll" <- put a scrollbar no matter what
//  data-scroll-bar="check" <- show scrollbar only if one of element's immediate children
//      height is larger than the element's

// data-scroll-pos="inner" <- for full screen objects. Prevents the scroll-bar from appearing off page
// data-scroll-dir="column" <- calculates the total height of all content in wrapper

// data-scroll-targ="target-name" <- If the scrollbar is outside element set target
//      |-> .scroll-bar(data-targ-name = "target-name")

var maxHeight = 0;
var immediateChildren;
var calcTotal; // bool: true if want to calculate total height of all children

// Get max height of the content in scrollable container
function getMaxHeight( parent ) {
  maxHeight = 0;
  immediateChildren = parent.children().not('.scroll-bar');

  // Set default to false
  calcTotal = false;

  // If wrapper has [data-scroll-dir="true"], that means we want the total height of every child combined
  if(parent.attr('data-scroll-dir') == 'column')
  {
    calcTotal = true;
  }

  // Go through each children
  immediateChildren.each(
    function(){

      // If you want to add up all the total heights
      if(calcTotal)
      {
        maxHeight += $(this).outerHeight(true);
      }

      else {
        if($(this).outerHeight() > maxHeight)
        {
            maxHeight = $(this).outerHeight(true);
        }
      }

    }
  );

  // If you're adding the total height of elements, you have to also add the padding of wrapper
  if(calcTotal)
  {
    maxHeight += parseInt(parent.css('padding-top'), 10);
    maxHeight += parseInt(parent.css('padding-bottom'), 10);
  }


  return maxHeight;
}




var scrollable = $('[data-has-scroll]');
var scrollableH, scrollableOffset, scrollableRight, scrollableTop;
var scrollBar, scrollBarH;
var fiveP; // five percent

var tracer, tracerH, tracerPos, leftPos;
var hasInner; // if it has inner Attr
var scrollParent; // The parent wrapper of scrollBar
function sizeScrollBar( wrapper )
{

    // If the scroll bar has [data-scroll-pos="inner"] position scroll-bar inside
    // -- Gotta check this before we potential redefine wrapper
    hasInner = false;
    if(wrapper.attr('data-scroll-pos') == 'inner')
    {
      hasInner = true;
    }

    // If scrollwrapper has a scroll-bar that is outside of it (data-scroll-targ = "targ0name")
    if(typeof wrapper.attr('data-scroll-targ') !== 'undefined')
    {
      scrollBar = $('.scroll-bar[data-scroll-name="' + wrapper.attr('data-scroll-targ') + '"]');
      scrollParent = scrollBar.closest('*');
    }
    else
    {
      scrollBar = wrapper.find('.scroll-bar');
      scrollParent = wrapper;
    }


    scrollableH = scrollParent.outerHeight();
    scrollableOffset = scrollParent.offset();
    scrollableRight = scrollableOffset.left + scrollParent.outerWidth(true);
    scrollableTop = scrollableOffset.top;

    fiveP = scrollableH * 0.05;

    scrollBarH = scrollableH * 0.9;

    // If the scroll bar has [data-scroll-pos="inner"] position scroll-bar inside
    if(hasInner)
    {
      leftPos = scrollableRight - 20;
    }
    else
    {
      leftPos = scrollableRight + 20;
    }

    maxHeight = getMaxHeight( wrapper );

    if(wrapper.innerHeight() > maxHeight)
    {
      maxHeight = wrapper.innerHeight();
    }



    // Position and Size Scrollbar
    scrollBar.css(
      {
        'top': scrollableTop + fiveP,
        'left': leftPos,
        'height': scrollBarH
      }
    );

    // Size Tracer
    tracer = scrollBar.find('.tracer');
    //tracerH = (wrapper.outerHeight() / maxHeight) * scrollBarH;
    tracerH = (wrapper.innerHeight() / maxHeight) * scrollBarH;
    tracer.css(
      {
        'height': tracerH
      }
    );
}
// Initialize resize
scrollable.each(function(){
  sizeScrollBar($(this));
});


// Resize scrollbar when window resize
$(window).on('resize', function(){
  scrollable.each(function(){
    sizeScrollBar($(this));
  });
});




// Scrolling
var scrollPercent, scrollY;
scrollable.each(function(){
  $(this).on('scroll', function(){

    // If scrollwrapper has a scroll-bar that is outside of it (data-scroll-targ = "targ0name")
    if(typeof $(this).attr('data-scroll-targ') !== 'undefined')
    {
      scrollBar = $('.scroll-bar[data-scroll-name="' + $(this).attr('data-scroll-targ') + '"]');
    }
    else
    {
      scrollBar = $(this).find('.scroll-bar');
    }


    tracer = scrollBar.find('.tracer');

    // Make scrollbar active for style effect
    scrollBar.addClass('active');
    setTimeout(function()
    {
      scrollBar.removeClass('active');
    }, 1000);

    // ............
    //change position of tracer
    // ............
    tracerH = tracer.height();
    scrollY = $(this).scrollTop();
    maxHeight = getMaxHeight( $(this) );

    //scrollPercent = (((scrollY + $(this).height()) / maxHeight) * scrollBar.height());
    scrollPercent = (scrollY / maxHeight) * scrollBarH;

    // Make sure it doesn't scroll past max point
    if((scrollPercent + tracerH) >= scrollBar.height())
    {
      tracerPos = scrollBar.height() - tracerH;
    }
    else
    {
      tracerPos = scrollPercent;
    }

    tracer.css(
      {
        'top': tracerPos
      }
    );
  });
});
var moonWrap = $('.moon-wrap');

var openMoonButtons = $('.butt[data-moon-cat-target]');

var chosenCat, scrollTarg;
// When click on moon car buttons -> open moon and scroll to category
openMoonButtons.on('click', function()
{
  chosenCat = $(this).attr('data-moon-cat-target');


  // Open moon
  moonWrap.addClass('open');

  // Wait until moon opens, then scroll and sizeScrollbar
  setTimeout(
    function(e){

      // Resize Scrollbar
      sizeScrollBar( moonWrap );

      // Find scroll pos
      scrollTarg = $('.section[data-cat="' + chosenCat + '"]').offset().top;
      scrollTarg = scrollTarg - 30

      // Scroll Moon towards Category
      moonWrap.animate(
        { scrollTop: scrollTarg },
        1200
      );

    }, 500
  );
});




// Close moon
$('.moon-wrap > .exit-button').on('click', function(){


  // Scroll to the top
  moonWrap.animate(
    { scrollTop: 0 },
    500
  );

  // close moon after scroll to top
  setTimeout(
    function()
    {
      moonWrap.removeClass('open');
      sizeScrollBar( moonWrap );
    },
    500
  )
});

// Fade text in
function showSkillsText()
{
  // NOTE: Have to keep the assignment of the wrapper inside the function or else the page transition trigger doesn't work
  var skillsWrapper = $('.skills-wrap');
  var skillsItem = skillsWrapper.find('.item:not(.open)');
  var scrollPos = skillsWrapper.scrollTop();
  var skillsWrapH = skillsWrapper.outerHeight(true);
  skillsItem.each(
    function(e)
    {
      // get position of the element
      var itemPos = $(this).offset().top;

      // If postion of item passes the height, add open class
      if(itemPos <= (skillsWrapper.offset().top + skillsWrapH - 50) && !( $(this).hasClass('open') ) )
      {
        $(this).addClass('open');

      }

    }
  );
}


function openSkills()
{
  setTimeout(
    function(e)
    {
      // Show skills container
      $('.skills-wrap').addClass('open');

      // Resize page-title
      $('.page-title-wrap.skills').addClass('open');
    },
    800
  );

  // Set timeout to size scrollbar and show text after every transition has finished
  setTimeout(
    function(e)
    {
      // Size scrollbar
      sizeScrollBar( $('.skills-wrap') );

      // Show text
      showSkillsText();
    },
    1400
  )


}


// For scrolling
$('.skills-wrap').on('scroll', function()
  {
    showSkillsText();
  }
)


// For window resize -> show text
$(window).on('resize', function()
{
  // Size scrollbar
  sizeScrollBar( $('.skills-wrap') );

  // Show text
  showSkillsText();
}
);
});                       