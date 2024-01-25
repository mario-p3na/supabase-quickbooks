import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

import { Database } from "../database.types";

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);

export const upsertInvoice = async (
  invoice: Database["public"]["Tables"]["invoices"]["Insert"]
) => {
  const { data, error } = await supabaseClient
    .from("invoices")
    .select("Id")
    .eq("Id", invoice.Id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    // If the invoice does not exist, insert it
    const { error } = await supabaseClient.from("invoices").insert([invoice]);

    if (error) {
      throw error;
    } else {
      console.log(`Inserted invoice ${invoice.Id}`);
    }
  } else {
    // If the invoice exists, update it
    const { error } = await supabaseClient
      .from("invoices")
      .update(invoice)
      .match({ Id: invoice.Id });

    if (error) {
      throw error;
    } else {
      console.log(`Updated invoice ${invoice.Id}`);
    }
  }
};
