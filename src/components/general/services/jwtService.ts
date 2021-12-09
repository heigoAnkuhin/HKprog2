import jwt from 'jsonwebtoken';
import { Kasutaja } from '../../kasutaja/interfaces';
import { v4 as uuidv4 } from 'uuid';
import config from '../../../config';

const ajutineParool = uuidv4();

const jwtService = {
  sign: async (kasutaja: Kasutaja) => {
    const payload = {
      id: kasutaja.id,
      roll: kasutaja.roll,
    };
    const token = await jwt.sign(payload, config.jwtParool || ajutineParool, { expiresIn: '1h'});
    return token;
  },
  verify: async (token: string) => {
      try {
        const verify = await jwt.verify(token, config.jwtParool || ajutineParool);
        return verify;
      }
      catch (error) {
          console.log(error);
          return false;
      }
  },
}

export default jwtService;