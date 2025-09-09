import { createClient } from "redis";

const client = createClient({
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    rejectUnauthorized: false,
    tls: false
  },
});

client.on("connect", () => console.log("🔌 Redis: connecting..."));
client.on("ready", () => console.log("✅ Redis: connected & ready!"));
client.on("error", (err) => console.error("❌ Redis Client Error:", err));
console.log("Redis Password: ", process.env.REDIS_USER);
console.log("Redis Password: ", process.env.REDIS_PASSWORD);
console.log("Redis Password: ", process.env.REDIS_HOST);
console.log("Redis Password: ", process.env.REDIS_PORT);

await client.connect();

await client.set("hello", "world");
const value = await client.get("hello");
console.log("🔎 Redis test value:", value);

export default client;
