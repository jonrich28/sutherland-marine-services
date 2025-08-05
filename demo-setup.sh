#!/bin/bash

# Sutherland Marine Demo Setup Script
# This script automates the setup process for potential customers

echo "🚤 Sutherland Marine Demo Setup"
echo "==============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node -v)"
    echo "Please update Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not available. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
if npm install; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    echo "Try running: npm cache clean --force && npm install"
    exit 1
fi

echo ""
echo "🚀 Setup complete! Starting the demo..."
echo ""
echo "📋 Demo Login Credentials:"
echo "  Business Owner: owner@sutherlandmarine.com"
echo "  Technician:     tech@sutherlandmarine.com"
echo "  Customer:       customer@sutherlandmarine.com"
echo ""
echo "🌐 Opening demo at http://localhost:3000"
echo "Press Ctrl+C to stop the demo server"
echo ""

# Start the development server
npm run dev
