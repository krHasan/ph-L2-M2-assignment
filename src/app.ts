import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRouters } from "./app/modules/product/product.route";
const app: Application = express();
const port = 3000;

//parsers
app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRouters);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.all("*", (req: Request, res: Response) => {
    res.status(400).json({
        success: false,
        message: "Route is not found",
    });
});

export default app;
