require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mainRouter = require("./routes/index");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
        console.log(`Server is listening on PORT ${PORT}`)
    });
}

main();