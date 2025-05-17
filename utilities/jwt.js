import jwt from "jsonwebtoken";
export const signJWT = (obj) => {
  const token = jwt.sign(obj, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  //store the token in the local storage of the browser
  return token;
};
export const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error.message);
  }
};
