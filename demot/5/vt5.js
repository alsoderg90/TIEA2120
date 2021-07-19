"use strict";
// seuraavat estävät jshintin narinat jqueryn ja leafletin objekteista
/* jshint jquery: true */
/* globals L */


// kirjoita tänne oma ohjelmakoodisi
console.log(data);
var mymap;
 $( document ).ready(function() {
    kartta();
	joukkueet();
	rastit();
	naytaKartalla();
});
	
function kartta() {
	
	// kartan luominen
	var map = $("#map");
		map.css("width", Math.round(window.innerWidth) + "px");
		map.css("height", Math.round(window.innerHeight/2.5) + "px");
	mymap =  L.map('map', {
     crs: L.TileLayer.MML.get3067Proj()
    }).setView([62.2333, 25.7333], 11);
	L.tileLayer.mml_wmts({ layer: "maastokartta", key : "a2b19a2e-60cc-4fe8-81a4-f0095b0b9809" }).addTo(mymap);
	
	// koordinaatit kartan keskittämistä rastien alueelle
	var maxLat = Number.MIN_VALUE;
	var maxLon = Number.MIN_VALUE;
	var minLon = Number.MAX_VALUE;
	var minLat = Number.MAX_VALUE;
	
	// rastien läpi käynti ja niiden merkitseminen karttaan, sekä ääriarvojen etsiminen
	for (var rasti of data["rastit"]) {
		var lat = parseFloat(rasti["lat"]);
		var lon = parseFloat(rasti["lon"]);
		let circle = L.circle(
			[lat, lon], {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.2,
				radius: 150
			}
        ).addTo(mymap);
		if (lat >= maxLat ) {
			maxLat = lat;
		}
		if (lon >= maxLon ) {
			maxLon = lon;
		}
		if (lon <= minLon ) {
			minLon = lon;
		}
		if (lat <= minLat ) {
			minLat = lat; 
		}
	}	
	// kartan keskitys
	mymap.fitBounds([
		[minLat, minLon],
		[maxLat, maxLon]
		
	]);
}

// lisätään tapahtumienkuuntelijat 
function naytaKartalla() {
	let divKartalla = $(".div")[1];
	console.log(divKartalla);
	divKartalla.addEventListener("dragover", dragover);
	divKartalla.addEventListener("drop", dropKartalla);	
}

//tapahtumankäsittelijä kun elementti raahataan
function dragover(e) {
	e.preventDefault();
	e.dataTransfer.dropEffect = "move";
}

//tapahtumankäsittelijä kun elementti tiputetaan "kartalla"-elementtiin
function dropKartalla(e) {
	console.log(e);
	e.preventDefault();
	var data = e.dataTransfer.getData("text");
	var p = document.getElementById(data);
	e.target.appendChild(p);
	console.log(data);
	console.log(p);
	p.style.position = "absolute";
	p.style.top = e.clientY + "px";
	p.style.left = e.clientX + "px";
	let color = p.style.backgroundColor;
	if (data.startsWith("joukkue")) {
		p.matka = piirraReitti(parseInt(data.substring(7)),color);
	}
	if (data.startsWith("rasti")) {
		console.log("jee");
		let divJoukkue = document.getElementsByClassName("div")[0];
		divJoukkue.addEventListener("dragover", dragover);
	}
}

//tapahtumankäsittelijä kun elementti tiputetaan "joukkueet"-elementtiin
function dropJoukkuelista(e) {
	e.preventDefault();
	var data = e.dataTransfer.getData("text");
	var p = document.getElementById(data);
	p.style.position = "initial";
	if (e.target.tagName === "P") {
		e.target.parentNode.appendChild(p);
	}
	if (e.target.tagName === "UL") {
		e.target.appendChild(p);
	}
	p.matka.remove();
	console.log(data);
	console.log(p);
}

function dropRastilista(e) {
	e.preventDefault();
	var data = e.dataTransfer.getData("text");
	var p = document.getElementById(data);
	p.style.position = "initial";
	if (e.target.tagName === "LI") {
		e.target.parentNode.appendChild(p);
	}
	if (e.target.tagName === "UL") {
		e.target.appendChild(p);
	}
	console.log(data);
	console.log(p);
}

//lisätään tietorakenteen joukkueet sivulle
function joukkueet() {
	
	var divJoukkueet = $("#joukkueet");
	var joukkueet = data["joukkueet"];
	joukkueet.sort((a,b) => a["nimi"].toUpperCase() > b["nimi"].toUpperCase() ? 1 : -1);
	var div = document.createElement("div");
	div.setAttribute("class", "div");
	div.addEventListener("drop", dropJoukkuelista);
	
	for (var i=0; i<joukkueet.length; i++) {
		let p = document.createElement("p");
		p.style.backgroundColor = rainbow(joukkueet.length-1, i);
		p.setAttribute("id", "joukkue" + joukkueet[i]["id"]);
		let nimi = joukkueet[i]["nimi"];
		let matka = joukkueenKilometrit(joukkueet[i]);
		p.appendChild(document.createTextNode(`${nimi} (${matka})`));
		p.setAttribute("draggable", "true"); // elementistä raahattava
		//elementille tapahtumankuuntelija kun aletaan raahata
		p.addEventListener("dragstart", function(e) { 
			e.dataTransfer.setData("text/plain", p.getAttribute("id"));
			let ul = document.getElementsByClassName("lista")[0];
			// poistetaan tapahtumankuuntelija, jotta ei voida raahata väärään paikkaan
			ul.removeEventListener("dragover", dragover);
			// lisätään listaan tapahtumakuuntelija
			div.addEventListener("dragover", dragover);		
		});	
		div.appendChild(p);			
	}
	divJoukkueet[0].appendChild(div);	
}

