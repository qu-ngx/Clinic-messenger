// Import the right path for prisma client
import { PrismaClient } from "../../node_modules/.prisma/client/index.js";

const prisma = new PrismaClient();

export default prisma;