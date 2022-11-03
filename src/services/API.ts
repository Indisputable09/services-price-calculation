import { IService } from '../types/servicesTypes';

const BASE_URL = 'https://634d92dbf5d2cc648ea98ce0.mockapi.io/';

export async function fetchServices(): Promise<IService[] | void> {
  try {
    const response = await fetch(BASE_URL + 'services');
    const result = (await response.json()) as Promise<IService[]>;
    return result;
  } catch (error: any) {
    if (error) {
      console.error(error.message);
    }
  }
}
