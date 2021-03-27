var tentativas = 0, acertos = 0, jogoacabou = false, clicadas = 0, match = -1, cartaClicada = "", imagensobj = Array(), agindo = false;
var imagens = Array( { match: 1, path: "_imgs/Bandit.jpg" }, { match: 1, path: "_imgs/Bandit.png" }, { match: 2, path: "_imgs/Caveira.jpg" }, { match: 2, path: "_imgs/Caveira.png" }, { match: 3, path: "_imgs/Hibana.jpg" } , { match: 3, path: "_imgs/Hibana.png" }, { match: 4, path: "_imgs/Rook.jpg" }, { match: 4, path: "_imgs/Rook.png" }, { match: 5, path: "_imgs/Thermite.png" }, { match: 5, path: "_imgs/Thermite_2.png" }, { match: 6, path: "_imgs/Valkyrie.jpg" }, { match: 6, path: "_imgs/Valkyrie.png" });

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  // And swap it with the current element.
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
}

document.addEventListener("DOMContentLoaded", function(event) {
    
	//imagens.sort(function(){ return 0.5 - Math.random()});
	shuffle(imagens);
    for(var i=0; i< imagens.length; i++) {
    	var obj = {img: i+1 , caminho: imagens[i].path, match: imagens[i].match};
    	imagensobj.push(obj);
    }
});

function mostrarCarta  (id) {
	agindo = true;
	var img = document.getElementById(id);
	var imgart = document.getElementById(id + "art");
	img.style.opacity = "0";
	imgart.style.transform = "rotateY(180deg)";
	setTimeout(function () {
		img.src = imgpath(id);
		img.style.transform = "rotateY(180deg)";
		img.style.width = "23em";
		if(imgmatch(id) == 6) {
			img.style.margin = "0em 0em 0em -8em";
		}
		else if(imgmatch(id) == 1) {
			img.style.margin = "0em 0em 0em -7.5em";
		}
		else if(imgmatch(id) == 4) {
			img.style.margin = "0em 0em 0em -7em";
		}
		else if(imgmatch(id) == 3) {
			img.style.margin = "0em 0em 0em -6em";
		}
		else if(imgmatch(id) == 2) {
			img.style.margin = "0em 0em 0em -5.4em";
		}
		else {
			img.style.margin = "0em 0em 0em -6em";
		}
		img.style.height = "18em";
		img.style.opacity = "1";
		setTimeout(function () {
			agindo = false;
		}, 1500);
	}, 500);
}

function esconderCarta (id) {
	agindo = true;
	var img = document.getElementById(id);
	var imgart = document.getElementById(id + "art");
	img.style.opacity = "0";
	imgart.style.transform = "rotateY(0deg)";
	setTimeout(function () {
		img.src = "_imgs/cardbg.jpg";
		img.style.transform = "rotateY(0deg)";
		img.style.width = "11em";
		img.style.margin = "7.5em 0em 0em 0em";
		img.style.height = "auto";
		img.style.opacity = "1";
		setTimeout(function () {
			agindo = false;
		}, 1500);
	}, 500);

}
function pushImage (id) {
	if( clicadas < 2 && cartaClicada != id && !agindo) {
		mostrarCarta(id);
		if(clicadas == 0) {
			match = imgmatch(id);
			cartaClicada = id;
			clicadas++;
		}
		else if(clicadas == 1) {
			if(imgmatch(id) == match) {
				tentativas++;
				document.getElementById("Tentativas").innerHTML = "Tentativas: " + tentativas;
				acertos++;
				document.getElementById("Acertos").innerHTML = "Acertos: " + acertos;
				match = -1;
				clicadas = 0;
				console.log("Deu match");
				if(acertos == 6) {
					var jogarnovamente = confirm("Jogo feito por Lucas Borges\nSua pontuação foi: " + String(acertos*20 - tentativas*10));
					if(jogarnovamente) {
						reiniciarJogo ();
					}
					else {
						alert("Obrigado por jogar!");
					}
				}
			}
			else {
				//Vira cartas para baixo
				setTimeout(function () {
					tentativas++;
					document.getElementById("Tentativas").innerHTML = "Tentativas: " + tentativas;
					esconderCarta(id);
					esconderCarta(cartaClicada);
					match = -1;
					clicadas = 0;
					cartaClicada = "";
				}, 2000);
				console.log("n Deu match");
			}
		}
	}
}

function imgpath (id) {
	var obj = imagensobj.find(function (x) {
		if(id.length == 6) {
			if (x.img == (String(id[4]) + String(id[5])) ) {
				return true;
			}
		}
		else {
			if (x.img == id[4]) {
				return true;
			}
		}
		
	});
	console.log(obj);
	return obj.caminho;
}

function imgmatch (id) {
	var obj = imagensobj.find(function (x) {
		if(id.length == 6) {
			if (x.img == (String(id[4]) + String(id[5])) ) {
				return true;
			}
		}
		else {
			if (x.img == id[4]) {
				return true;
			}
		}
	});
	return obj.match;
}

function reiniciarJogo () {
	var tentativas = 0, acertos = 0, jogoacabou = false, clicadas = 0, match = -1, cartaClicada = "", imagensobj = Array();
	shuffle(imagens);
    for(var i=0; i< imagens.length; i++) {
    	var obj = {img: i+1 , caminho: imagens[i].path, match: imagens[i].match};
    	imagensobj.push(obj);
    }
}