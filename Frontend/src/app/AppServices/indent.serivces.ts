import {Injectable,} from '@angular/core';

@Injectable()
export class IndentService
{
    value:number;
    constructor()
    {
    }
    setIndent(indentValue:number,paddingValue?:number)
    {
        this.value=indentValue-paddingValue;
        var selection = document.getSelection().focusNode.parentElement.style.textIndent=this.value + 'px';
    }
    getIndent()
    {
    }
}