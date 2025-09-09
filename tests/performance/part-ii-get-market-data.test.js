// ketahui titik jebol sistem
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    stages: [
        { duration: "20s", target: 20 },   // 30 detik pertama: naik ke 20 user
        { duration: "20s", target: 50 },   // lalu naik ke 50 user
        { duration: "20s", target: 100 },  // lalu naik ke 100 user
        { duration: "20s", target: 200 },  // lalu naik ke 200 user
        { duration: "20s", target: 400 },    // turun kembali (graceful stop)
    ]
}
export default function () {
    const res = http.get("http://localhost:52333/api/v1/market/product/get-all");

    check(res, {
        "status is 200": (r) => r.status === 200,
        "response not empty": (r) => r.body.length > 0,
    });

    sleep(1);
}
