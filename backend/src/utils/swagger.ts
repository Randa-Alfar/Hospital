import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Operation = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Auth Poroject",
            version: "1.0.0"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    schema: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                beaererAuth: [],
            }
        ],
        tags: [
            {
              name: "user-management",
              description: "user apis"
            },
            {
                name: "privilege-management",
                description: "privilege apis"
              }
           ]
    },
    apis: [`./src/components/**/**.openapi.yml`]
}

export default swaggerOptions;

