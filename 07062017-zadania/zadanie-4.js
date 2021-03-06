/*
    do html z zadania-3 wstaw kolejny plik js
    z modulem w ktorym:

    do kazdego elementu li przypnij zdarzenie klikniecia
    w ktorym procedura wywolania zdarzenia wykona:
    1. zmieni kolor tla elementu li na #999999
    2. ustawi atrybut aria-selected="true"
*/

(function () {
	const liList = document.body.querySelectorAll("ul[role] > li");

	[].forEach.call(liList, function (li) {
		li.addEventListener("click", function (e) {
			//e.stopPropagation();
			li.style.backgroundColor = "#999";
			li.setAttribute("aria-selected", true);
		}, false);
	});
}());