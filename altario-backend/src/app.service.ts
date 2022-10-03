/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCode(bias = ""): [string, string[][]] {
  
    const date = new Date().toTimeString().split(' ')[0];
    const seconds = date.slice(-2);

    const grid = AppService.generateGrid( bias );
    var code = this.countMatches(parseInt(seconds[0]),parseInt(seconds[1]), grid);

    var result: [string,string[][]] = [code, grid];

    return result;
  }

  countMatches(c1: number, c2: number, matrix: string[][]): string{
    
    const char1 = matrix[c1][c2];
    const char2 = matrix[c2][c1];

    let matchC1 = 0;
    let matchC2 = 0;
    
    for(let i = 0; i < matrix.length; i++) {
      const array = matrix[i];
      for(let j = 0; j < array.length; j++) {
          if(matrix[i][j] === char1){
            matchC1++;
          }
          if(matrix[i][j] === char2)
          matchC2++;
      }
    }
    if (matchC1 > 9){
      matchC1 = AppService.divideByLowestIntegerPossible(matchC1);  
    }
    if (matchC2 > 9){
      matchC2 = AppService.divideByLowestIntegerPossible(matchC2);  
    }
    
    return matchC1.toString() + matchC2.toString();
  }

  static divideByLowestIntegerPossible(match: number): number{
    let count = 2;
    while(count <= match){
      if(match / count < 9 && match % count == 0 ){ 
        return match/count;
      }
      count++;
    }
  }  

  static generateGrid(bias:string): string[][]{
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var grid : string[][] = [...Array(10)].map(() => Array(10));

    //Generate bias
    if(bias !== ""){
      for (let i = 0; i < 25;) {
        const posX = Math.floor(Math.random() * (10));
        const posY = Math.floor(Math.random() * (10));
        
        if ( grid[posX][posY] !== bias){
          grid[posX][posY] = bias;
          i++;
        }
      }
    }    
    
    //Generate grid
    for(let i = 0; i < grid.length; i++) {
      const array = grid[i];
      for(let j = 0; j < array.length; j++) {
        if(array[j] !== bias){
          const index =  Math.floor(Math.random() * (26));
          array[j] = characters.charAt(index);
        }
      }
    }    
  
    return grid;
  }
}