import { defineConfig } from "cypress";
import { recurse } from 'cypress-recurse'
import axios from "axios";

export default defineConfig({
  env: {
    apiUrl: "http://localhost:3001",
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportHeight: 900,
    viewportWidth: 1440,
    setupNodeEvents(on, config) {
      const testDataApiEndpoint = `${config.env.apiUrl}/testData`;
      on("task", {
        async "db:seed" () {
          // seed database with test data
          const { data } = await axios.post(`${testDataApiEndpoint}/seed`);
          return data;
        }
      });
    },
  },
});
