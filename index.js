'use strict'

const { graphql, buildSchema } = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const app = express()
const port = process.env.port || 3000

//Define schema
const schema = buildSchema(`
    type Query {
        "Returns hello to the world"
        hello: String
    }
`)

//Configure resolver
const resolvers = {
    hello: () => {
        return 'Hola Mundo'
    }
}

// Opt 2 resolvers
/* const resolvers = {
    hello: () => 'hola mundo',
    saludo: () => 'holatodos'
} */

//Exec query hello, this allow to exec in terminal
/* graphql(schema, '{ saludo, hello }', resolvers).then((data) => {
    console.log(data)
}) */

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    //IDE 
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/api`)
})