const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGOCONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then((con)=> {
        console.log(`MONGO IS CONNECTED: ${con.connection.host}`)
    }).catch((err)=> {
        console.log(`MONGO IS FAILED to CONNECt: ${err}`)
    })
}

module.exports = connectDatabase;