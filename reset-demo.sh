#!/bin/bash

# Demo Data Reset Script
# Restores the demo to its original state with fresh sample data

echo "🔄 Resetting Sutherland Marine Demo"
echo "==================================="
echo ""

# Stop any running dev server
echo "🛑 Stopping demo server..."
pkill -f "next dev" 2>/dev/null || true
sleep 2

# Clear any cached data
echo "🧹 Clearing cached data..."
rm -rf .next 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true

# Clear browser storage message
echo "📱 Demo reset complete!"
echo ""
echo "📋 To complete the reset:"
echo "   1. Clear your browser cache (Ctrl+Shift+Delete)"
echo "   2. Or use incognito/private browsing mode"
echo ""
echo "🚀 Restarting demo with fresh data..."
echo ""

# Restart the demo
npm run dev
