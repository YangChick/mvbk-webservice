import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

const fs = require('fs');

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMailToClient(data: any): Promise<boolean> {
    try {
      const result = data.listFood.reduce((acc: any, curr: any) => {
        const { id, ...rest } = curr;
        acc[id] = acc[id] || { ...rest, quantity: 0 };
        acc[id].quantity += 1;
        return acc;
      }, {});
      const outputArray = Object.values(result);
      const html = `<!DOCTYPE html>
      <html>
      <head>
        <title>Thông tin phim</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
          }
          h1 {
            color: #ff6600;
            text-align: center;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
          }
          th, td {
            padding: 10px;
            border: 1px solid #ccc;
            text-align: left;
          }
          th {
            background-color: #ff6600;
            color: white;
          }
        </style>
      </head>
      <body>
        <h1>THANKS YOU FOR BOOKING</h1>
        <h4>THIS IS YOUR TICKETS</h4>
        
        <table>
          <tr>
            <th>Date</th>
            <td>${data.date}</td>
          </tr>
          <tr>
            <th>Time</th>
            <td>${data.time}</td>
          </tr>
          <tr>
            <th>Movie Theater</th>
            <td>${data && data.movieTheater}</td>
          </tr>
          <tr>
            <th>Foods</th>
            <td>${outputArray.map((food: any) => {
              return `<p>name: ${food.name} : ${food.quantity}</p>`;
            })}</td>
          </tr>
          <tr>
            <th>List Seat</th>
            <td>${
              data &&
              data.listSeats &&
              data.listSeats.map((seat: any) => {
                return `<p> ${seat.name},</p>`;
              })
            }</td>
          </tr>
        </table>
      </body>
      </html>`;
      return await this.mailerService.sendMail({
        to: data.to,
        subject: 'Thank you for your booking',
        html,
      });
    } catch (error) {
      console.log(error);
      // throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
