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
		"leimaustapa": []
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
	let leimaustavat = document.querySelectorAll('input[type="checkbox"]');
		for (let lt of leimaustavat) {
			if (lt.checked) {
				joukkue["leimaustapa"] = joukkue["leimaustapa"].concat(lt.value);
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
	let leimaustavat = data["leimaustapa"];
	leimaustavat.sort((a,b) => a < b ? 1: -1 );
	let div = document.getElementById("leimaustavat");
	for (let lt of leimaustavat) {
		div.appendChild(document.createElement("br"));
		let label = document.createElement("label");
		label.setAttribute("for", lt);
		label.textContent = lt + " ";
		let input = document.createElement("input");
		input.setAttribute("value", lt);
		input.setAttribute("id", lt);
		input.setAttribute("type","checkbox");
		let p = document.createElement("p");
		p.appendChild(label);
		p.appendChild(input);
		div.insertAdjacentElement("afterend", p);
	}
}

function sarjat(data) {
	let sarjat = data["sarjat"];
	sarjat.sort((a,b) => a["nimi"].toUpperCase() < b["nimi"].toUpperCase() ? 1 : -1);
	let div = document.getElementById("sarjat");
	let checked = false;
	for (let s of sarjat) {
		div.appendChild(document.createElement("br"));
		let label = document.createElement("label");
		label.setAttribute("for", s["nimi"]);
		label.textContent=s["nimi"];
		let input = document.createElement("input");
		input.setAttribute("name", "radio");
		input.setAttribute("value", s["id"]);
		input.setAttribute("id", s["nimi"]);
		input.setAttribute("type", "radio");
		if (!checked) {
			input.setAttribute("checked", "checked");
			checked = !checked;
		}
		let p = document.createElement("p");
		p.appendChild(label);
		p.appendChild(input);
		div.insertAdjacentElement("afterend", p);
	}
}

function etsiSarja(id, data) {
	for (let s of data["sarjat"]) {
		if (s["id"] === id) {
			return  s["nimi"];
		}
	}
}