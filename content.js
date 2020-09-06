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
  var news = NEWS;
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

function addSocialButton(id) {
  var link = `https://${document.domain}/giverBar/content.html?id=${id}`;
  $('.fb-share-button').attr("data-href", link);
  $('.line-it-button').attr("data-url", link);
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: youtube,
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
  var id = getId();
  console.info(document.domain)
  $.getJSON(`https://mattlin4567.github.io/giverBar/assets/activities/${id}/data.json`, function(json) {
    var imageNum = json['images'] ? json['images'] : 3;
    youtube = json.youtube;
    initImagesCarousel(id, imageNum);
    addSocialButton(id);
    initContent(json);
    initOtherActivityCarousel();
  });
});