import express from 'express';
import config from './models/config.js';
import routes from './routes/routes.js';
import jwt from 'jsonwebtoken';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(express.static('public'))

//jwt middleware
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

routes(app);

app.get('/', (req, res) => {
    res.send("Welcome to my restful API");
});

app.listen(config.port, () => {
    console.log(`Server is running on ${config.url}`);
});