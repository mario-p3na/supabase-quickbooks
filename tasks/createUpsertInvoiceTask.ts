import dotenv from "dotenv";

import { upsertInvoice } from "../utils/upsertInvoice";

const QuickBooks = require("node-quickbooks");

dotenv.config();

export const createUpdateInvoiceTask = async (payload: any) => {
  try {
    if (payload) {
      const qbo = new QuickBooks(
        process.env.QUICKBOOKS_CLIENT_ID,
        process.env.QUICKBOOKS_CLIENT_SECRET,
        process.env.QUICKBOOKS_OAUTH_TOKEN,
        false,
        process.env.QUICKBOOKS_REALM_ID,
        true,
        true,
        null,
        "2.0",
        process.env.QUICKBOOKS_REFRESH_TOKEN
      );

      payload.eventNotifications.map((eventNotification: any) => {
        eventNotification.dataChangeEvent.entities.map((entity: any) => {
          if (entity.operation === "Update" && entity.name === "Invoice") {
            // Get the invoice from QuickBooks
            qbo.getInvoice(entity.id, (err: any, invoice: any) => {
              if (err) {
                console.log(err);
              } else {
                upsertInvoice(invoice);
              }
            });
          }
        });
      });
    }
  } catch (err) {
    console.log(`Error while attempting to update record: ${err}`);
  }
};
