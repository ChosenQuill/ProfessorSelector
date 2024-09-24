# ProfessorSelector

**Languages:** Svelte, TypeScript, JavaScript, Python, SQL, HTML, CSS

**Technologies:** SvelteKit, SQLite, Redis, GraphQL, Playwright, Docker

## Overview

ProfessorSelector is a web application developed to automate and enhance the experience of selecting professors at the University of Texas at Dallas (UTD). Built in **one day** as a **solo project** during a UTD Hackathon in 2022, the application aggregates data from multiple sources to provide comprehensive information on professors for each class, enabling students to make informed decisions efficiently.

## Motivation

Selecting the right professors is crucial for academic success, but the process can be time-consuming. Traditionally, students spend hours manually searching for professor ratings, average grades, and other metrics across various platforms. ProfessorSelector was created to address this challenge by automating data collection and presenting it in a user-friendly format.

## Features

- **Automated Data Aggregation:** Collects and consolidates professor information, ratings, and average grades.
- **User-Friendly Interface:** Displays data in an organized table format for easy comparison.
- **Responsive Design:** Implements server-side rendering for faster load times and improved user experience.
- **Parallel Data Processing:** Fetches data concurrently to optimize performance.
- **Caching with Redis:** Utilizes caching to reduce API load and improve response times.
- **Data Validation:** Ensures data consistency and integrity using Zod schemas.
- **Comprehensive Testing:** Includes unit tests and end-to-end (E2E) tests using Playwright.

## Technical Details

### Data Flow

1. **Course Data Retrieval:**
    - Fetches course, section, and basic professor information via REST API from UTD's Nebula API.
    - Processes and formats data for application use.
2. **Professor Ratings:**
    - Queries RateMyProfessors using GraphQL to obtain professor ratings.
3. **Average Grades:**
    - Accesses a local SQLite database containing average grade data.
    - Database is populated using a custom script that processes CSV files from UTD's released grade data.

### Performance and Security

- **Server-Side Rendering (SSR):**
    - Offloads data fetching to the server to enhance load speeds.
    - Keeps API keys and sensitive requests confined to the server side for improved security.
- **Parallel Processing:**
    - Executes multiple data fetch operations concurrently to minimize wait times.
- **Caching Mechanism:**
    - Employs Redis to cache requests with a one-week expiration, reducing redundant API calls.

### Testing and Validation

- **Unit and E2E Testing:**
    - Implements tests using Playwright to ensure application reliability.
    - Provides a foundation for scaling tests in an enterprise context.
- **Data Validation:**
    - Utilizes Zod to validate incoming and outgoing data through the API.

## Usage

1. **Search for a Class:** Enter the class code (e.g., `MATH 2414`) to view course details.
2. **Review Professor Information:** Analyze ratings, difficulty levels, average grades, and other metrics presented in a consolidated table.
3. **Select Preferences:** Choose your top three preferred professors for each class.
4. **Plan Your Schedule:** Add the rest of your courses and prepare a prioritized list for registration day.

By having this information readily available, students can quickly adjust their schedules if a preferred class section becomes unavailable.

## Development Setup

###  

- **Node.js** (latest LTS version recommended)
- **npm** or **pnpm**
- **Nebula API Key**: Obtain from UTD's Nebula API documentation.
- **Redis Database (Optional)**: Required for caching functionality.

### Installation

1. **Clone the Repository:**
    
    ```bash
    git clone https://github.com/ChosenQuill/ProfessorSelector.git
    cd ProfessorSelector
    ```
    
2. **Install Dependencies:**
    
    ```bash
    npm install
    # or
    pnpm install
    ```
    
3. **Configure Environment Variables:**
    - Create a `.env` file in the root directory.
    - Add your Nebula API key and Redis password (to enable caching):
        
        ```
        NEBULA_API_KEY=your_nebula_api_key
        REDIS_PASSWORD=your_redis_password
        ```
        
4. **Set Up Redis Using Docker Compose (Optional):**
    - Ensure Docker is installed and running on your machine.
    - Start the Redis instance using the provided Docker Compose file:
        
        ```bash
        docker-compose up -d
        ```
        
    - This command creates a Redis instance using the `REDIS_PASSWORD` from your `.env` file.
        

### Running the Application

Start the development server:

```bash
npm run dev
# or to start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

> Note: To deploy the application, you may need to configure an appropriate adapter for your target environment. The current adapter targets a netlify deployment.

## Testing

### Unit Tests

Run unit tests:

```bash
npm run test:unit
```

### Integration Tests

Run integration tests:

```bash
npm run test:integration
```

### RateMyProfessors Sandbox

For testing GraphQL queries to RateMyProfessors:

1. Run a local CORS proxy:
    
    ```bash
    pnpx local-cors-proxy --proxyUrl https://www.ratemyprofessors.com
    ```
    
2. Set the GraphQL endpoint to `http://localhost:8010/proxy/graphql` in the [Apollo Studio Sandbox](https://studio.apollographql.com/sandbox/explorer).

## License

This project is licensed under the [MIT License](./LICENSE.md).