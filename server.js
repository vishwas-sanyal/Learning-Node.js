const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }));  //Built-in middleware
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

app.use(logger);  //Custom middleware

const whitelist = ['http://localhost:3500/', 'https://www.mysite.com', 'https://website.com'];  //Third party middleware
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/hello.html', (req, res, next) => {
    console.log("Attempted to access hello.html")
    next()
}, (req, res) => {
    res.send("Hello");
});
// app.use('/*', (req, res) => {
//     res.status(404)
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ error: "404 Not Found!" })
//     } else {
//         res.type('txt').send("404 Not Found!")
//     }
// });

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
