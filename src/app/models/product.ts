import { Category } from 'src/app/models/category';
export class Product {
  id: Number;
  name: string;
  description: string;
  category: Category;
  categoryId: Number;
  fileModelId: Number;

  constructor(name?: string, description?: string, category?: Category) {
    this.name = name;
    this.description = description;
    this.category = category;
}

}
