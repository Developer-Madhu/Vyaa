import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import serverless from "serverless-http";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import cartRoutes from "./routes/cart.js";
import wishlistRoutes from "./routes/wishlist.js";
import orderRoutes from "./routes/orders.js";
import checkoutRoutes from "./routes/checkout.js";
import couponRoutes from "./routes/coupons.js";
import adminRoutes from "./routes/admin.js";
const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);
app.use(helmet());
const allowedOrigins = [
    "http://localhost:4321",
    "http://localhost:3000",
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        // Check configured FRONTEND_URL
        if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL.replace(/\/$/, "")) {
            return callback(null, true);
        }
        // Allow localhost and Netlify subdomains
        if (allowedOrigins.includes(origin) ||
            origin.endsWith(".netlify.app") ||
            origin.startsWith("http://localhost:")) {
            return callback(null, true);
        }
        callback(null, false);
    },
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express.json());
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);
if (process.env.NETLIFY !== "1" && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`VYAA API server running on http://localhost:${PORT}`);
    });
}
export const handler = serverless(app);
export default app;
//# sourceMappingURL=index.js.map