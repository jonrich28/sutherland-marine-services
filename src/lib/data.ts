
/**
 * Sutherland Marine Service Management Demo
 * 
 * Copyright (c) 2025 Sutherland Marine. All rights reserved.
 * 
 * This file contains demo data and interfaces for evaluation purposes only.
 * Commercial use requires a separate license agreement.
 * 
 * License: SEE LICENSE IN LICENSE_DEMO.md
 * Contact: sales@sutherlandmarine.com
 */

'use client';

// Type definitions
export interface BoatInfo {
  name: string;
  year: number;
  model: string;
  engineType: string;
  hullId: string;
  length: string;
  registration: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  boats: BoatInfo[];
  avatar: string;
  customerAvatar: string | null;
  boatImage: string | null;
  memberSince: string;
  customerTier: 'Regular' | 'Premium' | 'VIP';
  preferredContact: 'email' | 'phone' | 'text';
  serviceLocation: 'marina' | 'home';
  billingAddress: string;
  paymentMethod: 'Credit Card' | 'Check' | 'Bank Transfer';
  totalServices: number;
  lastService: string;
  nextScheduled: string;
  internalNotes: string;
}

export interface Technician {
  id: number;
  name: string;
  email: string;
  specialization: string;
  status: 'Available' | 'On Job' | 'On Leave' | 'Active';
  avatar: string;
  certification: string;
  efficiency: number;
  workload: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  brand: string;
  stock: number;
  location: string;
  price: string;
  quantity: number;
  reorderPoint: number;
  cost: number;
}

export const initialJobs = [
  { id: 'JOB-015', customer: 'Alex Thompson', boat: 'Formula 310 BR', tech: 'Mike Miller', status: 'Completed', created: '2024-06-28', description: 'Annual engine service and oil change.', photos: [] as string[], notes: [] as {text: string, timestamp: string}[] },
  { id: 'JOB-014', customer: 'Samantha Miller', boat: 'Chris-Craft Launch 27', tech: 'David Wilson', status: 'In Progress', created: '2024-06-27', description: 'Install new GPS and fishfinder unit.', photos: [], notes: [] },
  { id: 'JOB-013', customer: 'Liam Johnson', boat: 'Sea Ray 240', tech: 'Mike Miller', status: 'Completed', created: '2024-06-25', description: 'Repair starboard trim tab.', photos: [], notes: [] },
  { id: 'JOB-012', customer: 'Benjamin Green', boat: 'Cobalt R6', tech: 'Chris Taylor', status: 'Awaiting Payment', created: '2024-06-24', description: 'Fiberglass hull damage repair.', photos: [], notes: [] },
  { id: 'JOB-011', customer: 'Olivia Davis', boat: 'Regal LS4', tech: 'David Wilson', status: 'Awaiting Approval', created: '2024-06-22', description: 'Quote for new sound system installation.', photos: [], notes: [] },
  { id: 'JOB-010', customer: 'Michael Johnson', boat: 'Chaparral 23 SSi', tech: 'Mike Miller', status: 'Parts Ordered', created: '2024-06-21', description: 'Replace worn impeller.', photos: [], notes: [] },
  { id: 'JOB-009', customer: 'Noah Williams', boat: 'Grady-White', tech: 'Chris Taylor', status: 'On Hold', created: '2024-06-20', description: 'Customer requested to pause winterization service.', photos: [], notes: [] },
];


