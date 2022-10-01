import bodyParser from 'body-parser';
import express from 'express';
import initAndFill from './database/initAndFill';
import Logger from './config/logconfig';
import initPassportAndSessions from './config/passport.session.config';
import routerInit from './routes/router';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

initAndFill();



const whiteList = process.env.WHITELISTED_DOMAINS ? process.env.WHITELISTED_DOMAINS.split(',') : [];



/*
If you want to allow specific domains to access your API, you can use the following code:
const corsOptions: cors.CorsOptions = {
      origin: function (origin, callback) {
            Logger.info(origin + " is making rquest");
            if (whiteList.indexOf(origin) !== -1) {
                  callback(null, true);
            } else {
                  callback(new Error('Not allowed by CORS'));
            }
      },
      credentials: true,
      optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
*/

app.use(cors({
      origin(origin, callback){
            // Logger.info(origin + " is making rquest");
        return callback(null, true);
      },
      optionsSuccessStatus: 200,
      credentials: true
    }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 9010);

initPassportAndSessions(app);




app.get('/', (req, res) => {
      res.send('Hello World!');

});
routerInit(app);


app.listen(app.get('port'), () => {
      Logger.info(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
      Logger.info('  Press CTRL-C to stop\n');

});
