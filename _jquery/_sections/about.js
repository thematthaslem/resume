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
