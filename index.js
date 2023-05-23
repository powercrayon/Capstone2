const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const tourRoutes = require("./routes/tourRoutes");
const orderRoutes = require("./routes/orderRoutes")

const app = express();

mongoose.connect("mongodb+srv://admin:admin123@zuiit.mgyqbdp.mongodb.net/Tour_Booking?retryWrites=true&w=majority",
	{
		useNewUrlParser : true,
		useUnifiedTopology : true
	}	
);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => console.log("We're connected to the cloud database"))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/user", userRoutes);
app.use("/tour", tourRoutes);
app.use("/order", orderRoutes)

app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${process.env.PORT || 4000}`);
});