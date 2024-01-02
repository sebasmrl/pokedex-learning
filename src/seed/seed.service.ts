import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
    ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); //borrar todo

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemonsToInsert: {name:string, no:number}[]= []

     data.results.forEach(({ name, url})=>{ // async({ name, url})=>{
      const segment = url.split('/');
      const no = Number(segment[segment.length - 2]);
      pokemonsToInsert.push({name, no});
      //const pokemon = await this.pokemonModel.create({name, no});
    })

    //Hacer inserciones de manera simultanea
    await this.pokemonModel.insertMany(pokemonsToInsert);
  
    return 'Seed Executed';
  }
}
