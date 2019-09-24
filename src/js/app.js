import device from 'current-device'
import mapboxgl from 'mapbox-gl';
import 'slick-carousel';
import "parsleyjs";

$(document).ready(function(){

  // const $map = $('.wrapper').hasClass('withoutmap');

  if(true) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmVyaW9nbWJoIiwiYSI6ImNqeXBzZG5kdjFlNzEzbXV3ZTlseHZiNjkifQ.imC6UjjZpNa3ZvoF0j3jAA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ 12.36148, 51.34515],
      zoom: 13
    });

    map.on('load', function() {
      map.loadImage('location.png', function(error, image) {
        if (error) throw error;
        map.addImage('icon', image);
        map.addLayer({
          "id": "points",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [12.36148,51.34515]
                }
              }]
            }
          },
          "layout": {
            "icon-image": "icon",
            "icon-size": 0.9
          }
        });
      });


    });

    map.scrollZoom.disable();
  }


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


