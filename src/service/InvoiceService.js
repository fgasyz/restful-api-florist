const prismaClient = require("../application/database");
const NotFoundError = require("../exceptions/NotFoundError");
const ClientError = require("../exceptions/ClientError");
const generateInvoice = require("../utils/generateInvoice");
const { createInvoiceValidation } = require("../validation/invoiceValidation");
const validation = require("../validation/validation");

async function createInvoice(request, user) {
  const invoiceValidation = validation(createInvoiceValidation, request);
  let order, invoiceDetail;

  for (let i = 0; i < invoiceValidation.length; i++) {
    invoiceValidation[i].username_user = user;

    order = await prismaClient.order.findUnique({
      where: { id: invoiceValidation[i].order_id },
    });

    if (!order) {
      throw new ClientError(
        `order with id '${invoiceValidation[i].order_id}' is not found`
      );
    }
  }

  order = await prismaClient.order.findMany({
    where: { username_user: user },
    include: {
      cart: {
        include: {
          product: true,
        },
      },
    },
  });

  if (invoiceValidation.length != order.length) {
    throw new ClientError("order length is not match");
  }

  let total = order
    .map((item) => {
      return item.cart.total_price;
    })
    .reduce((a, b) => a + b);

  let items = order.map((item) => {
    return {
      item: item.cart.product.product_name,
      description: item.cart.product.description,
      quantity: item.cart.qty,
      price: item.cart.product.price,
      tax: "0%",
    };
  });

  const createInvoice = await prismaClient.invoice.create({
    data: {
      username_user: user,
    },
  });

  let year = createInvoice.date.getUTCFullYear();
  let month = createInvoice.date.toLocaleString([], { month: "long" });
  let date = createInvoice.date.getUTCDate();

  for (let i = 0; i < order.length; i++) {
    invoiceDetail = {
      shipping: {
        name: "Florist",
        address: "Jln. Pantai Nyiur Melambar",
        city: "Manggar",
        state: "Indonesia",
        country: "IDN",
        postal_code: 33511,
      },
      items,
      subtotal: total,
      total: total,
      order_number: `florist-${user}-${createInvoice.id}`,
      header: {
        company_name: "Florist",
        company_address: "Jln. Pantai Nyiur Melambai, Manggar",
      },
      footer: {
        text: "happy shopping!!",
      },
      currency_symbol: "Rp. ",
      date: {
        billing_date: `${date} - ${month} - ${year}`,
        due_date: `${date} - ${month} - ${year}`,
      },
    };
  }

  const invoicePath = await generateInvoice(invoiceDetail);

  await prismaClient.invoice.update({
    where: { id: createInvoice.id },
    data: { invoice_document: invoicePath },
  });
}

async function getAllInvoice(user) {
  const invoice = await prismaClient.invoice.findMany({
    where: { username_user: user },
  });
  return invoice;
}

async function downloadInvoice(request, user) {
  const invoiceId = parseInt(request.invoiceId);
  const invoice = await prismaClient.invoice.findFirst({
    where: { id: invoiceId, AND: { username_user: user } },
  });
  return invoice.invoice_document;
}

module.exports = {
  createInvoice,
  getAllInvoice,
  downloadInvoice,
};
