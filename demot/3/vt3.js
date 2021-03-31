"use strict";  // pidä tämä ensimmäisenä rivinä
//@ts-check 

console.log(data);

window.onload = function() {
	listaaJoukkueet(data, false);
	leimaustavat(data);
	sarjat(data);
	
	let lomake = document.getElementById("lomake");
	lomake.addEventListener("submit", function(e) {
		e.preventDefault();
		lisaaJoukkue(data);
	});
};

function lisaaJoukkue(data) {
	
	let joukkue = {
		"nimi": "",
		"sarja": 0,
		"jasenet": [],
		"leimaustapa": [0],
	};
	let nimi = document.getElementById("nimi").value.trim();
	let maxId = Number.MIN_SAFE_INTEGER;
	for (let j of data["joukkueet"]) {
		if (j["nimi"].toUpperCase().trim() === nimi.toUpperCase().trim()) {
			console.log("Nimi löytyy");
		}
		if (j["id"] >= parseInt(maxId)) {
		maxId = j["id"] ;
		}
	}
	joukkue["nimi"] = nimi;
	joukkue["id"] = maxId + 1;
	let sarjat = document.querySelectorAll('input[type="radio"]');
		for (let s of sarjat) {
			if (s.checked) {
				joukkue["sarja"] = parseInt(s.value);
			}
		}
	let jasenet = document.getElementById("jasen");
	let inputit = jasenet.getElementsByTagName("input");
	for (let x=0; x<inputit.length; x++) {
		joukkue["jasenet"] = joukkue["jasenet"].concat(inputit[x].value);
	}
	data["joukkueet"] = data["joukkueet"].concat(joukkue);
	console.log(joukkue);
	listaaJoukkueet(data, true);
	document.getElementById("lomake").reset();
}

function listaaJoukkueet(data, paivitys) {
		
	let div = document.getElementById("joukkuelista");
	let lista = document.createElement("ul");
	div.appendChild(lista);
	
	if (paivitys) {
		div.removeChild(div.childNodes[0]);
	}
	
	let joukkueet = data["joukkueet"];
	joukkueet.sort((a,b) => a["nimi"].toUpperCase() > b["nimi"].toUpperCase() ? 1 : -1); 
	for (let j of joukkueet) {
		let li_joukkue = document.createElement("li");
		let strong = document.createElement("strong");
		li_joukkue.textContent=j["nimi"].trim() + " ";
		strong.textContent = etsiSarja(j["sarja"], data);
		li_joukkue.appendChild(strong);
		lista.appendChild(li_joukkue);
		
		let jasenet = j["jasenet"];
		jasenet.sort((a,b) => a.toUpperCase() > b.toUpperCase() ? 1 : -1);
		let ul = document.createElement("ul");
		li_joukkue.appendChild(ul);
		for (let jasen of jasenet) {
			let li = document.createElement("li");
			li.textContent=jasen;
			ul.appendChild(li);
		}
	}
}

function leimaustavat(data) {
	let div = document.getElementById("leimaustavat");
	for (let lt of data["leimaustapa"]) {
		let label = document.createElement("label");
		label.setAttribute("for", lt);
		label.textContent = lt + " ";
		let input = document.createElement("input");
		input.setAttribute("value", lt);
		input.setAttribute("id", lt);
		input.setAttribute("type","checkbox");
		label.appendChild(input);
		div.appendChild(label);
	}
}

function sarjat(data) {
	let sarjat = data["sarjat"];
	sarjat.sort((a,b) => a["nimi"].toUpperCase() > b["nimi"].toUpperCase() ? 1 : -1);
	let div = document.getElementById("sarjat");
	let checked = false;
	for (let s of sarjat) {
		let label = document.createElement("label");
		label.setAttribute("for", s["nimi"]);
		label.textContent=s["nimi"];
		let input = document.createElement("input");
		input.setAttribute("name", s["nimi"]);
		input.setAttribute("value", s["id"]);
		input.setAttribute("id", s["nimi"]);
		input.setAttribute("type", "radio");
		if (!checked) {
			input.setAttribute("checked", "checked");
			checked = !checked;
		}
		label.appendChild(input);
		div.appendChild(label);
	}
}

function etsiSarja(id, data) {
	for (let s of data["sarjat"]) {
		if (s["id"] === id) {
			return  s["nimi"];
		}
	}
}


/*
function luoLomake() {

	let body = document.getElementsByTagName("body")[0];
	let div = document.createElement("div");
	let lomake = document.createElement("form");
	let fieldset_joukkue = document.createElement("fieldset");
	fieldset_joukkue.appendChild(document.createElement("legend")).textContent = "Joukkueen tiedot";
	lomake.appendChild(fieldset_joukkue);
	div.appendChild(lomake);
	body.appendChild(div);
	
	let labelNimi = document.createElement("label");
	labelNimi.textContent = "Nimi";
	let inputNimi = document.createElement("input);
	labelNimi.appendChild(inputNimi);
}
*/