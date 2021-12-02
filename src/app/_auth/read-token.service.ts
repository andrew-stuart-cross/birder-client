import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserViewModel } from '../_services/UserViewModel';

@Injectable({
  providedIn: 'root'
})
export class ReadTokenService {

  constructor(private _jwtHelper: JwtHelperService) { }

  public isTokenValid(): boolean {

    const token = this._getToken();

    if (token && !this._jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      this._removeToken();
      return false;
    }
  }

  private _getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  public removeToken(): void {
    this._removeToken();
  }

  private _removeToken(): void {
    localStorage.removeItem('jwt');
  }

  public GetUser(): UserViewModel | null {
    const token = this._getToken();

    if (token && !this._jwtHelper.isTokenExpired(token)) {

      const tokenDecoded = this._jwtHelper.decodeToken(token);

      return <UserViewModel>{
        userName: tokenDecoded.unique_name,
        avatar: tokenDecoded.ImageUrl,
        defaultLocationLatitude: Number(tokenDecoded.DefaultLatitude),
        defaultLocationLongitude: Number(tokenDecoded.DefaultLongitude)
      };
    } else {
      return null;
    }
  }


  // get 
  public getFlikrKey(): string {
    const token = this._getToken();

    if (token && !this._jwtHelper.isTokenExpired(token)) {
      const tokenDecoded = this._jwtHelper.decodeToken(token);
      return tokenDecoded.FlickrKey;
    } else {
      return 'null';
    }
  }

  public getMapKey(): string {
    const token = this._getToken();

    if (token && !this._jwtHelper.isTokenExpired(token)) {
      const tokenDecoded = this._jwtHelper.decodeToken(token);
      return tokenDecoded.MapKey;
    } else {
      return 'null';
    }
  }

  public checkIsRecordOwner(username: string): boolean {
    const token = this._getToken();

    if (token && !this._jwtHelper.isTokenExpired(token)) {
      const tokenDecoded = this._jwtHelper.decodeToken(token);

      if (tokenDecoded.unique_name === username) {
        return true;
      } else {
        return false;
      }

    } else {
      // TODO: Remove token (could be expired)
      return false;
    }
  }




  // public GetAuthenticatedUserDetails() {

  //   const token = localStorage.getItem('jwt');

  //   if (token && !this._jwtHelper.isTokenExpired(token)) {
  //     const tokenDecoded = this._jwtHelper.decodeToken(token);

  //     const user = <UserViewModel>{
  //       userName: tokenDecoded.unique_name,
  //       avatar: tokenDecoded.ImageUrl,
  //       defaultLocationLatitude: Number(tokenDecoded.DefaultLatitude),
  //       defaultLocationLongitude: Number(tokenDecoded.DefaultLongitude)
  //     };
  //     return user;
  //   } else {
  //     this._service.logout();
  //     return;
  //   }
  // }

  // public GetUsername(): string {
  //   const token = localStorage.getItem('jwt');

  //   if (token && !this._jwtHelper.isTokenExpired(token)) {
  //     const tokenDecoded = this._jwtHelper.decodeToken(token);
  //     return tokenDecoded.unique_name;
  //   } else {
  //     this._service.logout();
  //     return 'null';
  //   }
  // }



  // getDefaultLocation() {
  //   const token = localStorage.getItem('jwt');

  //   if (token && !this.jwtHelper.isTokenExpired(token)) {
  //     const tokenDecoded = this.jwtHelper.decodeToken(token);

  //     const model = <SetLocationViewModel>{
  //       defaultLocationLatitude: Number(tokenDecoded.DefaultLatitude),
  //       defaultLocationLongitude: Number(tokenDecoded.DefaultLongitude)
  //     };
  //     return model;

  //   } else {
  //     this.authenticationService.logout();

  //   }
  // }
}


// setToken(token: string) {
//   if (token) {
//     this.jwtToken = token;
//   }
// }

// ************* jwtHlper does this....
// decodeToken() {
//   if (this.jwtToken) {
//   this.decodedToken = jwt_decode(this.jwtToken);
//   }
// }

// getDecodeToken() {
//   return jwt_decode(this.jwtToken);
// }

// getUser() {
//   this.decodeToken();
//   return this.decodedToken ? this.decodedToken.displayname : null;
// }

// getEmailId() {
//   this.decodeToken();
//   return this.decodedToken ? this.decodedToken.email : null;
// }

// getExpiryTime() {
//   this.decodeToken();
//   return this.decodedToken ? this.decodedToken.exp : null;
// }

// isTokenExpired(): boolean {
//   const expiryTime: number = this.getExpiryTime();
//   if (expiryTime) {
//     return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
//   } else {
//     return false;
//   }
// }