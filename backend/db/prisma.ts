// Import the right path for prisma client
// import { PrismaClient } from "../../node_modules/.prisma/client/index.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;