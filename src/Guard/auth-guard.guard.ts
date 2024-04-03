import { CanActivateFn } from '@angular/router';



export const authGuardGuard: CanActivateFn = (route, state) => {
  var ceva = sessionStorage.getItem('canAcces');


  if (ceva == "true") {

    return true;
  } else {
    return true;
  }

};
