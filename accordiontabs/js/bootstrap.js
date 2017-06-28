(function () {

	window.addEventListener("load", function () {
		console.log('APP START');

		getResponse("/data/bbc-sport.json", articles("sport"));

		getResponse("/data/reddit-r-all.json", articles("news"));
		
		addArticle("post-form");
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

	function articles(elementID) {
		const section = document.getElementById(elementID);

		return function (data) {
			section.innerHTML = data.articles.map(
				function (article, index) {
					const uid = `${elementID}-${index}`;
					return `<article>
					<header role="tab" aria-controls="${uid}" tabindex="-1">
					<h3>${article.title}</h3>
					</header>
					<div id="${uid}" role="tabpanel" aria-hidden="true">
		    			<img src="${article.urlToImage}" width="150" alt="">
		    			${article.description}
		    			<br>
		    			<a href="${article.url}" title="${article.title}" target="_blank">more ...</a>
		    		</div></article>`;
				}
			).join("");

			new TabList(section);
		};
	}

	function post(url, data, success, error) {
		const xhr = new XMLHttpRequest();

	 	xhr.open("POST", url, true);

		xhr.addEventListener("load", function (e) {
		 	success(JSON.parse(xhr.response));
		}, false);

		xhr.addEventListener("error", function (e) {
		 	if ("function" === typeof error) {
		 		error();
		 	}
		}, false);

		xhr.send(data);
	}

	function addArticle(formId) {
		const form = document.getElementById(formId);

		const button = form.elements.send;// form.querySelector("button[name=send]");

		const data = new FormData(form);
		data.append("pole1", "dhgfhjdjhfghs");
		button.addEventListener("click", function (e) {
			post("/data/reddit-r-all.json", data);
		}, false);
	}
}());


/*
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM Ready");
}, false)*/