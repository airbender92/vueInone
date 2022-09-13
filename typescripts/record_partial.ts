// https://medium.com/gitconnected/advanced-typescript-types-with-examples-1d144e4eda9e

// Record
const SERVICES: Record<string, string> = {
  doorToDoor: 'delivery at door',
  airDelivery: 'flying in'
}

/* an interface of a product entity that had been added to a shopping cart */
export interface ProductInCart {
  id: string;
  amount: number;
  name: string;
  label?: string;
}


export enum ErrorsEnum {
  NetworkError = 'NetworkError',
  ServerError = 'ServerError',
  FormValidationError = 'FormValidationError',
  UnknownError = 'UnknownError'
}

export type CartErrors = Partial<Record<ErrorsEnum, string>>;

// type record is used for a dictionary of products in a user cart
export class CartModel {
  products: Record<string, ProductInCart> = {};
  error?: CartErrors;
}

const CartState: ProductInCart = {
  id: '14',
}

// Partial and Required
export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
}

export interface ProductInCart2 {
  id: string;
  amount: number;
  name: string;
  label?: string;
}

type ModelProps = Partial<{
  product: Product;
  cartContent: Record<string, ProductInCart2>;
}>

const modelProps: ModelProps = {
  product: {
    id: 'id',
    name: 'name',
    price: 'price',
    description: 'desc'
  },
  cartContent: {
    key1: {
      id: 'id',
      amount: 1,
      name: 'name',
      label: 'label'
    }
  }
}

type OwnProps = Required<{
  name: string,
  description: string;
}>

// Pick Omit
export type ProductPhotoProps = Pick<Product, 'id' | 'price'>;
const productPhotoProps: ProductPhotoProps = {
  id: 'id',
  price: 'price'
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ProductPhotoProps2 = Omit<Product, 'id' | 'name'>;
const productPhotoProps2: ProductPhotoProps2 = {
  price: 'price',
  description: 'des'
}

// extending  type/interface

export interface ProductAuthor {
  author: string;
}

export interface ProductBase {
  id: string
}

export interface ProductProps extends ProductAuthor, ProductBase { };
