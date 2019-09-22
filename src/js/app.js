import device from 'current-device'
import 'slick-carousel';
import "parsleyjs";

$(document).ready(function(){
  $('.review__list').slick({
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 1
  });


  $('#form-contact').parsley();


  const $modal = $('.popup-wrapper');
  const $menu = $('.navigation-wrapper');


  $('.popup__close').on('click', function(){
    $modal.addClass('out');
    $modal.removeClass('active');
    $('body').removeClass('modal-active');
  });

  $('.js-order').on('click', function(){
    $modal.removeClass('out');
    $modal.addClass('active');
    $('body').addClass('modal-active');
  });

  const closePopup = () => {
    $modal.addClass('out');
    $modal.removeClass('active');
    $('body').removeClass('modal-active');
  }

  $("#form-contact").on("submit", function(e) {
    e.preventDefault()

    const url  = 'http://localhost:8080';// paste here url

    $.ajax({
      url,
      type: 'POST',
      dataType: "JSON",
      data: $(this).serialize(),
      processData: false,
      contentType: false,
      success (data, status)
      {
        $('#form-contact')[0].reset();
        $('.hide-msg').hide();
        setTimeout(()=> {
          $('.show-success'). css("visibility", "visible");
        }, 100);

        setTimeout(()=> {
          closePopup()
          $('.hide-msg').show();
          $('.show-success'). css("visibility", "hidden");
        }, 3500);
      },
      error (xhr, desc, err)
      {
        console.log('error',err)

        $('#form-contact')[0].reset();
        $('.hide-msg').hide();
        setTimeout(()=> {
          $('.show-fail'). css("visibility", "visible");
        }, 100);

        setTimeout(()=> {
          closePopup()
          $('.hide-msg').show();
          $('.show-fail'). css("visibility", "hidden");
        }, 3500);

      }
    });

  });


  // show-hide menu
  $('.menu-trigger').on('click', function(){
    $menu.addClass('active').removeClass('out');
  });

  $('.close-btn').on('click', function(){
    $menu.removeClass('active').addClass('out');
  });



});


