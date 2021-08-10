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
    var row = $('<div>').addClass('row form-group');
    var activities = news[y];
    activities.forEach((activity) => {
      var col = $('<button>').addClass('span3 tiles').attr("data-activity", activity.activities).appendTo(row);
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
      console.log(id);
      player.push(new YT.Player(id, {
        videoId: VIDEOS[i],
        playerVars: {
          'origin': window.location.host
        }
      }));
    }
    $('#video-carousel').owlCarousel({
      startPosition: 0,
      autoWidth: true,
      center: true,
      loop: true,
      margin: 10,
      dots: false,
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        600: {
          items: 3,
          navText: ['<i class="fas fa-chevron-circle-left fa-2x"></i>', '<i class="fas fa-chevron-circle-right fa-2x"></i>'],
          nav: true
        }
      },
    });
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

function initVideo() {
  console.info("initVideo")
  var carousel = $('#video-carousel');
  for (var i = 0; i < VIDEOS.length; i++) {
    var vid = $('<div>').addClass('video').css({ position: 'relative', height: 0, 'padding-bottom': '56.28%' });
    $('<div>').attr("id", 'player-' + i).appendTo(vid);
    carousel.append(vid);
  }
}

var md;
$(document).ready(function () {
  md = new MobileDetect(window.navigator.userAgent);
  if (md.mobile()) {
    var banner = $('#banner');
    banner.height(Math.floor(banner.width() / 4.37));
  } else {
    initVideo();
  }
  initPage();
});

$(window).on('load', function () {
  $(".stage > img").delay(1000).css({ "animation-name": "rubberBand" });
  setTimeout(function () {
    $(".stage > img").delay(1000).css({ "animation-name": '' });
  }, 2000);
});