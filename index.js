function createCards(name, title) {
  var img = './assets/activities/' + name + '/logo.png';
  var card = $('<img>').attr('src', img).attr('alt', title);
  return card;
}

function initPage() {
  var news = {};
  NEWS.forEach((n) => {
    var year = n['date'].substring(0, 4);
    if (!news[year]) {
      news[year] = [];
    }
    news[year].push(n);
  });
  var list = $('#activity-list');
  Object.keys(news).sort().reverse().forEach((y) => {
    $('<hr>').addClass('hr-text').attr("data-content", y).appendTo(list);
    var row = $('<div>').addClass('list-row form-group');
    var activities = news[y];
    activities.forEach((activity) => {
      var col = $('<button>').addClass('tiles').attr("data-activity", activity.activities).appendTo(row);
      col.append(createCards(activity.activities, activity.title));
      $('<div>').addClass('details').text(activity.title).appendTo(col);
    })
    list.append(row);
  });

  // bind click event
  $('button.tiles').click(navgation);
}

function initPagination(pageNum) {
  var pagination = $('div.pagination');
  if (pageNum > 1) {
    var ul = $('<ul>').appendTo(pagination);
    var prev = $('<li>').appendTo(ul);
    var prevBtn = $('<a>').attr("href", "#").html("&laquo;");
    prevBtn.click(function () {
      var pages = $('#activity-list').children();
      for (var p = 0; p < pages.length; p++) {
        if ($(pages[p]).is(":visible")) {
          if (p > 0) {
            $(pages[p]).hide();
            $(pages[p - 1]).show();
          }
          break;
        }
      }
    });
    prev.append(prevBtn);

    for (var p = 0; p < pageNum; p++) {
      var page = $('<li>').appendTo(ul);
      var pageBtn = $('<a>')
        .attr("href", "#")
        .attr('data-page', p)
        .text(p + 1);
      pageBtn.click(function () {
        var pages = $('#activity-list').children();
        for (var p = 0; p < pages.length; p++) {
          if ($(pages[p]).is(":visible")) {
            $(pages[p]).hide();
            break;
          }
        }
        $(pages[$(this).attr('data-page')]).show();
      });
      page.append(pageBtn);
    }

    var next = $('<li>').appendTo(ul);
    var nextBtn = $('<a>').attr("href", "#").html("&raquo;");
    nextBtn.click(function () {
      var pages = $('#activity-list').children();
      for (var p = 0; p < pages.length; p++) {
        if ($(pages[p]).is(":visible")) {
          if (p < pages.length - 1) {
            $(pages[p]).hide();
            $(pages[p + 1]).show();
          }
          break;
        }
      }
    });
    next.append(nextBtn);
    pagination.show();
  }
}

function navgation() {
  var activity = $(this).attr('data-activity');
  window.location = './content.html?id=' + activity;
}

var player = [];
function onYouTubeIframeAPIReady() {
  console.info("onYouTubeIframeAPIReady")
  if (md.mobile()) {
    player = new YT.Player('player', {
      playerVars: {
        'origin': window.location.host
      },
      events: {
        'onReady': onPlayerReady,
      },
    });
  } else {
    for (var i = 0; i < VIDEOS.length; i++) {
      var id = 'player-' + i;
      player.push(new YT.Player(id, {
        videoId: VIDEOS[i],
        playerVars: {
          'origin': window.location.host
        }
      }));
    }
  }
}

function onPlayerReady() {
  console.info("onPlayerReady")
  var d = new Date();
  var n = d.getSeconds();
  player.loadPlaylist({
    'listType': 'playlist',
    'list': 'PLPON2GpIbbWFNQ2Z00tZhVcdynLweecCE',
    'index': n % 10
  });
}

function initTV() {
  console.info("init TV")
  var carousel = $('#tv-carousel');
  for (var i = 0; i < VIDEOS.length; i++) {
    var img = 'https://i.ytimg.com/vi/' + VIDEOS[i] + '/maxresdefault.jpg';
    var card = $('<div>').addClass('yt-thumbnail').attr("data-video", VIDEOS[i]);
    $('<img>').attr('data-src', img).attr('alt', '圖片' + i).addClass('owl-lazy').appendTo(card);

    // bind click event
    card.click(openLightbox);
    carousel.append(card);
  }
  carousel.owlCarousel({
    center: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    items: 1,
    navText: ['<i class="fas fa-caret-left fa-2x"></i>', '<i class="fas fa-caret-right fa-2x"></i>'],
    loop: true,
    dots: false,
    animateOut: 'fadeOut',
    lazyLoad: true,
    lazyLoadEager: 2
  });
}

function openLightbox(id) {
  var id = $(this).attr('data-video');
  lity('//www.youtube.com/watch?v=' + id)
}

var md;
$(document).ready(function () {
  md = new MobileDetect(window.navigator.userAgent);
  if (md.mobile()) {
    var banner = $('#banner');
    banner.height(Math.floor(banner.width() / 4.37));
  } else {
    initTV();
  }
  initPage();
});

$(window).on('load', function () {
  $(".stage > img").delay(1000).css({ "animation-name": "rubberBand" });
  setTimeout(function () {
    $(".stage > img").delay(1000).css({ "animation-name": '' });
  }, 2000);
});