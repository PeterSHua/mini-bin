# MiniBin
MiniBin is a tool for collecting and inspecting webhooks. Create endpoints for webhook providers to view their webhook payloads.

# Components
Backend: NGINX, Express, Postgres on Digital Ocean Droplet
Frontend: React

# Installation
Create a `.env` in the project root directory.

Example:
```
BACKEND_PORT=3001
POSTGRES_USER=minibin
POSTGRES_HOST=localhost
POSTGRES_DATABASE=minibin
POSTGRES_PASSWORD=your_password
POSTGRES_PORT=5432
```
