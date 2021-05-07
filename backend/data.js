//? BcryptJS library for 'encrypt plain text password' in mongodb.
import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Felipe Cast",
      email: "admin@example.com",
      password: bcrypt.hashSync("admin123", 8),
      isAdmin: true,
    },
    {
      name: "John Stars",
      email: "user@example.com",
      password: bcrypt.hashSync("user123", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      _id: "1",
      name: "Canon C70",
      category: "cameras",
      image: "/images/camera-p1.jpg",
      price: 800,
      countInStock: 22,
      brand: "Canon",
      rating: 3.6,
      numReviews: 310,
      description: "High quality Camera C70",
    },
    {
      _id: "2",
      name: "Adidas Pants",
      category: "Pants",
      image: "/images/pants-p2.jpg",
      price: 60,
      countInStock: 8,
      brand: "Adidas",
      rating: 4,
      numReviews: 167,
      description: "High quality Adidas Pants",
    },
    {
      _id: "3",
      name: "Nike Shoes",
      category: "Shoes",
      image: "/images/shoes-p3.jpg",
      price: 20,
      countInStock: 18,
      brand: "Nike",
      rating: 4,
      numReviews: 108,
      description: "High quality Nike Shoes",
    },
    {
      _id: "4",
      name: "Zara Shirt",
      category: "Shirt",
      image: "/images/shirt-p4.jpg",
      price: 30,
      countInStock: 24,
      brand: "Zara",
      rating: 3.5,
      numReviews: 87,
      description: "High quality Zara Shirt",
    },
    {
      _id: "5",
      name: "Air Pods Max",
      category: "Air Pods",
      image: "/images/air-pods-p5.jpg",
      price: 270,
      countInStock: 0,
      brand: "Apple",
      rating: 5,
      numReviews: 296,
      description: "High quality Air Pods Max",
    },
    {
      _id: "6",
      name: "Apple Watch Nike",
      category: "Watch",
      image: "/images/watch-p6.jpg",
      price: 470,
      countInStock: 20,
      brand: "Apple",
      rating: 4.5,
      numReviews: 120,
      description: "High quality Apple Watch Nike",
    },
  ],
};

export default data;
