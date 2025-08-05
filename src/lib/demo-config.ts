/**
 * Sutherland Marine Demo Configuration
 * 
 * Copyright (c) 2025 Sutherland Marine. All rights reserved.
 * 
 * This file contains configuration settings for the demo application.
 * Commercial use requires a separate license agreement.
 * 
 * License: SEE LICENSE IN LICENSE_DEMO.md
 * Contact: sales@sutherlandmarine.com
 */

// Demo license configuration
export const DEMO_CONFIG = {
  // License settings
  LICENSE_DURATION_DAYS: 30,
  LICENSE_WARNING_DAYS: 7, // Show warning when less than this many days remain
  LICENSE_CRITICAL_DAYS: 3, // Show urgent warning when less than this many days remain
  
  // Demo identification
  VERSION: '1.0.0',
  BUILD_DATE: '2025-08-05',
  IS_DEMO: true,
  
  // Feature flags for demo
  FEATURES: {
    FULL_FUNCTIONALITY: true,
    DATA_EXPORT: true,
    LOCAL_STORAGE_ONLY: true,
    OFFLINE_MODE: true,
    WATERMARKS: true,
    LICENSE_ENFORCEMENT: true,
  },
  
  // Contact information
  CONTACTS: {
    SALES: 'sales@sutherlandmarine.com',
    SUPPORT: 'demo@sutherlandmarine.com',
    LEGAL: 'legal@sutherlandmarine.com',
    PRIVACY: 'privacy@sutherlandmarine.com',
    PHONE: '(555) 123-BOAT',
  },
  
  // URLs
  URLS: {
    WEBSITE: 'https://www.sutherlandmarine.com',
    COMMERCIAL_LICENSING: 'https://www.sutherlandmarine.com/licensing',
    PRIVACY_POLICY: 'https://www.sutherlandmarine.com/privacy',
    TERMS_OF_SERVICE: 'https://www.sutherlandmarine.com/terms',
  },
  
  // Demo limitations
  LIMITATIONS: {
    MAX_CUSTOMERS: 50,
    MAX_JOBS: 100,
    MAX_INVOICES: 100,
    DATA_RETENTION_DAYS: 30,
    CONCURRENT_USERS: 1,
  },
  
  // Legal notices
  COPYRIGHT_NOTICE: '© 2025 Sutherland Marine. All rights reserved.',
  LICENSE_NOTICE: 'This software is licensed for evaluation purposes only. Commercial use requires a separate license agreement.',
  
  // Demo data flags
  DEMO_DATA: {
    IS_FICTIONAL: true,
    PURPOSE: 'demonstration and evaluation only',
    NO_REAL_CUSTOMER_DATA: true,
    LOCAL_STORAGE_ONLY: true,
  }
};

// License status enumeration
export enum LicenseStatus {
  VALID = 'valid',
  WARNING = 'warning',
  CRITICAL = 'critical',
  EXPIRED = 'expired',
  NOT_ACCEPTED = 'not_accepted'
}

// Demo license utilities
export class DemoLicense {
  static getStatus(): LicenseStatus {
    const licenseData = this.getLicenseData();
    
    if (!licenseData.accepted) {
      return LicenseStatus.NOT_ACCEPTED;
    }
    
    if (licenseData.expired) {
      return LicenseStatus.EXPIRED;
    }
    
    if (licenseData.daysRemaining <= DEMO_CONFIG.LICENSE_CRITICAL_DAYS) {
      return LicenseStatus.CRITICAL;
    }
    
    if (licenseData.daysRemaining <= DEMO_CONFIG.LICENSE_WARNING_DAYS) {
      return LicenseStatus.WARNING;
    }
    
    return LicenseStatus.VALID;
  }
  
  static getLicenseData() {
    const licenseAccepted = localStorage.getItem('sutherland-marine-demo-license-accepted');
    const acceptedDate = localStorage.getItem('sutherland-marine-demo-license-date');
    
    if (!licenseAccepted || !acceptedDate) {
      return {
        accepted: false,
        daysRemaining: DEMO_CONFIG.LICENSE_DURATION_DAYS,
        expired: false,
        acceptedDate: null,
        expirationDate: null
      };
    }
    
    const acceptDate = parseInt(acceptedDate);
    const currentTime = Date.now();
    const durationMs = DEMO_CONFIG.LICENSE_DURATION_DAYS * 24 * 60 * 60 * 1000;
    const expirationTime = acceptDate + durationMs;
    
    const expired = currentTime >= expirationTime;
    const daysRemaining = expired ? 0 : Math.ceil((expirationTime - currentTime) / (24 * 60 * 60 * 1000));
    
    return {
      accepted: true,
      daysRemaining,
      expired,
      acceptedDate: new Date(acceptDate),
      expirationDate: new Date(expirationTime)
    };
  }
  
  static accept() {
    const currentTime = Date.now();
    localStorage.setItem('sutherland-marine-demo-license-accepted', 'true');
    localStorage.setItem('sutherland-marine-demo-license-date', currentTime.toString());
  }
  
  static revoke() {
    localStorage.removeItem('sutherland-marine-demo-license-accepted');
    localStorage.removeItem('sutherland-marine-demo-license-date');
  }
  
  static getWatermarkText(): string {
    const { daysRemaining } = this.getLicenseData();
    return `DEMO VERSION - ${daysRemaining} days remaining`;
  }
  
  static getLegalNotice(): string {
    return `${DEMO_CONFIG.COPYRIGHT_NOTICE}\n${DEMO_CONFIG.LICENSE_NOTICE}`;
  }
}

// Export configuration for use throughout the application
export default DEMO_CONFIG;
