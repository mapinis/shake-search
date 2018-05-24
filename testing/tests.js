const fs = require('fs');
const htmlparser = require('htmlparser');

const pattern = "him";

const parser = new htmlparser.Parser(new htmlparser.DefaultHandler((error, dom) => {
    if (error) {
        console.log(error);
    } else {
        dom.forEach(line => {
            if (line.children[0].raw.includes(pattern)) {
                console.log(line.children[0].raw);
            }
        });
    }
}));

fs.readFile('M4MFull.out.txt', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        parser.parseComplete(data);
    }
});