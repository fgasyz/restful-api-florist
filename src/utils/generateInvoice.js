const niceInvoice = require("nice-invoice");
const { v4: uuidV4 } = require("uuid");
const fs = require("fs/promises");

async function generateInvoice(data) {
  let randomUUID = uuidV4();
  let invoice = `${__dirname}/../../src/invoices/invoice-${randomUUID}.pdf`;
  niceInvoice(data, invoice);
  return invoice;
}

module.exports = generateInvoice;
