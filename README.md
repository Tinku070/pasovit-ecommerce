# **🛍️ Pasovit Clothing Store – MERN E-Commerce Application**

A full-stack **MERN e-commerce web application** built as part of the **Pasovit Backend Developer Assignment**.  
 This project demonstrates strong backend architecture, secure authentication, product filtering, cart management (guest \+ logged-in), orders, and email confirmation.

---

# **🚀 Features Overview**

## **🔐 Authentication**

* Register, login, logout

* JWT-based auth using **HttpOnly Cookies** (`secure`, `sameSite=strict`)

* Fetch logged-in user with `/auth/me`

* Automatic cart merge (guest → user after login)

---

## **👕 Product Catalog**

* Fetch all products with:

  * Search (name \+ description)

  * Filters (category, size)

  * Price range filter

  * Pagination

* View product details

* Product Model includes:

  * Category (Men / Women / Kids)

  * Sizes (S / M / L / XL)

  * Stock management

---

## **🛒 Shopping Cart**

### **Guest Cart (LocalStorage)**

* Add/update/remove items

* Persists in browser

* Auto-merge on login

### **Authenticated Cart (MongoDB)**

* Full server-side cart

* Add/update/remove items

* Cart saved per user

---

## **🧾 Order System**

* Create order

* Validate product stock

* Reduce stock after order

* Save full order summary

* View order success page

* View logged-in user’s past orders

---

## **📧 Order Confirmation Email**

Sent through **Nodemailer \+ Gmail SMTP**:

Includes:

* Order ID

* Order date

* Items

* Sizes

* Quantities

* Total amount

---

# **🛠️ Tech Stack**

## **Frontend**

* React \+ Vite

* React Router

* Context API (Auth \+ Cart)

* Axios

* Modern minimal UI (Apple-style)

## **Backend**

* Node.js / Express

* MongoDB \+ Mongoose

* JWT Auth \+ Cookies

* Nodemailer

* MVC folder structure

* Secure environment variables

---

# **📁 Project Folder Structure**

`pasovit-ecommerce/`  
`│`  
`├── backend/`  
`│   ├── controllers/`  
`│   ├── middleware/`  
`│   ├── models/`  
`│   ├── routes/`  
`│   ├── utils/`  
`│   ├── server.js`  
`│   ├── seedProducts.js`  
`│   └── .env`  
`│`  
`├── frontend/`  
`│   ├── src/`  
`│   │   ├── pages/`  
`│   │   ├── components/`  
`│   │   ├── context/`  
`│   │   ├── services/api.js`  
`│   │   ├── App.jsx`  
`│   │   └── main.jsx`  
`│   └── vite.config.js`  
`│`  
`└── README.md`

---

# **⚙️ Installation & Setup**

## **1️⃣ Clone Repository**

`git clone https://github.com/<your-username>/pasovit-ecommerce.git`

`cd pasovit-ecommerce`

---

# **🗄️ Backend Setup**

`cd backend`

`npm install`

### **Create `.env` file:**

`PORT=5000`

`MONGO_URI=<your-mongodb-atlas-url>`

`JWT_SECRET=<your-secret>`

`EMAIL_USER=<your-gmail>`

`EMAIL_PASS=<gmail-app-password>`

`NODE_ENV=development`

### **Seed sample products:**

`node seedProducts.js`

### **Start backend:**

`npm run dev`

---

# **🎨 Frontend Setup**

`cd frontend`  
`npm install`  
`npm run dev`

### **Configure API URL (optional for production)**

In `.env` of frontend:

`VITE_API_URL=http://localhost:5000/api`

---

# **🔗 API Endpoints Summary**

## **Auth**

| Method | Endpoint | Description |
| ----- | ----- | ----- |
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login \+ merge cart |
| POST | /api/auth/logout | Logout |
| GET | /api/auth/me | Get logged user |

## **Products**

| Method | Endpoint | Description |
| ----- | ----- | ----- |
| GET | /api/products | List products (filter/search/pagination) |
| GET | /api/products/:id | Single product |

## **Cart**

| Method | Endpoint | Description |
| ----- | ----- | ----- |
| GET | /api/cart | Fetch user cart |
| POST | /api/cart | Add item |
| PUT | /api/cart/update | Update qty |
| PUT | /api/cart/remove | Remove item |
| DELETE | /api/cart/clear | Clear cart |

## **Orders**

| Method | Endpoint | Description |
| ----- | ----- | ----- |
| POST | /api/orders | Create order |
| GET | /api/orders | Get my orders |
| GET | /api/orders/:id | Order details |

---

# **🌍 Deployment**

## **Backend → Render**
``` https://pasovit-ecommerce-xvq0.onrender.com/api ```

## **Frontend → Vercel**

``` https://pasovit-ecommerce-1.onrender.com ```
---

# **🎯 Final Notes**

This project includes:  
 ✔️ Secure backend  
 ✔️ Full e-commerce flow  
 ✔️ Modern React UI  
 ✔️ Cart merge logic  
 ✔️ Order & email system  
 ✔️ MongoDB Atlas  
 ✔️ Production-ready structure

#
