var youtube;
function initImagesCarousel(id, num) {
  var list = $('#image-carousel');
  for (var i = 0; i < num; i++) {
    var img = `./assets/activities/${id}/image${i}.jpg`;
    var card = $('<div>');
    $('<img>').attr('src', img).attr('alt', 'test').appendTo(card);
    list.append(card);
  };
  list.children().each( function( index ) {
    $(this).attr('data-position', index );
  });
  list.owlCarousel({
    center: true,
    items: 3,
    loop: true,
    dots: false,
  });
  $('.owl-item>div').click(function() {
    // see https://owlcarousel2.github.io/OwlCarousel2/docs/api-events.html#to-owl-carousel
    var $speed = 300;  // in ms
    console.info($(this).data('position'))
    $('#image-carousel').trigger('to.owl.carousel', [$(this).data('position'), $speed] );
  });
}

function initOtherActivityCarousel() {
  var list = $('#other-activity');
  var news = NEWS.reverse();
  news.forEach(function (n) {
    var img = `./assets/activities/${n.activities}/logo.png`;
    var card = $('<div>')
      .addClass('thumbnail our-team');
    $('<img>').attr('src', img).attr('alt', 'test').appendTo(card);
    list.append(card);
  });
  list.owlCarousel({
    startPosition: 0,
    loop: true,
    margin: 10,
    nav: true,
    navText: ['&laquo;', '&raquo;'],
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
}

function initContent(d) {
  console.info(d)
  $(".sub").text(d.title.sub);
  $(".main").text(d.title.main);
  $(".summary").text(d.content.summary);
  var body = $(".content-body");
  for(var i=0; i<d.content.paragraph.length; i++){
    var paragraph = $("<div>").addClass("paragraph").appendTo(body);
    paragraph.text(d.content.paragraph[i]);
  }
}

function getId() {
  var results = new RegExp('[?&]id=([^&#]*)').exec(window.location.search);
  return results !== null ? results[1] || 0 : false;
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: youtube,
  });
}

$(document).ready(function () {
  var id = getId();
  $.getJSON(`https://mattlin4567.github.io/giverBar/assets/activities/${id}/data.json`, function(json) {
    var imageNum = json['images'] ? json['images'] : 3;
    youtube = json.youtube;
    initImagesCarousel(id, imageNum);
    initContent(json);
    initOtherActivityCarousel();
  });
});