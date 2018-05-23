const fs = require('fs');
const readline = require('readline');

const pattern = "him";

const lineReader = readline.createInterface(fs.createReadStream("M4M1.1.txt"));
lineReader.on("line", line => {
    if(line.includes(pattern)){
        console.log(line);
    }
});


