import { Component , Output, EventEmitter} from '@angular/core';
import { TextEditingService } from '../../../../../AppServices/TextEditing.services';
export interface Font
{
    value: string;
    viewValue: string;
}
export interface Size
{
    value: number;
    viewValue: string;
}
export interface Tile {
    color: string;
    cols: number;
    rows: number;
    position: number;
    IsSelected:boolean;
}
@Component(
    {
    selector: 'TextEditor',
    templateUrl: './../../../../../Views/Components/Tools/Entries/TextEditor_Component.html',
    styleUrls: ['./../../../../../Styles/Components/Tools/Entries/TextEditor_Component.scss'],
    providers:[],
    }
)
export class TextEditor 
{
    constructor(private texteditor:TextEditingService){
    }
    @Output() openSide = new EventEmitter<boolean>();
    change(state:boolean) {
      this.openSide.emit(state);
    }
    fonts: Font[] = [
        {value: 'Arial', viewValue: 'Arial'},
        {value: 'Segoe UI', viewValue: 'Segoe UI'},
        {value: 'Roboto', viewValue: 'Roboto'},
      ];
      sizes: Size[] = [
        {value: 1, viewValue: '1'},
        {value: 2, viewValue: '2'},
        {value: 3, viewValue: '3'},
        {value: 4, viewValue: '4'},
        {value: 5, viewValue: '5'},
        {value: 6, viewValue: '6'},
        {value: 7 ,viewValue: '7'},
      ]; 
      tiles: Tile[] = [
        {position: 1, cols: 1, rows: 1, color: 'black',IsSelected:true},
        {position: 2, cols: 1, rows: 1, color: 'brown',IsSelected:false},
        {position: 3, cols: 1, rows: 1, color: 'red',IsSelected:false},
        {position: 4, cols: 1, rows: 1, color: 'orange',IsSelected:false},

        {position: 5, cols: 1, rows: 1, color: 'yellow',IsSelected:false},
        {position: 6, cols: 1, rows: 1, color: 'green',IsSelected:false},
        {position: 7, cols: 1, rows: 1, color: 'lightblue',IsSelected:false},
        {position: 8, cols: 1, rows: 1, color: 'blue',IsSelected:false},

        {position: 9, cols: 1, rows: 1, color: 'violet',IsSelected:false},
        {position: 10, cols: 1, rows: 1, color: 'magenta',IsSelected:false},
        {position: 11, cols: 1, rows: 1, color: '#673AB7',IsSelected:false},
        {position: 12, cols: 1, rows: 1, color: '#DDdfF1',IsSelected:false},
      ];
      selectedFont=this.fonts[0].value;
      selectedSize=this.sizes[2].value;
      setStyle(command:string,value?:string)
      {
        this.texteditor.setStyle(command,value);
      }
}