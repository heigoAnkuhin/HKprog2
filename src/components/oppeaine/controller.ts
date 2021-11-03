import { Request, Response } from 'express';
import db from '../../db';
import responseCodes from '../general/responseCodes';
import oppeaineService from './service';

const oppeaineController = {

    kuvaKoikOppeained: (req: Request, res: Response) => {
        const oppeaine = oppeaineService.kuvaKoikOppeained();
        return res.status(responseCodes.ok).json({
          oppeaine,
        });
      },

      otsiOppeainet: (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }

        const oppeaine = oppeaineService.otsiOppeainet(id);
        if (!oppeaine) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud õppeainet, mille id oleks: ${id}`,
          });
        }
        return res.status(responseCodes.ok).json({
          oppeaine,
        });
      },

      kustutaOppeaine:  (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        const oppeaine = oppeaineService.otsiOppeainet(id);
        if (!oppeaine) {
          return res.status(responseCodes.badRequest).json({
            message: `Ei leitud õppeainet, mille id oleks: ${id}`,
          });
        }
        oppeaineService.kustutaOppeaine(id);
        return res.status(responseCodes.noContent).json({});
      },

      lisaOppeaine: (req: Request, res: Response) => {
        const { aineNimi } = req.body;
        if (!aineNimi) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada aine nimetus',
          });
        }
        const id = oppeaineService.lisaOppeaine(aineNimi);
        return res.status(responseCodes.created).json({
          id,
        });
      },

      uuendaOppeainet: (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        const { aineNimi } = req.body;
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        if (!aineNimi) {
          return res.status(responseCodes.badRequest).json({
            error: 'Pole midagi uuendada',
          });
        }
        const oppeaine = oppeaineService.otsiOppeainet(id);
        if (!oppeaine) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud õppeainet, mille id oleks: ${id}`,
          });
        }
        
        oppeaineService.uuendaOppeainet({ id, aineNimi });
        return res.status(responseCodes.noContent).json({});
      },
};

export default oppeaineController;