export const initialCustomers = [
  { 
    id: 1, 
    name: 'Liam Johnson', 
    email: 'liam.j@example.com', 
    phone: '(555) 123-4567',
    address: '123 Marina Drive, Sunset Bay, FL 33101',
    emergencyContact: 'Sarah Johnson - (555) 123-4568',
    boats: [
      {
        name: 'Sea Ray 240',
        year: 2019,
        model: 'Sea Ray Sundeck 240',
        engineType: 'MerCruiser 4.5L',
        hullId: 'SER12345A819',
        length: '24 ft',
        registration: 'FL-1234-BC'
      }
    ], 
    avatar: 'https://placehold.co/40x40.png?text=LJ', 
    customerAvatar: null as string | null,
    boatImage: null as string | null,
    memberSince: '2023-03-15',
    customerTier: 'Premium',
    preferredContact: 'email',
    serviceLocation: 'marina',
    billingAddress: '123 Marina Drive, Sunset Bay, FL 33101',
    paymentMethod: 'Credit Card',
    totalServices: 8,
    lastService: '2024-11-15',
    nextScheduled: '2025-03-15',
    internalNotes: 'Prefers morning appointments. Very knowledgeable about boat maintenance.'
  },
  { 
    id: 2, 
    name: 'Olivia Smith', 
    email: 'olivia.s@example.com', 
    phone: '(555) 234-5678',
    address: '456 Ocean View Blvd, Coral Cove, FL 33102',
    emergencyContact: 'Mark Smith - (555) 234-5679',
    boats: [
      {
        name: 'Boston Whaler',
        year: 2020,
        model: 'Boston Whaler 170 Montauk',
        engineType: 'Mercury 90HP',
        hullId: 'BWH67890B920',
        length: '17 ft',
        registration: 'FL-5678-DE'
      }
    ], 
    avatar: 'https://placehold.co/40x40.png?text=OS', 
    customerAvatar: null as string | null,
    boatImage: null as string | null,
    memberSince: '2023-07-22',
    customerTier: 'Regular',
    preferredContact: 'phone',
    serviceLocation: 'home',
    billingAddress: '456 Ocean View Blvd, Coral Cove, FL 33102',
    paymentMethod: 'Check',
    totalServices: 4,
    lastService: '2024-10-20',
    nextScheduled: '2025-04-20',
    internalNotes: 'First-time boat owner. Needs detailed explanations of maintenance procedures.'
  },
  { 
    id: 3, 
    name: 'Noah Williams', 
    email: 'noah.w@example.com', 
    phone: '(555) 345-6789',
    address: '789 Dockside Lane, Harbor Point, FL 33103',
    emergencyContact: 'Lisa Williams - (555) 345-6790',
    boats: [
      {
        name: 'Grady-White',
        year: 2018,
        model: 'Grady-White Freedom 235',
        engineType: 'Yamaha F250',
        hullId: 'GRW11223C818',
        length: '23.5 ft',
        registration: 'FL-9012-FG'
      }
    ], 
    avatar: 'https://placehold.co/40x40.png?text=NW', 
    customerAvatar: null as string | null,
    boatImage: null as string | null,
    memberSince: '2022-11-10',
    customerTier: 'VIP',
    preferredContact: 'email',
    serviceLocation: 'marina',
    billingAddress: '789 Dockside Lane, Harbor Point, FL 33103',
    paymentMethod: 'Credit Card',
    totalServices: 12,
    lastService: '2024-12-01',
    nextScheduled: '2025-02-28',
    internalNotes: 'VIP customer. Owns fishing charter business. Requires priority scheduling.'
  },
  { 
    id: 4, 
    name: 'Emma Brown', 
    email: 'emma.b@example.com', 
    phone: '(555) 456-7890',
    address: '321 Bayshore Dr, Wave Crest, FL 33104',
    emergencyContact: 'David Brown - (555) 456-7891',
    boats: [
      {
        name: 'Yamaha 242X',
        year: 2021,
        model: 'Yamaha 242X E-Series',
        engineType: 'Yamaha TR-1 HO',
        hullId: 'YAM33445D121',
        length: '24.2 ft',
        registration: 'FL-3456-HI'
      }
    ], 
    avatar: 'https://placehold.co/40x40.png?text=EB', 
    customerAvatar: null as string | null,
    boatImage: null as string | null,
    memberSince: '2024-01-08',
    customerTier: 'Regular',
    preferredContact: 'text',
    serviceLocation: 'marina',
    billingAddress: '321 Bayshore Dr, Wave Crest, FL 33104',
    paymentMethod: 'Credit Card',
    totalServices: 2,
    lastService: '2024-09-10',
    nextScheduled: '2025-05-10',
    internalNotes: 'Young family with kids. Prefers weekend appointments.'
  },
  { id: 5, name: 'James Jones', email: 'james.j@example.com', phone: '(555) 567-8901', address: '654 Marina Way, Tide Pool, FL 33105', emergencyContact: 'Jennifer Jones - (555) 567-8902', boats: [{ name: 'MasterCraft XT24', year: 2020, model: 'MasterCraft XT24', engineType: 'Ilmor 6.2L', hullId: 'MST55667E220', length: '24 ft', registration: 'FL-6789-JK' }], avatar: 'https://placehold.co/40x40.png?text=JJ', customerAvatar: null as string | null, boatImage: null as string | null, memberSince: '2023-05-12', customerTier: 'Premium', preferredContact: 'phone', serviceLocation: 'home', billingAddress: '654 Marina Way, Tide Pool, FL 33105', paymentMethod: 'Check', totalServices: 6, lastService: '2024-11-05', nextScheduled: '2025-03-05', internalNotes: 'Wake surfing enthusiast. Needs specialized maintenance for water sports equipment.' },
  { id: 6, name: 'Ava Garcia', email: 'ava.g@example.com', phone: '(555) 678-9012', address: '987 Compass Ct, Anchor Bay, FL 33106', emergencyContact: 'Carlos Garcia - (555) 678-9013', boats: [{ name: 'Scout 215 XSF', year: 2019, model: 'Scout 215 XSF', engineType: 'Yamaha F150', hullId: 'SCT77889F919', length: '21.5 ft', registration: 'FL-0123-LM' }], avatar: 'https://placehold.co/40x40.png?text=AG', customerAvatar: null as string | null, boatImage: null as string | null, memberSince: '2023-09-30', customerTier: 'Regular', preferredContact: 'email', serviceLocation: 'marina', billingAddress: '987 Compass Ct, Anchor Bay, FL 33106', paymentMethod: 'Credit Card', totalServices: 5, lastService: '2024-10-15', nextScheduled: '2025-04-15', internalNotes: 'Fishing guide. Requires reliable equipment for client trips.' },
  { id: 7, name: 'William Miller', email: 'william.m@example.com', phone: '(555) 789-0123', address: '147 Lighthouse Rd, Beacon Point, FL 33107', emergencyContact: 'Mary Miller - (555) 789-0124', boats: [{ name: 'Key West 203 FS', year: 2022, model: 'Key West 203 FS', engineType: 'Mercury 150HP', hullId: 'KEY99001G222', length: '20.3 ft', registration: 'FL-4567-NO' }], avatar: 'https://placehold.co/40x40.png?text=WM', customerAvatar: null as string | null, boatImage: null as string | null, memberSince: '2024-02-14', customerTier: 'Regular', preferredContact: 'phone', serviceLocation: 'marina', billingAddress: '147 Lighthouse Rd, Beacon Point, FL 33107', paymentMethod: 'Credit Card', totalServices: 3, lastService: '2024-12-10', nextScheduled: '2025-06-10', internalNotes: 'Retired. Very punctual and appreciates detailed service reports.' },
  { id: 8, name: 'Sophia Davis', email: 'sophia.d@example.com', phone: '(555) 890-1234', address: '258 Sailor St, Port Royal, FL 33108', emergencyContact: 'Michael Davis - (555) 890-1235', boats: [{ name: 'Tidewater 220 CC', year: 2020, model: 'Tidewater 220 CC Adventure', engineType: 'Suzuki DF200', hullId: 'TDW22113H220', length: '22 ft', registration: 'FL-7890-PQ' }], avatar: 'https://placehold.co/40x40.png?text=SD', customerAvatar: null as string | null, boatImage: null as string | null, memberSince: '2023-06-18', customerTier: 'Premium', preferredContact: 'email', serviceLocation: 'home', billingAddress: '258 Sailor St, Port Royal, FL 33108', paymentMethod: 'Credit Card', totalServices: 7, lastService: '2024-11-20', nextScheduled: '2025-02-20', internalNotes: 'Family boat. Safety is top priority. Always requests thorough safety checks.' },
  { id: 9, name: 'Alex Thompson', email: 'alex.t@example.com', phone: '(555) 901-2345', address: '369 Captain Cove, Shell Harbor, FL 33109', emergencyContact: 'Jessica Thompson - (555) 901-2346', boats: [{ name: 'Formula 310 BR', year: 2018, model: 'Formula 310 Bowrider', engineType: 'MerCruiser 8.2L', hullId: 'FOR44556I818', length: '31 ft', registration: 'FL-0987-RS' }], avatar: 'https://placehold.co/40x40.png?text=AT', customerAvatar: null as string | null, boatImage: null as string | null, memberSince: '2022-08-25', customerTier: 'VIP', preferredContact: 'phone', serviceLocation: 'marina', billingAddress: '369 Captain Cove, Shell Harbor, FL 33109', paymentMethod: 'Credit Card', totalServices: 15, lastService: '2024-12-15', nextScheduled: '2025-01-30', internalNotes: 'Luxury boat owner. Demands premium service and uses boat for corporate events.' },
  { id: 10, name: 'Samantha Miller', email: 'samantha.m@example.com', phone: '(555) 012-3456', address: '741 Regatta Way, Victory Bay, FL 33110', emergencyContact: 'Robert Miller - (555) 012-3457', boats: [{ name: 'Chris-Craft Launch 27', year: 2021, model: 'Chris-Craft Launch 27', engineType: 'Mercury 300HP', hullId: 'CHR66778J221', length: '27 ft', registration: 'FL-2468-TU' }], avatar: 'https://placehold.co/40x40.png?text=SM', customerAvatar: null as string | null, boatImage: null as string | null, memberSince: '2023-12-03', customerTier: 'Premium', preferredContact: 'email', serviceLocation: 'marina', billingAddress: '741 Regatta Way, Victory Bay, FL 33110', paymentMethod: 'Credit Card', totalServices: 4, lastService: '2024-11-30', nextScheduled: '2025-05-30', internalNotes: 'Classic boat enthusiast. Prefers original parts and traditional maintenance methods.' },
  { id: 11, name: 'Benjamin Green', email: 'ben.g@example.com', boats: ['Cobalt R6'], avatar: 'https://placehold.co/40x40.png?text=BG', boatImage: null as string | null },
  { id: 12, name: 'Michael Johnson', email: 'michael.j@example.com', boats: ['Chaparral 23 SSi'], avatar: 'https://placehold.co/40x40.png?text=MJ', boatImage: null as string | null },
];


