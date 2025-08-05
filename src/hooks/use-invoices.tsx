
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { initialInvoices } from '@/lib/data';

export type Invoice = (typeof initialInvoices)[0];

type InvoicesContextType = {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
};

const InvoicesContext = createContext<InvoicesContextType | undefined>(undefined);

export const InvoicesProvider = ({ children }: { children: ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

  const addInvoice = (invoice: Invoice) => {
    setInvoices(prevInvoices => [invoice, ...prevInvoices]);
  };

  return (
    <InvoicesContext.Provider value={{ invoices, addInvoice }}>
      {children}
    </InvoicesContext.Provider>
  );
};

export const useInvoices = () => {
  const context = useContext(InvoicesContext);
  if (context === undefined) {
    throw new Error('useInvoices must be used within a InvoicesProvider');
  }
  return context;
};
