var u;

$(document).ready(function(){
  $(".fancybox").fancybox();
});
// Search bar
$(function() {
  var poljeUnos = $("#upit");
  var ikona = $("#btn_trazi");

  // Focus
  $(poljeUnos).on("focus", function() {
    $(this).animate({
      width: "100%"
    }, 400);
    $(ikona).animate({
      right: "10px"
    }, 400);
  });

  // Blur
  $(poljeUnos).on("blur", function() {
    if (poljeUnos.val() == "") {
      $(this).animate({
        width: "45%"
      }, 400, function() {});
      $(ikona).animate({
          right: "360px"
        }, 400),
        function() {};
    }
  });

  $('#trazilica').submit(function(e) {
    e.preventDefault();
    // Da forma ne sumbita
  });

})

function trazi() {
  // Brisanje prethodnih rezultata
  $('#rezultat').html('');
  $('#tipke').html('');

  // Dohvati unos forme
  u = $('#upit').val();

  // Slanje zahtjeva
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: u,
      type: 'video',
      key: 'AIzaSyDWhdo-T6vnRFwwVJit0ViqNB_XUJi_hsE'
    },
    function(data) {
      var iducaToken = data.nextPageToken;
      var prethToken = data.prevPageToken;
      console.log(data);

      $.each(data.items, function(i, item) {
        // Obrada rezultata
        var izlaz = dohvatiRezultat(item);

        // Prikazi izlaz
        $('#rezultat').append(izlaz);
      });

      var botuni = dohvatiBotune(prethToken, iducaToken);

      // Prikazi botune
      $("#tipke").append(botuni);

    });
}

function iducaStranica(){

  var token = $('#btnIduci').data('token');
  var upit = $('#btnIduci').data('query');
  // Brisanje prethodnih rezultata
  $('#rezultat').html('');
  $('#tipke').html('');

  // Dohvati unos forme
  u = $('#upit').val();

  // Slanje zahtjeva
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      pageToken: token,
      q: upit,
      type: 'video',
      key: 'AIzaSyDWhdo-T6vnRFwwVJit0ViqNB_XUJi_hsE'
    },
    function(data) {
      var iducaToken = data.nextPageToken;
      var prethToken = data.prevPageToken;
      console.log(data);

      $.each(data.items, function(i, item) {
        // Obrada rezultata
        var izlaz = dohvatiRezultat(item);

        // Prikazi izlaz
        $('#rezultat').append(izlaz);
      });

      var botuni = dohvatiBotune(prethToken, iducaToken);

      // Prikazi botune
      $("#tipke").append(botuni);

    });
}

function prethodnaStranica(){

  var token = $('#btnPreth').data('token');
  var upit = $('#btnPreth').data('query');
  // Brisanje prethodnih rezultata
  $('#rezultat').html('');
  $('#tipke').html('');

  // Dohvati unos forme
  u = $('#upit').val();

  // Slanje zahtjeva
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      pageToken: token,
      q: upit,
      type: 'video',
      key: 'AIzaSyDWhdo-T6vnRFwwVJit0ViqNB_XUJi_hsE'
    },
    function(data) {
      var iducaToken = data.nextPageToken;
      var prethToken = data.prevPageToken;
      console.log(data);

      $.each(data.items, function(i, item) {
        // Obrada rezultata
        var izlaz = dohvatiRezultat(item);

        // Prikazi izlaz
        $('#rezultat').append(izlaz);
      });

      var botuni = dohvatiBotune(prethToken, iducaToken);

      // Prikazi botune
      $("#tipke").append(botuni);

    });
}

// Obrada rezultata
function dohvatiRezultat(item){
  var videoId = item.id.videoId;
  var naslov = item.snippet.title;
  var opis = item.snippet.description;
  var slicica = item.snippet.thumbnails.high.url;
  var naslovKanala = item.snippet.channelTitle;
  var datumVidea = item.snippet.publishedAt;

  // Formatiranje izlaza
  var izlaz = '<li>' +
  '<div class="lista-lijevo">' +
  '<img src="' + slicica +'" alt="Prikaz videa">'+
  '</div>'+
  '<div class="lista-desno">' +
  '<h3> <a data-fancybox data-type="iframe" href="http://www.youtube.com/embed/'+videoId+'">'+naslov+'</a></h3>'+
  '<small>Izvor: <span class="kNaslov">'+naslovKanala+'</span>, Datum: '+datumVidea+'</small>'+
  '<p>'+opis+'</p>'+
  '</div>'+
  '</li>'+
  '<div class="clearfix"></div>'+
  '';

  return izlaz;
}

function dohvatiBotune(prethToken, iducaToken){
  if(!prethToken){
    console.log("Bez");
    var btnIzlaz = '<div class="button-container">'+
                  '<button id="btnIduci" class="page-button" data-token="'+iducaToken+'"'+
                  'data-query="'+u+'" onclick="iducaStranica();">Iduca stranica</button></div>';
  } else{
    console.log("Sa");
    var btnIzlaz = '<div class="button-container">'+
                  '<button id="btnPreth" class="page-button" data-token="'+prethToken+'"'+
                  'data-query="'+u+'" onclick="prethodnaStranica();">Prethodna stranica</button>'+
                  '<button id="btnIduci" class="page-button" data-token="'+iducaToken+'"'+
                  'data-query="'+u+'" onclick="iducaStranica();">Iduca stranica</button></div>';
  }
  return btnIzlaz;
}
