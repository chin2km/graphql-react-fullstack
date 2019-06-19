import express from "express";
import expressGraphQL from "express-graphql";
import {SCHEMA} from "./schema"

const app = express();

app.use("/graphql", expressGraphQL({
    graphiql: true,
    schema: SCHEMA
}))

app.listen(3333, () => {
    console.log("http://localhost:3333/graphql");
})
