# VaultFlow
# Banking API

A secure RESTful Banking API built with **Node.js**, **Express.js**, and **MongoDB**. The project provides user authentication, account management, balance operations, and secure money transfers using JWT-based authentication.

---

## Features

- User Registration & Login
- JWT Authentication using HTTP-only Cookies
- Role-based Authorization (Admin/User)
- Create Bank Account
- Deposit & Withdraw Money
- Transfer Money Between Accounts
- Account Balance Inquiry
- Transaction History
- Idempotency Key Support to Prevent Duplicate Transactions
- Account Status Management (Active/Frozen/Closed)
- Secure Password Storage with bcrypt
- MongoDB & Mongoose Integration
- Express Middleware for Authentication & Authorization

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT
- **Password Hashing:** bcrypt
- **Environment Variables:** dotenv
- **Cookie Handling:** cookie-parser

---

## Project Structure

```text
src/
│── controllers/
│── middleware/
│── models/
│── routes/
│── config/
│── utils/
│── app.js
│── server.js
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/banking-api.git
```

Move into the project directory:

```bash
cd banking-api
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO=mongodb://127.0.0.1:27017/BANK
JWTSECRET=your_secret_key
```

Start the server:

```bash
npm start
```

For development:

```bash
npm run dev
```


## Security Features

- JWT Authentication
- HTTP-only Cookies
- Password Hashing using bcrypt
- Authorization Middleware
- Idempotency Keys for Safe Transactions
- Input Validation
- Protected Routes

---

## Future Improvements

- Email Verification
- Password Reset via OTP
- Daily Transaction Limits
- Beneficiary Management
- Account Statements (PDF)
- Swagger API Documentation
- Docker Support
- Unit & Integration Tests
- Rate Limiting
- Refresh Token Authentication

---

## Sample Response

```json
{
  "success": true,
  "message": "Transaction Successful",
  "data": {
    "transactionId": "64b7f...",
    "balance": 4500
  }
}
```

---

## Author

**Vineet Rathi**

GitHub: https://github.com/<vineet-rathee>

---

## License

This project is licensed under the MIT License.