const mongoose = require('mongoose');
const User = require('../models/user');

const db = async () => {
    try {
        const responce = await mongoose.connect(`${process.env.MONGO_URI}`)
        if (responce) {
            console.log("Database connected successfully")
            await User.collection.dropIndexes('name_1')      
        }
    } catch (error) {
        console.log(error.message)
    }

}
db()