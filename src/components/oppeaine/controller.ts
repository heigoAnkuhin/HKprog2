import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import { uusOppeaine } from './interfaces';
import oppeaineService from './service';

const oppeaineController = {

    kuvaKoikOppeained: async (req: Request, res: Response) => {
        const oppeaine = await oppeaineService.kuvaKoikOppeained();
        return res.status(responseCodes.ok).json({
          oppeaine,
        });
      },

      otsiOppeainet: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }

        const oppeaine = await oppeaineService.otsiOppeainet(id);
        if (!oppeaine) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud õppeainet, mille id oleks: ${id}`,
          });
        }
        return res.status(responseCodes.ok).json({
          oppeaine,
        });
      },

      otsiOppeainet_oppejoud: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada õppejõu ID',
          });
        }
        const oppeaine = await oppeaineService.otsiOppeainet_oppejoud(id);
        if (!oppeaine) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud õppeainet, mille õppejõu id oleks: ${id}`,
          });
        }
        return res.status(responseCodes.ok).json({
          oppeaine,
        });
      },

      kustutaOppeaine:  async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        const oppeaine = await oppeaineService.otsiOppeainet(id);
        if (!oppeaine) {
          return res.status(responseCodes.badRequest).json({
            message: `Ei leitud õppeainet, mille id oleks: ${id}`,
          });
        }
        oppeaineService.kustutaOppeaine(id);
        return res.status(responseCodes.noContent).json({});
      },

      lisaOppeaine: async (req: Request, res: Response) => {
        const { aineNimi, oppejoud_id, koht_id, nadalapaev_id } = req.body;
        if (!aineNimi) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada aine nimetus',
          });
        }
        if (!oppejoud_id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada õppejõu ID',
          });
        }
        if (!koht_id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada koha ID',
          });
        }
        if (!nadalapaev_id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada nädalapäeva ID',
          });
        }
        const uusOppeaine: uusOppeaine = {
          aineNimi,
          oppejoud_id,
          koht_id,
          nadalapaev_id
        };
        const id = await oppeaineService.lisaOppeaine(uusOppeaine);
        return res.status(responseCodes.created).json({
          id,
        });
      },

      uuendaOppeainet: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        const { aineNimi, oppejoud_id, koht_id, nadalapaev_id } = req.body;
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        if (!aineNimi && !oppejoud_id && !koht_id && !nadalapaev_id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Pole midagi uuendada',
          });
        }
        const oppeaine = await oppeaineService.otsiOppeainet(id);
        if (!oppeaine) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud õppeainet, mille id oleks: ${id}`,
          });
        }
        
        oppeaineService.uuendaOppeainet({ id, aineNimi, oppejoud_id, koht_id, nadalapaev_id });
        return res.status(responseCodes.noContent).json({});
      },
};

export default oppeaineController;