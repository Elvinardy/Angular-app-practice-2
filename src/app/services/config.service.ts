import { Inject, Injectable } from '@angular/core';
import { RouteConfigToken } from './routeConfig.service';
import { RouteConfig } from './routeConfig';

@Injectable({
  // root is a singleton instance available, any will create a new instance for the particular service.
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) private configToken: RouteConfig ) {
    console.log('ConfigService Initalized...');
    console.log(this.configToken);
  }

}
