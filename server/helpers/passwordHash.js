import bcrypt from 'bcrypt';

class Password {
  static async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  static comparePassword(password, hashedPassword) {
    const result = bcrypt.compareSync(password, hashedPassword);
    return result;
  }
}
export default Password;
