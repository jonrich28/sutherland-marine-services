@echo off
cls

echo 🚤 Sutherland Marine Demo Setup
echo ===============================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo    Version: %NODE_VERSION%

REM Check if npm is available
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not available. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ npm detected
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo    Version: %NPM_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    echo Try running: npm cache clean --force
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully
echo.
echo 🚀 Setup complete! Starting the demo...
echo.
echo 📋 Demo Login Credentials:
echo   Business Owner: owner@sutherlandmarine.com
echo   Technician:     tech@sutherlandmarine.com
echo   Customer:       customer@sutherlandmarine.com
echo.
echo 🌐 Opening demo at http://localhost:3000
echo Press Ctrl+C to stop the demo server
echo.

REM Start the development server
call npm run dev
