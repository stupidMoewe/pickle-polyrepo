# Pickle Polyrepo

## Overview

The Pickle Polyrepo is a multi-service application designed using a microservices architecture. It consists of several components, including common libraries, fanout service, and user service, that work together to provide a comprehensive backend system. This project leverages TypeScript for robust type-checking and Docker for easy deployment and scaling.

## Structure

The project is organized into several key services, each responsible for a distinct part of the application's functionality:

- **Common**: Shared resources and utilities used across services. Includes custom error classes, event base classes, and common middlewares.

- **Fanout**: Handles event distribution throughout the application, ensuring that messages and updates are efficiently propagated to relevant services.

- **MobileApp**: Mobile application, React native.

- **Question**: Oversees the creation, management, and interaction with questions, including features like posting, answering, and voting.

- **Timeline**: Controls the logic for generating and updating user timelines, incorporating real-time updates and interactions.

- **User**: Manages user-related functionalities, including authentication, profile management, and activity tracking.


## Setup

### Prerequisites

- Docker and Docker Compose installed.
- Node.js and npm installed for local development.

### Running the Application

- Use Docker Compose to build and run the services:
  docker-compose up --build

- This command will start all the services defined in the `docker-compose.yml` file.

## Development

### Local Setup

- For local development, navigate to each service directory and install dependencies:
cd service-name
npm install

- Start the service using npm scripts defined in the `package.json` file.

