# MERN E-commerce Project

A full-stack E-commerce application built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js). This project features user authentication, product filtering/sorting, a shopping cart, and admin privileges for managing products.

## 🚀 Features

-   **User Authentication**: Register, Login, Logout, and Token-based authentication (JWT).
-   **Product Management**: 
    -   **Admin Only**: Create, Edit, and Delete products securely.
    -   **Users**: View products and details.
-   **Advanced Filtering**: Sort by price, filter by category, pagination, and search.
-   **Shopping Cart**: 
    -   Add/Remove items.
    -   Increment/Decrement quantities.
    -   Real-time total cost calculation.
    -   Cart state persists in the database for logged-in users.
-   **Role-based Authorization**: Distinction between standard Users and Admins.
-   **Responsive Design**: Mobile-friendly UI with modern styling (SCSS).

## 🛠️ Tech Stack

### Client (Frontend)
-   **React.js**: Functional components and Hooks.
-   **Context API**: Global state management (User, Products, Token).
-   **React Router**: Dynamic routing.
-   **Axios**: HTTP requests.
-   **SCSS**: Styling and responsiveness.

### Server (Backend)
-   **Node.js & Express.js**: Server-side framework.
-   **MongoDB & Mongoose**: NoSQL database and Object Data Modeling.
-   **JWT (JSON Web Token)**: Secure authentication (Access & Refresh tokens).
-   **Bcrypt**: Password hashing.
-   **RESTful API**: Structured endpoints.

## 📂 Project Structure

```
E-commerce/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── api/            # API services (UserAPI, ProductAPI)
│   │   ├── components/     # UI Components (Header, Pages, Utils)
│   │   ├── GlobalState.js  # Context API Store
│   │   └── ...
│   └── ...
│
└── server/                 # Backend Node.js Application
    ├── controllers/        # Business logic for requests
    ├── models/             # Mongoose Schemas (User, Product, Category)
    ├── routes/             # API Routes
    ├── middleware/         # Auth & Admin verification
    └── server.js           # Server entry point
```

## 🔧 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/mern-ecommerce.git
    cd mern-ecommerce
    ```

2.  **Install Dependencies**:
    *   **Server**:
        ```bash
        cd server
        npm install
        ```
    *   **Client**:
        ```bash
        cd client
        npm install
        ```

3.  **Environment Variables**:
    Create a `.env` file in the `server` directory and add:
    ```env
    MONGODB_URL=your_mongodb_connection_string
    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    ```

4.  **Run the Project**:
    *   **Server**:
        ```bash
        cd server
        npm run dev
        ```
    *   **Client**:
        ```bash
        cd client
        npm start
        ```
5. **Account for user and admin**
    -   **User**:
        ```bash
        username: test@gmail.com
        password: test123
        ```
    -   **Admin**:
        ```bash
        username: test2@gmail.com
        password: test123
        ```

## 📡 API Endpoints

-   **Users**:
    -   `POST /user/register`: Register new user
    -   `POST /user/login`: Login user
    -   `GET /user/logout`: Logout
    -   `GET /user/information`: Get user info
    -   `PATCH /user/addcart`: Update cart

-   **Products**:
    -   `GET /api/products`: Get all products (supports filtering)
    -   `POST /api/products`: Create product (Admin only)
    -   `PUT /api/products/:id`: Update product (Admin only)
    -   `DELETE /api/products/:id`: Delete product (Admin only)
