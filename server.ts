import express, { Request, Response } from "express";
import { run } from "graphile-worker";
import dotenv from "dotenv";
import { createUpdateInvoiceTask } from "./tasks/createUpsertInvoiceTask";

// Load environment variables
dotenv.config();

// Create a new express application instance
const app = express();
app.use(express.json());

// Define your webhook endpoint
app.post("/webhook", async (req: Request, res: Response) => {
  try {
    // Initialize the runner
    const runner = await run({
      connectionString: process.env.DB_CONNECTION_STRING || "",
      taskList: {
        createUpdateInvoiceTask: createUpdateInvoiceTask,
      },
    });

    // Add a job to the queue
    await runner.addJob("createUpdateInvoiceTask", req.body);

    res.status(200).send("Job added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while adding the job");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
