# @CABONEW

A luxury travel platform for Cabo San Lucas, offering villas, yachts, adventures, hotels, resorts, restaurants, and transportation services.

## Features

- Modern, responsive design with a focus on luxury aesthetics
- Integrated AI chatbot powered by GPT-4 for personalized concierge service
- Comprehensive booking system for various services
- Real-time availability and pricing
- User reviews and ratings
- SEO optimized for maximum visibility

## Tech Stack

- **Frontend:**
  - React with TypeScript
  - Tailwind CSS for styling
  - Wouter for routing
  - Radix UI components
  - Framer Motion for animations

- **Backend:**
  - Node.js with Express
  - PostgreSQL with Drizzle ORM
  - OpenAI GPT-4 integration
  - Session-based authentication

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cabonew.git
cd cabonew
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL=your_postgres_connection_string
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development
SESSION_SECRET=your_session_secret
```

4. Set up the database:
```bash
npm run db:generate  # Generate migration files
npm run db:push     # Push migrations to database
```

5. Start the development server:
```bash
npm run dev
```

## Database Management

- Generate migrations: `npm run db:generate`
- Push migrations: `npm run db:push`
- View database: `npm run db:studio`

## Project Structure

```
├── client/               # Frontend React components
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   └── App.tsx         # Main application component
├── server/              # Backend Node.js/Express server
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── schema.ts       # Database schema
│   └── index.ts        # Server entry point
├── scripts/             # Utility scripts
├── public/              # Static assets
└── drizzle/             # Database migrations
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for GPT-4 integration
- Radix UI for accessible components
- Tailwind CSS for styling utilities
- All third-party service providers in Cabo San Lucas
