const mongoose = require("mongoose");
const Product = require("./models/Product"); // adjust if your model path is different

const MONGO_URI =
  "mongodb+srv://vukasintumbas:LeksiSmeksiVoliBelo1@ecommerce.y9uy4sm.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce"; // <-- update this

const products = [
  {
    name: "Nike Air Max",
    description: "Soft like clouds",
    price: 120,
    imageUrl: "https://mthorshop.com/cdn/shop/files/5_77.png?v=1715337048",
  },
  {
    name: "OG Kush",
    description: "For the chiller",
    price: 20,
    imageUrl:
      "https://highsocietypackaging.com/wp-content/uploads/2020/12/OG-KUSH.png",
  },
  {
    name: "Knife",
    description: "Better safe then sorry",
    price: 70,
    imageUrl: "https://pngimg.com/uploads/knife/knife_PNG106131.png",
  },
  {
    name: "Colombian Flour",
    description: "Great for baking",
    price: 100,
    imageUrl:
      "https://cdn.webshopapp.com/shops/225503/files/468342598/300x300x1/pan-pan-harina-pan-white-corn-flour-1kg.jpg",
  },
  {
    name: "Grey goose",
    description: "When we mourning",
    price: 180,
    imageUrl:
      "https://www.colonialspirits.com/wp-content/uploads/2021/04/Grey-Goose-1.75L.png",
  },
  {
    name: "Peugeot 206",
    description: "Need for speed",
    price: 500,
    imageUrl:
      "https://letsgotomontenegro.com/wp-content/uploads/2016/08/Peugeot-206-1-900x600.png",
  },
  {
    name: "Big 19",
    description: "For tricky situations",
    price: 300,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/Glock_19_Generation_4-removebg.png",
  },
  {
    name: "Balaclava",
    description: "Stay hidden",
    price: 30,
    imageUrl:
      "https://ecdn.speedsize.com/96646a73-11d1-4ec5-a14d-66bc51e8738d/https://stellar.centracdn.net/client/dynamic/images/487_00484bf1f0-201black-01-u-free-balaclava-full_nobg.jpg",
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
