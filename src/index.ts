import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/connectDB";
import errorHandler from "./utils/errorHandler";
import allRoutes from "./routes/z.index.allroutes";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request,res:Response) => {
   res.send({
    message : "Server Health Is Okay!!!"
   })
})
app.use("/mern-food/api/v0/",allRoutes);
app.use(errorHandler);

app.listen(7000,() => {
  connectDB()
  .then(() => {
    console.log("Server started on localhost:7000");  
  })
  .catch((error) => {
    console.log("ERROR in Server Start")
  })


})