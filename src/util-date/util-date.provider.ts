import { Injectable } from '@nestjs/common';

export enum ETimes {
  SEC = 10 * 1000,
  MIN = ETimes.SEC * 60,
  HOUR = ETimes.MIN * 60,
  DAY = ETimes.HOUR * 24,
}

@Injectable()
export class UtilDateProvider {
  private readonly formatter = new Intl.DateTimeFormat('ko-kr');

  getFormattedDate(date = new Date()): string {
    return this.formatter.format(date);
  }

  addTime(add: number, unit: ETimes, date = new Date()): Date {
    return new Date(date.getTime() + add * unit);
  }

  addDate(add: number, date = new Date()): Date {
    return this.addTime(add, ETimes.DAY, date);
  }
}
