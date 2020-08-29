import { CustomerService } from './../service/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-view-profile',
  templateUrl: './customer-view-profile.component.html',
  styleUrls: ['./customer-view-profile.component.css']
})
export class CustomerViewProfileComponent implements OnInit {

  user: any = JSON.parse(localStorage.getItem('current_user'));
  profilePic: any;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getProfilePicture().subscribe(
      (image) => {this.profilePic = this.createImageFromBlob(image);}
    );
  }

  createImageFromBlob = (image: Blob) => {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.profilePic = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
