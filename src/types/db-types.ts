import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface guestbook {
  id: Generated<number>;
  email: string;
  body: string;
  created_by: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}
export interface views {
  slug: string;
  count: Generated<number>;
}
export interface DB {
  guestbook: guestbook;
  views: views;
}
