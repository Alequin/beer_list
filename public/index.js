var beerArray = [];

function makeRequest(url, callback){
  var request = new XMLHttpRequest();

  request.addEventListener("load", callback);

  request.open("GET", url);
  request.send();
}

var app = function () {
  makeRequest("https://api.punkapi.com/v2/beers", function(){
    if(this.status !== 200){
      return;
    }

    var jsonString = this.responseText;
    beerArray = JSON.parse(jsonString);

    console.log(beerArray);
  });
}



window.addEventListener('load', app);
