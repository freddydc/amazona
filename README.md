# React E-Commerce Website

Welcome to NodeJS and React e-commerce website using ( `MongoDB`, `React`, `NodeJS`, `ExpressJS` and `Docker` ).

## Run Locally

### 1. Clone Repo

```
git clone https://github.com/freddydc/amazona.git
```

### 2. Setup Backend And Frontend

Run `npm install` inside `root` to install necessary development tools.

```
npm install
```

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

-   Run this on chrome: http://localhost:5000/api/users/seed
-   It returns admin `email` and `password`
-   Run this on chrome: http://localhost:5000/api/products/seed
-   It creates 6 sample `products`

## Run Docker

### 2. Run Services

Run `make up` inside `root` to start services:

```
make up
```
