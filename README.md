# GPTGenius

GPTGenius is a location-based text prompt application built with Next.js, Tailwind CSS, Daisy UI, Clerk Authentication, and React Query. Users can specify a city to receive relevant information and images about the location, powered by the GPT model.

## Installation

To get started with GPTGenius, follow the steps below:

### Prerequisites

-   Node.js (version 14 or higher)
-   npm or yarn package manager

### Clone the Repository

First, clone the GPTGenius repository to your local machine:

```
git clone https://github.com/your-username/GPTGenius.git
```

### Install Dependencies

To install the necessary dependencies, follow these steps:

1. Navigate to the project directory:

```
cd gpt-genius
```

2. Navigate to the project directory:

```
npm install
```

or if you use yarn

```
yarn install
```

## Technologies Used

-   **Next.js**: A React framework for building server-side rendered and statically generated web applications.
-   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
-   **Daisy UI**: A plugin for Tailwind CSS to provide UI components for building clean, responsive layouts.
-   **Clerk Authentication**: A powerful authentication solution for user management, providing secure login and sign-up functionality.
-   **React Query**: A data-fetching and state management library for React, used to manage server-state in the application.
-   **OpenAI GPT-4o mini**: An AI model from OpenAI used for generating location-based responses and information through text prompts.
-   **Supabase**: PostgreSQL database with real-time capabilities.
-   **Prisma**: ORM for managing database queries and schema.

## Features

-   **City-based Text Prompt**: Location-based information and image retrieval through GPT model integration. Enter a city name, and GPT Genius returns relevant information and images.
-   **User Authentication**: Secure login and authentication using Clerk.
-   **Database Integration**: Supabase as a scalable backend with Prisma for database management.
-   **Responsive UI**: Responsive design with Tailwind CSS and Daisy UI components.
-   **Image Integration**: Displays relevant city images alongside text-based information.

### Setup OpenAI API

1. Sign up for an OpenAI account (https://platform.openai.com/).
2. Create an API key from the OpenAI dashboard.
3. Add the following environment variable to your `.env.local` file:

```
OPENAI_API_KEY=<your-openai-api-key>
```

### Setup Clerk Authentication

1. Sign up for Clerk (https://clerk.dev/) and create a new application.
2. Copy your Clerk API keys (Publishable Key and Secret Key).
3. Create a `.env.local` file in the root of the project and add your Clerk API keys along with the necessary Clerk URLs:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/chat
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/chat
```

### Setup Supabase Authentication

1. Sign up at [Supabase](https://supabase.com/)
2. Create a new project and get the API keys.
3. Add Supabase database URLs to `.env.local` and `.env`:

```
DATABASE_URL=<your-supabase-database-url>
DIRECT_URL=<your-supabase-direct-url>
```

### Setup Unsplash API

1.  Sign up at [Unsplash](https://unsplash.com/developers) to get the API key.
2.  Add the Unsplash API key to `.env.local` and `.env`:

```
UNSPLASH_API_KEY=<your-unsplash-api-key>
```
