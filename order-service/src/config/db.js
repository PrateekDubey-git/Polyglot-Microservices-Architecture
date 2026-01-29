// src/config/db.js
const { PrismaClient } = require('@prisma/client');   // ← back to this

const prisma = new PrismaClient();

module.exports = prisma;