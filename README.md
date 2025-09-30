# Farm2Home - E-Commerce Grocery Web Application

A full-stack MERN (MongoDB, Express.js, React, Node.js) e-commerce application for grocery shopping.

## Features

- User authentication (Register/Login)
- Product browsing and search
- Shopping cart functionality
- Wishlist management
- Order management
- Seller dashboard
- Payment integration (Stripe)
- Dark mode toggle
- Responsive design

## Tech Stack

**Frontend:**
- React 19
- Vite
- TailwindCSS
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary (Image uploads)
- Stripe (Payments)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Setup

1. Clone the repository
```bash
git clone <repository-url>
cd E-Commerce(Grocery\ Mern\ App)\ Web\ Site
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../client
npm install
```

4. Environment Variables

Create `.env` files in both backend and client directories:

**Backend (.env):**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=development
```

**Client (.env):**
```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
├── backend/
│   ├── config/          # Database and service configurations
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Custom middlewares
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── uploads/         # File uploads
├── client/
│   ├── src/
│   │   ├── assets/      # Static assets
│   │   ├── components/  # React components
│   │   ├── context/     # React context
│   │   ├── models/      # Component models
│   │   └── pages/       # Page components
│   └── public/          # Public assets
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.