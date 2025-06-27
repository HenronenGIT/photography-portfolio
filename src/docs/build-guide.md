# 📸 Photography Portfolio Website — AI-Ready PRD

## 🧠 Global Info

- **Project Name:** Photography Portfolio Website
- **Tech Stack:** Next.js + TypeScript
- **Image Source:** Google Photos API (no local uploads)
- **Authentication:** OAuth 2.0 (for Google Photos access)
- **Image Uploads:** Done manually via mobile Google Photos app
- **Image Hosting:** Only via Google Photos (no local/Vercel hosting)

---

## 📦 Module 1: Project Setup & CI/CD

**Goals:**

- Initialize project and code quality tools
- Prepare for deployment and development consistency

**Tasks:**

- Initialize Next.js + TypeScript
- Set up `.env` structure for OAuth credentials
- Configure:
  - `tsconfig.json`
  - `next.config.js`
  - ESLint
  - Prettier
- Add scripts for CI (format, lint, build)
- Scaffold file structure:
  - `/pages/gallery.tsx`
  - `/pages/auth/callback.tsx`
  - `/lib/api.ts`
  - `/components/Gallery.tsx`

---

## 🔐 Module 2: OAuth 2.0 Authentication (Backend)

**Goals:**

- Securely authenticate with Google Photos
- Manage access/refresh tokens

**Tasks:**

- Set up Google OAuth 2.0 consent screen (Google Cloud Console)
- Implement auth flow using:
  - `/api/auth/start`
  - `/api/auth/callback`
- Store tokens securely (e.g., encrypted file or Firestore)
- Implement automatic token refresh logic
- NEVER expose secrets in frontend

---

## 🔍 Module 3: Google Photos API Integration

**Goals:**

- Connect to Google Photos API
- Fetch images from a specific album

**Tasks:**

- Use access token to call:
  - `GET /v1/albums` to find “Portfolio” album
  - `GET /v1/mediaItems?albumId=ALBUM_ID`
- Extract:
  - `baseUrl`
  - filename
  - description
  - creationTime
- Implement pagination handling
- Optimize `baseUrl` with image sizing params (e.g., `w1200-h800`)

---

## 🖼️ Module 4: Gallery UI Component

**Goals:**

- Display high-quality photos in a modern, responsive layout

**Tasks:**

- Build a responsive grid or masonry layout
- Implement lazy loading (`next/image` or Intersection Observer)
- Display optional metadata:
  - Date
  - Title
  - Description
- Handle missing or malformed media items gracefully
- Add loading/error states for image API

---

## 🔒 Module 5: Security & Privacy

**Goals:**

- Ensure user privacy and secure token handling

**Tasks:**

- Use server-only API routes for token handling
- Store secrets using `.env` and/or Vercel secrets
- Ensure private albums are never exposed unintentionally
- Gracefully handle expired tokens or API rate limits

---

## 📈 Module 6: Performance & Reliability

**Goals:**

- Optimize image loading and error handling

**Tasks:**

- Use image sizing via Google CDN (`baseUrl=w1200-h800`)
- Enable Next.js image optimization or caching proxy
- Implement retries with backoff for failed API calls
- Display fallback UI on API failure or no images

---

## 🚫 Out of Scope

- No user uploads via the website
- No image hosting on the server
- No public submission or comments

---

## ✅ Summary

This project builds a fast, minimal photography portfolio that integrates directly with Google Photos. By uploading photos to the “Portfolio” album via mobile, the photographer’s site automatically updates without manual changes, offering visitors a clean, high-performance gallery experience.
