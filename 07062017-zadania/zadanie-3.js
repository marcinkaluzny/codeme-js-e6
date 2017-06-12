/*
    Mamy zadaną liste w html

    <ul role="tablist">
        <li>tab 1</li>
        <li>tab 2</li>
        <li>tab 3</li>
        <li>tab 4</li>
    <ul>

    1. stworz plik html z listą
    2. osadz plik javascript w pliku HTML
    3. napisz modul w ktorym:
        a) pobierz tag ul za pomocą selektora atrybutu role
        b) ustaw css class elementowi ul o nazwie "tablist"
        c) wybierz wszystkie elementy li z elementu ul
        d) za pomoca forEach zaporzyczonego z Array ustaw kazdemu 
           z elementow li wybranych w punkcie c) atrybut role="tab"
           oraz id odpowiednio pierwszy id="tab-1" ... id="tab-4"
 */

 (function () {
    const ul = document.body.querySelector("ul[role]");

    ul.classList.add("tablist");

    // 1
    const liList = ul.querySelectorAll("li");
    // 2
    const liList2 = ul.getElementsByTagName("li");
    // 3
    const liList3 = ul.children;

    [].forEach.call(liList, function (item, index) {
        item.setAttribute("role", "tab");
        item.id = "tab-" + (index + 1);
    });

 }());