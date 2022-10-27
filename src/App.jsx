import { GlobalStyle } from 'components/GlobalStyle';
import Services from 'components/Services';
import {
  useEffect,
  // useState
} from 'react';
import { fetchServices } from 'services/API';

export const App = () => {
  // const [services, setServices] = useState();

  useEffect(() => {
    async function getServices() {
      const result = await fetchServices();
      console.log('result', result);
    }
    getServices();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Services />
      <div>React homework template</div>
    </>
  );
};
