import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon> //se inyecta con @InjectModel pues no es un proveedor en el modulo
  ) { }


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (e) {
      this.handleExceptions(e, 'Pokemon no se creó, Error no controlado -> ver log en servidor');
    }

  }


  findAll() {
    return `This action returns all pokemon`;
  }


  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    //MongoId
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    //name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }
    if (!pokemon) throw new NotFoundException(`Pokemon no encontrado con term: ${term} `);

    return pokemon;
  }


  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (e) {
      this.handleExceptions(e, 'Pokemon no se actualizó, Error no controlado -> ver log en servidor');
    }
  }

  
  async remove(id: string) {
    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();
    //const result = await this.pokemonModel.findByIdAndDelete(id);

    const { deletedCount } = await this.pokemonModel.deleteOne({_id: id});
    if(deletedCount === 0) throw new BadRequestException(`Id: ${id} no funciona`);

    
  }


  // Excepciones noo controladas
  private handleExceptions(error: any, messageErrorNoKnowed?: string) {
    if (error.code === 11000) {
      throw new BadRequestException(`Caracteristica única presente en otro pokemon, 
                                    ${JSON.stringify(error.keyValue)}`);
    }
    console.log('Error en pokemon.service.ts: ', error);
    throw new InternalServerErrorException(`${messageErrorNoKnowed}`);
  }
}
