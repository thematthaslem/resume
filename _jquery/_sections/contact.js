/****
  CONTACT SECTION JS

    - open contact wrap
    - use ajax to send contact form

***/

// Button to open contact.
var contactOpenButton = $('.contact-button-wrap');

/*
  // OPEN CONTACT FORM
    - ON button click -> open form (.contact-content-all-wrap -> .open)
*/
contactOpenButton.on('click',
  function(e)
  {
    // If it's already open -> Close that shit
    if( $(this).hasClass('open') )
    {
      $('.contact-content-all-wrap').removeClass('open');
      $(this).removeClass('open');
    }

    // If it is not open -> open that shit
    else
    {
      $('.contact-content-all-wrap').addClass('open');
      $(this).addClass('open');
    }

  }
);

/*

  // ON SEND OF THE CONTACT FORM ()

    - activate loader
    - send response message
      -> Fail: "Sorry, something went wrong. Please email directly at thematthaslem@gmail.com"
      -> Pass: "Thanks for your message! I'll get in contact as soon as possible"
    - Send email to thematthaslem@gmail.com

*/

var contactForm = $('#contact-send-message');
var contactValues;
var contactName, contactEmail, contactMessage;
var loader;
var resultMsg, resultType; // Message to post (pass or fail) -> put in $(p.result-message); result: pass or fail
contactForm.on('submit',
  function(e)
  {
    // Prevent changing of page
    e.preventDefault();

    // Init everything
    contactValues = $(this).serialize();

    // Show loader
    loader = $(this).find('#loader');
    loader.addClass('show');

    $.ajax(
      {
        url: "_php/send_contact.php",
        type: "POST",
        data: contactValues
      }
    ).done(
      function(results)
      {
        // Stop Loader
        loader.removeClass('show');

        console.log('Results: ' + results);

        // If the message is sent
        if(results == "success")
        {
          // Set Success Message
          resultMsg = "Message Sent!";
          // Set wrapper to success
          resultType = "success"
        }
        else
        {
          // Show error message
          resultMsg = 'Sorry something went wrong. Please email me directly at <a class="link" href"mailto:thematthaslem@gmail.com">thematthaslem@gmail.com</a>.';
          // Set wrapper to error
          resultType = "error";

        }

        // Set results message
        $('p.result-message').html(resultMsg);
        $('p.result-message').addClass(resultType);

      }
    );
    // Make sure nothing is empty (just incase)



  }
);
