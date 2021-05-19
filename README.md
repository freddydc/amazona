# React E-Commerce Website

Welcome to my NodeJS and React e-commerce website using ( `MongoDB`, `React`, `NodeJS`, `ExpressJS` and `Docker` ).

## Run Locally

### 1. Clone Repo

```
git clone https://github.com/freddydc/amazona.git
```

### 2. Setup Backend And Frontend

Run `npm` command within the `root` folder to install development tools.

```
npm install
```

Run `npm` command within the `backend` to install tools and run server:

```
cd backend
```

```
npm install
```

```
npm start
```

Run `npm` command within the `frontend` to install tools and run frontend:

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

- Run this on chrome: http://localhost:5000/api/users/seed
- It returns admin `email` and `password`
- Run this on chrome: http://localhost:5000/api/products/seed
- It creates 6 sample `products`

## Run With Docker

### 1. Setup Docker

Run the `make` command within the `root` folder:

```
make up-dev
```
