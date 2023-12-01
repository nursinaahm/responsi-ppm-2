import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authetication.service';

interface AppPage {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: AppPage[] = [
   
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private router: Router,
    private alertController: AlertController, // Tambahkan ini
    private authService: AuthenticationService
  ) { }

  logout() {
    this.alertController
      .create({
        header: 'Perhatian',
        subHeader: 'Yakin Logout aplikasi ?',
        buttons: [
          {
            text: 'Batal',
            handler: (data: any) => {
              console.log('Canceled', data);
            },
          },
          {
            text: 'Yakin',
            handler: (data: any) => {
              //jika tekan yakin
              this.authService.logout();
              this.router.navigateByUrl('/login', { replaceUrl: true });
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
}
