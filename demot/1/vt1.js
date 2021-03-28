"use strict";
//@ts-check 
// Joukkueen sarja on viite data.sarjat-taulukossa lueteltuihin sarjoihin
// Joukkueen leimaamat rastit ovat viitteitä data.rastit-taulukossa lueteltuihin rasteihin
// voit vapaasti luoda data-rakenteen pohjalta omia aputietorakenteita

// Kirjoita tästä eteenpäin oma ohjelmakoodisi

// Seuraavilla voit tutkia selaimen konsolissa käytössäsi olevaa tietorakennetta. 

console.log(data);

console.dir(data);

let joukkue = { 
      "nimi": "Mallijoukkue",
      "jasenet": [
        "Lammi Tohtonen",
        "Matti Meikäläinen"
      ],
      "leimaustapa": [0,2],
      "rastit": [],
      "sarja": null ,
      "id": 99999
};

const sarja = "8h";
lisaaJoukkue(data, joukkue, sarja);

/**
 * Lisätään joukkue tietorakenteeseen oikeaan sarjaan
 * @param {Object} data - tietorakenne
 * @param {Object} joukkue - lisättävä joukkue
 * @param {Object} sarja - haluttuu sarja
 */
function lisaaJoukkue(data, joukkue, sarja) {
	if (arguments.length !== 3) {
		return;
	}
	for (var s of data["sarjat"]) {
		if (s["nimi"] == sarja) {
			joukkue["sarja"] = s;
			data["joukkueet"].push(joukkue);
		}
	}
}

muutaSarjanNimi(data, "8h", "10h");

/**
 * Muutetaan sarjan nimi
 * @param {Object} data - tietorakenne
 * @param {string} uusiNimi - 
 * @param {string} vanhaNimi
 */
function muutaSarjanNimi(data, vanhaNimi, uusiNimi) {
	for (var s of data["sarjat"]) {
		if (s["nimi"] == vanhaNimi) {
			s["nimi"] = uusiNimi;
		}
	}
}

tulostaJoukkueet1(data);

/**
 * Etsii ja tulostaa tietorakenteessa löytyvien joukkueiden nimet
 * @param {Object} data - tietorakenne
 */
function tulostaJoukkueet1(data) {
	let joukkueet = [];
	for (var d of data["joukkueet"]) {
		let joukkue = {};
		joukkue["nimi"] = d["nimi"].trim();
		joukkue["sarja"] = d["sarja"]["nimi"];
		//joukkueet.push(d["nimi"].trim() + " " + d["sarja"]["nimi"]);
		joukkueet.push(joukkue);
	}
	joukkueet.sort((a,b) => (a.nimi.toUpperCase()  > b.nimi.toUpperCase()) ? 1 : -1);
	console.log(joukkueet);
	for (var j of joukkueet) {
		log(j["nimi"], j["sarja"]);
	}
}

log("\n");
rastienNimet(data);

/**
 * Etsii ja tulostaa tietorakenteessa löytyvien rastien tunnukset
 * @param {Object} data - tietorakenne
 */
function rastienNimet(data) {
	let rastit = [];
	for (var d of data["rastit"]) {
		try {
			if ( parseInt((d["koodi"][0]))) {
			rastit.push(d["koodi"].trim() + ";");
			}
		}
		catch (e) {
		console.log(e);
		}
	}
	rastit.sort();
	log(rastit.join(""));
}

log("\n\n----------\nTaso 3\n----------\n\n");
poistaJoukkue(data, "Vara 1");
poistaJoukkue(data, "Vara 2");
poistaJoukkue(data, "Vapaat");

/**
 * Poistaa tietorakenteesta joukkueen
 * @param {Object} data - tietorakenne
 * @param {Object} joukkue - poistettava joukkue
 */
function poistaJoukkue(data, joukkue) {
	const uusilista = data["joukkueet"].filter(j => j["nimi"].trim() !== joukkue.trim());
	data["joukkueet"] = uusilista;
	return data;
}

joukkue = data["joukkueet"][6];

let rastinIdx = 74;

let uusirasti = {
	"koodi": "32",
	"lat": "62.144101",
	"lon": "25.694017"
};

vaihdaRasti(joukkue,rastinIdx, uusirasti);

/**
 * Vaihtaa pyydetyn rastileimauksen sijalle uuden rastin
 * @param {Object} joukkue
 * @param {number} rastinIdx - rastin paikka joukkue.rastit-taulukossa
 * @param {Object} uusirasti
 * @param {string} Aika - Rastileimauksen aika. Jos tätä ei anneta, käytetään samaa aikaa kuin vanhassa korvattavassa leimauksessa
 */
