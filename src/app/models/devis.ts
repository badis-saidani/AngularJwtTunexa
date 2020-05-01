import { Product } from './product';

export class Devis {
  id: Number;
  name: string;
  senderName: string;
  email: string;
  tel: string;
  quantity: Number;
  product: Product;
  productId: Number;

  constructor(name?: string, product?: Product) {
    this.name = name;
    //this.product = new Product('sac');
}

}
