import express from 'express'
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars'

import routes from './src/routes.js';
import authMiddleware from './src/middlewares/authMiddleware.js';

const app = express();
const PORT = 3000;

app.engine('hbs', engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', './src/views')


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(authMiddleware);



app.use(routes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);   
});