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


joukkue = {
  "nimi": "Dynamic Duo ",
  "jasenet": [
    "Karhusolan Rentukka",
    "Kutajoen Tiukunen"
  ],
  "id": 5389650071912448,
  "rastit": [
    {
      "aika": "2017-03-18 12:00:00",
      "rasti": {
        "lon": "25.666688",
        "koodi": "LAHTO",
        "lat": "62.130280"
      }
    },
    {
      "aika": "2017-03-18 12:12:46",
      "rasti": {
        "lon": "25.650436",
        "koodi": "98",
        "lat": "62.131207"
      }
    },
    {
      "aika": "2017-03-18 12:33:27",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:34:00",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:34:25",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:34:44",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:35:59",
      "rasti": {
        "lon": "25.628228",
        "koodi": "37",
        "lat": "62.119060"
      }
    },
    {
      "aika": "2017-03-18 12:41:35",
      "rasti": {
        "lon": "25.615203",
        "koodi": "69",
        "lat": "62.115047"
      }
    },
    {
      "aika": "2017-03-18 12:46:01",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:46:18",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:46:34",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:46:46",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:47:03",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:47:17",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:47:32",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:47:50",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:48:01",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:48:18",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:48:29",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:48:41",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:48:58",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:49:14",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:49:37",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:49:52",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:50:06",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 12:50:13",
      "rasti": {
        "lon": "25.613440",
        "koodi": "43",
        "lat": "62.107914"
      }
    },
    {
      "aika": "2017-03-18 12:58:02",
      "rasti": {
        "lon": "25.589347",
        "koodi": "54",
        "lat": "62.108717"
      }
    },
    {
      "aika": "2017-03-18 13:02:16",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:05:49",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:06:16",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:06:35",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:07:24",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:07:59",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:08:15",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:08:30",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:08:44",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:08:59",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:09:12",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:09:27",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:09:42",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:09:56",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:10:11",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:10:19",
      "rasti": {
        "lon": "25.569589",
        "koodi": "45",
        "lat": "62.115924"
      }
    },
    {
      "aika": "2017-03-18 13:19:59",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:20:08",
      "rasti": {
        "lon": "25.542413",
        "koodi": "66",
        "lat": "62.120776"
      }
    },
    {
      "aika": "2017-03-18 13:27:58",
      "rasti": {
        "lon": "25.531059",
        "koodi": "5D",
        "lat": "62.123662"
      }
    },
    {
      "aika": "2017-03-18 13:40:11",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:40:28",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:40:41",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:40:52",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:41:06",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:41:25",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 13:41:35",
      "rasti": {
        "lon": "25.523811",
        "koodi": "57",
        "lat": "62.135094"
      }
    },
    {
      "aika": "2017-03-18 13:48:17",
      "rasti": {
        "lon": "25.509358",
        "koodi": "6F",
        "lat": "62.141243"
      }
    },
    {
      "aika": "2017-03-18 13:56:18",
      "rasti": {
        "lon": "25.513792",
        "koodi": "38",
        "lat": "62.147825"
      }
    },
    {
      "aika": "2017-03-18 14:01:50",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:02:01",
      "rast": "0"
    },
    {
      "aika": "2017-03-18 14:02:11",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:02:22",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:02:32",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:02:45",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:02:59",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:03:10",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:03:35",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:04:02",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:04:13",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:04:24",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:04:37",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:04:56",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:05:10",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:05:21",
      "rasti": {
        "lon": "25.507110",
        "koodi": "46",
        "lat": "62.151460"
      }
    },
    {
      "aika": "2017-03-18 14:11:02",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:11:21",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:11:30",
      "rasti": {
        "lon": "25.519131",
        "koodi": "93",
        "lat": "62.156431"
      }
    },
    {
      "aika": "2017-03-18 14:22:10",
      "rasti": {
        "lon": "25.528730",
        "koodi": "74",
        "lat": "62.153364"
      }
    },
    {
      "aika": "2017-03-18 14:30:03",
      "rasti": {
        "lon": "25.540227",
        "koodi": "40",
        "lat": "62.153864"
      }
    },
    {
      "aika": "2017-03-18 14:37:00",
      "rasti": {
        "lon": "25.560594",
        "koodi": "33",
        "lat": "62.153435"
      }
    },
    {
      "aika": "2017-03-18 14:48:01",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:48:45",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 14:49:36",
      "rasti": {
        "lon": "25.531926",
        "koodi": "61",
        "lat": "62.147942"
      }
    },
    {
      "aika": "2017-03-18 14:57:53",
      "rasti": {
        "lon": "25.526039",
        "koodi": "88",
        "lat": "62.142258"
      }
    },
    {
      "aika": "2017-03-18 15:05:03",
      "rasti": {
        "lon": "25.535011",
        "koodi": "67",
        "lat": "62.139918"
      }
    },
    {
      "aika": "2017-03-18 15:13:49",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:14:10",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:14:26",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:14:41",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:15:02",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:15:20",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:15:43",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:16:19",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:16:42",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:17:01",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:17:19",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:17:38",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:17:49",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:18:00",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:18:14",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:18:50",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:19:04",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:19:19",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:19:45",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:20:01",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:20:12",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:20:44",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:21:46",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:22:09",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:22:29",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:22:42",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:23:01",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:23:24",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:23:51",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:24:16",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:24:37",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:25:10",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:25:38",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:26:09",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:26:43",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:27:09",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:27:24",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:27:39",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:27:55",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:28:14",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:28:33",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:28:55",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:29:17",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:29:31",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:29:49",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:30:11",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:30:35",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 15:30:48",
      "rasti": {
        "lon": "25.558017",
        "koodi": "51",
        "lat": "62.125561"
      }
    },
    {
      "aika": "2017-03-18 15:36:47",
      "rasti": {
        "lon": "25.573049",
        "koodi": "34",
        "lat": "62.122986"
      }
    },
    {
      "aika": "2017-03-18 15:44:29",
      "rasti": {
        "lon": "25.577610",
        "koodi": "95",
        "lat": "62.132964"
      }
    },
    {
      "aika": "2017-03-18 16:02:55",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 16:03:14",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 16:03:43",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 16:04:10",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 16:04:37",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 16:05:02",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 16:05:47",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 16:06:41",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 16:12:01",
      "rasti": {
        "lon": "25.597278",
        "koodi": "82",
        "lat": "62.127323"
      }
    },
    {
      "aika": "2017-03-18 16:27:11",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 16:27:28",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 16:27:49",
      "rasti": {
        "lon": "25.605762",
        "koodi": "70",
        "lat": "62.134681"
      }
    },
    {
      "aika": "2017-03-18 17:46:52",
      "rasti": {
        "lon": "25.674748",
        "koodi": "5F",
        "lat": "62.127514"
      }
    },
    {
      "aika": "2017-03-18 17:56:49",
      "rasti": {
        "lon": "25.678314",
        "koodi": "49",
        "lat": "62.121247"
      }
    },
    {
      "aika": "2017-03-18 18:08:44",
      "rasti": {
        "lon": "25.694911",
        "koodi": "75",
        "lat": "62.117266"
      }
    },
    {
      "aika": "2017-03-18 18:33:20",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 18:35:14",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 18:36:20",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 18:37:46",
      "rasti": {
        "lon": "25.716227",
        "koodi": "71",
        "lat": "62.093545"
      }
    },
    {
      "aika": "2017-03-18 18:44:32",
      "rasti": {
        "lon": "25.729848",
        "koodi": "99",
        "lat": "62.088183"
      }
    },
    {
      "aika": "2017-03-18 18:53:11",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 18:53:31",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 18:53:48",
      "rasti": "0"
    },
    {
      "aika": "2017-03-18 18:53:50",
      "rasti": {
        "lon": "25.728135",
        "koodi": "80",
        "lat": "62.100413"
      }
    },
    {
      "aika": "2017-03-18 19:03:29",
      "rasti": {
        "lon": "25.728800",
        "koodi": "89",
        "lat": "62.109962"
      }
    },
    {
      "aika": "2017-03-18 19:08:46",
      "rasti": {
        "lon": "25.743788",
        "koodi": "65",
        "lat": "62.115241"
      }
    },
    {
      "aika": "2017-03-18 19:16:37",
      "rasti": {
        "lon": "25.750133",
        "koodi": "7B",
        "lat": "62.126639"
      }
    },
    {
      "aika": "2017-03-18 19:22:52",
      "rasti": {
        "lon": "25.737019",
        "koodi": "31",
        "lat": "62.133029"
      }
    },
    {
      "aika": "2017-03-18 19:40:01",
      "rasti": {
        "lon": "25.682473",
        "koodi": "7A",
        "lat": "62.134123"
      }
    },
    {
      "aika": "2017-03-18 19:49:45",
      "rasti": {
        "lon": "25.669574",
        "koodi": "MAALI",
        "lat": "62.131769"
      }
    }
  ],
  "leimaustapa": [
    0,
    1,
    2
  ],
  "sarja": {
    "nimi": "10h",
    "kesto": 8,
    "loppuaika": null,
    "alkuaika": null
  }
};

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
		"nimi" : j["nimi"],
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
		"nimi" : j["nimi"],
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
		try {
			if (joukkue["rastit"][i]["rasti"]["koodi"] == "MAALI" && lahto) {
				break;
			}		
			if (joukkue["rastit"][i]["rasti"]["koodi"] == "LAHTO" || lahto) {
			//console.log(joukkue["rastit"][i]["rasti"]);
				lahto = true;
				let lat1 = parseFloat(joukkue["rastit"][i]["rasti"]["lat"]);
				let lon1 = parseFloat(joukkue["rastit"][i]["rasti"]["lon"]);
				let lat2 = parseFloat(joukkue["rastit"][j]["rasti"]["lat"]);
				let lon2 = parseFloat(joukkue["rastit"][j]["rasti"]["lon"]);
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
		catch(e) {
			//console.log(e);
			i++;
			j++;
			continue;
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