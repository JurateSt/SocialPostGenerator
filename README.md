# SocialPostGenerator

Monorepo structure:
- backend-ts — backend API (TypeScript)
- frontend — frontend app

### TypeScript Backend setup (backend-ts)

```bash
cd backend-ts
npm install
cp .env.example .env # add missing values
npm run dev (PORT depends on .env)
```

## Frontend Setup

The frontend works with either backend:

```bash
cd frontend
npm install
npm run dev or any port you want: PORT=5002 npm run dev
```

## What I did

### Backend
- Improved backend structure by separating concerns (controllers, services, etc.)
- Added validation and error handling
- Improved OpenAI prompt instructions


### Frontend
- Improved frontend structure by extracting reusable components
- Added form validation and user-friendly error messages
- Visually marked mandatory fields
- Added a loading component
- Added copy-to-clipboard functionality for generated posts
- Styled post cards a little bit

## What I did not do
- Avoided overengineering the solution or adding unnecessary libraries  
- Installed only **zod** for validation, as it provides clear value with minimal overhead

## What I would do with more time

### Product improvements
- Allow users to choose a goal for the post (e.g. *Promote*, *Educate*, *Announce*)
- Tune prompts per platform (e.g. more professional tone for LinkedIn, more casual for Instagram)
- Save and reuse previously generated prompts and posts

### Technical improvements
- Add proper i18n support for the translations
- Expand error handling, when talking about error handling there is always some small unnoticed cases
- Replace inline emojis/icons with a dedicated icon library

