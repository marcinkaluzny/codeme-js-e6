/*
Napisz funkcję, która przyjmie jako parametr str łańcuch znaków.
Funkcja powinna zwrócić string stworzony ze znaków znajdujących się na nieparzystej pozycji.
Jeżeli podczas wywołania funkcji nie zostanie podany argument to domyślnie funkcja jako parametr str przyjmie łańcuch 'koparka'.
*/

function oddChars(str) {
    const string = str || "koparka";

    if (typeof string !== "string") {
        console.warn("Blad danych");
        return;
    }

    let outback = "";

    for (let i = 0, ln = string.length; i < ln; i += 1) {
        if (i % 2 !== 0) {
            outback += string[i];
        }
    }

    return outback;
}