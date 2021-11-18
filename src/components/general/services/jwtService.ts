import jwt from 'jsonwebtoken';
import { Kasutaja } from '../../kasutaja/interfaces';

const jwtParool = 'ananasijsdöwertyuio765';

const jwtService = {
  sign: async (kasutaja: Kasutaja) => {
    const payload = {
      id: kasutaja.id,
      roll: kasutaja.roll,
    };
    const token = await jwt.sign(payload, jwtParool, { expiresIn: '1h'});
    return token;
  },
  verify: async (token: string) => {
      try {
        const verify = await jwt.verify(token, jwtParool);
        return verify;
      }
      catch (error) {
          console.log(error);
          return false;
      }
  },
}

export default jwtService;