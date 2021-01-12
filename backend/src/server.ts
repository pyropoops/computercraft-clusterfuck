import WebSocket, { Server } from "ws";
import AppTurtle from "./appturtle";
import express, { Express } from "express";
import cors from "cors";

const PORT: number = 1337;

// The list of turtles that are connected to my central server
export let turtles: AppTurtle[] = [];

// The list of functions that are able to be called via the express API or from turtles through socket
// the string param would be the name of the function (used to call this function)
// The second callback parameter is what happens when somebody calls a function on a specific turtle
let turtleFunctions: Record<string, (turtle: AppTurtle) => Promise<any>> = {};

// Creates the socket.io server for the turtle to connect to
function createServer(port: number): Server {
  let server: Server = new Server({ port: port });
  server.on("connection", registerTurtle);
  console.log(`Server listening on port ${port}`);
  return server;
}

// Registers turtle functions to the `turtleFunctions` variable
function registerTurtleFunction(
  name: string,
  callback: (turtle: AppTurtle) => Promise<any>
) {
  turtleFunctions[name] = callback;
}

// Creates the express application for the endpoint API
function createExpressServer(port: number): Express {
  let app = express();

  // CORS policy enabling
  app.use(cors());

  // Responds with a list of turtles connected, via their ID's
  app.get("/api/turtles", (req, res) => {
    res.send(JSON.stringify(turtles.map((turtle) => turtle.id)));
  });
  console.log(`Express application listening on port ${port}`);
  app.listen(port);
  return app;
}

let app = createExpressServer(6969);

// Function called when a turtle connects to the central server
function registerTurtle(socket: WebSocket) {
  // Instantiates turtle and pushes turtle to the `turtles` array`
  let turtle: AppTurtle = new AppTurtle(socket);
  turtles.push(turtle);

  // On close listener for the socket to handle disconnections
  socket.on("close", () => {
    let index = turtles.indexOf(turtle);
    if (index > -1) {
      turtles.splice(index, 1);
    }
  });

  // Registers Express API for the turtle
  app.get(`/api/turtles/${turtle.id}`, async (req, res) => {
    let exec: string = req.query.exec as string;
    if (exec && exec in turtleFunctions) {
      let callback = turtleFunctions[exec];
      let response = await callback(turtle);
      res.send(response);
      return;
    }
    res.status(400).send("That's not a function");
  });
}

// General function register (does not require a specific turtle, is general for all turtles)
function registerGeneralFunction(name: string, callback: () => Promise<any>) {
  app.get(`/api/functions/${name}`, async (req, res) => {
    res.status(200).send(await callback());
  });
}

// Creates server
createServer(PORT);

// Call this function to bind "functions" to both the "callFunction" method in minecraft.lua
// and the endpoint API
// i.e. http://localhost:6969/api/turtles/${turtle.id}?exec=dance
// That will run the "lilDance" function
registerTurtleFunction("dance", async (turtle) => {
  let right = false;
  console.log("Dance called");
  while (true) {
    right ? await turtle.turnRight() : await turtle.turnLeft();
    right = !right;
  }
});
