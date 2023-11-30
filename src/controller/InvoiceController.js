const InvoiceService = require("../service/InvoiceService.js");

async function createInvoice(req, res, next) {
  try {
    const { user } = req.JWT;
    await InvoiceService.createInvoice(req.body, user);
    res.json({
      message: "create invoice success",
    });
  } catch (error) {
    next(error);
  }
}

async function getAllInvoice(req, res, next) {
  try {
    const { user } = req.JWT;
    const invoices = await InvoiceService.getAllInvoice(user);
    res.json({
      message: "get all invoice success",
      data: { invoices },
    });
  } catch (error) {
    next(error);
  }
}

async function downloadInvoice(req, res, next) {
  try {
    const { user } = req.JWT;
    const invoices = await InvoiceService.downloadInvoice(req.params, user);
    res.download(invoices);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createInvoice,
  getAllInvoice,
  downloadInvoice,
};
