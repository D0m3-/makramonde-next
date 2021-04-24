export type GAPurchase = {
  transaction_id?: string;
  affiliation?: string;
  value?: number;
  currency?: string;
  tax?: number;
  shipping?: number;
  coupon?: string;
  items?: (({ id: string } | { name: string }) & {
    list_name?: string;
    brand?: string;
    category?: string;
    variant?: string;
    list_position?: number;
    quantity?: number;
    price?: number;
    coupon?: string;
  })[];
};
