/*
    Wstaw plik js do html z zadania-3 z modulem w ktorym:
    1. wybierz element ul
    2. podepnij pod niego zdarzenie klikniecia
    3. w procedurze wywoalnia zdarzenia wykonaj:
        console.log('THIS ', this)
        console.log('TARGET ', e.target);
    
    4. sprawdz dzialanie w konsoli
    5. jakies wnioski ?
*/

(function () {
	const ul = document.body.querySelector("ul[role]");
	ul.addEventListener("click", function (e) {
		concole.log("THIS", this);
		console.log("TARGET", e.target);
	}, false);
}());