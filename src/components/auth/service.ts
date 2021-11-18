import kasutajaService from '../kasutaja/service';
import hashService from '../general/services/hashService';
import jwtService from '../general/services/jwtService';

const loginService = {
  login: async (kasutajaNimi: string, parool: string) => {
    const kasutaja = kasutajaService.otsiKasutajat_kasutajaNimi(kasutajaNimi);
    if (!kasutaja) return false;
    const match = await hashService.match(parool, kasutaja.parool);
    if (!match) return false;
    const token = await jwtService.sign(kasutaja);
    return token;
  }
}

export default loginService;
