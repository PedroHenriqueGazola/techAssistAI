import { HttpClient } from '@angular/common/http';
import { Component, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-diagnose-modal-component',
  templateUrl: 'diagnose-modal.component.html',
  styleUrls: ['diagnose-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class DiagnoseModalComponent {
  @Input() equipmentId!: string;

  public diagnoseControl = new FormControl();
  public diagnose = signal<string | null>(null);

  public constructor(
    private modalController: ModalController,
    private readonly http: HttpClient
  ) {}

  public async onDiagnose() {
    const response = await firstValueFrom(
      this.http.post<{ solution: string } | undefined>(
        environment.API_URL + '/tech-assist/diagnose',
        {
          description: this.diagnoseControl.value,
          equipmentId: '010ff9e3-4c4d-49cb-93e9-de5a1602b373',
        }
      )
    );

    this.diagnose.set(response?.solution || '');
  }

  public cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  public confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }
}
