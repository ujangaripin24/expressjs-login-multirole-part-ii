import createError from 'http-errors';
import express from 'express';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import './config/database.js';
import db from './models/index.js';
import SequelizeStore from 'connect-session-sequelize';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.routes.js';
import authRouter from './routes/auth.routes.js';
import productRouter from './routes/product.routes.js';
import * as path from "node:path";
import session from 'express-session';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db: db.sequelize,
    tableName: 'Sessions',
    checkExpirationInterval: 15 * 60 * 100,
    expiration: 1000 * 60 * 60
})

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: {
        secure: 'auto',
        sameSite: 'lax',
        httpOnly: true
    }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/web/', usersRouter);
app.use('/api/v1/web/', authRouter);
app.use('/api/v1/web/', productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
