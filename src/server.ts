import express from "express";
import { config } from "dotenv";
import { limiter } from "./middlewares/rateLimit";
import { router } from "./routes/routes";

config(); // dotenv

const app = express();
const PORT = process.env.PORT ?? 3001;

// Trust the first proxy (important for reading X-Forwarded-For header)
app.set('trust proxy', 1);


// Enable CORS by setting headers
app.use((req, res, next) => {
  // Allow all origins (replace * with specific domains if needed)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Allow preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

//middlewares
app.use(limiter);

// router
app.use("/", router);

app.listen(PORT, () => {
  console.log(`⚔️  API started ON PORT : ${PORT} @ STARTED  ⚔️`);
});

export default app;
