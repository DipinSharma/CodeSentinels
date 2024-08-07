import mongoose from "mongoose"

export const mongoDB = async() => {
    await mongoose.connect(process.env.MONGO_URL, {
        dbName: 'telehealth'
    }).then(() => { 
        console.log('DB connected successfully')
    }).catch((e) => {
        console.log(e)
    })
}   