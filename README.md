# TeeBay

A full-stack application for buying, selling, and renting products. TeeBay provides a platform where users can list their products, buy products from others, or rent items for a specific period.

Here is a loom recording demonstrating all its features: [click here](https://www.loom.com/share/00d1647c26a64b89951408532b308bd0?sid=768365ba-6692-425e-be22-d17ba66f1b05)

## Project Overview

TeeBay is built using a modern tech stack with a Vue 3 frontend and a Node.js/Express/GraphQL backend. The application uses a PostgreSQL database for data storage and is structured as a monorepo using Turborepo for efficient build and development workflows.

## Features

### User Authentication

- User registration with personal details (name, address, email, etc.)
- Protected routes for authenticated users

### Product Management

- Create new product listings with details (title, description, price, etc.)
- Set products for sale or rent with custom rental periods and prices
- Categorize products for better organization
- Update or delete your product listings
- View product details including owner information

### Buying and Selling

- Browse all available products
- Purchase products from other users
- Track your bought and sold products

### Rental System

- Rent products for specific date ranges
- Lend your products to other users
- Track your borrowed and lent products

### Transaction History

- View comprehensive transaction history
- Track all your buying, selling, borrowing, and lending activities

## Tech Stack

### Frontend

- Vue 3 with Composition API
- Vue Router for navigation
- Tailwind CSS for styling
- shadcn-vue component library for faster development
- Vue Sonner for toast notifications

### Backend

- Node.js with Express
- Apollo Server for GraphQL API
- Prisma as ORM for database operations

### Database

- PostgreSQL

### DevOps

- Docker and Docker Compose for containerization
- Turborepo for monorepo management

## Project Structure

```
teebay/
├── apps/
│   ├── backend/         # GraphQL API server
│   │   ├── prisma/      # Database schema and migrations
│   │   └── src/         # Backend source code
│   └── frontend/        # Vue 3 application
│       └── src/         # Frontend source code
├── docker-compose.yml   # Docker configuration for database setup
└── package.json         # Root package.json for monorepo
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- Docker and Docker Compose (for running PostgreSQL)

### Installation

1. Clone the repository

```sh
git clone https://github.com/raihan-bin-islam/teebay.git
cd teebay
```

2. Install dependencies

```sh
yarn
```

3. Initialize the database

```sh
docker-compose up -d
```

4. Set up environment variables

Create `.env` files in both the backend for database connection

```sh
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/teebay?schema=public"
```

5. Generate prisma client

```sh
cd apps/backend
yarn prisma:generate
```

6. Run Migrations & seeds

```sh
yarn prisma:migrate
yarn prisma:seed
```

7. Start the development servers

```sh
yarn dev
```

This will start both the frontend and backend development servers.

### Building for Production

```sh
yarn build
```

## Database Administration

The project includes Adminer for database management, accessible at http://localhost:8080 when the Docker containers are running.

- System: PostgreSQL
- Server: db
- Username: postgres
- Password: postgres
- Database: teebay

## API Documentation

The GraphQL API provides the following main operations:

### Queries

- `users`: Get all users
- `products`: Get all products
- `myProducts`: Get products owned by the current user
- `product(id)`: Get a specific product by ID
- `myBoughtProducts`: Get products bought by the current user
- `mySoldProducts`: Get products sold by the current user
- `myBorrowedProducts`: Get products borrowed by the current user
- `myLentProducts`: Get products lent by the current user
- `transactions`: Get all transactions

### Mutations

- `register`: Create a new user account
- `login`: Authenticate a user
- `createProduct`: Create a new product listing
- `updateProduct`: Update an existing product
- `deleteProduct`: Delete a product
- `buyProduct`: Purchase a product
- `rentProduct`: Rent a product for a specific period

## Development Prompts

The following ChatGPT prompts were used during the development of this project to assist with various aspects of implementation:

### Architecture and Setup

- "Design a full-stack application for buying, selling, and renting products using Vue 3, Node.js, GraphQL, and PostgreSQL"
- "Create a monorepo structure using Turborepo for a Vue and Node.js application"
- "Set up a PostgreSQL database with Docker for a product marketplace application"

### Frontend Development

- "Design a responsive UI for a product marketplace using Vue 3 and Tailwind CSS"
- "Implement user authentication flows in Vue 3 with GraphQL"
- "Create reusable components for product listings in Vue 3"
- "Implement form validation for product creation and user registration"

### Backend Development

- "Design a GraphQL schema for a product marketplace with buying, selling, and rental features"
- "Implement Prisma models for users, products, and transactions"
- "Create GraphQL resolvers for product buying and rental functionality"
- "Implement authentication middleware"

### Data Entry

Help me create some products with title, description, categories within the following categories:

- ELECTRONICS
- FURNITURE
- HOME_APPLIANCES
- SPORTING_GOODS
- OUTDOOR
- TOYS
