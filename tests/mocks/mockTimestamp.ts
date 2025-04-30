export class MockTimestamp {
  seconds: number;
  nanoseconds: number;

  constructor(seconds: number, nanoseconds: number = 0) {
    this.seconds = seconds;
    this.nanoseconds = nanoseconds;
  }

  static now() {
    return new MockTimestamp(1234567890);
  }

  static fromDate(date: Date) {
    return new MockTimestamp(Math.floor(date.getTime() / 1000));
  }

  toDate() {
    return new Date(this.seconds * 1000);
  }
}