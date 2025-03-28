
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Import i18n configuration only once at the application's entry point
import './i18n/i18n'

createRoot(document.getElementById("root")!).render(<App />);
