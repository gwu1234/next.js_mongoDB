import mongoose from 'mongoose';

const connection = {};

async function mongoConnect() {
    if (connection.isConnected) {
        console.log("db was connected : ");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        connection.isConnected = db.connections[0].readyState;
        console.log("mongoConnected is connected: ", connection.isConnected);
    } catch (err){
        console.log ("db connection failed")
        console.log (err)
    }

    //connection.isConnected = db.connections[0].readyState;
    //console.log("mongoConnected : ", connection.isConnected);
}

export default mongoConnect;