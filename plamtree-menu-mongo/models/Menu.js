import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const GroupSchema = new mongoose.Schema({
  name: String,
  items: [ItemSchema],
});

const MenuSchema = new mongoose.Schema({
  restaurantName: String,
  logo: String,
  background: String,
  groups: [GroupSchema],
});

export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema);
