import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ministerio de Magia API',
            version: '1.2.1',
            description: 'API para administrar el patentamiento y visualizacion de hechizos del Ministerio de Magia',
            contact: [
                {
                    name: 'Dorigoni Mauro',
                    email: 'dorigonimauro@gmail.com'
                },
                {
                    name: 'Gelmetti Lucia',
                    email: 'luligelmetti@gmail.com'
                },
                {
                    name: 'Gimenez Ulises',
                    email: 'uli.gmnz@gmail.com'
                }
            ],
            servers: [{
                url: `http://localhost:${process.env.PORT}/`,
                description: 'Local server'
            },
            {
                url: 'algoalgo//algoalgo.com',
                description: 'Server prod'
            }
        ]
        }
    },
    apis: ['./**/*.routes.ts']
};

const specs = swaggerJsdoc(options);
export default specs;