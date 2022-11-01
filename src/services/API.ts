import { IService } from '../types/apiType';

const BASE_URL = 'https://634d92dbf5d2cc648ea98ce0.mockapi.io/';

export async function fetchServices(): Promise<IService[] | void> {
  try {
    const response = await fetch(BASE_URL + 'services');
    const result = (await response.json()) as Promise<IService[]>;
    console.log('result', result);
    // const result = [
    //   {
    //     name: 'Shoes',
    //     price: 92,
    //     id: '1',
    //   },
    //   {
    //     name: 'Fish',
    //     price: 42,
    //     id: '2',
    //   },
    //   {
    //     name: 'Table',
    //     price: 29,
    //     id: '3',
    //   },
    //   {
    //     name: 'Salad',
    //     price: 44,
    //     id: '4',
    //   },
    //   {
    //     name: 'Towels',
    //     price: 13,
    //     id: '5',
    //   },
    //   {
    //     name: 'Soap',
    //     price: 1,
    //     id: '6',
    //   },
    //   {
    //     name: 'Chair',
    //     price: 71,
    //     id: '7',
    //   },
    //   {
    //     name: 'Table',
    //     price: 88,
    //     id: '8',
    //   },
    //   {
    //     name: 'Table',
    //     price: 7,
    //     id: '9',
    //   },
    //   {
    //     name: 'Shirt',
    //     price: 63,
    //     id: '10',
    //   },
    // ];
    return result;
  } catch (error: any) {
    if (error) {
      console.error(error);
    }
  }
}

/*
[
{
"name": "Shoes",
"price": 92,
"id": "1"
},
{
"name": "Fish",
"price": 42,
"id": "2"
},
{
"name": "Table",
"price": 29,
"id": "3"
},
{
"name": "Salad",
"price": 44,
"id": "4"
},
{
"name": "Towels",
"price": 13,
"id": "5"
},
{
"name": "Soap",
"price": 1,
"id": "6"
},
{
"name": "Chair",
"price": 71,
"id": "7"
},
{
"name": "Table",
"price": 88,
"id": "8"
},
{
"name": "Table",
"price": 7,
"id": "9"
},
{
"name": "Shirt",
"price": 63,
"id": "10"
}
] */
