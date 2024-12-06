import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly navController: NavController
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const isAuthenticated = await this.authenticationService.isAuthenticated();

    if (!isAuthenticated) {
      await this.authenticationService.unauthenticate();
      this.navController.navigateBack(['/login']);

      return false;
    }

    return true;
  }
}
