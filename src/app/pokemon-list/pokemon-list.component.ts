import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent implements OnInit {

  pokemons:any[]=[];
 /* Pokemons: number; */



  constructor(
    private dataService: DataService
  ){}




    ngOnInit():void{
      this.dataService.getPokemons()
      .subscribe((response:any)=>{
        /* this.totalPokemons=response.count; */

        response.results.forEach((result: { name: string; }) => {
          this.dataService.getMoreData(result.name)
          .subscribe((response:any)=>{
            /* this.pokemons.push(response); */
            let type='';
            let clase_fondo='';
            response.types.forEach((element: any) => {
              type=type+element.type.name.charAt(0).toUpperCase()+element.type.name.slice(1)+' '
            });

            switch ( response.types[0].type.name) {
              case 'fire':
                clase_fondo='fuego'
                break;
              case 'water':
                clase_fondo='azul'
                break;
              case 'grass':
                clase_fondo='verde'
                break
              case 'poison':
                clase_fondo='rosa'
                break
              case 'bug':
                clase_fondo='negro'
                break
              case 'flying':
                clase_fondo='azul__claro'
                break
              case 'normal':
                clase_fondo='naranja'
                break
              case 'fairy':
                clase_fondo='rosa__claro'
                break
              case 'psychic':
                clase_fondo='verde__claro'
                break
              case 'electric':
                clase_fondo='amarillo'
                break
            }


            this.pokemons.push({
                'name':response.name.charAt(0).toUpperCase()+response.name.slice(1),
                'img':response.sprites.front_default,
                'height':response.height,
                'health':response.stats[0].base_stat,
                'atack':response.stats[1].base_stat,
                'types':type ,
                'fondo': clase_fondo});


          })
        });
      });
    }
  }




