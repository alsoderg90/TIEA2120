"use strict";  // pidä tämä ensimmäisenä rivinä
//@ts-check 

console.log(data);

window.onload = function() {
	
	listaaJoukkueet(data, false);
	leimaustavat(data);
	sarjat(data);
	joukkueLomake();	
	let lomake = document.getElementById("lomake");
	lomake.muokkaa = false;
	lomake.addEventListener("submit", function(e) {
		e.preventDefault();
		lisaaJoukkue(data, e.target.muokkaa);
	});	
	let lomakeLT = document.getElementById("lomakeLT");
	lomakeLT.addEventListener("submit", function(e) {
		e.preventDefault();
		lisaaLeimaustapa(data);
	});
};

// luo lomakkeen joukkueen tietojen syöttyöä varten
function joukkueLomake() {

	let fieldset = document.getElementById("jasen");
	let p1 = document.createElement("p");
	let label1 = document.createElement("label");
	let input1 = document.createElement("input");
	label1.textContent = "Jasen 1";
	label1.appendChild(input1);
	p1.appendChild(label1);
	label1.appendChild(input1);
	let p2 = document.createElement("p");
	let label2 = document.createElement("label");
	let input2 = document.createElement("input");
	label2.textContent = "Jasen 2";
	label2.appendChild(input2);
	p2.appendChild(label2);
	label2.appendChild(input2);
	fieldset.appendChild(p1);
	fieldset.appendChild(p2);
	let inputit = fieldset.getElementsByTagName("input");	
	inputit[1].addEventListener("input", addNew);
	let nimi = document.getElementById("nimi");
	nimi.addEventListener("input", function(e) {
		nimi.setCustomValidity("");
		if (nimi.value.trim().length < 2) {
				nimi.setCustomValidity("Nimen täytyy olla vähintään 2 merkkiä pitkä");
		}
		for (let j of data["joukkueet"]) {	
			if (j["nimi"].toUpperCase().trim() === nimi.value.toUpperCase().trim()) {
				nimi.setCustomValidity("Ei kahta samannimistä joukkuetta");
			}
		}
	});	
}


function lisaaJoukkue(data, muokkaus) {
	
	let joukkue = {
		"nimi": "",
		"sarja": 0,
		"jasenet": [],
		"leimaustapa": []
	};
	let nimi = document.getElementById("nimi");
	joukkue["nimi"] = nimi.value;
	let sarjat = document.querySelectorAll('input[type="radio"]');
		for (let s of sarjat) {
			if (s.checked) {
				joukkue["sarja"] = parseInt(s.value);
			}
		}
	let leimaustavat = document.querySelectorAll('input[type="checkbox"]');
		for (let lt of leimaustavat) {
			if (lt.checked) {
				joukkue["leimaustapa"] = joukkue["leimaustapa"].concat(parseInt(lt.value));
			}
		}
	if (joukkue["leimaustapa"] == 0) {
		Array.from(leimaustavat).map(lt => {
			lt.addEventListener("input", function(e) {
			leimaustavat[0].setCustomValidity("Valitse vähintään 1 leimaustapa");
			});
		});
	}	
	let jasenet = document.getElementById("jasen");
	let inputit = jasenet.getElementsByTagName("input");
	for (let i=0; i<inputit.length; i++) {
		if (inputit[i].value.trim() !== "") {
			joukkue["jasenet"].unshift(inputit[i].value);
		}
		if (i > 1) {
			inputit[i].parentNode.remove();
		}
	}
	if (muokkaus) {
		joukkue["id"] = muokkaus;		
		data["joukkueet"] = data["joukkueet"].map(j => j["id"] === muokkaus ? joukkue : j);
	}	
	else {
		let maxId = Number.MIN_SAFE_INTEGER;	
		for (let j of data["joukkueet"]) {
			if (j["id"] >= parseInt(maxId)) {
			maxId = j["id"] ;
			}
		}
		joukkue["id"] = maxId + 1;		
		data["joukkueet"] = data["joukkueet"].concat(joukkue);
	}
	listaaJoukkueet(data, true);
	document.getElementById("lomake").reset();
	let lomake = document.getElementById("lomake");
	lomake.muokkaa = false;
}

function leimaustapa(lt) {
	for (let i = 0; i<data["leimaustapa"].length; i++){
		if (lt === i) {
			return data["leimaustapa"][i];
		}
	}
}

