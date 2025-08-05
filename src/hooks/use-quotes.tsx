
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { initialQuotes } from '@/lib/data';

export type Quote = (typeof initialQuotes)[0];

type QuotesContextType = {
  quotes: Quote[];
  addQuote: (quote: Quote) => void;
};

const QuotesContext = createContext<QuotesContextType | undefined>(undefined);

export const QuotesProvider = ({ children }: { children: ReactNode }) => {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  const addQuote = (quote: Quote) => {
    setQuotes(prevQuotes => [quote, ...prevQuotes]);
  };

  return (
    <QuotesContext.Provider value={{ quotes, addQuote }}>
      {children}
    </QuotesContext.Provider>
  );
};

export const useQuotes = () => {
  const context = useContext(QuotesContext);
  if (context === undefined) {
    throw new Error('useQuotes must be used within a QuotesProvider');
  }
  return context;
};
