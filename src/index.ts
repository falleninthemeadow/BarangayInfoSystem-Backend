import "dotenv/config";
import app from "./app";
import cors from "cors";

const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: "http://localhost:*",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});