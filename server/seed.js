const mongoose = require("mongoose");
const Product = require("./models/Product"); // adjust if your model path is different

const MONGO_URI =
  "mongodb+srv://vukasintumbas:LeksiSmeksiVoliBelo1@ecommerce.y9uy4sm.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce"; // <-- update this

const products = [
  {
    name: "Nike Air Max",
    description: "Soft like clouds",
    price: 120,
    imageUrl: "https://m.media-amazon.com/images/I/31x0LrJ16JL._AC_.jpg",
  },
  {
    name: "OG Kush",
    description: "For the chiller",
    price: 20,
    imageUrl:
      "https://slapsta.com/cdn/shop/products/og-kush-mylar-pouches-pre-labeled-739221.jpg?v=1642875115",
  },
  {
    name: "Knife",
    description: "Better safe then sorry",
    price: 70,
    imageUrl:
      "https://cdn.abicart.com/shop/ws89/60789/art89/h9200/154959200-origpic-041a5a.jpg?max-width=1440&max-height=1440&quality=70&fmt=webp",
  },
  {
    name: "Colombian Flour",
    description: "Great for baking",
    price: 100,
    imageUrl:
      "https://www.drakfrukt.se/wp-content/uploads/2022/07/Majsmjol1kg.jpg",
  },
  {
    name: "Grey goose",
    description: "When we mourning",
    price: 180,
    imageUrl:
      "https://www.dryckeslaget.com/tuotekuvat/1200x1200/Grey_Goose_Vodka_40_070_l.jpg",
  },
];

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Product.deleteMany(); // clear old data
    await Product.insertMany(products);
    console.log("🌱 Database seeded!");
    mongoose.disconnect();
  })
  .catch((err) => console.error("❌ Seeding error:", err));
