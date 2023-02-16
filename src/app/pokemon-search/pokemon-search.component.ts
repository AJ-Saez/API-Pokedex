import { style } from '@angular/animations';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit} from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})

export class PokemonSearchComponent implements OnInit{
  name!:string;
  cantidad:number=0;
  lista:string='';
  tarjeta:string='';
  mensaje:string=''
  display:string='ocultar'
  pokemons:any[]=[];
  pokemons_all:any[]=[]; 
  pokemons_tj:any[]=[];

  constructor( private dataservice: DataService){}

  ngOnInit(): void {

   
    this.dataservice.getPokemons()
    .subscribe((response:any)=>{
       response.results.forEach((result: { name: string; }) => {
       
        this.pokemons.push({'name':result.name});
        this.pokemons_all.push({'name':result.name});
      });
  });

  }
  
  filter(namePokemon:any){
    this.display='ocultar'
    this.name=namePokemon
  }

  aleatoria(){
    const aleatorio = this.pokemons_all[Math.floor(Math.random() * this.pokemons_all.length)];
    this.name=aleatorio.name
    this.search()
  }
  
  lister(){
    this.display='mostrar'
    this.pokemons=[]
    this.pokemons=this.pokemons_all.filter(x=>x.name.includes(this.name.toLowerCase()))
  }

  
  reset(){
    this.pokemons_tj=[]
    this.mensaje=''
    this.tarjeta=''
    this.cantidad=0 
    this.lista=''
  }
 
 
  search(){
      this.mensaje=''
      
       if(this.lista.includes(this.name.toLowerCase())) {
         this.mensaje='Ya eligio el pokemon: '+this.name
       }else if(this.cantidad>5){
     
        this.mensaje='Solo puede tener 6 pokemon'
    }else{

  
      this.dataservice.getMoreData(this.name.toLowerCase()).subscribe(
        (d:any) =>{

        this.cantidad=this.cantidad+1;

        let type='';
        let clase_fondo='';

        d.types.forEach((element: any) => {
          type=type+element.type.name.charAt(0).toUpperCase()+element.type.name.slice(1)+' '
        });
        switch ( d.types[0].type.name) {
          case 'fire':
            clase_fondo='rojo'
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

        
        this.pokemons_tj.unshift({
            'name':d.name.charAt(0).toUpperCase()+d.name.slice(1),
            'img':d.sprites.front_default,
            'height':d.height,
            'health':d.stats[0].base_stat,
            'atack':d.stats[1].base_stat,
            'types':type,
            'fondo':  clase_fondo});

        if(this.cantidad==6){
     
          this.tarjeta='listo-tarjeta'
          this.mensaje='Este es tu equipo pokemon '
        }

      },(error :any) =>{
      
        this.mensaje='El pokemon no existe'

      })
      this.name=''
    }
  }

}
