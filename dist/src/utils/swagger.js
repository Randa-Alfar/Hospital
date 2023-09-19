"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerOptions = {
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
};
exports.default = swaggerOptions;
