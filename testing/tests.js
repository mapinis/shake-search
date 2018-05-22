const Bop = require('bop');
const fs = require('fs');

const pattern = "him";

fs.readFile("M4M1.1.txt", (err, data) => {
    if(err) {
        console.log(err);
    } else {
        const indeces = Bop(pattern).parse(data);
        const lineBreaks = Bop("\n").parse(data);
        indeces.forEach(matchIndex => {
            const preBreakIndex = lineBreaks.findIndex(element => element >= matchIndex);
            console.log(data.toString().substring(lineBreaks[preBreakIndex - 1], lineBreaks[preBreakIndex]));
        });
    }
});


