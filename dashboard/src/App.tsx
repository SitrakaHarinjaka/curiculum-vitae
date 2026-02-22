import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Login } from './routes/Login';
import { Dashboard } from './routes/Dashboard';
import { Visitors } from './routes/Visitors';
import { Messages } from './routes/Messages';
import { BiographyPage } from './routes/BiographyPage';
import { Skills } from './routes/Skills';
import { EducationPage } from './routes/EducationPage';
import { Experiences } from './routes/Experiences';
import { Services } from './routes/Services';
import { SocialLinks } from './routes/SocialLinks';
import { Settings } from './routes/Settings';

export default function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/visitors" element={<Visitors />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/biography" element={<BiographyPage />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/services" element={<Services />} />
            <Route path="/social-links" element={<SocialLinks />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}
