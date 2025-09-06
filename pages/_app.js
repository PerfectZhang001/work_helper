import '../components/App.css';
import { DarkModeProvider } from '../contexts/DarkModeContext';
import App from '../components/App';

export default function MyApp({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <App Component={Component} pageProps={pageProps} />
    </DarkModeProvider>
  );
}