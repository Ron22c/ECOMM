const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

process.on('uncaughtException', err=> {
    console.log(err.message);
    console.log('exiting due to uncaughtException')
    process.exit(1);
})

dotenv.config({path: 'Backend/../.env'})

connectDatabase();

let server = app.listen(process.env.PORT, () => console.log(`server is up and running on ${process.env.PORT} in ${process.env.ENVIRONMENT} mode`));

process.on('unhandledRejection', err => {
    console.log(err.message);
    console.log('exiting due to unhandledRejection')
    server.close(()=>process.exit(1));
})