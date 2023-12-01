import { AuthenticationService } from '../services/authetication.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Http } from '@capacitor-community/http';
import { Preferences } from '@capacitor/preferences';
const TOKEN_KEY = 'token-saya';
const USERNAME = 'namasaya';
const userId = '123'; // Replace with the actual user ID obtained during login

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: any;
  password: any;
  constructor(
    private authService: AuthenticationService,
    private alertController: AlertController
  ) { }

  login() {
    if (this.username != null && this.password != null) {
      let url = this.authService.apiURL() + 'proses_login.php';
      Http.request({
        method: 'POST',
        url: url,
        headers: { 'Content-Type': 'application/json' },
        data: {
          username: this.username,
          password: this.password,
        },
      }).then(
        (data) => {
          console.log(data);
          if (data['data']['status_login'] == 'berhasil') {
            this.username = '';
            this.password = '';
            localStorage.setItem(TOKEN_KEY, data['data']['token']);
            localStorage.setItem(USERNAME, data['data']['username']);
            localStorage.setItem(userId, data['data']['id']);
            location.reload();
          } else {
            this.alertController
              .create({
                header: 'Notifikasi',
                message: 'Username dan Password salah',
                buttons: ['OK'],
              })
              .then((res) => {
                res.present();
              });
          }
        },
        (err) => {
          this.alertController
            .create({
              header: 'Notifikasi',
              message: 'Gagal Login, Periksa Koneksi Internet' + err,
              buttons: ['OK'],
            })
            .then((res) => {
              res.present();
            });
        }
      );
    } else {
      this.alertController
        .create({
          header: 'Notifikasi',
          message: 'Username dan Password Tidak Boleh Kosong',
          buttons: ['OK'],
        })
        .then((res) => {
          res.present();
        });
    }
  }
}