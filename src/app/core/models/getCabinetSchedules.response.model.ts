type PrependNextNum<A extends Array<unknown>>
  = A['length'] extends infer T ? ((t: T, ...a: A) => void) extends ((...x: infer X) => void) ? X : never : never;

type EnumerateInternal<A extends Array<unknown>, N extends number>
  = {
    0: A;
    1: EnumerateInternal<PrependNextNum<A>, N>;
  }[N extends A['length'] ? 0 : 1];

export type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[] ? E : never;

export type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;

/* type E1 = Enumerate<43>;

type E2 = Enumerate<10>;

type R1 = Range<0, 5>;

type R2 = Range<0, 43>; */

export interface GetCabinetSchedulesResponseModel {
  cabinetUID: string;
  cabinetsScheduleUID: string;
  dayID: Range<1, 7>; // 1 - moday to 7 - sunday
  endHour: Range<0, 24>;
  endMin: number;
  physicianUID: string;
  startHour: Range<0, 24>;
  startMin: number;
  startTime?: Date;
  endTime?: Date;
  cabinetTime?: Date;
}
