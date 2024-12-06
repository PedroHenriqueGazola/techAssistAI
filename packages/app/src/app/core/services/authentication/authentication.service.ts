import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { PreferencesService } from '../preferences/preferences.service';
import { AuthenticatedUser } from './authentication.type';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public constructor(
    private readonly preferencesService: PreferencesService,
    private readonly navController: NavController
  ) {}

  public async getAuthenticatedUser(): Promise<AuthenticatedUser> {
    return this.preferencesService.get<AuthenticatedUser>(
      'AUTHENTICATED_USER_KEY'
    );
  }

  public async isAuthenticated(params?: {
    verifyAccount: boolean;
  }): Promise<boolean> {
    const authenticatedAt = await this.preferencesService.get<string>(
      'AUTHENTICATED_AT_KEY',
      { asString: true }
    );
    const authenticatedUser =
      await this.preferencesService.get<AuthenticatedUser>(
        'AUTHENTICATED_USER_KEY'
      );

    if (params?.verifyAccount && !authenticatedUser?.accountId) {
      return false;
    }

    if (authenticatedUser) {
      return true;
    }

    if (!authenticatedAt || !authenticatedUser) {
      return false;
    }

    const diffHours = dayjs().diff(dayjs(authenticatedAt), 'hours');

    return diffHours < 72;
  }

  public async unauthenticate(): Promise<void> {
    await this.preferencesService.remove('AUTHENTICATED_USER_KEY');
    await this.preferencesService.remove('AUTHENTICATED_AT_KEY');
  }

  public async authenticate(
    authenticatedUser: AuthenticatedUser
  ): Promise<void> {
    await this.preferencesService.set(
      'AUTHENTICATED_USER_KEY',
      authenticatedUser
    );
    await this.preferencesService.set(
      'AUTHENTICATED_AT_KEY',
      dayjs().toISOString()
    );

    this.navController.navigateBack(['/equipments']);
  }
}
