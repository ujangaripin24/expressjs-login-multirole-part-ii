import * as authService from '../service/auth.service.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { sendLoginAlert } from '../service/sender-main.service.js';
import { generateRefreshToken, generateToken } from '../utils/token-jwt.js';
dotenv.config();

export const loginUser = async (req, res, next) => {
  try {
    const user = await authService.loginUser(req.body.email, req.body.password)
    req.session.userId = user.uuid;
    const { uuid, name, email, role } = user;

    await sendLoginAlert(user.email, user.name)

    res.status(200).json({ uuid, name, email, role })
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
}

export const getProfile = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Mohon login kembali" });
    }

    const user = await authService.getProfile(req.session.userId);
    res.status(200).json(user);

  } catch (error) {
    if (error.message.includes("User")) {
      return res.status(404).json({ errors: [{ msg: error.message }] });
    }
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
}

export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
}

export const loginUserJwt = async (req, res) => {
  try {
    const user = await authService.loginUserJwt(req.body.email, req.body.password)

    const access_token = generateToken(user);
    const refresh_token = generateRefreshToken(user)
    await sendLoginAlert(user.email, user.name)

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      token_type: "Bearer",
      access_token: access_token,
      expires_in: 10 * 60
    })
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
}

export const getProfileJwt = async (req, res) => {
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ msg: "Token tidak ditemukan" })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

    const user = await authService.getProfileJwt(decoded.uuid)
    console.log("dari controller: ", user);

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
}

export const loginWithGoogle = async (req, res) => {
  try {
    const { email, name, picture } = req.body

    let user = await TblUser.findOne({ where: { email } })
    if (!user) {
      user = await TblUser.create({
        name,
        email,
        password: null,
        type: 'google',
        role: 'user',
        link_picture: picture
      })
    }

    const access_token = generateToken(user);
    const refresh_token = generateRefreshToken(user)
    await sendLoginAlert(user.email, user.name)

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });


    res.status(200).json({
      token_type: "Bearer",
      access_token: access_token,
      expires_in: 10 * 60
    })
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] })
  }
}

export const refreshToken = (req, res) => {
  const token = req.cookies.refresh_token;
  if (!token) return res.status(401).json({ msg: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const newAccessToken = generateToken({ uuid: decoded.uuid, role: decoded.role });
    res.json({
      token_type: "Bearer",
      access_token: newAccessToken,
      expires_in: 10 * 60
    });
  } catch (err) {
    return res.status(403).json({ msg: "Invalid refresh token" });
  }
}

export const logoutUserJwt = (req, res) => {
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ msg: "Logout berhasil" });
};