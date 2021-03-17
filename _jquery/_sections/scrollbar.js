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
