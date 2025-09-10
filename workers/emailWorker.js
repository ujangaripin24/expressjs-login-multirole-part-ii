import client from "../config/redis.js";
import { sendLoginAlert } from "../service/sender-main.service.js";

async function startWorker() {
    console.log("📨 Email worker started...");

    while (true) {
        try {
            const result = await client.brPop("emailQueue", 0);

            if (result) {
                const job = JSON.parse(result.element);
                console.log("🔔 New email job:", job);

                await sendLoginAlert(job.to, job.name, job.email);
            }
        } catch (err) {
            console.error("❌ Worker error:", err);
        }
    }
}

startWorker();
