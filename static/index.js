//console.log(fsq_categories.data[0].fsq_category);
//console.log(fsq_categories.data.length);
for (var m=0; m<fsq_categories.data.length; m++){
  $('#select_fsq').append($('<option>', {
       value: fsq_categories.data[m].fsq_category,
       text : fsq_categories.data[m].fsq_category
   }));
}

var twtLayer, fsqLayer, map;

var baseDark = L.tileLayer("http://{s}.api.cartocdn.com/{styleId}/{z}/{x}/{y}.png", {
  styleId: "base-dark",
  attribution: 'CartoDB base map, data from <a href="http://openstreetmap.org">OpenStreetMap</a>'
});

var baseLight = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

var cfg_twt = {
  "radius": .02,
  "maxOpacity": .5,
  "scaleRadius": true,
  "useLocalExtrema": true,
  latField: 'lat',
  lngField: 'lng',
  valueField: 'count',
  gradient: {
    '.4': '#ccff33',
    '.8': '#ffff00',
    '.95': '#ff9900',
    '1': '#ff531a'
  }
};
twtLayer = new HeatmapOverlay(cfg_twt);

var cfg_fsq = {
  "radius": .02,
  "maxOpacity": .7,
  "scaleRadius": true,
  "useLocalExtrema": true,
  latField: 'lat',
  lngField: 'lng',
  valueField: 'count',
  gradient: {
    '.4': '#00ffcc',
    '.8': '#00ff99',
    '.95': '#00ff00',
    '1': '#00b300'
  }
};
fsqLayer = new HeatmapOverlay(cfg_fsq);

map = new L.Map('map', {
  center: new L.LatLng(45.46, 9.18),
  zoom: 8,
  layers: [baseDark]
});

var urlTWT = "http://geomobile.como.polimi.it/heatmap/collector/json/TWT/";
var urlFSQ = "http://geomobile.como.polimi.it/heatmap/collector/json/FSQ/";

function getData(url, source) {
  $.get(url, function(data) {
    //console.log(data);
    window[source + "Layer"].setData(data);
    map.addLayer(window[source + "Layer"]);
    map.removeLayer(window[source + "Layer"]);
    map.addLayer(window[source + "Layer"]);
  });
}

getData(urlTWT, "twt");
getData(urlFSQ, "fsq");


function formatDate(date){
  var date_splitted = date.split("/");
  date = date_splitted[1] + "-" + date_splitted[0] + "-" + date_splitted[2];
  return date;
}

$("#date_filter").click(function() {
  if ($('#datepicker_s').val() == '' || $('#datepicker_e').val() == '')
    alert("Please select start and end dates!");
  else {
    var twitter_tag = $('#input_twt').val();
    var fsq_keyword = $('#select_fsq').val();
    var start_date = formatDate($('#datepicker_s').val());
    var end_date = formatDate($('#datepicker_e').val());
    //console.log(start_date + " --- " + end_date + " --- " + twitter_tag + " --- " + fsq_keyword);
    map.removeLayer(twtLayer);
    map.removeLayer(fsqLayer);
    urlTWT = "http://geomobile.como.polimi.it/heatmap/collector/json/TWT/" + start_date + "/" + end_date + "/";
    if (twitter_tag != "")
      urlTWT += twitter_tag + "/";
    urlFSQ = "http://geomobile.como.polimi.it/heatmap/collector/json/FSQ/" + start_date + "/" + end_date + "/";
    if (fsq_keyword != "")
      urlFSQ += fsq_keyword + "/";
    //console.log(urlTWT + " --- " + urlFSQ);
    getData(urlTWT, "twt");
    getData(urlFSQ, "fsq");
  }
});

$(function(){
  $("#datepicker_s").datepicker({
    maxDate: new Date(),
    onSelect: function(selected){
      $("#datepicker_e").datepicker("option","minDate", selected)
    }
  });
  $("#datepicker_e").datepicker({
    maxDate: new Date(),
    onSelect: function(selected){
      $("#datepicker_s").datepicker("option","maxDate", selected)
    }
  });
});

function chktwt(){
  if($("#twt").is(':checked'))
    map.addLayer(twtLayer);
  else if(!$("#twt").is(':checked'))
    map.removeLayer(twtLayer);
}

function chkfsq(){
  if($("#fsq").is(':checked'))
    map.addLayer(fsqLayer);
  else if(!$("#fsq").is(':checked'))
    map.removeLayer(fsqLayer);
}

$("input[name='base']").click(function() {
  if($("#baseDark").is(':checked')){
    map.addLayer(baseDark);
    map.removeLayer(baseLight);
  }
  else if($("#baseLight").is(':checked')){
    map.addLayer(baseLight);
    map.removeLayer(baseDark);
  }
});

$("#legend_a").click(function() {
  $("#legend").toggle();
});

$("#filter_settings_a").click(function() {
  $("#filter_settings").toggle();
});

function resize() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false) {
    if ($(window).width() > 600) {
      $("#legend").css("display", "block");
      $("#filter_settings").css("display", "block");
      $("#datepicker_s, #datepicker_e, #input_twt").css("width", $("#select_fsq").width());
    }
    else {
      $("#legend").css("display", "none");
      $("#filter_settings").css("display", "none");
      $("#filter_settings_a").click(function() {
        $("#datepicker_s, #datepicker_e, #input_twt").css("width", $("#select_fsq").width());
      });
    }
  }
}

$(window).load(function() {
  //console.log($("#select_fsq").width());
  if ($(window).width() > 600) {
    $("#datepicker_s, #datepicker_e, #input_twt").css("width", $("#select_fsq").width());
  }
  else {
    $("#filter_settings_a").click(function() {
      $("#datepicker_s, #datepicker_e, #input_twt").css("width", $("#select_fsq").width());
    });
  }
});

function disablePropagation (id) {
  L.DomEvent.disableClickPropagation(L.DomUtil.get(id));
  L.DomEvent.disableScrollPropagation(L.DomUtil.get(id));
}

disablePropagation('legend');
disablePropagation('legend_a');
disablePropagation('filter_settings');
disablePropagation('filter_settings_a');
