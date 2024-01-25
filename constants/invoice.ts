import { Database } from "../database.types";

export interface InvoiceObject {
  Invoice: Record<string, Database["public"]["Tables"]["invoices"]["Insert"]>;
  startPosition: number;
  maxResults: number;
  totalCount: number;
}

export interface InvoicesPayload {
  QueryResponse: InvoiceObject;
  time: string;
}
