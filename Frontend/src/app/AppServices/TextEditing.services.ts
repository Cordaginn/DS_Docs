import {Injectable} from '@angular/core';

@Injectable()
export class TextEditingService
{
    constructor()
    {
    }
    setStyle(command:string,value?:string)
    {
        var result=document.execCommand(command,false,value);
    }
}