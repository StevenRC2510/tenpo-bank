# Tenpo PokéBank - Pokédex Explorer

# **DEMO URL**
Link: https://tenpo-bank.vercel.app/

## ✨ Features

- **Authentication**: Login/logout with secure token management
- **Pokédex Explorer**: Paginated listing of 2000+ Pokémon from PokéAPI
- **Search**: Search functionality with debounce
- **Responsive**: Adaptive design for web and mobile
- **i18n**: Support for English and Spanish
- **Performance**: Optimized with React Query and lazy loading

## 🚀 Tech Stack

- React 19 + TypeScript
- Tailwind CSS
- TanStack Query (React Query)
- React Router DOM
- Axios
- Lucide React (icons)

## ⚙️ Installation

```bash
git clone <repository-url>
cd tenpo-bank
npm install
```

### Environment Variables

Create `.env`:
```env
REACT_APP_POKEMON_API_BASE_URL=https://pokeapi.co/api/v2
```

### Run

```bash
npm start          # Development
npm test           # Tests
npm run build      # Production
npm run lint       # Linting
```

## 🏗️ Architecture

**Hexagonal Architecture** with **vertical feature organization**:
- `domain/` - Business entities and rules
- `application/` - Use cases
- `infrastructure/` - External APIs and services
- `ui/` - React components

## 📁 Structure

```
src/
├── features/
│   ├── auth/          # Authentication
│   └── pokemon/       # Pokédex Explorer
├── shared/            # Shared utilities
└── routes/            # Route configuration
```

## 🎯 Test Credentials

- **Email**: `user@example.com`
- **Password**: `password123`

---

**Developed by Steven Ruiz** - Senior Frontend Developer
