const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoUri = "mongodb+srv://renancavalcanti_db_user:oulqe5Kx9ore7QrF@cluster0.14ydwqs.mongodb.net/?appName=Cluster0/tt4_1311"

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully!");
}

module.exports = { connectDB };