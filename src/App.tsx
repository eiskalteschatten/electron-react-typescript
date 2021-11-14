import React, { useState } from 'react';

import { IntlProviderWrapper } from './intl/IntlContext';
import MainLayout from './components/MainLayout';

const App: React.FC = () => {
  // TODO: allow the saved locale from the DB to override the system's settings
  const [locale] = useState<string>(navigator.language.split('-')[0] || 'en');

  return (
    <>
      <IntlProviderWrapper injectedLocale={locale}>
        <MainLayout />
      </IntlProviderWrapper>
    </>
  );
};

export default App;
