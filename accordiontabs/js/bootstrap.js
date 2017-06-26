(function () {

	window.addEventListener("load", function () {
		console.log('APP START');

		getResponse("/data/bbc-sport.json", function (data) {
			const section = document.getElementById("sport");

			section.innerHTML = data.articles.map(function (article) {
				return `<article><header role="tab">
				<h3>${article.title}</h3>
				</header>
				<div role="tabpanel" aria-hidden="true">
	    			<img src="${article.urlToImage}" width="150" alt="">
	    			${article.description}
	    			<br>
	    			<a href="${article.url}" title="${article.title}" target="_blank">more ...</a>
	    		</div></article>`;

	    		section.appendChild(articleTag);
			}).join("");

		});
	}, false);

	function getResponse(url, success, error) {
		const xhr = new XMLHttpRequest();

	 	xhr.open("GET", url, true);

		xhr.addEventListener("load", function (e) {
		 	success(JSON.parse(xhr.response));
		}, false);

		xhr.addEventListener("error", function (e) {
		 	if ("function" === typeof error) {
		 		error();
		 	}
		}, false);

		xhr.send();
	}
}());


/*
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM Ready");
}, false)*/