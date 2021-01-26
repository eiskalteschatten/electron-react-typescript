import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'react-jss';
// import { useSelector } from 'react-redux';

// import { State } from './store';
import EventsFromMain from './EventsFromMain';
import { IntlProviderWrapper } from './intl/IntlContext';
import themes from './theme';
import Theme from './theme/interface';
import MainLayout from './components/MainLayout';

const App: React.FC = () => {
  // const theme = useSelector((state: State) => state.preferences.all?.theme ?? 'light');
  const theme = 'light';
  const [activeTheme, setActiveTheme] = useState<Theme>(themes['light']);

  // TODO: allow the saved locale from the DB to override the system's settings
  const [locale] = useState<string>(navigator.language.split('-')[0] || 'en');

  useEffect(() => setActiveTheme((themes as any)[theme]), [theme]);

  return (
    <>
      <EventsFromMain />
      <ThemeProvider theme={activeTheme}>
        <IntlProviderWrapper injectedLocale={locale}>
          <MainLayout />
        </IntlProviderWrapper>
      </ThemeProvider>
    </>
  );
};

export default App;
