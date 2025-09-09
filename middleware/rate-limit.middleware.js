import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: {
        msg: "Terlalu banyak permintaan dari IP ini, coba lagi nanti.",
    },
    standardHeaders: true,
    legacyHeaders: false,
})

export const loginRateLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 5,
  message: {
    message: "Terlalu banyak percobaan login, coba lagi dalam 5 menit.",
  },
}); 