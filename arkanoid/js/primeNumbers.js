function isPrime(number) {
    if (number < 2) {
        return false;
    }

    if (2 < number && number % 2 === 0) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(number); i += 1) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}


function printPrimeNumbers() {
    const args = arguments;

    if (typeof args[0] === "number" && typeof args[1] === "number") {
        const outback = [];
        for (let i = args[0]; i <= args[1]; i += 1) {
            if (isPrime(i)) {
                outback.push(i);
            }
        }

        return outback;
    }

    if (Array.isArray(args[0])) {
        return args[0].filter(isPrime);
    }
}