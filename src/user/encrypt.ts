import * as bcrypt from 'bcrypt';

export class Encrypt {
  async savePasswordHash(password: string): Promise<string> {
    console.log(password);
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    
    return hashedPassword;
  }

  async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
