const prismaClient = require("../application/database");
const NotFoundError = require("../exceptions/NotFoundError");
const generateInvoice = require("../utils/generateInvoice");
const { createInvoiceValidation } = require("../validation/invoiceValidation");
const validation = require("../validation/validation");

async function createInvoice(request, user) {
  const invoiceValidation = validation(createInvoiceValidation, request);
  let order, cart, invoiceDetail;

  for (let i = 0; i < invoiceValidation.length; i++) {
    invoiceValidation[i].username_user = user;

    order = await prismaClient.order.findMany({
      where: { username_user: user },
    });

    if (invoiceValidation.length != order.length) {
      throw new ClientError("order length is not match");
    }

    order = await prismaClient.order.findMany({
      where: { username_user: user },
    });
    if (!order) {
      throw new NotFoundError(
        `order with id ${invoiceValidation[i].order_id} is not found`
      );
    }
    cart = await prismaClient.cart.findMany({
      where: { username_user: user },
      include: {
        product: true,
      },
    });
  }

  console.log(cart);

  let total = cart
    .map((item) => {
      return item.total_price;
    })
    .reduce((a, b) => a + b);

  console.log(total);

  let items = cart.map((item) => {
    return {
      item: item.product.product_name,
      description: item.product.description,
      quantity: item.qty,
      price: item.product.price,
      tax: "0%",
    };
  });

  const createInvoice = await prismaClient.invoice.create({
    data: {
      username_user: user,
    },
  });

  let year = createInvoice.date.getFullYear();
  let month = createInvoice.date.getMonth();
  let date = createInvoice.date.getDate();

  for (let i = 0; i < cart.length; i++) {
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
        text: "terima kasih telah berbelanja di toko bunga kami",
      },
      currency_symbol: "Rp. ",
      date: {
        billing_date: `${date} - ${month} - ${year}`,
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
