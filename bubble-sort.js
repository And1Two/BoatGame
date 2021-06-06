/**
 * Bubble sorting for the Boat Game algo...
 * 
 * Author: Andi Stancato
 * Created Date: 6/6/2021
 */
(function(win) {
    "use strict";

    /**
     * 
     */
    let passangers,
        combis,
        trips = [];

    /**
     * 
     */
    function sort() {
        // Get the first, also the highest, possible combination
        let p = combis.filter(v => !v.consumed)[0].passangers;

        // push the first element into the boat, and mark consumed combinations
        // push elements persons to right
        for(var i = 0; i < p.length; i++) {
            // find all unused combinations which have a passanger that is into the boat
            let c = combis.filter(v => v.passangers.includes(p[i]) && !v.consumed);

            // Mark combination as consumed
            for(var j = 0; j < c.length; j++) {
                c[j].consumed = true;
            }

            // Swap shore
            passangers[p[i]].left = false;
        }

        // store the trip to the right shore
        trips.push(p);

        // Paddle back an get the next ones
        if(passangers.filter(v => v.left).length > 0) {
            // Find the lightest Passanger from the right shore, he need to paddle back to the left shore
            let a = passangers.filter(v => !v.left).sort((a, b) => {
                return a.weight > b.weight ? 1 : -1;
            })[0];

            // Find the Index of the lightest right shore passanger
            let index = passangers.indexOf(a)

            // Swap shore
            passangers[index].left = true;

            // Find combination
            let c = combis.filter(v => v.consumed && v.passangers.includes(index) );

            //
            loop : for(var i = 0; i < c.length; i++) {
                for(var j = 0; j < c[i].passangers.length; j++) {
                    if(!passangers[c[i].passangers[j]].left) {
                        continue loop;
                    }
                }

                c[i].consumed = false;
            }

            // Store the trip back to the left shore
            trips.push([index]);

            //
            sort();
        }
    }

    /**
     * 
     */
    win.sortList = function(data, weight) {
        // Reset storage
        passangers = data.map(v => { v.left = true; return v; });
        combis = [];
        trips = [];

        // We need to create 2^N - N combinations
        let c = (1 << data.length);

        // Create all combinations less or equal sum of weight, 
        // we wont care about dublicates
        for(var i = 0; i < c; i++) {
            let w = 0;
            let p = [];

            for(var j = 0; j < data.length; j++) {
                if ((i & (1 << j))){
                    w += passangers[j].weight;

                    p.push(j);
                }
            }

            if(p.length && w <= weight) combis.push({ 
                passangers: p, 
                weight: w, 
                consumed: false
            });
        }

        // Sort combinations weight and then persons length from high to low,
        // we wont care about to check for equal occurences
        combis = combis.sort((a, b) => {
            return a.weight > b.weight ? 1 : -1;
        }).sort((a, b) => {
            return a.passangers.length < b.passangers.length ? 1 : -1;
        });

        // Beginn
        sort();

        //
        return trips;
    };

})(window);