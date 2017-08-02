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
    body.appendChild(document.createElement("hr"));
  }
}

function makeBeerElement(beer){
  var beerDiv = document.createElement("div");

  var title = document.createElement("h2");
  title.innerText = beer.name;
  beerDiv.appendChild(title);

  beerDiv.appendChild(makeBeerList(beer));

  return beerDiv;
}

function makeBeerList(beer){
  var beerList = document.createElement("ul");

  var listElementsText = getBeerDetails(beer);
  for(var text of listElementsText){
    var element = makeListElement(text);
    beerList.appendChild(element);
  }

  return beerList;
}

function getBeerDetails(beer){
  var details = [];
  details.push("Tag Line: " + beer.tagline);
  details.push("Description: " + beer.description);
  details.push("Tips: " + beer.brewers_tips);
  return details;
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
