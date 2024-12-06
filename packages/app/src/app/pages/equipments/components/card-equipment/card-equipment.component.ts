import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Equipment } from '../../equipments.type';

@Component({
  selector: 'app-card-equipment',
  templateUrl: 'card-equipment.component.html',
  styleUrls: ['card-equipment.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class CardEquipmentComponent {
  public equipment = input.required<Equipment>();
}
