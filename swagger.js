const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Hand crafted API',
    description: 'Products & Reviews'
  },
  /* host: 'localhost:4000/api/products',
  schemes: ['http'], */
  host: 'wdd430-group-project-backend.onrender.com/api/products',
  schemes: ['https'],
};

// Output file
const outputFile = './swagger-output.json';

// List of route files to include in Swagger
const endpointsFiles = [
  './routes/products.js' // <-- add your courses routes here
];

// Generate swagger-output.json
swaggerAutogen(outputFile, endpointsFiles, doc);