function vaihdaRasti(joukkue, rastinIdx, uusirasti, aika) {
	try {
		for (var r of data["rastit"]) {
			if (r["koodi"] === uusirasti["koodi"] && r["lat"] === uusirasti["lat"] && r["lon"] === uusirasti["lon"]) {
			etsiJoukkue(joukkue, rastinIdx, uusirasti, aika);
			}
		}	
	}
	catch(e) {
	console.log(e);
	}
}


function etsiJoukkue(joukkue, rastinIdx, uusirasti, aika) {
	for (var j of data["joukkueet"]) {
		if (j["nimi"].trim() == joukkue["nimi"].trim()) {
			j["rastit"][rastinIdx-1]["rasti"] = uusirasti;
				if (aika) {
			j["rastit"][rastinIdx]["aika"] = aika;
			}				
		}
	}
}

tulostaJoukkueet2(data);

/**
 * Etsii ja tulostaa tietorakenteessa löytyvien joukkueiden nimet
 * @param {Object} data - tietorakenne
 */
function tulostaJoukkueet2(data) {
	let lahtoaika = paivamaara(data["alkuaika"]);
	let loppuaika = paivamaara(data["loppuaika"]);
	let joukkueet = [];
	for (var j of data["joukkueet"]) {

		let joukkue = {
		"nimi" : j["nimi"].trim(),
		"pisteet" : 0
		};
		joukkue["pisteet"] = joukkueenPisteet(j, lahtoaika, loppuaika);
		joukkueet.push(joukkue);
	}
	joukkueet.sort((a,b) => (a["pisteet"] < b["pisteet"]) ? 1 :
	a["pisteet"] === b["pisteet"] ? ((a["nimi"] > b["nimi"]) ? 1 : -1) :-1);
	for (var i of joukkueet) {
	log(i["nimi"] + " (" + i["pisteet"] + " p)");
	}
}

/**
 * Laskee joukkueen saamat pisteet
 * @param {Object} joukkue 
 * @param {Object} lahtoaika - lähtöaika. Ennen lähtöaikaa leimatut  leimaukset hylätään
 * @param {Object} loppuaika - loppuaika. Ajan jälkeen leimatut leimaukset hylätään
 */
function joukkueenPisteet(joukkue, lahtoaika, loppuaika) {
	let pisteet = 0;
	let rastit = [];
	for (var r of joukkue["rastit"]) {
		try {
			let aika = paivamaara(r["aika"]);
			if (!isNaN(parseInt(r["rasti"]["koodi"][0])) && !rastit.includes(r["rasti"]["koodi"]) && aika > lahtoaika && aika < loppuaika ) {
			pisteet += parseInt(r["rasti"]["koodi"][0]);
			rastit.push(r["rasti"]["koodi"]);
			}
		}
		catch(e) {
		}
	}
	return pisteet;
}

/**
 * Luo merkkijonomuotoisesta päivämäärästä Date-olion ja palauttaa sen
 * @param {string} paivamäärä - päivämäärä merkkijonona
 */
function paivamaara(paivamaara) {
	let date = new Date(paivamaara);
	//console.log(paivamaara, date);
	return date;
}


log("\n\n----------\nTaso 5\n----------\n\n");

tulostaJoukkueet3(data);

/**
 * Etsii ja tulostaa tietorakenteessa löytyvien joukkueiden nimet
 * @param {Object} data - tietorakenne
 */
function tulostaJoukkueet3(data) {
	let lahtoaika = paivamaara(data["alkuaika"]);
	let loppuaika = paivamaara(data["loppuaika"]);
	let joukkueet = [];
	for (var j of data["joukkueet"]) {
		let joukkue = {
		"nimi" : j["nimi"].trim(),
		"pisteet" : 0,
		"kilometrit": 0,
		"aika": "",
		};
		joukkue["pisteet"] = joukkueenPisteet(j, lahtoaika, loppuaika);
		joukkue["kilometrit"] = joukkueenKilometrit(j, lahtoaika, loppuaika);
		joukkue["aika"] = joukkueenAika(j, lahtoaika, loppuaika);
		joukkueet.push(joukkue);
	}
		joukkueet.sort((a,b) => (a["pisteet"] < b["pisteet"]) ? 1 :
	a["pisteet"] === b["pisteet"] ? ((a["nimi"] > b["nimi"]) ? 1 : -1) :-1);
	for (var i of joukkueet) {
	log(i["nimi"] + ", " + i["pisteet"] + " p, " + i["kilometrit"] + " km, " + i["aika"] );
	}
}