function muokkaaLomake(joukkue) {
	let leimaustavat = document.querySelectorAll('input[type="checkbox"]');
	for (let i = 0; i<leimaustavat.length; i++) {	
		leimaustavat[i].checked = false;
	}
	let lomake = document.getElementById("lomake");
	lomake.muokkaa = joukkue["id"];
	let nimi = document.getElementById("nimi");
	nimi.value = joukkue["nimi"].trim();
	let sarjat = document.querySelectorAll('input[type="radio"]');
		for (let s of sarjat) {
			if (joukkue["sarja"] == s.value) {
				s.setAttribute("checked", "checked");
			}
		}
	for (let lt of joukkue["leimaustapa"]) {
		let leimaus = leimaustapa(lt);
		for (let i = 0; i<leimaustavat.length; i++) {	
			if (leimaus === leimaustavat[i].id) {
				leimaustavat[i].checked = true;
			}
		}		
	}	
	let fdJasenet = document.getElementById("jasen");
	let inputit = Array.from(fdJasenet.querySelectorAll("p label input"));
	for (let i = 0; i < joukkue["jasenet"].length; i++) { // length-1
		if (i < inputit.length) {
			inputit[i].value = joukkue["jasenet"][i];
		}
		else if (i < joukkue["jasenet"].length) {
			let p = document.createElement("p");
			let label = document.createElement("label");
			label.textContent = "Jäsen " + i;
			let input = document.createElement("input");
			input.setAttribute("type", "text");
			input.addEventListener("input", addNew);
			input.value = joukkue["jasenet"][i]; // [i-1]
			inputit = inputit.concat(input);
			p.appendChild(label).appendChild(input);
			fdJasenet.appendChild(p);
		}
	}
	for (let i = 0; i < inputit.length; i++) {
		if (i >= joukkue["jasenet"].length) {
			inputit[i].parentNode.remove();
		}
	}
	inputit.slice(2);	
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
		strong.textContent = etsiSarja(j["sarja"], data);
		let aNimi = document.createElement("a");
		aNimi.setAttribute("href", "#lomake");
		let txtNimi = document.createTextNode(j.nimi + " ");
		aNimi.appendChild(txtNimi);	
		li_joukkue.appendChild(aNimi);
		aNimi.addEventListener("click", function(event) {
			muokkaaLomake(j);
			addNew();
			}, false);
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

function addNew(e) {
	let lomake = document.getElementById("jasen");
	let fieldset = document.getElementsByTagName("fieldset")[1];
	let inputit = fieldset.getElementsByTagName("input");
	let lisaa = document.getElementsByName("joukkue")[0];		
	
	let tyhja = false;  // oletuksena ei ole löydetty tyhjää
	let jasenet = [];
	// käydään läpi kaikki input-kentät viimeisestä ensimmäiseen
	// järjestys on oltava tämä, koska kenttiä mahdollisesti poistetaan
	// ja poistaminen sotkee dynaamisen nodeList-objektin indeksoinnin
	// ellei poisteta lopusta 
	for (let i=inputit.length-1 ; i>-1; i--) { // inputit näkyvät ulommasta funktiosta
		let input = inputit[i];

		// jos on tyhjä ja on jo aiemmin löydetty tyhjä niin poistetaan
		if ( input.value.trim() == "" && tyhja) { // ei kelpuuteta pelkkiä välilyöntejä
			inputit[i].parentNode.remove(); // parentNode on label, joka sisältää inputin
		}

		// onko tyhjä?
		if ( input.value.trim() == "") {
					tyhja = true;
		}
	}
			// jos ei ollut tyhjiä kenttiä joten lisätään yksi
	if ( !tyhja) {
		let p = document.createElement("p");
		let label = document.createElement("label");
		label.textContent = "Jäsen";
		let input = document.createElement("input");
		input.setAttribute("type", "text");
		input.addEventListener("input", addNew);
		p.appendChild(label).appendChild(input);
		fieldset.appendChild(p);
	}

	// tehdään kenttiin numerointi
	for (let i=0; i<inputit.length; i++) { // inputit näkyy ulommasta funktiosta
			let label = inputit[i].parentNode;
			label.firstChild.nodeValue = "Jäsen " + (i+1); // päivitetään labelin ekan lapsen eli tekstin sisältö
			if (inputit[i].value.trim() !== "") {
				jasenet = jasenet.concat(inputit[i].value);	
			}
	}
} 

function lisaaLeimaustapa(data) {
	let leimaustapa = document.getElementById("nimiLT");
	leimaustapa.addEventListener("input", function(e) {
		leimaustapa.setCustomValidity("");
		for (let j of data["leimaustapa"]) {
			if (j.toUpperCase().trim() === leimaustapa.value.toUpperCase().trim()) {
				leimaustapa.setCustomValidity("Ei kahta samannimistä leimaustapaa");
			}
		}
	});
	data["leimaustapa"] = data["leimaustapa"].concat(leimaustapa.value);
	let leimauksetBr = document.getElementById("leimaustavat").getElementsByTagName("br");
	let leimauksetP = document.getElementsByClassName("lt");
	for (var i = leimauksetBr.length - 1; i >= 0; --i) {
		leimauksetBr[i].remove();
		leimauksetP[i].remove();
	}
	leimaustavat(data);
}

function leimaustavat(data) {
	let leimaustavat = data["leimaustapa"];
	leimaustavat.sort((a,b) => a < b ? 1: -1 );
	let div = document.getElementById("leimaustavat");
	for (let [index, value] of leimaustavat.entries()) {
		div.appendChild(document.createElement("br"));
		let label = document.createElement("label");
		label.setAttribute("for", value);
		label.textContent = value + " ";
		let input = document.createElement("input");
		input.setAttribute("value", index);
		input.setAttribute("id", value);
		input.setAttribute("type","checkbox");
		let p = document.createElement("p");
		p.appendChild(label);
		p.appendChild(input);
		p.setAttribute("class", "lt");
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