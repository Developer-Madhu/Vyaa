# VYAA MASTER PROJECT CONTEXT

## PROJECT OVERVIEW

Project Name: Vyaa

Vyaa is a modern women's fashion ecommerce platform focused on Indian women aged 18-24.

The platform sells:

* Kurtis
* Co-ord Sets
* Ethnic Wear

The goal is to create a production-grade ecommerce platform with clean architecture, excellent UX, strong performance, and future scalability.

This is not a demo project.

Every implementation decision must support future growth while remaining simple.

---

# PRODUCT VISION

Create an elegant, mobile-first fashion shopping experience that feels modern, feminine, trustworthy, and premium.

The experience should resemble leading Indian fashion brands while maintaining its own identity.

The product must prioritize:

* Simplicity
* Fast browsing
* Fast checkout
* High-quality visuals
* Mobile responsiveness
* Conversion optimization

---

# TARGET CUSTOMER

Age:

18-24

Location:

India

Gender:

Women

Characteristics:

* Mobile-first users
* Heavy Instagram users
* Fashion-conscious shoppers
* Expect modern UI
* Prefer quick purchasing experiences
* Discover products through social media

Design decisions must optimize for this customer profile.

---

# MVP SCOPE

## Customer

* Homepage
* Product Listing
* Product Details
* Search
* Filters
* Wishlist
* Cart
* Checkout
* Razorpay Payments
* Authentication
* Customer Profile
* Order History

## Admin

* Dashboard
* Product Management
* Category Management
* Inventory Management
* Order Management
* Coupon Management
* Customer Management

---

# OUT OF SCOPE

Do not build:

* Marketplace sellers
* Multi-vendor support
* COD
* Loyalty programs
* Affiliate systems
* Live shopping
* AI recommendations
* Subscription products
* International shipping
* Multi-language support

---

# TECH STACK

Frontend

* Astro
* React Islands
* TypeScript
* TailwindCSS
* Shadcn UI

Backend

* NodeJS
* Express

Database

* Supabase PostgreSQL

Authentication

* Supabase Auth

Storage

* Supabase Storage

Payments

* Razorpay

Email

* Resend

Deployment

* Vercel
* Railway

---

# ARCHITECTURE PRINCIPLES

Build a scalable modular monolith.

Avoid:

* Microservices
* Event sourcing
* Distributed systems
* Premature abstractions

Prefer:

* Feature-based architecture
* Vertical slices
* Reusable components
* Strong typing
* Simple APIs

Business logic must never live inside UI components.

---

# CUSTOMER EXPERIENCE

Homepage Structure

1. Hero Banner
2. New Arrivals
3. Shop Categories
4. Trending Products
5. Featured Collection
6. Reviews
7. Instagram Gallery
8. Newsletter
9. Footer

Product Detail Page

* Image gallery
* Size selector
* Product description
* Related products
* Wishlist
* Add to Cart

Checkout

* Address
* Order Summary
* Razorpay Payment
* Order Confirmation

---

# DESIGN SYSTEM

Brand Personality

* Feminine
* Modern
* Clean
* Trendy
* Elegant

Colors

Primary
#D977A8

Secondary
#F8D7E5

Background
#FFF9FB

Text
#2B2B2B

Accent
#8B5CF6

Success
#10B981

Typography

Headings:
Playfair Display

Body:
Inter

UI Guidelines

* Large imagery
* Rounded corners
* Generous spacing
* Clean layouts
* Mobile-first
* Accessible components

---

# DATABASE RULES

Products support:

* One category
* One color
* Multiple images
* Multiple sizes

Sizes:

* S
* M
* L
* XL

Inventory is maintained per size.

Example

Product:
Pink Floral Kurti

Inventory

S = 10
M = 15
L = 8
XL = 5

Do not create color variant tables.

---

# ORDER FLOW

Customer adds product to cart.

Customer proceeds to checkout.

Order record is created.

Customer completes Razorpay payment.

Backend verifies payment signature.

Order becomes PAID.

Inventory decreases.

Confirmation email sent.

---

# SECURITY RULES

Validate all inputs.

Validate all API payloads.

Never trust frontend role checks.

Verify Razorpay signatures server-side.

Protect admin routes.

Enable Supabase RLS.

Never expose secrets.

Sanitize uploaded content.

---

# PERFORMANCE REQUIREMENTS

Homepage LCP under 2.5 seconds.

Image optimization mandatory.

Lazy loading required.

Pagination required.

Avoid unnecessary client-side rendering.

Use Astro SSR where beneficial.

---

# DEVELOPMENT PHILOSOPHY

Every feature must include:

* UI
* Validation
* Loading state
* Error state
* API integration
* Database integration

Do not scaffold unfinished systems.

Build complete vertical slices.

Ship working functionality.

---

# AI IMPLEMENTATION RULES

Never invent requirements.

Never create undocumented features.

Never create undocumented database columns.

Never create undocumented API endpoints.

Never create undocumented user flows.

Ask for clarification whenever requirements are ambiguous.

Always explain:

1. Files being changed
2. Database impact
3. API impact
4. Business impact

before implementation.

---

# SUCCESS METRICS

Primary

* Conversion rate
* Add-to-cart rate
* Checkout completion rate

Secondary

* Average order value
* Repeat purchase rate
* Product page engagement

Every implementation should improve one of these metrics.
