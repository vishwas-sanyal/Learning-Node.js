const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }));  //Built-in middleware
app.use(express.json());  //Built-in middleware for json
app.use(cookieParser());  //Middleware for cookies
app.use('/', express.static(path.join(__dirname, '/public')));
// app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));
app.use('/refresh', require('./routes/api/refresh'));
app.use('/logout', require('./routes/api/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

app.use(logger);  //Custom middleware
app.use(cors(corsOptions));  //Third party middleware

app.get('/hello.html', (req, res, next) => {
    console.log("Attempted to access hello.html")
    next()
}, (req, res) => {
    res.send("Hello");
});
// app.all('*', (req, res) => {
//     res.status(404)
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ "error": "404 Not Found!" });
//     } else {
//         res.type('txt').send("404 Not Found!");
//     }
// });

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
