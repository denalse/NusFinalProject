import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faker } from '@faker-js/faker';
import { Subscription } from 'rxjs';
import { SearchCriteria } from 'src/app/models';
import { DoService } from 'src/app/services/do.service';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit, OnDestroy  {

  form!: FormGroup
  image!: string

  url: string = 'https://loremflickr.com/';
  _url!: string

  data:any = []
  randomData: any = []
  sub$!: Subscription


  show: boolean = false
  images = faker.image.sports()


  constructor(private fb: FormBuilder, private http: HttpClient, private svc: DoService, 
    private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form = this.createSearch();

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
      const url ='https://type.fit/api/quotes'
      // const i = Math.floor(Math.random() * 2000)
      this.http.get(url).subscribe((res)=>{
        this.data = res
        console.log(this.data)
      })
      let random = Math.floor(Math.random() * this.data.length)
      this.randomData = [this.data[random]];
    }

    ngOnDestroy(): void {
      this.sub$.unsubscribe()
    }

}
