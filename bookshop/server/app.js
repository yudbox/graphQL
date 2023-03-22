require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");
const { MONGO_USER_NAME, MONGO_PASSWORD } = process.env;

const app = express();
// console.log("111111111111 process", MONGO_USER_NAME, MONGO_PASSWORD);
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PASSWORD}@graphql-cluster.t1ftdao.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB!"));

mongoose.connection.once("open", () => {
  console.log("Connection to MongoDB is open");
  app.listen(4000, () => console.log("server started at port 4000"));
});
