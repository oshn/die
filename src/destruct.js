let Coin = require('spb25-coin');

/**
 * Get min/max/etc. element
 *
 * @param  {Function} fn comparator
 * @return {Number}      index of element
 */
let indexOf = fn => arr => arr.reduce((m, a, i) => {
        return !arr[m] || a && fn(a, arr[m]) ? i : m;
    }, 0);

let min = indexOf((a, b) => a < b),
    max = indexOf((a, b) => a > b);

let sum = arr => arr.reduce((s, a) => s + a);

/**
 * Convert probability table to uniform with coins
 * @param  {Map} table
 * @return {Set}
 */
module.exports = table => {
    let ratio = Array.from(table.values()),
        entries = Array.from(table.keys());

   // collection for values and aliased coins
    let index = new Set();

    // size of average
    let mean = sum(ratio) / ratio.length,
        load, delta;

    let i, j;

    while (load = ratio[i = min(ratio)]) {
        let entry;

        delta = mean - load;

        // case exactly full
        if (!delta)
            entry = entries[i];
        // case underfull
        else {
            // get corresponding overfull
            j = max(ratio);
            // make a coin with it's alias
            let index = new Map(
                    [ [ entries[i], load ]
                    , [ entries[j], delta ]
                    ]);

            entry = new Coin(index);

            ratio[j] -= delta;
        }

        ratio[i] = null;

        index.add(entry);
    }

    return index;
}
