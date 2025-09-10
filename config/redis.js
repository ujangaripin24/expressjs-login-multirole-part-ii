import { createClient } from "redis";

const client = createClient({
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.on("connect", () => console.log("🔌 Redis: connecting..."));
client.on("ready", () => console.log("✅ Redis: connected & ready!"));
client.on("error", (err) => console.error("❌ Redis Client Error:", err));

await client.connect();

await client.set("hello", "world");
const value = await client.get("hello");

export default client;
