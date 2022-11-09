import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faker } from '@faker-js/faker';
import { Subject, Subscription } from 'rxjs';
import { SearchCriteria, SearchQuote } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { DoService } from 'src/app/services/do.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit { //, OnDestroy  {

  form!: FormGroup
  image!: string

  url: string = 'https://loremflickr.com/';
  _url!: string

  author!: string
  text!: string
  quote!: SearchQuote
  quotes: SearchQuote[] = [];

  random: any = []

  sub$!: Subscription

  images = faker.image.sports()

  @Output()
  onSavedQuote = new Subject<SearchQuote>()

  @Output()
  saveToFavorite = new EventEmitter<any>()

  show: boolean = false
  isClick: boolean = false
  isSaved: boolean = false

  constructor(private fb: FormBuilder, private http: HttpClient,
    private svc: AuthService, private doSvc: DoService,
    private ar: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.form = this.createSearch();
    // if (this.show) {
    //   this.quote
    // }
    this.sub$ = this.doSvc.newQuote.subscribe(data => {
      console.info('>>> in sub: ', data)
      this.quotes = data;
    })
  }

  ngAfterViewInit(): void {

  }

  createSearch() {
    return this.form = this.fb.group({
      type: this.fb.control<string>('', [Validators.required]),
      width: this.fb.control<number>(360, [Validators.required]),
      height: this.fb.control<number>(240, [Validators.required]),
      search: this.fb.control<string>('', [Validators.required])
    });
  }

  performSearch() {
    const criteria: SearchCriteria = this.form.value as SearchCriteria
    console.info('search criteria: ', criteria)

    this._url = this.url + criteria.type + "/" + criteria.width + "/" + criteria.height + "/" + criteria.search
  }

  reset() {
    console.log(">>> Reset Clicked")
    this.form = this.createSearch();
    this._url = ""
  }

  getQuote() {
    this.show = true;
    this.doSvc.getQuote()
      .then(result => {
        console.info('Quote found:', result)
        this.quote = result
        this.author = result.author
        this.text = result.text
      })
      .catch(error => {
        console.error('>>>> error: ', error)
      })
  }

  // saveQuote() {
  //   console.log("Save HIT")
  //   this.isClick = true;
  //   this.show = false
  //   this.isSaved = false
  //   // const data: SearchQuote = this.quote as SearchQuote
  //   console.log("SAVING", this.quote)
  //   return this.quote
  //   // console.log("SAVING", data)
  //   // this.onSavedQuote.next(data)
  //   // console.log('TEST',this.onSavedQuote.next(data))
  //   // this.saveToFavorite.emit(true);
  // }

}


