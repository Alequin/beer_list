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

  presentBeers(beerArray);
}

function presentBeers(beers){

  var body = document.querySelector("body");

  for(var beer of beers){
    var beerElement = makeBeerElement(beer);
    body.appendChild(beerElement);
  }
}

function makeBeerElement(beer){
  var beerItem = document.createElement("ul");

  var listElementsText = [];
  listElementsText.push("Name: " + beer.name);
  listElementsText.push("Tag Line: " + beer.tagline);
  listElementsText.push("Description: " + beer.description);
  listElementsText.push("Tips: " + beer.brewers_tips);

  for(var text of listElementsText){
    var element = makeListElement(text);
    beerItem.appendChild(element);
  }

  return beerItem;
}

function makeListElement(text){
  var element = document.createElement("li");
  element.innerText = text;
  return element;
}

var app = function () {
  makeRequest("https://api.punkapi.com/v2/beers", onRequest);
}

window.addEventListener('load', app);
