import jwt from "jsonwebtoken"


const middleware = (req, res, next)=>{

    try{
        const token = req.header("jwt") || req.cookies.jwt ;
        const verify = jwt.verify(token, "ubit123456789");
        next()
        
    }catch(error){
        res.send(`This is not real user`)
    }
}

export default middleware;