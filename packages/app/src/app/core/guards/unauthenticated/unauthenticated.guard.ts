import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UnauthenticatedGuard {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly navController: NavController
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const isAuthenticated = await this.authenticationService.isAuthenticated();

    if (isAuthenticated) {
      this.navController.navigateForward(['/equipments']);

      return false;
    }

    return true;
  }
}
