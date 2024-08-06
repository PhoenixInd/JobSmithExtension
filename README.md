# JobSmith Extension

This is the browser extension for the JobSmith project, developed with React, Vite, Tailwindcss, Mistral, and Vercel SDK AI. This guide will help you set up and test the extension in your browser.

## Requirements

- Node.js (v17 or higher)
- Google Chrome

## Project Setup

Follow these steps to set up and test the extension on your local machine.

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/PhoenixInd/JobSmithExtension.git
cd JobSmithExtension
```

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the project root and add the necessary environment variables. You can base it on the `.env.example` file.

```bash
cp .env.example .env
```

#### 4. Build the Extension

Build the extension using the following command:

```bash
npm run build
```

#### 5. Load the Extension in Chrome

1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" in the top right corner.
3. Click on "Load unpacked".
4. Navigate to the project folder and select the `dist` folder.

The extension should load and be ready for use.

### Available Scripts

- `npm run build`: Builds the extension.
- `npm run watch`: Builds the extension and updates as you make changes.
