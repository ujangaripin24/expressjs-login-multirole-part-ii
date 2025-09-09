// basis  testing k6
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    // vus adalah virtualisasi jumlah user yang akses, jika 100 maka berarti 100 user
    vus: 500,
    // duration adalah dari 100 user yang akses butuh jeda waktu berapa lama? 60s untuk 1 menit berarti dalam 1 menit ada 100 user yang akses
    duration: "30s",
}
export default function () {
    const res = http.get("http://localhost:52333/api/v1/market/product/get-all");

    check(res, {
        "status is 200": (r) => r.status === 200,
        "response not empty": (r) => r.body.length > 0,
    });

    sleep(1);
}
