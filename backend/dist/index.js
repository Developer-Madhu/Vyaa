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
    "http://localhost:5173",
    "https://vyaa.netlify.app"
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
        callback(new Error("Blocked by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Idempotency-Key"],
    optionsSuccessStatus: 200,
}));
// Explicitly handle preflight OPTIONS requests for all routes
app.options("*", cors());
app.use(express.json());
// Handle OPTIONS preflight requests globally
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    next();
});
app.get(["/api/health", "/health"], (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use(["/api/auth", "/auth"], authRoutes);
app.use(["/api/products", "/products"], productRoutes);
app.use(["/api/categories", "/categories"], categoryRoutes);
app.use(["/api/cart", "/cart"], cartRoutes);
app.use(["/api/wishlist", "/wishlist"], wishlistRoutes);
app.use(["/api/orders", "/orders"], orderRoutes);
app.use(["/api/checkout", "/checkout"], checkoutRoutes);
app.use(["/api/coupons", "/coupons"], couponRoutes);
app.use(["/api/admin", "/admin"], adminRoutes);
app.use(errorHandler);
if (process.env.NETLIFY !== "1" && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`VYAA API server running on http://localhost:${PORT}`);
    });
}
export const handler = serverless(app);
export default app;
//# sourceMappingURL=index.js.map