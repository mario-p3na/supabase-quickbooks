export const createUpdateInvoiceTask = async (payload: any) => {
  const p = JSON.stringify(payload);
  console.log(`Processing payload`);
  console.log(JSON.stringify(payload));
  console.log(
    payload["eventNotifications"][0]["dataChangeEvent"]["entities"][0]
  );
  console.log(p);
};
