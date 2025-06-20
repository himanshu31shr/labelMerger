export interface Category {
  id?: string;
  name: string;
  description?: string;
  tag?: string;
  color?: string;
  costPrice?: number | null;
  createdAt?: Date | number | string | { toDate(): Date; toMillis(): number };
  updatedAt?: Date | number | string | { toDate(): Date; toMillis(): number };
} 