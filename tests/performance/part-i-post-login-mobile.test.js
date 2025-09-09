import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 10 },   // naik ke 10 user dalam 10s
    { duration: "20s", target: 50 },   // naik ke 50 user
    { duration: "20s", target: 100 },  // naik ke 100 user
    { duration: "10s", target: 0 },    // turun ke 0 user
  ],
};

export default function () {
  const url = "http://localhost:52333/api/v1/mobile/auth/login";
  const payload = JSON.stringify({
    email: "user002@gmail.com",
    password: "123456789",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "got token": (r) => r.json("token") !== undefined,
  });

  // biar simulasi realistis, user nggak spam klik login
  sleep(1); 
}
