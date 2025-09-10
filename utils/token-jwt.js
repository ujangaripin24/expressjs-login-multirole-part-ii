import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign(
        {uuid: user.uuid, role: user.role},
        process.env.SECRET_TOKEN,
        {expiresIn: "10m"}
    )
}

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { uuid: user.uuid },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};