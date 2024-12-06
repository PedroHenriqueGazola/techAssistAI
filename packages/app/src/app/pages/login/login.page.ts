import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonImg,
  IonInput,
} from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { AuthenticatedUser } from 'src/app/core/services/authentication/authentication.type';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login-page',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [IonImg, IonButton, IonInput, IonContent, ReactiveFormsModule],
})
export class LoginPage {
  public signForm: FormGroup;

  public isLoading = signal<boolean>(false);

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient,
    private readonly authenticationService: AuthenticationService
  ) {
    this.signForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public async login() {
    if (this.signForm.invalid) {
      return;
    }

    try {
      this.isLoading.set(true);

      const authenticatedUser = await firstValueFrom(
        this.http.post<AuthenticatedUser>(
          environment.API_URL + '/auth/sign-in',
          this.signForm.value
        )
      );

      await this.authenticationService.authenticate(authenticatedUser);
    } catch (error) {
      console.log('asdasd', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
