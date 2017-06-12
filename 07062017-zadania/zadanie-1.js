/*
  Wyznacz najmniejszą i największą liczbę znajdującą się w liście

  [40, 6, 91, 8, 1, 100, 4, 2]
  
  a) nie uzywaj petli ani metod Array
  b) uzyj metody Array 
 */

// a)
const arr = [40, 6, 91, 8, 1, 100, 4, 2];
Math.min.apply({}, arr);
Math.max.apply(Math, arr);

let outback;
arr.forEach(function (item) {
	if (undefined === outback) {
		outback = item;
		return;
	}

	if (item < outback) {
		outback = item;
	}
});

console.log(outback);