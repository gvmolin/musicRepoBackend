import * as bcrypt from 'bcrypt';

export async function generateHash(password: string) {
  return await bcrypt.hash(password, parseInt(process.env.SALT));
}

export async function validateHash(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
