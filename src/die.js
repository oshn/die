let Device = require('spb25-device');

let destruct = require('./destruct');


let urv = () => Math.random() || urv();


class Die extends Device {
    next (entries, size) {
        // Θ(1)
        let i = random(size);

        // super.next should automatically
        // throw if coin incoming
        return super.next(entries[i]);
    }

    /**
     * Initialize index
     * @param  {Set|Map} table
     * @return {Promise}
     */
    init (table) {
        if (String(table) == '[object Map]') // bad
            // Θ(n*log(n))
            table = destruct(table);

        let index = Array.from(table.keys());

        return super.init(index, index.length);
    }
}

/**
 * Simulate an n-sided die roll
 * @param  {Number} n
 * @return {Number}     side K from [0, n) with P=1/n
 */
function random (n) {
    let x = urv() * n;

    return Math.floor(x);
}


module.exports = Die;
