import { HttpErrorResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { expectText } from 'src/app/testing/element.spec-helper';
import { googleMapsApiResponse, testLatitude, testLongitude, testSearchAddress } from 'src/app/testing/map-tests-helpers';
import { GeocodeService } from '../geocode.service';

import { ReadWriteMapComponent } from './read-write-map.component';

// note: problem with Google map control and asynchronous tests
// note: specs not async, fakeAsync(async () => {

describe('ReadWriteMapComponent', () => {

  describe('when map requests are successful', () => {

    let component: ReadWriteMapComponent;
    let fixture: ComponentFixture<ReadWriteMapComponent>;
    let fakeService: jasmine.SpyObj<GeocodeService>;

    fakeService = jasmine.createSpyObj<GeocodeService>(
      'GeocodeService',
      {
        geocode: of(googleMapsApiResponse), // undefined,
        googleApiResponseHelper: undefined,
        reverseGeocode: of(googleMapsApiResponse), // undefined,
      }
    );

    beforeEach(async () => {
      await TestBed.configureTestingModule({
    providers: [
        { provide: GeocodeService, useValue: fakeService }
    ],
    imports: [GoogleMapsModule, ReadWriteMapComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ReadWriteMapComponent);
      component = fixture.componentInstance;
    });


    it('should create', () => {
      component.latitude = testLatitude;
      component.longitude = testLongitude;
      fixture.detectChanges();

      expect(component).toBeTruthy();
      expect(component.markerStatus).toBe('success');
    });

    it('should display the map when valid', () => {
      component.latitude = testLatitude;
      component.longitude = testLongitude;
      fixture.detectChanges();

      expect(component.markerStatus).toBe('success');

      expect(component.latitude).toBe(testLatitude);
      expect(component.longitude).toBe(testLongitude);

      // it's called twice.  Once when the marker is added, then again because the marker is changed (i.e.: markerChanged)
      expect(fakeService.reverseGeocode).toHaveBeenCalledWith(testLatitude, testLongitude); // OnceWith(testLatitude, testLongitude);
      expect(fakeService.googleApiResponseHelper).toHaveBeenCalled();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="location"]')?.textContent).toBeDefined();
      expectText(fixture, 'location-text', 'London, UK');

      const { debugElement } = fixture;
      const map = debugElement.query(By.css('google-map'));
      expect(map).toBeDefined();
    });

    describe('Get Current Location', () => {

      it('calls ', () => {
        spyOn(window.navigator.geolocation, 'getCurrentPosition').and.callFake((...args: any[]) => {
          const position = { coords: { latitude: 0, longitude: 0 } };
          args[0](position);
        });

        component.latitude = testLatitude;
        component.longitude = testLongitude;
        fixture.detectChanges();

        // button click...
        fixture.debugElement.query(By.css('.btn-get-location')).triggerEventHandler('click', null);

        expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();

        expect(fakeService.reverseGeocode).toHaveBeenCalled();
      });

      it('clears geoError property if it is truthy', () => {
        spyOn(window.navigator.geolocation, 'getCurrentPosition').and.callFake((...args: any[]) => {
          const position = { coords: { latitude: 0, longitude: 0 } };
          args[0](position);
        });

        component.latitude = testLatitude;
        component.longitude = testLongitude;
        component.geoError = 'truthy';
        fixture.detectChanges();

        // button click...
        fixture.debugElement.query(By.css('.btn-get-location')).triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
        expect(component.geoError).toBeFalsy();
      });

      it('y error', () => {
        spyOn(window.navigator.geolocation, 'getCurrentPosition').and.callFake((...args: any[]) => {
          const error = {
            code: 1,
            message: 'GeoLocation Error',
          };
          args[1](error);
        });

        component.latitude = testLatitude;
        component.longitude = testLongitude;
        fixture.detectChanges();

        // button click...
        fixture.debugElement.query(By.css('.btn-get-location')).triggerEventHandler('click', null);

        expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
        expect(window.navigator.geolocation.getCurrentPosition).toThrowError();

        fixture.detectChanges();

        expectText(fixture, 'geo-error', 'User denied the request for Geolocation...');
      });

      it('y error', () => {
        spyOn(window.navigator.geolocation, 'getCurrentPosition').and.callFake((...args: any[]) => {
          const error = {
            code: 2,
            message: 'GeoLocation Error',
          };
          args[1](error);
        });

        component.latitude = testLatitude;
        component.longitude = testLongitude;

        fixture.detectChanges();
        // button click...
        fixture.debugElement.query(By.css('.btn-get-location')).triggerEventHandler('click', null);

        expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
        expect(window.navigator.geolocation.getCurrentPosition).toThrowError();

        fixture.detectChanges();

        expectText(fixture, 'geo-error', 'Location information is unavailable...');
      });

      it('y error', () => {
        spyOn(window.navigator.geolocation, 'getCurrentPosition').and.callFake((...args: any[]) => {
          const error = {
            code: 3,
            message: 'GeoLocation Error',
          };
          args[1](error);
        });

        component.latitude = testLatitude;
        component.longitude = testLongitude;
        fixture.detectChanges();

        // button click...
        fixture.debugElement.query(By.css('.btn-get-location')).triggerEventHandler('click', null);

        expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
        expect(window.navigator.geolocation.getCurrentPosition).toThrowError();

        fixture.detectChanges();

        expectText(fixture, 'geo-error', 'The request to get user location timed out...');
      });

      it('y error', () => {
        spyOn(window.navigator.geolocation, 'getCurrentPosition').and.callFake((...args: any[]) => {
          const error = {};
          args[1](error);
        });

        component.latitude = testLatitude;
        component.longitude = testLongitude;
        fixture.detectChanges();

        // button click...
        fixture.debugElement.query(By.css('.btn-get-location')).triggerEventHandler('click', null);

        expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
        expect(window.navigator.geolocation.getCurrentPosition).toThrowError();

        fixture.detectChanges();

        expectText(fixture, 'geo-error', 'An error occurred with Geolocation...');
      });

      it('clears geoError property if it is truthy', () => {
        spyOn(window.navigator.geolocation, 'getCurrentPosition').and.callFake((...args: any[]) => {
          const error = {};
          args[1](error);
        });

        component.latitude = testLatitude;
        component.longitude = testLongitude;
        component.geoError = 'truthy';
        fixture.detectChanges();

        // button click...
        fixture.debugElement.query(By.css('.btn-get-location')).triggerEventHandler('click', null);


        fixture.detectChanges();

        expectText(fixture, 'geo-error', 'An error occurred with Geolocation...');
      });


    });


    describe('Search Address', () => {

      it('calls method with input value on button click ', () => {

        component.latitude = testLatitude;
        component.longitude = testLongitude;
        component.searchAddress = testSearchAddress;
        fixture.detectChanges();

        // button click...
        fixture.debugElement.query(By.css('.btn-search-address')).triggerEventHandler('click', null);

        expect(fakeService.geocode).toHaveBeenCalledOnceWith(testSearchAddress);
      });

      // it('does not call method when input value is falsy', ()  => {

      //   component.latitude = testLatitude;
      //   component.longitude = testLongitude;
      //   component.searchAddress = '';
      //   fixture.detectChanges();

      //   // button click...
      //   fixture.debugElement.query(By.css('.btn-search-address')).triggerEventHandler('click', null);

      //   expect(fakeService.geocode).not.toHaveBeenCalled();
      // });

    });
  });




  // use SpyOn.............................

  //   describe('when map requests are NOT successful', () => {

  //     let component: ReadWriteMapComponent;
  //     let fixture: ComponentFixture<ReadWriteMapComponent>;
  //     let fakeService: jasmine.SpyObj<GeocodeService>;

  //     const errorResponse = new HttpErrorResponse({
  //       status: 404,
  //       statusText: 'Not Found',
  //     });

  //     fakeService = jasmine.createSpyObj<GeocodeService>(
  //       'GeocodeService',
  //       {
  //         geocode: of({ next: fail, error: errorResponse, complete: fail, }),
  //         googleApiResponseHelper: undefined,
  //         reverseGeocode: of({ next: fail, error: errorResponse, complete: fail, })
  //       }
  //     );

  //     beforeEach(async () => {
  //       await TestBed.configureTestingModule({
  //         declarations: [ReadWriteMapComponent],
  //         providers: [
  //           { provide: GeocodeService, useValue: fakeService }
  //         ],
  //         imports: [GoogleMapsModule],
  //         schemas: [NO_ERRORS_SCHEMA]
  //       })
  //         .compileComponents();
  //     });

  //     beforeEach(() => {
  //       fixture = TestBed.createComponent(ReadWriteMapComponent);
  //       component = fixture.componentInstance;
  //     });


  //     it('should create', () => {
  //       component.latitude = testLatitude;
  //       component.longitude = testLongitude;
  //       fixture.detectChanges();

  //       expect(component).toBeTruthy();
  //       expect(component.markerStatus).toBe('success');
  //     });

  //     it('calls ', () => {
  //       spyOn(window.navigator.geolocation, 'getCurrentPosition').and.callFake((...args: any[]) => {
  //         const position = { coords: { latitude: 0, longitude: 0 } };
  //         args[0](position);
  //       });

  //       component.latitude = testLatitude;
  //       component.longitude = testLongitude;
  //       fixture.detectChanges();

  //       // button click...
  //       fixture.debugElement.query(By.css('.btn-get-location')).triggerEventHandler('click', null);


  //       expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();

  //       expect(fakeService.reverseGeocode).toHaveBeenCalled();

  //       expect(component.markerStatus).toBe('jkjk');
  //     });


  //   });
});
