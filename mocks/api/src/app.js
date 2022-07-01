import express from 'express'
import cors from 'cors'
import { urlencoded, json } from 'body-parser'

// routes import
import sharedRouter from './shared'
import financeapiRouter from './financeapi'
import loqateRouter from './loqate'
import reserveapiRouter from './reserveapi'
import myaccountRouter from './myaccount'
import vehiclesRouter from './vehicles'
import financeRouter from './finance'
import mybuyacarRouter from './mybuyacar'

const app = express();

app.disable('x-powered-by');

// MIDDLEWARE
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(handleError);

// ROUTES
// test if it works
app.get('/', (req, res) => res.send('HEY!'));
app.use('/', sharedRouter);
app.use('/financeapi', financeapiRouter);
app.use('/finance', financeRouter);
app.use('/loqate', loqateRouter);
app.use('/reserveapi', reserveapiRouter);
app.use('/myaccount', myaccountRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/mybuyacar', mybuyacarRouter);

// MAIN APP
const PORT = 3000;
export const start = async () => {
  try {
    app.listen(PORT, () => console.log(`CLIENT API MOCK SERVER IS RUNNING at http://localhost:${PORT}/`))
  } catch (e) {
    console.error(e)
  }
};

// HELPERS
function handleError(error, req, res, next) {
  console.log('CUSTOM ERROR: ', error, error.message);
  return res.status(506).json({
    error: `${error.message || error.toString()}`,
  })
}
