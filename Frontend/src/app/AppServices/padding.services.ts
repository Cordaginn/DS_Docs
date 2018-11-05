import {Injectable,} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { element } from 'protractor';

@Injectable()
export class PaddingService
{
    value:number[];
    observable:BehaviorSubject<number[]>;
    constructor()
    {
        this.observable = new BehaviorSubject<number[]>(this.value);
    }
    setPadding(paddingValue:number[])
    {
        this.value=paddingValue;
        var tmp =document.getElementById('editing_content');
        tmp.style.paddingLeft=this.value[0] +'px';
        tmp.style.paddingRight=(1140-this.value[1])+'px';
        this.observable.next(this.value);
    }
}