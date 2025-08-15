const express = require('express');
const app = express();
const path = require('path');
const logger = require('./middleware/logEvents');
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }));  //Built-in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use(logger);

app.get('^/$|/index.html', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/new-page.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});
// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });
app.get('/hello.html', (req, res, next) => {
    console.log("Attempted to access hello.html")
    next()
}, (req, res) => {
    res.send("Hello");
});
// Chaining route handler
const one = (req, res, next) => {
    console.log("One");
    next()
}
const two = (req, res, next) => {
    console.log("two");
    next()
}
const three = (req, res) => {
    console.log("three");
    res.send("Finished");
}
app.get("/chain.html", [one, two, three]);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
