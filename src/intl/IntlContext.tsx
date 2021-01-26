import React, { createContext, useState } from 'react';
import { IntlProvider } from 'react-intl';

import enMessages from './en';
import deMessages from './de';

const defaultLocale = process.env.REACT_APP_LOCALE || 'en';
const availableLocales = ['en', 'de'];

const allMessages: any = {
  en: enMessages,
  de: deMessages
};

const Context = createContext({
  locale: defaultLocale,
  defaultLocale,
  availableLocales,
  messages: allMessages[defaultLocale],
  switchLocale: (switchToLocale: string) => {}  // eslint-disable-line @typescript-eslint/no-unused-vars
});

interface Props {
  children?: any;
  injectedLocale?: string;
}

const IntlProviderWrapper: React.FC<Props> = ({ children, injectedLocale }) => {
  const standardLocale = injectedLocale || defaultLocale;
  const [locale, setLocale] = useState<string>(standardLocale);
  const [messages, setMessages] = useState(allMessages[standardLocale]);

  const switchLocale = (switchToLocale: string): void => {
    setLocale(switchToLocale);
    setMessages(allMessages[switchToLocale]);
  };

  return (
    <Context.Provider value={{
      locale,
      defaultLocale,
      availableLocales,
      messages,
      switchLocale
    }}>
      <IntlProvider
        key={locale}
        locale={locale}
        messages={messages}
        defaultLocale={defaultLocale}
      >
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};

export { IntlProviderWrapper, Context as IntlContext };
