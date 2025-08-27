# Valorem - Course Platform

A full-stack course platform built with React, Node.js, Express, and MongoDB.

## Features

- **Course Browsing**: View all available courses with pagination
- **Course Details**: Detailed course information with purchase functionality
- **Order Management**: Complete purchase flow with email collection
- **Payment Processing**: Multiple payment methods with phone contact for payment
- **Admin Panel**: Manage orders, mark as paid, and create coupons
- **Coupon System**: Create and redeem course coupons
- **User Authentication**: JWT-based authentication
- **Course Access**: Purchased courses are added to user's account

## Project Structure

```
valorem/
├── client/          # React frontend (Vite + TypeScript)
├── server/          # Node.js backend (Express)
└── package.json     # Root package.json for concurrent development
```

## Setup Instructions

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 2. Environment Variables

Create a `.env` file in the server directory:

```env
CLIENT_URL=http://localhost:5173
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Run the Application

From the root directory:

```bash
# Run both client and server concurrently
npm run dev

# Or run individually:
npm run client  # Runs on http://localhost:5173
npm run server  # Runs on http://localhost:5000
```

## API Endpoints

### Public Endpoints

- `GET /api/courses` - Get paginated list of courses
- `GET /api/courses/:id` - Get course details
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Protected Endpoints (Require Authentication)

- `POST /api/courses/:id/place` - Place order for a course
- `GET /api/courses/:id/watch` - Access course videos (if owned)
- `POST /api/courses/order/redeem` - Redeem coupon

### Admin Endpoints (Require Admin Role)

- `GET /api/orders` - Get all orders
- `PATCH /api/orders/:id` - Mark order as paid
- `GET /api/admin/coupons` - Get all coupons
- `POST /api/admin/coupon/create` - Create new coupon
- `POST /api/admin/courses` - Create new course
- `PATCH /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course

## Frontend Routes

- `/` - Home page
- `/courses` - Browse all courses
- `/courses/:id` - Course detail and purchase page
- `/login` - User login
- `/admin/orders` - Admin order management
- `/admin/coupons` - Admin coupon management

## Purchase Flow

1. User browses courses at `/courses`
2. User clicks on a course to view details at `/courses/:id`
3. User clicks "Purchase Course" (requires login)
4. User fills in email and selects payment method
5. Order is created and stored in MongoDB
6. User receives payment instructions with phone number: **01033908985**
7. Admin can mark order as paid in `/admin/orders`
8. Course is automatically added to user's account when marked as paid

## Database Models

### Course (Product)
- name, description, price, category, image, videos[]

### User
- name, email, password, isAdmin, courses[]

### Order
- user, product, price, paymentMethod, paid (boolean)

### Coupon
- code, course, user, used (boolean)

## Cloudflare Integration

The API is hosted on Cloudflare at:
`https://0304a825db1f41fe8299eb33eaf219fc.r2.cloudflarestorage.com`

## Payment Methods Supported

- Credit Card
- PayPal
- Bank Transfer
- VFC
- InstaPay

## Admin Features

1. **Order Management**: View all orders, filter by payment status, mark orders as paid
2. **Coupon Management**: Create coupons for specific courses, view usage status
3. **Course Management**: Create, update, and delete courses

## Development Notes

- Frontend uses Redux Toolkit for state management
- Backend uses JWT for authentication
- Toast notifications for user feedback
- Responsive design with Tailwind CSS
- Form validation on both client and server
- Error handling throughout the application

## Contact for Payment

After placing an order, customers should contact: **01033908985** for payment processing.