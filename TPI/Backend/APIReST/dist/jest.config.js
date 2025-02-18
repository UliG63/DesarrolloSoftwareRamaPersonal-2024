const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json', // Aquí apuntas al archivo tsconfig principal
        },
    },
    moduleNameMapper: {
        '^@shared/(.*)$': '<rootDir>/src/shared/$1', // Asegúrate de que los alias coincidan con tu estructura
    },
    moduleDirectories: ['node_modules', 'src'], // Resuelve módulos desde la carpeta src
    testMatch: ['**/src/testing/unit/**/*.test.ts', '**/?(*.)+(spec|test).ts'], // Ajusta según la estructura
    transform: {
        '^.+\\.ts$': 'ts-jest', // Asegura que ts-jest transforme archivos .ts
    },
    verbose: true, // Para obtener más detalles en la salida
};
export default config;
//# sourceMappingURL=jest.config.js.map