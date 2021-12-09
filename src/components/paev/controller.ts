import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import { uusPaev } from './interfaces';
import paevService from './service';

const paevController = {

    kuvaKoikPaevad: async (req: Request, res: Response) => {
        const nadalapaev = await paevService.kuvaKoikPaevad();
        return res.status(responseCodes.ok).json({
          nadalapaev,
        });
      },

      otsiPaeva: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }

        const nadalapaev = await paevService.otsiPaeva(id);
        if (!nadalapaev) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud päeva, mille id oleks: ${id}`,
          });
        }
        return res.status(responseCodes.ok).json({
          nadalapaev,
        });
      },

      kustutaPaev:  async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        const nadalapaev = await paevService.otsiPaeva(id);
        if (!nadalapaev) {
          return res.status(responseCodes.badRequest).json({
            message: `Ei leitud päeva, mille id oleks: ${id}`,
          });
        }
        paevService.kustutaPaev(id);
        return res.status(responseCodes.noContent).json({});
      },

      lisaPaev: async (req: Request, res: Response) => {
        const { paevaNimi } = req.body;
        if (!paevaNimi) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada nädalapäev',
          });
        }
        const uusPaev: uusPaev = {
          paevaNimi,
        };
        const id = await paevService.lisaPaev(uusPaev);
        return res.status(responseCodes.created).json({
          id,
        });
      },
      uuendaPaeva: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        const { paevaNimi } = req.body;
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        if (!paevaNimi) {
          return res.status(responseCodes.badRequest).json({
            error: 'Pole midagi uuendada',
          });
        }
        const nadalapaev = await paevService.otsiPaeva(id);
        if (!nadalapaev) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud päeva, mille id oleks: ${id}`,
          });
        }
        
        paevService.uuendaPaeva({ id, paevaNimi });
        return res.status(responseCodes.noContent).json({});
      },
};

export default paevController;