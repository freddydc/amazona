# Commerce Website

Welcome to e-commerce website using ( `MongoDB`, `React`, `ExpressJS` and `Node.js`).

## Locally

### 1. Clone Repo

```
git clone https://github.com/freddydc/amazona.git
```

### 2. Set Up Development Tools

Run `npm install` inside root.

```
npm install
```

### 3. Set Up Server

Run `npm install` inside backend:

```
cd backend
```

```
npm install
```

```
npm start
```

### 4. Set Up Storefront

Run `npm install` inside frontend:

```
cd frontend
```

```
npm install
```

```
npm start
```

### 3. Seed Users And Products

-   Run this on browser: http://localhost:5000/api/users/seed
-   It returns admin `email` and `password`
-   Run this on browser: http://localhost:5000/api/products/seed
-   It creates 6 sample `products`

## Docker

### 1. Start Services

Run `make up` inside root to start services:

```
make up
```
