import { Request, Response } from 'express';
import loginService from './service';
import responseCodes from '../general/responseCodes';

const authController = {
  login: async (req: Request, res: Response) => {
    const { kasutajaNimi, parool } = req.body;
    const token = await loginService.login(kasutajaNimi, parool);
    if(!token) {
      return res.status(responseCodes.notAuthorized).json({
        error: 'Kontrolli kasutajanime või parooli',
      });
    }
    return res.status(responseCodes.ok).json({
      token
    });
  },
}

export default authController;
