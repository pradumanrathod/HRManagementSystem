import dotenv from 'dotenv';
import app from '../src/app.js';
import connectDB from "../src/config/db.js";

dotenv.config();

// Only connect to DB and start server if not in Vercel environment
if (process.env.VERCEL !== '1') {
  connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
