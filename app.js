const express = require("express");
const config = require("config");
const mainRouter = require("./routes/index.routes");
const error_handling_middleware = require("./middleware/error_handling_middleware");

const PORT = config.get("port") || 3030;

const app = express();

app.use(express.json());

app.use("/api", mainRouter);
app.use(error_handling_middleware);
async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Error in server: ", error);
    }
}

start();
