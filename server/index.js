const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { connectDB } = require("./config/db");
const schema = require("./schema/schema");

const app = express();

const { graphqlHTTP } = require("express-graphql");
connectDB();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, console.log(`server is runnign on PORT ${PORT} in http://localhost:${PORT}`));
