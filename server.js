const fs = require('fs');
const path = require('path');

fs.readFile('./files/text.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
})
fs.writeFile(path.join(__dirname, 'files', 'text.txt'), '\nHello World!', (err) => {
    if (err) throw err;
    console.log("Write Complete");
    fs.appendFile(path.join(__dirname, 'files', 'text.txt'), '\nHello YOU!', (err) => {
        if (err) throw err;
        console.log("Append Complete");
        fs.rename(path.join(__dirname, 'files', 'text.txt'), path.join(__dirname, 'files', 'HelloAgain.txt'), (err) => {
            if (err) throw err;
            console.log("Rename Complete");
        })
    })
})