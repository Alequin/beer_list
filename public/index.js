var beerArray = [];

function makeRequest(url, callback){
  var request = new XMLHttpRequest();

  request.addEventListener("load", callback);

  request.open("GET", url);
  request.send();
}

function onRequest(){
  if(this.status !== 200){
    return;
  }

  var jsonString = this.responseText;
  beerArray = JSON.parse(jsonString);

  console.log(beerArray);
}

var app = function () {
  makeRequest("https://api.punkapi.com/v2/beers", onRequest);
}

window.addEventListener('load', app);
