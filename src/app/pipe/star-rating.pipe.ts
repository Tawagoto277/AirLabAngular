import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {

  transform(rating : number): string {
    const maxStars = 5;
    let starsArray = [];

    for(let i=0 ; i< maxStars; i++){
      if( i < rating){
        starsArray.push('★');
      }else{
        starsArray.push('☆');
      }
    }

    return starsArray.join(' ');
  }
}
