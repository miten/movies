//  Global variables declared for enter and escape keys.
var url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe';
var index = 0;
var movies = [];
var stars = 5;
var xhr = new XMLHttpRequest();
// we defined the xhr

xhr.onreadystatechange = function () {
    if (this.readyState != 4) return;

    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        movies = data.results;
    }


	movies.forEach(function(element) {
  		var newDiv = document.getElementById("dots");
		  // et lui donne un peu de contenu
		var div = document.createElement('div');

		div.setAttribute('class', 'dot');
		  // ajoute le nœud texte au nouveau div créé
		newDiv.appendChild(div);
	});

	setMovie();
	
};

xhr.open('GET', url, true);
xhr.send();



function prev() {
	index = index - 1;
	if (index < 0) {
		index = movies.length - 1
	}
	setMovie();
}


function next() {
	index = index + 1;
	if (index > movies.length - 1) {
		index = 0;
	}
	setMovie();
}



function setMovie() {
	showIndex();
	let movie = movies[index];
	star(movie.vote_average);
	document.getElementsByTagName('p')[0].innerHTML = movie.overview.substring(0, 350) + ' ...';
	document.getElementsByTagName('h3')[0].innerHTML = movie.title;
	document.getElementById("poster").src='https://image.tmdb.org/t/p/w500' + movie.poster_path;

}


function star(rating) {

		let xrating = Math.round(rating / 2)
		var parentDiv = document.getElementById("stars");
		parentDiv.innerHTML = '';
		for (let i = 1; i <= stars; i++) {
		  // et lui donne un peu de contenu
		var div = document.createElement('div');
		  if (i <= xrating) {
			div.setAttribute('class', 'fa fa-star checked');
		  } else {
			div.setAttribute('class', 'fa fa-star');
		  }
		  // ajoute le nœud texte au nouveau div créé
		parentDiv.appendChild(div);
	}	
}




function showIndex() {
	var dots = document.getElementById('dots');
	var children = dots.childNodes;
	  for (var i = 0; i < children.length; i++) {
		children[i].className = "dot";
	  }
	children[index].className += " selected";;
}




