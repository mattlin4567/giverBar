var id = 0;
var player = null;
var data = {};
function initImagesCarousel(id, num) {
  var md = new MobileDetect(window.navigator.userAgent);
  var list = $('#image-carousel');
  for (var i = 0; i < num; i++) {
    var img = './assets/activities/'+id+'/image'+i+'.jpg';
    var card = $('<div>');
    $('<img>').attr('src', img).attr('alt', '圖片'+i).appendTo(card);
    list.append(card);
  };
  list.children().each(function (index) {
    $(this).attr('data-position', index);
  });
  list.owlCarousel({
    center: true,
    items: md.mobile() ? 1 : 3,
    nav: true,
    navText: ['<i class="fa fa-caret-left fa-2x"></i>', '<i class="fa fa-caret-right fa-2x"></i>'],
    loop: true,
    dots: false,
  });
  $('.owl-item>div').click(function () {
    // see https://owlcarousel2.github.io/OwlCarousel2/docs/api-events.html#to-owl-carousel
    var $speed = 300;  // in ms
    $('#image-carousel').trigger('to.owl.carousel', [$(this).data('position'), $speed]);
  })
}

function initOtherActivityCarousel() {
  var list = $('#other-activity');
  var news = NEWS;
  news.forEach(function (n) {
    var img = './assets/activities/'+n.activities+'/logo.png';
    var card = $('<button>')
      .addClass('thumbnail our-team')
      .attr('data-id', n.activities);
    $('<img>').attr('src', img).attr('alt', n.title).appendTo(card);
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

  $('button.thumbnail').click(function () {
    var i = $(this).attr('data-id');
    window.location = './content.html?id='+i;
  });
}

function initContent(d) {
  $(".main").text(d.title.main);
  var body = $(".content-body");
  for (var i = 0; i < d.content.paragraph.length; i++) {
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
    .attr("content", 'https://'+document.domain+'/content.html?id='+id)
    .appendTo(head);
  $('<meta>')
    .attr("property", "og:title")
    .attr("content", 'https://'+document.domain+'/content.html?id='+id)
    .appendTo(head);
}

function addSocialButton(url, title) {
  $('.share-btn').attr("href", url);
  $('.fb-share-btn').attr("href", 'http://www.facebook.com/share.php?u='+document.URL);
  $('.line-it-button').attr("href", 'http://line.me/R/msg/text/?'+title+'%0D%0A'+document.URL);
}

function onYouTubeIframeAPIReady() {
  if (data.youtube) {
    player = new YT.Player('player', {
      videoId: data.youtube,
    });
  }
}

$(document).ready(function () {
  id = getId();
  $('.share-btn > img').attr("onerror", "this.src='./assets/activities/"+id+"/logo.png'").attr("src", "./assets/activities/"+id+"/social_logo.png");
  $.getJSON('https://mattlin4567.github.io/giverBar/assets/activities/'+id+'/data.json', function (json) {
    data = json;
    var imageNum = json.images ? json.images : 3;
    initImagesCarousel(id, imageNum);
    addSocialButton(json.web, json.title.main);
    initContent(json);
    initOtherActivityCarousel();
    if(YT.loaded && !player) {
      onYouTubeIframeAPIReady();
    }
  });
});