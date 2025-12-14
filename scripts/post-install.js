import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import crypto from "crypto";

const envExamplePath = path.resolve(".env.example");
const envPath = path.resolve(".env");

// 1️⃣ Copy .env.example -> .env if not exists
if (!fs.existsSync(envExamplePath)) {
    console.error("❌ .env.example not found");
    process.exit(1);
}

if (!fs.existsSync(envPath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log("✅ .env created from .env.example");
} else {
    console.log("ℹ️ .env already exists — skipping copy");
}

// 2️⃣ Generate JWT secret if not exists
let envContent = fs.readFileSync(envPath, "utf-8");

if (!envContent.match(/^JWT_SECRET=/m)) {
    const jwtSecret = crypto.randomBytes(64).toString("hex");
    envContent += `\nJWT_SECRET=${jwtSecret}\n`;
    fs.writeFileSync(envPath, envContent);
    console.log("✅ JWT_SECRET generated and added");
} else {
    console.log("ℹ️ JWT_SECRET already exists — skipping generation");
}

// 3️⃣ Run Prisma generate automatically
try {
    console.log("🚀 Running prisma generate...");
    execSync("npx prisma generate", { stdio: "inherit" });
    console.log("✅ Prisma client generated");
} catch (err) {
    console.error("❌ Prisma generate failed:", err.message);
}

console.log("✅ Dev setup complete");
