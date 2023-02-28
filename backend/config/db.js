const mongoose = require("mongoose")
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

// connection
const conn = async () => {
    try {
        mongoose.set("strictQuery", false);
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.jcoytpp.mongodb.net/?retryWrites=true&w=majority`
        )

        console.log("🧮 DB connected!")

        return dbConn

    } catch (error) {
        console.log(error)
    }
}

conn()

module.exports = conn