import Services from './components/Services';
import { useEffect, FC, useState } from 'react';
import { fetchServices } from './services/API';
import { IService } from './types/apiType';

export const App: FC = (): JSX.Element => {
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    async function getServices(): Promise<void> {
      const result: IService[] = await fetchServices();
      setServices(result);
    }
    getServices();
  }, []);

  return (
    <>
      <Services services={services} />
      <div>React homework template</div>
    </>
  );
};
