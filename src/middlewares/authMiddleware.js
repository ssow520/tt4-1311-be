const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Authorization token is missing."});
    }

    const token = authHeader.split(" ")[1];
    const jwtScret = "asidas99";

    try{
        const decode = jwt.verify(token, jwtScret);
        console.log(decode);
        req.user = {id: decode.id, email: decode.email}
        next();
    }
    catch(error){
        console.log(error)
        return res.status(401).json({message: "Invalid or expired token."});
    }
}

module.exports = { authMiddleware };