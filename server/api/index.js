const express = require("express");
const connectDB = require("./utils/connectDB");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const env = process.env.REACT_APP_NODE_ENV || "production";

// Middleware for parsing JSON
// app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Explicitly allow your frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies if necessary
  })
);

app.use((req, res, next) => {
  console.log(`CORS Request Origin: ${req.headers.origin}`);
  next();
});

// MongoDB Connection
connectDB();

// Swagger setup

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description: "API documentation for your Express app",
    },
    tags: [{ name: "EventController", description: "Event endpoints" }],
    servers: [
      {
        url:
          env === "production"
            ? `https://convergent.onrender.com`
            : `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./server/api/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Dynamic route loading
const routesPath = path.join(__dirname, "routes");
fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const route = require(`./routes/${file}`);
    const routeName = file.replace(".js", "");
    app.use(`/api/${routeName}`, route);
  }
});

// Root redirect to Swagger UI
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Start the server with dynamic port fallback
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});

// Handle EADDRINUSE error and fallback to another port
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.warn(`Port ${PORT} is already in use. Trying another port...`);
    const newPort = PORT + 1;
    app.listen(newPort, () => {
      console.log(`Server is now running on http://localhost:${newPort}`);
      console.log(`API docs available at http://localhost:${newPort}/api-docs`);
    });
  } else {
    console.error("Server error:", error);
  }
});

module.exports = app;
