const express = require("express");
const graphqlHTTP = require('express-graphql')
const mongoose = require("mongoose")
const schema = require("./schema/schema");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/graph-ql", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once("open", () => {
    console.log('connection has been created successfully');
})
mongoose.connection.on("error", () => {
    console.log('Sorry database is not connted');
})

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(4000, () => {
    console.log('Now listing for requests on port 4000');
})