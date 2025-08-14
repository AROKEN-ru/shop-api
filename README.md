# Shop API

A REST API shop for Aroken.ru

## Technologies

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [Elysia](https://elysiajs.com/) - Web framework for Bun
- [DrizzleORM](https://orm.drizzle.team/) - TypeScript ORM

## Installation

```bash
# Install dependencies and set up the database
make install
```

## Development

```bash
# Start development server
make dev
```

## Database Commands

```bash
# Generate migrations
bun db:generate

# Apply migrations
bun db:migrate

# Launch DrizzleStudio
bun db:studio
```

## API Documentation

Swagger documentation is available at:

```
http://localhost:8000/swagger
```
