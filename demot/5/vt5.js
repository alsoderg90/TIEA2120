"use strict";
// seuraavat estävät jshintin narinat jqueryn ja leafletin objekteista
/* jshint jquery: true */
/* globals L */


// kirjoita tänne oma ohjelmakoodisi
console.log(data);
var mymap;
var x;
var y;
 $( document ).ready(function() {
	 
    kartta();
	joukkueet();
	rastit();
	naytaKartalla(mymap);
});
	
function kartta() {
	
	var map = $("#map");
		map.css("width", Math.round(window.innerWidth) + "px");
		map.css("height", Math.round(window.innerHeight/2.5) + "px");
	mymap =  L.map('map', {
     crs: L.TileLayer.MML.get3067Proj()
    }).setView([62.2333, 25.7333], 11);
	L.tileLayer.mml_wmts({ layer: "maastokartta", key : "a2b19a2e-60cc-4fe8-81a4-f0095b0b9809" }).addTo(mymap);
	
	var maxLat = Number.MIN_VALUE;
	var maxLon = Number.MIN_VALUE;
	var minLon = Number.MAX_VALUE;
	var minLat = Number.MAX_VALUE;
	
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
	mymap.fitBounds([
		[minLat, minLon],
		[maxLat, maxLon]
		
	]);
}

function rastit() {

	var divRastit = $("#rastit");
	var rastit = data["rastit"];
	rastit.sort((a,b) => a["koodi"].toUpperCase() > b["koodi"].toUpperCase() ? -1 : 1);
	var table = document.createElement("table");
	table.setAttribute("class", "table");
	divRastit[0].appendChild(table);
	var rivi = 1;
	
	for (var i=0; i<rastit.length; i++) {
		let p = document.createElement("p");
		p.style.backgroundColor = rainbow(rastit.length-1, i);
		p.appendChild(document.createTextNode(rastit[i]["koodi"]));
		p.setAttribute("draggable", "true");
		p.setAttribute("id", "rasti" + rastit[i]["id"]);
		p.addEventListener("dragstart", function(e) {
			e.dataTransfer.setData("text/plain", p.getAttribute("id"));
		});
		var td = document.createElement("td");
		if (i < 22) {
			var tr = document.createElement("tr");
			table.appendChild(tr);
		}

		if (i % 22 === 0) {
			tr = document.getElementsByTagName("tr")[0];
			td.appendChild(p);
			tr.appendChild(td);
			rivi = 1;
		}	
		else {
			var asd = document.getElementsByTagName("tr")[rivi];
			td.appendChild(p);
			asd.appendChild(td);
			rivi++;
		} 
	} 
}

function joukkueet() {
	
	var divJoukkueet = $("#joukkueet");
	var joukkueet = data["joukkueet"];
	joukkueet.sort((a,b) => a["nimi"].toUpperCase() > b["nimi"].toUpperCase() ? 1 : -1);
	var div = document.createElement("div");
	div.setAttribute("class", "div");
	
	for (var i=0; i<joukkueet.length; i++) {
		let p = document.createElement("p");
		p.style.backgroundColor = rainbow(joukkueet.length-1, i);
		p.setAttribute("id", "joukkue" + joukkueet[i]["id"]);
		p.appendChild(document.createTextNode(joukkueet[i]["nimi"]));
		p.setAttribute("draggable", "true");
		p.addEventListener("dragstart", function(e) {
			e.dataTransfer.setData("text/plain", p.getAttribute("id"));
		});	
		div.appendChild(p);			
	}
	divJoukkueet[0].appendChild(div);	
}

function naytaKartalla() {

	let divKartalla = $(".div")[1];
	console.log(divKartalla);
	divKartalla.addEventListener("dragover", function(e) {
		e.preventDefault();
		console.log(e.clientX, e.clientY);
		e.dataTransfer.dropEffect = "move";
		x = e.clientX;
		y = e.clientY;
	});
	divKartalla.addEventListener("drop", function(e) {
		e.preventDefault();
		console.log(e);
		var data = e.dataTransfer.getData("text");
		let p = document.getElementById(data);
		p.style.position = "absolute";
		e.target.appendChild(p);
		console.log("X:",x, " Y:",y);
		p.style.top = y + "px";
		p.style.left = x + "px";
		let color = p.style.backgroundColor;
		if (data.startsWith("joukkue")) {
			piirraReitti(parseInt(data.substring(7)),color);
		}
		else if (data.StartsWith("rasti")) {
			console.log("jee");
		}
	});	
}

function piirraReitti(id, backgroundcolor) {
	console.log(id);
	var joukkue = null;
	for (let j of data["joukkueet"]) {
		if ( j["id"] === id) {
			joukkue = j;
		}
	}
	console.log(joukkue);
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
	console.log(backgroundcolor);
	let polyline = L.polyline(koordinaatit, {color: backgroundcolor}).addTo(mymap);
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