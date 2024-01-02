import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data }= await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemons = data.results.map((p)=>{
      const segment = p.url.split('/');
      const no = segment[segment.length - 2];
      const pokemon = { no: Number(no),name: p.name }

      

      return pokemon;
    })

    return pokemons;
  }
}
