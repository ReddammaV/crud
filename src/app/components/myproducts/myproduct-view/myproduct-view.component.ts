import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-myproduct-view',
  templateUrl: './myproduct-view.component.html',
  styleUrls: ['./myproduct-view.component.scss']
})
export class MyproductViewComponent implements OnInit {
  productinfo: any;

  constructor(private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private _location: Location) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.apiService.viewProduct(id).subscribe(data => {
      console.log(data);
      this.productinfo = data;
    })
  }

  /* viewUser(id) {
    this.apiService.viewProduct(id)
      .subscribe(data => {
        this.router.navigate(['list-user']);
      });
  } */

  backClicked() {
    this._location.back();
  }

}
