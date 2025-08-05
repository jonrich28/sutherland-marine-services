# 🚤 Sutherland Marine Demo Setup Guide

Welcome to the Sutherland Marine service management demo! This guide will help you get the demo running locally on your machine.

## ⚖️ Important Legal Notice

**Before proceeding, please read:**
- [Demo License Agreement](./LICENSE_DEMO.md) - Terms and conditions for demo use
- [Privacy Notice](./PRIVACY_NOTICE.md) - How we handle your information
- [Copyright Notice](./COPYRIGHT.md) - Intellectual property information

**By downloading and using this demo, you agree to the terms outlined in the license agreement.**

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your computer:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **A code editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

## 🚀 Quick Start (5 minutes)

### 1. Download the Demo
```bash
# Clone the repository
git clone https://github.com/your-username/sutherland-marine-demo.git
cd sutherland-marine-demo

# Or download as ZIP from GitHub and extract
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Demo
```bash
npm run dev
```

### 4. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Login Credentials

**⚠️ EVALUATION USE ONLY - 30 DAY LICENSE**

The demo includes three user types with different access levels:

### Business Owner Account
- **Email:** `owner@sutherlandmarine.com`
- **Role:** Complete access to all features
- **Features:** Dashboard, job management, customer management, invoicing, inventory, reports

### Technician Account
- **Email:** `tech@sutherlandmarine.com`
- **Role:** Field technician with mobile-optimized interface
- **Features:** Job assignments, progress tracking, photo uploads, customer messaging

### Customer Account
- **Email:** `customer@sutherlandmarine.com`
- **Role:** Customer portal with service tracking
- **Features:** Service history, invoice viewing, job progress, boat information

## 📱 Testing Different Interfaces

### Desktop Experience
- Use any of the login credentials above
- Full-featured dashboard and management interface
- Best experienced on desktop/laptop

### Mobile Experience
- Use **Technician** or **Customer** credentials
- Responsive mobile interface with bottom navigation
- Test on mobile device or use browser developer tools to simulate mobile

## 🎯 Key Features to Explore

### For Business Owners:
1. **Dashboard** - Revenue charts, job status overview, key metrics
2. **Customer Management** - Comprehensive customer profiles with boat information
3. **Job Management** - Create, assign, and track service jobs
4. **Invoicing** - Generate and manage customer invoices
5. **Inventory** - Track parts and supplies
6. **Team Management** - Manage technicians and assignments

### For Technicians:
1. **Mobile Job Interface** - Optimized for field work
2. **Photo Documentation** - Camera integration for job photos
3. **Progress Tracking** - Update job status and add notes
4. **Customer Communication** - Direct messaging capabilities

### For Customers:
1. **Service History** - View past and scheduled services
2. **Invoice Portal** - View and download invoices
3. **Job Progress** - Real-time updates on current work
4. **Boat Profiles** - Manage boat information and photos

## 🛠 Demo Data

The demo comes pre-loaded with:
- **9 sample customers** with detailed profiles and boat information
- **15 sample jobs** in various stages of completion
- **10 sample invoices** with different payment statuses
- **Sample inventory items** and parts tracking
- **Complete service history** spanning multiple years

## 🔧 Customization Options

### Branding
- Update `src/app/layout.tsx` to change the app title
- Modify colors in `tailwind.config.ts`
- Replace logo in `public/` directory

### Sample Data
- Edit `src/lib/data.ts` to customize:
  - Customer information
  - Job types and descriptions
  - Inventory items
  - Invoice data

### Features
- Enable/disable features by modifying component visibility
- Customize user roles and permissions
- Add new job categories or service types

## 📊 Performance & Technical Details

### Built With:
- **Next.js 15** - React framework with static generation
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Professional component library
- **Firebase Hosting** - Fast, reliable hosting

### Performance Features:
- **Static Generation** - Pre-built pages for fast loading
- **Mobile Optimization** - Responsive design for all devices
- **PWA Ready** - Can be installed as mobile app
- **SEO Optimized** - Search engine friendly

## 🚀 Deployment Options

### Option 1: Local Development Only
```bash
npm run dev
```
Access at http://localhost:3000

### Option 2: Production Build (Local)
```bash
npm run build
npm start
```

### Option 3: Deploy to Cloud
The demo can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Firebase Hosting**
- **AWS Amplify**

## 📞 Support & Questions

### Getting Help
1. Check the [troubleshooting section](#troubleshooting) below
2. Review the [FAQ](#frequently-asked-questions)
3. Contact our team for business inquiries

### Business Inquiries
- **Sales:** sales@sutherlandmarine.com
- **Demo Support:** demo@sutherlandmarine.com
- **Technical Questions:** tech@sutherlandmarine.com

## 🔍 Troubleshooting

### Common Issues:

#### "npm install" fails
```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Port 3000 already in use
```bash
# Use a different port
npm run dev -- --port 3001
```

#### Build errors
```bash
# Check Node.js version (should be 18+)
node --version

# Update dependencies
npm update
```

### Browser Issues:
- **Clear browser cache** if seeing old content
- **Disable ad blockers** that might interfere
- **Use incognito mode** for testing

## ❓ Frequently Asked Questions

### Q: Is this a fully functional application?
A: Yes! This is a complete demo with all features working. Data is stored locally and resets when you restart the application.

### Q: Can I customize the demo for my business?
A: Absolutely! The demo is designed to be easily customizable. You can modify branding, data, and features.

### Q: How do I get the full commercial version?
A: Contact our sales team for licensing and implementation options for your marine service business.

### Q: Does this work on mobile devices?
A: Yes! The demo includes responsive design and specialized mobile interfaces for technicians and customers.

### Q: Can I integrate this with my existing systems?
A: The commercial version supports integrations with common marine industry software, accounting systems, and payment processors.

## 📈 Next Steps

### Interested in the Full Version?
1. **Schedule a Demo Call** - Get a personalized walkthrough
2. **Request a Quote** - Pricing for your business size
3. **Implementation Plan** - Timeline and setup process
4. **Training & Support** - Get your team up and running

### Ready to Get Started?
Contact us at **sales@sutherlandmarine.com** or call **(555) 123-BOAT**

## ⚖️ Legal and Licensing

### Demo License Limitations
- **Evaluation use only** - Not for commercial use
- **30-day license period** - Must obtain commercial license for continued use
- **No redistribution** - Cannot share or distribute this demo
- **Local use only** - All data stays on your machine

### Commercial Licensing
For production use, contact our sales team for:
- Commercial license pricing
- Implementation services
- Training and support
- Custom integrations

### Questions?
- **Licensing:** legal@sutherlandmarine.com
- **Sales:** sales@sutherlandmarine.com
- **Technical:** demo@sutherlandmarine.com

---

*This demo showcases the core functionality of our marine service management platform. The full commercial version includes additional features, integrations, and enterprise support.*

**© 2025 Sutherland Marine. All rights reserved. See LICENSE_DEMO.md for complete terms.**
