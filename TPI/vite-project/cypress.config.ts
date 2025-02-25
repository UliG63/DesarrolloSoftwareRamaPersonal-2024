import { defineConfig } from 'cypress';
import 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,      
    json: true,        
    reportsDir: 'reports',  
    reportFilename: 'my-test-report', 
    overwrite: false, 
  },
  e2e: {
    setupNodeEvents(on, config) {
      //require('cypress-mochawesome-reporter/plugin')(on);   
    },
    baseUrl: 'http://localhost:5173', 
    viewportWidth: 1280,
    viewportHeight: 800
  },
});

