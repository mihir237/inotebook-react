var jwt = require('jsonwebtoken')
const JWT_SECRET = 'mihirisgoodB$y'

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "token error" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    } catch (error) {
console.log(error)
res.status(401).send("server Error ")
    }
}

module.exports = fetchuser;