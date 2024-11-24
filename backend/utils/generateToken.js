import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = async (userId, res) => {
  const token = jwt.sign({userId}, process.env.SECRECT_KEY,{
        expiresIn: "15d"         
    })
    console.log(`JWT TOKEN: ${token}`);

       res.cookie("jwt-token", token, {
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks, this means user can not access this cookie via javascript.

            sameSite: "strict", // prevent CSRF attacks cross-site request forgery attacks.

            maxAge: 15 * 24 * 60 * 60 * 1000, // this means -> 15 days 24 hr 60 min 60 sec 1000 milisec,
        })
}

export default generateTokenAndSetCookie;     

