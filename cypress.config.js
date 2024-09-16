const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    email:"jhonatanyamilcabezas@gmail.com",
    password: "Valorant123.com"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
