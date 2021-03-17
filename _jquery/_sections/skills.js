
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
