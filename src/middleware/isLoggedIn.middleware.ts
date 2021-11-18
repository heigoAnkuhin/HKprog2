import { Request, Response, NextFunction } from 'express';
import jwtService from '../components/general/services/jwtService';
import responseCodes from '../components/general/responseCodes';

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return res.status(responseCodes.notAuthorized).json({
      error: 'Puudub vajalik token',
    });
  }
  const verified = await jwtService.verify(token);
  if (!verified) {
    return res.status(responseCodes.notAuthorized).json({
      error: 'Token ei ole valiidne',
    });
  }
  res.locals.kasutaja = verified;
  return next();
};

export default isLoggedIn;