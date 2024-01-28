import { InvoicesPayload } from "../constants/invoice";
import dotenv from "dotenv";

const QuickBooks = require("node-quickbooks");

import { upsertInvoice } from "../utils/upsertInvoice";

// Load environment variables
dotenv.config();

const getAuthenticatedQuickbooks = () => {
  return new QuickBooks(
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
};

const getAllInvoices = async (): Promise<InvoicesPayload> => {
  const quickbooks = getAuthenticatedQuickbooks();

  return new Promise((resolve, reject) => {
    quickbooks.findInvoices(
      {},
      (err: Error | null, invoices: { QueryResponse: {}; time: "" }) => {
        if (err) {
          reject(err);
        } else {
          resolve(invoices as InvoicesPayload);
        }
      }
    );
  });
};

const importInvoices = () => {
  getAllInvoices().then((invoices) => {
    if (invoices) {
      Object.keys(invoices.QueryResponse.Invoice).map((key) => {
        const invoice = invoices.QueryResponse.Invoice[key];

        upsertInvoice(invoice)
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      });
    }
  });
};

importInvoices();
