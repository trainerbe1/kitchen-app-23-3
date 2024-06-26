import swaggerAutogen from 'swagger-autogen';

const swaggerAutogenApp = swaggerAutogen();

const doc = {
    info: {
        version: "1.0.0",
        title: "Cookbook API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Auth",
            "description": "Authentications"
        },
        {
            "name": "Areas",
            "description": "Areas"
        },
        {
            "name": "Shopping Lists",
            "description": "Shopping Lists"
        },
        {
            "name": "Shopping List Items",
            "description": "Shopping List Items"
        },
        {
            "name": "Recipes",
            "description": "Recipes"
        },
        {
            "name": "Meal Plans",
            "description": "Meal Plans"
        },
        {
            "name": "Favourites",
            "description": "Favourites"
        },
        {
            "name": "Users",
            "description": "Users"
        },
        {
            "name": "Categories",
            "description": "Categories"
        }
    ],
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Enter the token with the `Bearer: ` prefix, e.g. 'Bearer abcde12345'"
        }
    },
    definitions: {
        
    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/index.js']

swaggerAutogenApp(outputFile, endpointsFiles, doc);