import { Injectable } from '@nestjs/common';

export enum EUtilDateProviderTimes {
  SEC = 1000,
  MIN = EUtilDateProviderTimes.SEC * 60,
  HOUR = EUtilDateProviderTimes.MIN * 60,
  DAY = EUtilDateProviderTimes.HOUR * 24,
}

@Injectable()
export class UtilDateProvider {
  private readonly formatter = new Intl.DateTimeFormat();

  getFormattedDate(date = new Date()): string {
    return this.formatter.format(date);
  }

  addTime(add: number, unit: EUtilDateProviderTimes, date = new Date()): Date {
    return new Date(date.getTime() + add * unit);
  }

  addDate(add: number, date = new Date()): Date {
    return this.addTime(add, EUtilDateProviderTimes.DAY, date);
  }
}
