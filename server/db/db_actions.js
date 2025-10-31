import prisma from './db.js';

export async function createUser(data) {
  const user = await prisma.user.create({ data });
  return user;
}

export async function findUserByEmail(email) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}

export async function findUserById(id) {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
}
