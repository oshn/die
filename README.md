# Die

Loaded die simulator

### Example

~~~js
const Die = require('spb25-die');

let config = new Map(
        [ ['Exo'  , 30]
        , ['Hopar', 60]
        , ['Venus', 10]
        ]);

let die = new Die(config);

die.get().then(console.log); // more likely 'Hopar'
~~~


## Install

~~~sh
npm install spb25-die
~~~


### License

MIT License
