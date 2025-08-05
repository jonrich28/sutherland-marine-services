# Sutherland Marine - Firebase Studio Project

This is a Next.js application built in Firebase Studio for managing a marine service shop. It includes features for job management, customer and technician tracking, invoicing, and AI-powered assistance.

## Getting the Code to Your Local Computer

Follow these steps to transfer the project from the Firebase Studio environment to your local machine for further development and deployment.

### Prerequisites

- **Node.js**: Make sure you have Node.js version 18.x or later installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm** or **yarn**: A Node.js package manager. npm is included with Node.js.

### Step 1: Create a Project Folder

On your local computer, create a new folder where you want to store the project. For example:

```bash
mkdir sutherland-marine
cd sutherland-marine
```

### Step 2: Recreate the File Structure

Inside your new `sutherland-marine` folder, recreate the directory structure and files from this Firebase Studio project. You can see the full file list in the file explorer panel in the Studio.

**Key files and folders to create:**

- `src/`
  - `app/`
  - `components/`
  - `hooks/`
  - `lib/`
  - `ai/`
  - `__tests__/`
- `package.json`
- `tailwind.config.ts`
- `next.config.ts`
- `tsconfig.json`
- `components.json`
- `jest.config.ts`
- `jest.setup.ts`
- `.env` (can be empty initially)

### Step 3: Copy the Code

For each file you create, copy the entire content from the corresponding file in the Firebase Studio workspace and paste it into your local file.

> **Tip**: You can ask me to "Show me the code for `[file path]`" for any file, and I will display its full content for you to easily copy. The `package.json` is especially important to get all the dependencies right.

### Step 4: Install Dependencies

Once you have copied all the files, open a terminal in your project's root directory (`sutherland-marine`) and run the following command to install all the necessary packages listed in `package.json`:

```bash
npm install
```
or if you use yarn:
```bash
yarn install
```

### Step 5: Run the Development Server

After the installation is complete, you can start the local development server:

```bash
npm run dev
```

This will launch the application, and you can view it in your browser at `http://localhost:9002`.

You now have a complete copy of the project running on your local machine, ready for further development or deployment to your own hosting provider.