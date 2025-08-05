@echo off
cls

echo 🔄 Resetting Sutherland Marine Demo
echo ===================================
echo.

REM Stop any running dev server
echo 🛑 Stopping demo server...
taskkill /f /im node.exe >nul 2>nul
timeout /t 2 >nul

REM Clear any cached data
echo 🧹 Clearing cached data...
if exist ".next" rmdir /s /q ".next" >nul 2>nul
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache" >nul 2>nul

REM Clear browser storage message
echo 📱 Demo reset complete!
echo.
echo 📋 To complete the reset:
echo    1. Clear your browser cache (Ctrl+Shift+Delete)
echo    2. Or use incognito/private browsing mode
echo.
echo 🚀 Restarting demo with fresh data...
echo.

REM Restart the demo
call npm run dev
