export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  category: Category;
  quantity?: number;
}
export interface ICategory {
  id: string;
  name: string;
  image?: string;
}
