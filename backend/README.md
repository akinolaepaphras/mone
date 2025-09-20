/backend
  ├── models
  │    └── Transaction.js
  ├── routes
  │    └── transactions.js
  ├── server.js
  ├── config
  │    └── db.js
  ├── package.json
(for dependencies)
{
  "name": "hackathon-finance-app",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^7.4.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
(atlas connection)
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Atlas Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;

(models/transactions)
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
});

const transactionSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    userId: { type: String, required: true }, // link to Auth0/Google user ID
    vendorName: { type: String, required: true },
    transactionDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    isRecurring: { type: Boolean, default: false },
    billingCycle: { type: String, enum: ["monthly", "annually", "weekly", null], default: null },
    items: [itemSchema],
    category: { type: String, default: "Uncategorized" },
    sourceEmailId: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);

(crud api endpoints)
import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// POST - Add new transaction
router.post("/", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - All transactions for a user
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

(server.js entry point)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactions.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
