import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { SearchQuote } from 'src/app/models';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  @Input()
  updatedQuotes: SearchQuote[] =[]

  form!: FormGroup
  lineItems!: FormArray

  quoteList: SearchQuote[] = []

  constructor() { }

  ngOnInit(): void {
    console.log("HIT")
    console.log(this.updatedQuotes)
    this.quoteList = this.updatedQuotes;
  }

  removeItem(i: number) {
    this.lineItems.removeAt(i)
  }

}