/**
 * Laskee joukkueen käyttämän aika
 * @param {Object} joukkue 
 */
function joukkueenAika(joukkue) {
	let alkoi = {};
	let paattyi = {};
	for (var r of joukkue["rastit"]) {
		try {
			//console.log(r["rasti"]);
			if (r["rasti"]["koodi"] == "LAHTO") {
				alkoi = paivamaara(r["aika"]);
			}
			if (r["rasti"]["koodi"] == "MAALI") {
				paattyi = paivamaara(r["aika"]);
				if (alkoi instanceof Date) {
				break;
				}
			}
		}
		catch(e) {
		console.log(e);
		}
	}
	if (alkoi instanceof Date && paattyi instanceof Date) {
		var delta = (paattyi.getTime() - alkoi.getTime())/1000;
		var pv = Math.floor(delta / 86400);
		delta -= pv * 86400;
		var h = Math.floor(delta / 3600) % 24;
		delta -= h * 3600;
		var min = Math.floor(delta / 60) % 60;
		delta -= min * 60;
		var s = Math.floor(delta/60) % 60;
		var aika =  format(h,2) + ":" + format(min,2) + ":" + format(delta,2);
		return aika;
	}
	else {
		return "00:00:00";
	}
}

/**
 * Lisää luvun perään tarvittavan määrän nollia
 * @param {Int} luku - luku 
 * @param {Int} length - palautettavan merkkijonon pituus ts. nollia lisätään length - 1 verran.
 */
function format(luku, length) {
 
    var str = '' + luku;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

/**
 * Laskee joukkueen saamat pisteet
 * @param {Object} joukkue 
 * @param {Object} lahtoaika - lähtöaika. Ennen lähtöaikaa leimatut  leimaukset hylätään
 * @param {Object} loppuaika - loppuaika. Ajan jälkeen leimatut leimaukset hylätään
 */
function joukkueenPisteet(joukkue, lahtoaika, loppuaika) {
	let pisteet = 0;
	let rastit = [];
	for (var r of joukkue["rastit"]) {
		try {
			let aika = paivamaara(r["aika"]);
			if (!isNaN(parseInt(r["rasti"]["koodi"][0])) && !rastit.includes(r["rasti"]["koodi"]) && aika > lahtoaika && aika < loppuaika ) {
			pisteet += parseInt(r["rasti"]["koodi"][0]);
			rastit.push(r["rasti"]["koodi"]);
			}
		}
		catch(e) {
		}
	}
	return pisteet;
}

/**
 * Laskee joukkueen kulkemat kilometrit
 * @param {Object} joukkue 
 * @param {Object} lahtoaika - lähtöaika. Ennen lähtöaikaa leimatut  leimaukset hylätään
 * @param {Object} loppuaika - loppuaika. Ajan jälkeen leimatut leimaukset hylätään
 */
function joukkueenKilometrit(joukkue, lahtoaika, loppuaika) {
	//console.log(joukkue, "jou");
	let matka = 0;
	let lahto = false;
	let i = 0;
	let j = i+1;
	while (j<joukkue["rastit"].length) {
		if (joukkue["rastit"][i]["rasti"]["koodi"] == "MAALI" && lahto) {
			break;
		}		
		if (joukkue["rastit"][i]["rasti"]["koodi"] == "LAHTO" || lahto) {
		//console.log(joukkue["rastit"][i]["rasti"]);
			lahto = true;
			let lat2;
			let lon2;
			let lat1 = parseFloat(joukkue["rastit"][i]["rasti"]["lat"]);
			let lon1 = parseFloat(joukkue["rastit"][i]["rasti"]["lon"]);
			try {
				lat2 = parseFloat(joukkue["rastit"][j]["rasti"]["lat"]);
				lon2 = parseFloat(joukkue["rastit"][j]["rasti"]["lon"]);
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
				//console.log(lat1, lon1, lat2, lon2);
			let etaisyys = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2 );
			if (!isNaN(etaisyys)) {
				matka += etaisyys;
				//console.log(etaisyys);
			}
				//console.log(joukkue["rastit"][i]["rasti"]);
				//console.log(joukkue["rastit"][j]["rasti"]);
			i = j;
			j = i+1;
		}
		else {
		//console.log("else", joukkue["rastit"][i]);
		i++;
		j++;
		}		
	}
	//console.log(matka);
	return Math.round(matka);
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