import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchCriteria } from 'src/app/models';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faker } from '@faker-js/faker';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  form!: FormGroup
  image!: string

  url: string = 'https://loremflickr.com/';
  _url!: string

  show: boolean = false
  images = faker.image.sports()

  result!: {type: string; width: number; height: number; search: string};

  constructor(private fb: FormBuilder, private svc: ImageService, 
    private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form = this.createSearch();

    // if (window.location.href.split('/')){
    //   console.log("")
    // }

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
  
      // let type = this.ar.snapshot.params['type']
      // let width = this.ar.snapshot.params['width']
      // let height = this.ar.snapshot.params['height']
      // let search = this.ar.snapshot.params['search']
    
     this._url = this.url + criteria.type + "/" + criteria.width + "/" + criteria.height + "/" + criteria.search

    // this.svc.search(criteria) //= 
    // // window.location.href.split('/')[0]
    //   .then(result => {
    //     console.log("\n\tRESULT", result);
    //     this.form = this.createSearch();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    // this.router.navigate(['/search', criteria.type, criteria.width, criteria.height, criteria.search]);
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

}
