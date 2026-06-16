import { supabase } from "../services/supabase.js";
const SEED = {
    categories: [
        { name: "Kurtis", slug: "kurtis", description: "Trendy and traditional kurtis for every occasion." },
        { name: "Co-ord Sets", slug: "co-ord-sets", description: "Perfectly matched two-piece sets." },
        { name: "Ethnic Wear", slug: "ethnic-wear", description: "Elegant ethnic wear for celebrations." },
    ],
    products: [
        {
            name: "Pink Floral Printed Kurti",
            slug: "pink-floral-printed-kurti",
            description: "A beautiful pink floral printed kurti crafted from breathable cotton. Features a round neck, three-quarter sleeves, and side slits for ease of movement.",
            price: 1299,
            original_price: 1999,
            color: "Pink",
            category_slug: "kurtis",
            status: "active",
            images: [
                { url: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800", alt_text: "Pink Floral Kurti Front", sort_order: 0 },
                { url: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=800", alt_text: "Pink Floral Kurti Back", sort_order: 1 },
            ],
            sizes: [
                { size: "S", inventory: 10 },
                { size: "M", inventory: 15 },
                { size: "L", inventory: 8 },
                { size: "XL", inventory: 5 },
            ],
        },
        {
            name: "Beige Cotton Co-ord Set",
            slug: "beige-cotton-co-ord-set",
            description: "A chic beige co-ord set with a crop top and high-waisted skirt. Perfect for casual outings and brunch dates.",
            price: 2499,
            original_price: 3499,
            color: "Beige",
            category_slug: "co-ord-sets",
            status: "active",
            images: [
                { url: "https://images.unsplash.com/photo-1617370447481-f4691f05d6f1?w=800", alt_text: "Beige Co-ord Set Front", sort_order: 0 },
            ],
            sizes: [
                { size: "S", inventory: 12 },
                { size: "M", inventory: 20 },
                { size: "L", inventory: 10 },
                { size: "XL", inventory: 6 },
            ],
        },
        {
            name: "Navy Blue Ethnic Lehenga",
            slug: "navy-blue-ethnic-lehenga",
            description: "A stunning navy blue lehenga choli set with intricate embroidery. Features a full flared skirt and a matching dupatta.",
            price: 5999,
            original_price: 7999,
            color: "Navy Blue",
            category_slug: "ethnic-wear",
            status: "active",
            images: [
                { url: "https://images.unsplash.com/photo-1606143412458-acc5f86de897?w=800", alt_text: "Navy Blue Lehenga Front", sort_order: 0 },
            ],
            sizes: [
                { size: "S", inventory: 5 },
                { size: "M", inventory: 8 },
                { size: "L", inventory: 6 },
                { size: "XL", inventory: 3 },
            ],
        },
        {
            name: "White Embroidered Kurta Set",
            slug: "white-embroidered-kurta-set",
            description: "An elegant white kurta set with delicate thread embroidery. Comes with a matching dupatta and palazzo pants.",
            price: 1899,
            original_price: null,
            color: "White",
            category_slug: "kurtis",
            status: "active",
            images: [
                { url: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800", alt_text: "White Kurta Set", sort_order: 0 },
            ],
            sizes: [
                { size: "S", inventory: 8 },
                { size: "M", inventory: 12 },
                { size: "L", inventory: 7 },
                { size: "XL", inventory: 4 },
            ],
        },
    ],
    coupons: [
        {
            code: "WELCOME10",
            type: "percentage",
            value: 10,
            min_amount: 500,
            max_uses: 100,
            used_count: 0,
            is_active: true,
        },
        {
            code: "FLAT200",
            type: "fixed",
            value: 200,
            min_amount: 1000,
            max_uses: 50,
            used_count: 0,
            is_active: true,
        },
    ],
};
async function seed() {
    for (const cat of SEED.categories) {
        const { error } = await supabase.from("categories").upsert(cat, { onConflict: "slug" });
        if (error)
            console.error("Category error:", error.message);
        else
            console.log("Seeded category:", cat.name);
    }
    for (const product of SEED.products) {
        const { data: cat } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", product.category_slug)
            .single();
        if (!cat) {
            console.error("Category not found:", product.category_slug);
            continue;
        }
        const { images, sizes, category_slug, ...productData } = product;
        const { data: prod, error: prodErr } = await supabase
            .from("products")
            .upsert({ ...productData, category_id: cat.id }, { onConflict: "slug" })
            .select()
            .single();
        if (prodErr) {
            console.error("Product error:", prodErr.message);
            continue;
        }
        for (const img of images) {
            await supabase.from("product_images").insert({ ...img, product_id: prod.id });
        }
        for (const sz of sizes) {
            await supabase
                .from("product_sizes")
                .upsert({ ...sz, product_id: prod.id }, { onConflict: "product_id, size" });
        }
        console.log("Seeded product:", product.name);
    }
    for (const coupon of SEED.coupons) {
        const { error } = await supabase.from("coupons").upsert(coupon, { onConflict: "code" });
        if (error)
            console.error("Coupon error:", error.message);
        else
            console.log("Seeded coupon:", coupon.code);
    }
    console.log("Seed complete.");
}
seed().catch(console.error);
//# sourceMappingURL=seed.js.map