export const initialTechnicians: Technician[] = [
  { id: 1, name: 'Mike Miller', email: 'mike.m@sutherlandmarine.com', specialization: 'Engine Repair', status: 'Available', avatar: 'https://placehold.co/40x40.png?text=MM', certification: 'Marine Master', efficiency: 92, workload: 6 },
  { id: 2, name: 'David Wilson', email: 'dave.w@sutherlandmarine.com', specialization: 'Electronics', status: 'On Job', avatar: 'https://placehold.co/40x40.png?text=DW', certification: 'Electronics Specialist', efficiency: 88, workload: 8 },
  { id: 3, name: 'Chris Taylor', email: 'chris.t@sutherlandmarine.com', specialization: 'Fiberglass', status: 'Available', avatar: 'https://placehold.co/40x40.png?text=CT', certification: 'Hull Specialist', efficiency: 95, workload: 5 },
  { id: 4, name: 'Andrew Moore', email: 'andy.m@sutherlandmarine.com', specialization: 'General Maintenance', status: 'On Leave', avatar: 'https://placehold.co/40x40.png?text=AM', certification: 'General Tech', efficiency: 85, workload: 0 },
];

export const initialInvoices = [
  { id: 'INV-010', job: 'JOB-015', customer: 'Alex Thompson', amount: '$550.00', status: 'Paid', issued: '2024-06-28', due: '2024-07-28' },
  { id: 'INV-009', job: 'JOB-012', customer: 'Benjamin Green', amount: '$1,800.00', status: 'Pending', issued: '2024-06-24', due: '2024-07-24' },
  { id: 'INV-008', job: 'JOB-013', customer: 'Liam Johnson', amount: '$750.00', status: 'Paid', issued: '2024-06-25', due: '2024-07-25' },
  { id: 'INV-007', job: 'JOB-008', customer: 'Sophia Davis', amount: '$950.00', status: 'Overdue', issued: '2024-05-20', due: '2024-06-20' },
  { id: 'INV-006', job: 'JOB-007', customer: 'William Miller', amount: '$1,200.00', status: 'Paid', issued: '2024-05-15', due: '2024-06-15' },
];


