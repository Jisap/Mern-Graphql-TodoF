import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import http from 'http';
import { CLIENT_RENEG_LIMIT } from 'tls';


export async function startApolloServer(typeDefs, resolvers){

    const app = express();                      // Aplicación express para gestión de peticiones
    const httpServer = http.createServer(app);  // Creamos un servidor http que acepta peticiones de app

    
    const server = new ApolloServer({           // Servidor de aplicaciones graphql
        typeDefs,
        resolvers
    });
    
    await server.start();                       // Iniciamos el servidor apollo    
    
    app.use('/graphql',cors(), express.json(), expressMiddleware(server)); // Express usa un endpoint para iniciarse y los
                                                                           // middlewares para su funcionamiento y gestión

    await new Promise( resolve => httpServer.listen(4000, resolve));
    console.log("Apollo Server is running at port 4000");

}