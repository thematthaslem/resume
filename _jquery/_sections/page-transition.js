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
