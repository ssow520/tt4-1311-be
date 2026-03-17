const express = require("express");
const authRouter = require("./routes/authRoutes");


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log(req);
    //res.send('<h1>TT4</h1>');
    return res.json({message: "Enpoint is working!"});
});

app.post("/test", (req, res) => {
    return res.status(200).json({
        message: "Enpoint is working!",
        data: {
            ok: true,
            tip: "This endpoint startup JSON response!"
        }
    });
});

app.use("/auth", authRouter);


// app.listen(
//     5000,
//     () => {
//         console.log("Server is running...");
//     }
// );

module.exports = app;