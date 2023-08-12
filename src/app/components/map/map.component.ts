import { Component, OnInit } from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    try {
      let mapOptions = {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12
      };
  
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    } catch (error) {
      console.error('An error occurred while initializing the Google Maps API:', error);
    }
  }
}