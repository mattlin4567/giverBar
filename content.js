var id = 0;
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
    nav: true,
    navText: ['<i class="fa fa-caret-left fa-2x"></i>', '<i class="fa fa-caret-right fa-2x"></i>'],
    loop: true,
    dots: false,
  });
  $('.owl-item>div').click(function() {
    // see https://owlcarousel2.github.io/OwlCarousel2/docs/api-events.html#to-owl-carousel
    var $speed = 300;  // in ms
    $('#image-carousel').trigger('to.owl.carousel', [$(this).data('position'), $speed] );
  })
}

function initOtherActivityCarousel() {
  var list = $('#other-activity');
  var news = NEWS;
  news.forEach(function (n) {
    var img = `./assets/activities/${n.activities}/logo.png`;
    var card = $('<div>')
      .addClass('thumbnail our-team')
      .attr('data-id', n.activities);
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
  
  $('div.thumbnail').click(function () {
    var i = $(this).attr('data-id');
    window.location = `./content.html?id=${i}`;
  });
}

function initContent(d) {
  $(".main").text(d.title.main);
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

function addOpenGraphtags(id, d) {
  var head = $("head");
  $('<meta>')
    .attr("property", "og:url")
    .attr("content", `https://${document.domain}/content.html?id=${id}`)
    .appendTo(head);
  $('<meta>')
    .attr("property", "og:title")
    .attr("content", `https://${document.domain}/content.html?id=${id}`)
    .appendTo(head);  
}

function addSocialButton(url) {
  $('.share-btn').attr("href", url);
  $('.fb-share-btn').attr("href", `https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${encodeURIComponent(document.URL)}&display=popup&ref=plugin&src=share_button`);
  $('.line-it-button').attr("data-url", document.URL);
}

function onYouTubeIframeAPIReady() {
  $.getJSON(`https://mattlin4567.github.io/giverBar/assets/activities/${id}/data.json`, function(json) {
    var imageNum = json.images ? json.images : 3; 
    initImagesCarousel(id, imageNum);
    addSocialButton(json.web);
    initContent(json);
    initOtherActivityCarousel();
    if (json.youtube) {
      player = new YT.Player('player', {
        videoId: json.youtube,
      });
    } 
  });
}

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
  fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

$(document).ready(function () {
  id = getId();
  $('.share-btn > img').attr("src", `./assets/activities/${id}/logo.png`);
  
});