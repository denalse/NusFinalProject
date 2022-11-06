import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faker } from '@faker-js/faker';
import { Subject, Subscription } from 'rxjs';
import { SearchCriteria, SearchQuote } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';

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

  data: any = []
  random: any = []
  show: boolean = false

  sub$!: Subscription

  images = faker.image.sports()

  @Output()
  onSavedQuote = new Subject<SearchQuote>()

  @Output()
  saveToFavorite = new EventEmitter<any>()


  isSaved: boolean = false


  constructor(private fb: FormBuilder, private http: HttpClient, private svc: AuthService,
    private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form = this.createSearch();
    if (this.show) {
      this.data = this.getQuote();
    }
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
    // this.router.navigate(['/search']);
  }

  randomImage() {
    console.log("Random image")
    return this.images
  }

  getQuote() {
    return fetch('https://type.fit/api/quotes').then(res => {
      return res.json()
    }).then(jsonResponse => {
      if (!jsonResponse.length) {
        console.log(jsonResponse)
        return []
      }
      this.random = jsonResponse[Math.floor(Math.random() * jsonResponse.length)]
      // console.log("Author: ", this.random.author, "\nQuote: ", this.random.text)
      // this.data = this.random
      this.data = this.random
      console.log("RESULT", this.data)
      this.show = true
      return this.random;
    })
      .then(quote => {
        const author = quote.author;
        const text = quote.text;
        // console.log(author, "-", text)
      })
  }

  saveQuote() {
    console.log("save quote")
    this.isSaved = true
    const quote: SearchQuote = this.data.value as SearchQuote
    this.onSavedQuote.next(quote)
    this.saveToFavorite.emit(true);
  }

  // ngOnDestroy(): void {
  //   this.sub$.unsubscribe()
  // }

}


