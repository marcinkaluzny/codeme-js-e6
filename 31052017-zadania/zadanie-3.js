/*
Napisz funkcję dwieGwaizdki, która przyjmuje dwa parametry a i b. Jeżeli wywołam funkcję z większą ilością parametrów np. dwieGwazdki('dwa', 'plus', 'jeden') to funkcja ta powinna zwrocic
lancuch 'dwa plus jeden'. W przypadku kiedy funkcja zostanie wywołana z mniej niz 2 parametry (np. dwieGwaizdki('dwa') lub dwieGwiazdki()) 
to funkcja powinna zwrocic tekst: 'Błąd danych'. Jezeli wywolamy funkcje z dwoma parametrami ('Adam', 'Mickiewicz') to funkcja powinna zwrocic, 'Łańcuch: "Adam Mickiewicz" zawiera 15 znaków.'
*/

function twoStars(a, b) {
    const args = arguments;
    const argsLength = args.length;
    const fnLength = twoStars.length;

    if (argsLength < fnLength) {
        return "Blad danych";
    }

    let outback = "";

    if (fnLength < argsLength) {
        for (let i = 0; i < argsLength; i += 1) {
            outback += args[i];

            if (i + 1 < argsLength) {
                outback += " ";
            }
        }

        return outback;
    }

    outback = a + " " + b;
    return 'Łańcuch "' + outback + '" zawiera ' + outback.length + ' znaków.';
}