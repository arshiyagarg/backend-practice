import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import { assertAbstractType } from "graphql";

async function startServer() {
    const app = express();

    const typeDefs = `
        type Users {
            id: ID!
            name: String!
            username: String!
            email: String!
        }
        type Todo {
            userId: ID!
            id: ID!
            title: String!
            completed: Boolean
        }

        type Query {
            getTodos: [Todo]
            getUsers: [Users]
            getTodosId(id:ID!): [Todo]
        }

        type Mutation {
            createTodo(userId:ID!,id:ID!,title:String!): Todo
        }
    `

    const resolvers = {
        Query: {
            getTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
            getUsers: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
            getTodosId: async (_parent,{id}) => (await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)).data,
        },

        Mutation: {
            createTodo: async(_parent,{userId,id,title}) => {
                const response = await axios.post("https://jsonplaceholder.typicode.com/todos",{
                    userId,
                    id,
                    title
                })
                return response.data;
            }
        }
    }

    const server = new ApolloServer({ typeDefs, resolvers });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();
    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => {
        console.log("Server started at http://localhost:8000/graphql");
    });
}

startServer();