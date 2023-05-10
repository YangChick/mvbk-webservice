import { PrismaClient } from '@prisma/client';
import { user } from 'initial/user.initial';
const prisma = new PrismaClient();
async function main() {
  await prisma.typeSeat.create({
    data: {
      id: '244d9d6c-6c95-4dc2-a9cc-db1f3a4b9f36',
      name: 'couple',
      price: '90000',
    },
  });
  await prisma.typeSeat.create({
    data: {
      id: '4d7707f0-277c-4dbe-a7f9-eef763a3faf8',
      name: 'normal',
      price: '45000',
    },
  });
  await prisma.user.create({
    data: {
      id: '9d0e774d-302b-4e33-976c-dd0543a2e875',
      email: 'admin@mv-booking.com',
      username: 'Admin',
      password: '123456',
      confirmPassword: '123456',
      roleCode: 'ADMIN',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