export const initialInventoryItems: InventoryItem[] = [
  { id: 'PRT-001', name: 'Spark Plug', brand: 'NGK', stock: 48, location: 'Bin A-12', price: '$4.99', quantity: 48, reorderPoint: 20, cost: 3.99 },
  { id: 'PRT-002', name: 'Oil Filter', brand: 'Yamaha', stock: 24, location: 'Bin B-03', price: '$12.50', quantity: 24, reorderPoint: 15, cost: 8.50 },
  { id: 'PRT-003', name: 'Fuel Injector', brand: 'Mercury', stock: 8, location: 'Bin C-07', price: '$89.95', quantity: 8, reorderPoint: 10, cost: 65.00 },
  { id: 'PRT-004', name: 'Impeller Kit', brand: 'Johnson', stock: 15, location: 'Bin A-02', price: '$35.00', quantity: 15, reorderPoint: 12, cost: 25.00 },
  { id: 'PRT-005', name: 'Marine Battery', brand: 'Interstate', stock: 10, location: 'Shelf D-1', price: '$175.00', quantity: 10, reorderPoint: 8, cost: 120.00 },
  { id: 'PRT-006', name: 'Anode Kit', brand: 'Volvo Penta', stock: 3, location: 'Bin E-05', price: '$45.75', quantity: 3, reorderPoint: 5, cost: 32.00 },
];

