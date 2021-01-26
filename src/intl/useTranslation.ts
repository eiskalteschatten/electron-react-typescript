import { useContext } from 'react';

import { IntlContext } from './IntlContext';

export const useTranslation = (key: string): string => {
  const { messages } = useContext(IntlContext);
  return messages[key] || key;
};

export default useTranslation;
