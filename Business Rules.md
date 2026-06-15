# VYAA BUSINESS RULES

## PRODUCTS

Every product belongs to exactly one category.

Allowed categories:

* Kurtis
* Co-ord Sets
* Ethnic Wear

Products contain:

* Name
* Slug
* Description
* Price
* Original Price
* Color
* Images
* Category

Products may be:

* Active
* Draft
* Archived

---

## INVENTORY

Inventory is tracked per size.

Allowed sizes:

* S
* M
* L
* XL

Inventory cannot be negative.

Out-of-stock sizes cannot be purchased.

---

## CART

Guest users use local cart.

Authenticated users use database cart.

Maximum quantity per item:

10

---

## WISHLIST

Users must be authenticated.

Duplicate wishlist entries prohibited.

---

## PAYMENTS

Only Razorpay.

No COD.

No manual payment verification.

Server-side signature verification mandatory.

---

## SHIPPING

India only.

One default address per customer.

Maximum 10 addresses.

---

## ORDERS

Statuses

PENDING
PAID
PROCESSING
SHIPPED
DELIVERED
CANCELLED
REFUNDED

Only valid state transitions allowed.

Paid orders cannot revert to pending.

---

## COUPONS

Supported Types

* Percentage
* Fixed Amount

Coupons support:

* Expiry date
* Usage limits
* Minimum order amount

Expired coupons invalid.

---

## ADMIN

Admin can:

* Manage products
* Manage inventory
* Manage categories
* Manage coupons
* Manage orders

Admin cannot modify payment verification records.

---

## AUDITABILITY

All admin actions should be logged.

Store:

* User
* Action
* Entity
* Timestamp

for critical operations.