/**
 * Laskee joukkueen kulkemat kilometrit
 * @param {Object} joukkue 
 */
function joukkueenKilometrit(joukkue) {
	let matka = 0;
	let lahto = false;
	let i = 0;
	let j = i+1;
	while (j<joukkue["rastit"].length) {
		let rastiA = etsiRasti(joukkue["rastit"][i]["rasti"]); // etsitään rasti a
		let rastiB = etsiRasti(joukkue["rastit"][j]["rasti"]); // etsitään sitä seuraava rasti b
		if ( rastiA === null) {
			i++;
			continue;
		}
		if (rastiB === null) {
			j++;
			continue;
		}
		if (rastiA["koodi"] == "MAALI" && lahto) {
			break;
		}		
		if (rastiA["koodi"] == "LAHTO" || lahto) {
			lahto = true;
			let lat2;
			let lon2;
			let lat1 = parseFloat(rastiA["lat"]);
			let lon1 = parseFloat(rastiA["lon"]);
			try {
				lat2 = parseFloat(rastiB["lat"]);
				lon2 = parseFloat(rastiB["lon"]);
			}
			catch(e) {
				j++;
				continue;
			}

			if (!lat1 || !lon1 || isNaN(lat1) || isNaN(lon1)) {
				i++;
				j++;
				continue;
			}
			else if (!lat2 || !lon2 || isNaN(lat2) || isNaN(lon2)) {
				j++;
				continue;
			}
			let etaisyys = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2 );
			if (!isNaN(etaisyys)) {
				matka += etaisyys;
			}
			i = j;
			j = i+1;
		}
		else {
		i++;
		j++;
		}		
	}
	return Math.round(matka * 10) / 10
}

function etsiRasti(rasti) {
	for (let r of data["rastit"]) {
		try {		
			if (rasti.toString() === r["id"].toString()) {
			return r;
			}
		}
		catch (e) {
			continue;
		}
	}
	return null;	
}

/**
 * Laskee kahden pisteen etäisyyden
 * @param {Float} lat1 - ensimmäisen pisteen leveysaste
 * @param {Float} lon1 - ensimmäisen pisteen pituusaste
 * @param {Float} lat2 - toisen pisteen leveysaste
 * @param {Float} lon2 - toisen pisteen pituusaste
 */
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}


//lisätään tietorakenteen rastit listana sivulle
function rastit() {

	var divRastit = $("#rastit");
	var rastit = data["rastit"];
	rastit.sort((a,b) => a["koodi"].toUpperCase() > b["koodi"].toUpperCase() ? -1 : 1);
	let div = document.createElement("div");
	divRastit[0].appendChild(div);
	var lista = document.createElement("ul");
	lista.setAttribute("class", "lista");
	lista.addEventListener("drop", dropRastilista);
	div.appendChild(lista);

	for (var i=0; i<rastit.length; i++) {
		let p = document.createElement("li");
		p.style.backgroundColor = rainbow(rastit.length-1, i);
		p.appendChild(document.createTextNode(rastit[i]["koodi"]));
		p.setAttribute("id", "rasti" + rastit[i]["id"]);
		p.setAttribute("draggable", "true"); // elementistä raahattava
		//elementille tapahtumankuuntelija kun aletaan raahata
		p.addEventListener("dragstart", function(e) {
			e.dataTransfer.setData("text/plain", p.getAttribute("id"));
			let divJoukkue = document.getElementsByClassName("div")[0];
			// poistetaan tapahtumankuuntelija, jotta ei voida raahata väärään paikkaan
			divJoukkue.removeEventListener("dragover", dragover);
			// lisätään listaan tapahtumakuuntelija
			lista.addEventListener("dragover", dragover);
		});
		lista.appendChild(p);
	} 
}

// funktio joka yhdistää joukkueen käymät rastit kartalla
function piirraReitti(id, backgroundcolor) {
	var joukkue = null;
	for (let j of data["joukkueet"]) {
		if ( j["id"] === id) {
			joukkue = j;
		}
	}
	var joukkueenRastit = joukkue["rastit"];
	var koordinaatit = [];
	for (let r1 of joukkueenRastit) {
		for (let r2 of data["rastit"]){
			try {
				if (r1["rasti"].toString() === r2["id"].toString()) {
					koordinaatit.push({"lat": r2["lat"], "lon": r2["lon"]});
				}
			}
			catch(err) {
				console.log(err.message);
			}
		}
	}
	let polyline = L.polyline(koordinaatit, {color: backgroundcolor}).addTo(mymap);
	return polyline;
}	

function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    let r, g, b;
    let h = step / numOfSteps;
    let i = ~~(h * 6);
    let f = h * 6 - i;
    let q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    let c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}