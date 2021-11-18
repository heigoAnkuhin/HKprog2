import bcrypt from 'bcrypt'; 

const saltRounds = 10; 
const hashService = {
  hash: async (parool: string): Promise<string> => {
    const hash = await bcrypt.hash(parool, saltRounds);
    return hash;
  },
  match: async (parool: string, hash: string): Promise<boolean> => {
    const match = await bcrypt.compare(parool, hash);
    return match;
  }
};

export default hashService;