export const initialQuotes = [
  { id: 'QUOTE-011', customer: 'Olivia Davis', boat: 'Regal LS4', amount: '$1,250.00', status: 'Pending', created: '2024-06-22', description: 'New sound system installation with 4 speakers and amplifier.' },
  { id: 'QUOTE-010', customer: 'James Jones', boat: 'MasterCraft XT24', amount: '$3,400.00', status: 'Approved', created: '2024-06-18', description: 'Complete hull repainting and anti-fouling treatment.' },
  { id: 'QUOTE-009', customer: 'Ava Garcia', boat: 'Scout 215 XSF', amount: '$850.50', status: 'Approved', created: '2024-06-15', description: 'Repair damaged upholstery on bow seating.' },
  { id: 'QUOTE-008', customer: 'William Miller', boat: 'Key West 203 FS', amount: '$2,100.00', status: 'Declined', created: '2024-06-12', description: 'Engine overhaul and propeller replacement.' },
  { id: 'QUOTE-007', customer: 'Emma Brown', boat: 'Yamaha 242X', amount: '$780.00', status: 'Approved', created: '2024-06-10', description: 'Install underwater LED lighting.' },
];

// Demo license validation functions
export const checkDemoLicense = () => {
  const licenseAccepted = localStorage.getItem('sutherland-marine-demo-license-accepted');
  const acceptedDate = localStorage.getItem('sutherland-marine-demo-license-date');
  
  if (!licenseAccepted || !acceptedDate) {
    return { isValid: false, daysRemaining: 0, isExpired: false };
  }
  
  const acceptDate = parseInt(acceptedDate);
  const currentTime = Date.now();
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const expirationTime = acceptDate + thirtyDaysInMs;
  
  if (currentTime >= expirationTime) {
    return { isValid: false, daysRemaining: 0, isExpired: true };
  }
  
  const daysRemaining = Math.ceil((expirationTime - currentTime) / (24 * 60 * 60 * 1000));
  return { isValid: true, daysRemaining, isExpired: false };
};

export const getDemoWatermarkText = () => {
  const { daysRemaining } = checkDemoLicense();
  return `DEMO VERSION - ${daysRemaining} days remaining`;
};

// Copyright notice for demo data
export const DEMO_COPYRIGHT_NOTICE = `
© 2025 Sutherland Marine. All rights reserved.
This demo data is fictional and for evaluation purposes only.
Commercial use requires a separate license agreement.
Contact: sales@sutherlandmarine.com
`;
