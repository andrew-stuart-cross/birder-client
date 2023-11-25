import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { expectText, findComponent } from 'src/app/testing/element.spec-helper';
import { fakeNetworkUserModelArray } from 'src/app/testing/network-test-helpers';

import { NetworkSuggestionComponent } from './network-suggestion.component';
import { NetworkSuggestionService } from './network-suggestion.service';

describe('NetworkSuggestionComponent', () => {
  let component: NetworkSuggestionComponent;
  let fixture: ComponentFixture<NetworkSuggestionComponent>;

  let fakeService: jasmine.SpyObj<NetworkSuggestionService>;

  const setup = async (
    fakeMethodValues?: jasmine.SpyObjMethodNames<NetworkSuggestionService>,
    fakePropertyValues?: jasmine.SpyObjPropertyNames<NetworkSuggestionService>) => {

    fakeService = jasmine.createSpyObj<NetworkSuggestionService>(
      'NetworkSuggestionService',
      {
        getData: undefined,
        ...fakeMethodValues
      },
      {
        isError: of(false),
        getNetworkSuggestions: of(null),
        ...fakePropertyValues
      }
    );


    await TestBed.configureTestingModule({
    imports: [NetworkSuggestionComponent],
}).overrideComponent(NetworkSuggestionComponent,
      {
        set: {
          providers: [
            { provide: NetworkSuggestionService, useValue: fakeService }
          ]
        }
      }).compileComponents();

    fixture = TestBed.createComponent(NetworkSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('"SMOKE TEST": should be created and show the loading placeloader', fakeAsync(async () => {
    await setup({}, {});

    expect(component).toBeTruthy();
    const { debugElement } = fixture;
    const loading = debugElement.query(By.css('app-loading'));
    expect(loading).toBeTruthy();
  }));


  describe('when response is successful', () => {

    it('calls data fetch service method', fakeAsync(async () => {
      await setup({},
        {
          isError: of(false),
          getNetworkSuggestions: of(fakeNetworkUserModelArray)
        });

      expect(fakeService.getData).toHaveBeenCalledTimes(1);
    }));

    it('shows the suggestions list when suggestions > 0', fakeAsync(async () => {
      await setup({},
        {
          isError: of(false),
          getNetworkSuggestions: of(fakeNetworkUserModelArray)
        });

      const feedItems = findComponent(fixture, 'app-network-user');
      expect(feedItems).toBeTruthy();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="suggestions-list"]')?.textContent).toBeDefined();
      expect(compiled.querySelector('[data-testid="suggestions-list-is-zero"]')?.textContent).toBeUndefined();
    }));

    it('shows the no suggestions content when suggestions = 0 ([])', fakeAsync(async () => {
      await setup({},
        {
          isError: of(false),
          getNetworkSuggestions: of([])
        });

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="suggestions-list"]')?.textContent).toBeUndefined();
      expect(compiled.querySelector('[data-testid="suggestions-list-is-zero"]')?.textContent).toBeDefined();
      expectText(fixture, 'suggestions-list-is-zero', ' No suggestions at this time... ');
    }));

    it('does not show error section', fakeAsync(async () => {
      await setup({},
        {
          isError: of(false),
          getNetworkSuggestions: of(fakeNetworkUserModelArray)
        });

      const error = fixture.nativeElement as HTMLElement;
      expect(error.querySelector('[data-testid="error"]')?.textContent).toBeUndefined();
    }));

    it('does not show loading section', fakeAsync(async () => {
      await setup({},
        {
          isError: of(false),
          getNetworkSuggestions: of(fakeNetworkUserModelArray)
        });

      const { debugElement } = fixture;
      const loading = debugElement.query(By.css('app-loading'));
      expect(loading).toBeNull();
    }));
  });

  describe('when response is unsuccessful', () => {

    it('shows error content', fakeAsync(async () => {
      await setup({},
        {
          isError: of(true),
          getNetworkSuggestions: of(null)
        });

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="error"]')?.textContent).toBeDefined();
      expect(compiled.querySelector('[data-testid="reload-button"]')?.textContent).toBeDefined();
      expectText(fixture, 'error', 'Whoops! There was an error retrieving the data.Try Again');
    }));

    it('tries data fetch again on retry button click', fakeAsync(async () => {
      await setup({},
        {
          isError: of(true),
          getNetworkSuggestions: of(null)
        });

      fixture.debugElement.query(By.css('.btn-try-again')).triggerEventHandler('click', null);

      expect(fakeService.getData).toHaveBeenCalled();
    }));

    it('does not show success content', fakeAsync(async () => {
      await setup({},
        {
          isError: of(true),
          getNetworkSuggestions: of(null)
        });

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="followers-list"]')?.textContent).toBeUndefined();
      expect(compiled.querySelector('[data-testid="followers-list-is-zero"]')?.textContent).toBeUndefined();

    }));

    it('does not show loading section', fakeAsync(async () => {
      await setup({},
        {
          isError: of(true),
          getNetworkSuggestions: of(null)
        });

      const { debugElement } = fixture;
      const loading = debugElement.query(By.css('app-loading'));
      expect(loading).toBeNull();
    }));


  });

});