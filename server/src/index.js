const initExpress = require("./initExpress");
const initRoutes = require("./initRoutes");

const server = initExpress();
initRoutes(server);
