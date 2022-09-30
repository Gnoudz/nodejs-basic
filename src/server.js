import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './routes/web'
import initAPIRoute from './routes/api'
import connection from './configs/connectDB';

require('dotenv').config()

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up views engine
configViewEngine(app);

// init web routes
initWebRoute(app);

// init apu routes
initAPIRoute(app);




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

