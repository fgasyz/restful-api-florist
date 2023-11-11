const validate = require("../validation/validation.js");
const {
  createAdminValidation,
  loginAdminValidation,
  refreshTokenValidation,
} = require("../validation/adminValidation.js");
const bcrypt = require("bcrypt");
const prismaClient = require("../application/database.js");
const AuthenticationError = require("../exceptions/AuthenticationError.js");
const {
  generateAcccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/token.js");

async function registerAdmin(request) {
  const adminValidation = validate(createAdminValidation, request);
  const admin = await prismaClient.admin.findFirst({
    where: { username: adminValidation.username },
  });
  if (admin) throw new AuthenticationError("username is exist");
  const hash = await bcrypt.hash(request.password, 10);
  adminValidation.password = hash;
  const data = await prismaClient.admin.create({
    data: {
      username: adminValidation.username,
      no_hp: adminValidation.no_hp,
      password: adminValidation.password,
    },
  });
  return data;
}

async function loginAdmin(request) {
  const adminValidation = validate(loginAdminValidation, request);
  const admin = await prismaClient.admin.findFirst({
    where: { username: adminValidation.username },
  });
  if (!admin) throw new AuthenticationError("incorrect username");
  const isMatch = await bcrypt.compare(
    adminValidation.password,
    admin.password
  );
  if (!isMatch) throw new AuthenticationError("incorrect password");
  const payload = { admin: admin.username, role: "admin" };
  const accessToken = await generateAcccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);
  const insertToken = await prismaClient.admin.update({
    where: {
      username: admin.username,
    },
    data: {
      refresh_token: refreshToken,
    },
  });
  const data = { insertToken, accessToken };
  return data;
}

async function generateRefreshTokenForLogin(requestToken) {
  const refreshTokenValidate = validate(
    refreshTokenValidation,
    requestToken.refreshToken
  );
  const refreshTokenVerify = await verifyRefreshToken(refreshTokenValidate);
  const token = await prismaClient.admin.findFirst({
    where: { username: refreshTokenVerify.admin },
  });
  const payload = { admin: token.username, role: "admin" };
  const accessToken = await generateAcccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);
  const updateRefreshTokenVerify = await verifyRefreshToken(refreshToken);
  const data = await prismaClient.admin.update({
    where: {
      username: updateRefreshTokenVerify.admin,
    },
    data: {
      refresh_token: refreshToken,
    },
  });
  return { data, accessToken };
}

module.exports = { registerAdmin, loginAdmin, generateRefreshTokenForLogin };
