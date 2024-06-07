## Cloning Repo in local machine

```bash
git clone https://github.com/sahrawataditya/bio-mandii-frontend.git
```

## Install All Dependencies

```bash
npm install
# or
yarn
# or
pnpm
# or
bun
```

## Running Server Locally
Change the axiosService url to local if you want to use local server
In this file ./lib/axiosService.js
```bash
Before
export const axiosService = axios.create({
  baseURL: "https://bio-mandii-backend.onrender.com/api/v1",
});
After running the backend
export const axiosService = axios.create({
  baseURL: "http://localhost:server-port/api/v1",
});
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
