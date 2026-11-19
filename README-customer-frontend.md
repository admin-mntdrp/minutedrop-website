# MinuteDrop Customer Frontend — MVP Prototype

Responsive static customer storefront for a hybrid hyperlocal delivery marketplace:
- MinuteDrop-owned inventory
- Local partner/vendor inventory
- Categories: Groceries, Vegetables, Seasonal Wear, Bakery, Medical Equipment (consumer-use devices), Tiffins & Food
- Search, category filters, seller filters, sorting
- Product cards with seller/source identification
- Cart with quantity controls and subtotal
- Delivery-area selector
- Demo checkout and customer-account placeholder

## Run locally
Open `index.html` in a browser, or open this folder in VS Code and use Live Server.

## Important prototype limitations
This is a frontend-only prototype using sample products and client-side cart state. It does NOT:
- create or save real customer accounts or orders
- process payments
- verify delivery coverage or stock
- calculate real delivery fees or guarantee same-day delivery
- provide live order tracking
- connect to vendor inventory or backend APIs

Before public launch, connect a secure backend and database, validate seller/product data, implement authentication and payment provider integration, and publish approved privacy, refund, terms and contact information. Do not put secrets, API keys, passwords or customer data in this repository.

## Suggested MVP backend entities
Customer, Address, Vendor, Store, Product, Inventory, Category, Cart, Order, OrderItem, Payment, DeliveryPartner, Shipment, DeliveryStatus, ServiceArea.
