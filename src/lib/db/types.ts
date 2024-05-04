import type { guestbook, views } from './schema';

export type Views = typeof views.$inferSelect;
export type Guestbook = typeof guestbook.$inferSelect;
