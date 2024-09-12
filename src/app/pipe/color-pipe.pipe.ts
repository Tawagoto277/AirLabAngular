import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'color'
})
export class ColorPipePipe implements PipeTransform {

  constructor (private sanitizer: DomSanitizer) { }

  private colori: any = {
    "arancione": "#FFA500",
    "argento": "#C0C0C0",
    "bianco": "#FFFFFF",
    "bianco/nero": ["#FFFFFF", "#000000"],
    "bianco/rosso": ["#FFFFFF", "#FF0000"],
    "blu": "#0000FF",
    "blu/rosso": ["#0000FF", "#FF0000"],
    "blu/verde": ["#0000FF", "#008000"],
    "grigio": "#808080",
    "grigio/arancione": ["#808080", "#FFA500"],
    "grigio/blu": ["#808080", "#0000FF"],
    "nero": "#000000",
    "nero/bianco": ["#000000", "#FFFFFF"],
    "nero/giallo": ["#000000", "#FFFF00"],
    "nero/grigio": ["#000000", "#808080"],
    "nero/rosso": ["#000000", "#FF0000"],
    "oro": "#FFD700",
    "rosso": "#FF0000",
    "rosso/bianco": ["#FF0000", "#FFFFFF"],
    "rosso/nero": ["#FF0000", "#000000"],
    "verde": "#008000"
  };

  transform(colorName: string): any {
    const color = this.colori[colorName.toLowerCase()];

    if (!color) {
      return colorName;
    }

    if (typeof color === 'string') {
      const html = `<span style="border: 1px solid black; border-radius: 50%; display: inline-block; width: 20px; height: 20px; background-color: ${color};"></span> ${colorName}`;
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    let colorSquares = color.map((c: string) => 
      `<span style="border: 1px solid black; border-radius: 50%; display: inline-block; width: 20px; height: 20px; background-color: ${c};"></span>`
    ).join('');

    const html = `${colorSquares} ${colorName}`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
