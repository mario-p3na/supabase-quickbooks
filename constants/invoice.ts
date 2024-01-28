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

export interface ChangeEventEntity {
  name: string;
  id: number;
  operation: string;
  lastUpdated: string;
}

export interface dataChangeEvent {
  entities: ChangeEventEntity[];
}
export interface EventNofication {
  realmId: string;
  dataChangeEvent: dataChangeEvent;
}

export interface EventNotificationPayload {
  eventNotifications: EventNofication[];
}
