"use strict";
//@ts-check 


window.onload = function() {

	let pingu1 = document.createElement("img");
	pingu1.src = "https://appro.mit.jyu.fi/tiea2120/vt/vt4/penguin.png";
	pingu1.setAttribute("id", "pingu1");
	pingu1.setAttribute("alt", "pingu1");
	document.getElementById('body').appendChild(pingu1);
	
	let pingu2 = document.createElement("img");
	pingu2.src = "https://appro.mit.jyu.fi/tiea2120/vt/vt4/penguin.png";
	pingu2.setAttribute("id", "pingu2");
	pingu2.setAttribute("alt", "pingu2");
	document.getElementById('body').appendChild(pingu2);
	
};

