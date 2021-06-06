(function(doc, undef) {
    "use strict";

    let numItems = 0;
    let maxWeight = 100;
    const data = [
        {
            name: "Passanger 1",
            weight: 50
        },
        {
            name: "Passanger 2",
            weight: 100
        },
        {
            name: "Passanger 3",
            weight: 50
        },
        {
            name: "Passanger 4",
            weight: 30
        },
        {
            name: "Passanger 5",
            weight: 12
        },
        {
            name: "Passanger 6",
            weight: 40
        }
    ]

    /**
     * 
     */
    function createEntry(e, i, n, w) {
        let dd = doc.createElement("dd");
        let f1 = doc.createElement("input");
        let f2 = f1.cloneNode(true);

        f1.id = "name-" + i;
        f1.type = "text";
        f1.placeholder = "Name";
        f1.value = n;

        f2.id = "weight-" + i;
        f2.type = "number";
        f2.min = "1";
        f2.max = maxWeight;
        f2.step = "0.5";
        f2.placeholder = "Weight";
        f2.value = w;

        dd.appendChild(f1);
        dd.appendChild(f2);
        
        numItems++;

        e.insertBefore(dd, e.lastElementChild);
    }

    /**
     * 
     */
    function getEntry(i) {
        let n = doc.getElementById("name-" + i).value;
        let w = Number(doc.getElementById("weight-" + i).value);

        if(n != "" && w > 0 && w <= maxWeight) {
            return {
                name: n,
                weight: w
            };
        }

        return undef;
    } 

    /**
     * 
     */
    function sort() {
        let d = [];

        for(var i = 0; i < numItems; i++) {
            let e = getEntry(i);

            if(e) d.push(e);
        }

        // bubble-sort.js
        let trips = sortList(d, maxWeight);
        let e = doc.querySelector("ol");

        // Clear list
        e.innerHTML = "";

        //
        for(var i = 0; i < trips.length; i++) {
            let l = doc.createElement("li");

            l.innerHTML = trips[i].map(v => "<div>" + d[v].name + " -> " + d[v].weight + "Kg</div>").join("");

            e.appendChild(l);
        }
    }

    /**
     * 
     */
    function setup() {
        let e = doc.querySelector("dl");

        for(var i = 0; i < data.length; i++) {
            createEntry(e, i, data[i].name, data[i].weight);
        }

        let b = e.querySelectorAll("button");

        b[0].onclick = sort;
        b[1].onclick = () => {
            createEntry(e, e.querySelectorAll("dd").length - 2, "", "");
        }

        let w = doc.getElementById("weight");

        w.value = maxWeight;
        w.oninput = () => {
            maxWeight = Number(w.value);
        };

        e.style.display = "block";
    }

    /**
     * 
     */
    if (/^(complete|interactive)$/.test(doc.readyState)) {
        setTimeout(setup, 1);
    } else {
        doc.addEventListener("DOMContentLoaded", setup);
    }

})(document, undefined);