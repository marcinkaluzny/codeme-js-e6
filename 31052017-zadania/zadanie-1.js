/*
Napisz funkcję, która przyjmie dwa parametry min i max typu number - liczby całkowite,
które będą określały przedział liczb całkowitych z obu stron zamknięty - czyli - liczby te należą do tego zbioru liczb.
Funkcja powinna wypisać (console.log) wszystkie liczby parzyste oraz zwrócić sumę wszystkich liczb z przedziału określonego przez parametr min i max.
*/

function sumOfNumbers(min, max) {
    const minInt = Math.floor(min);
    const maxInt = Math.ceil(max);

    let sum = 0;

    for (let i = minInt; i < maxInt; i += 1) {
        if (i % 2 === 0) {
            console.log(i);
        }

        sum += i;        
    }

    return sum;
}