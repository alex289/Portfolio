# Vercel Deployment Setup Guide

## Critical: Environment Variables Required for Deployment

Your portfolio uses **NextAuth** for authentication, which requires specific environment variables to be configured in Vercel before deployment will succeed.

---

## Quick Fix: Add AUTH_SECRET to Vercel

### Step 1: Generate AUTH_SECRET (Already Done)
Your generated secret:
```
B6NEjoafhkPc8bmYarT4abMcm21bzUzapvpz7Zu/1lA=
```

### Step 2: Add to Vercel Dashboard

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your portfolio project
3. Click on **Settings** → **Environment Variables**
4. Add the following **REQUIRED** variable:

| Name | Value | Environment |
|------|-------|-------------|
| `AUTH_SECRET` | `B6NEjoafhkPc8bmYarT4abMcm21bzUzapvpz7Zu/1lA=` | Production, Preview, Development |

**Important:** Select all three environments (Production, Preview, Development) for consistent behavior.

### Step 3: Add Optional Variables (Recommended)

For full functionality, also add these environment variables:

#### **Production Website URL**
```
NEXT_PUBLIC_WEBSITE_URL=your-domain.vercel.app
```
(Replace `your-domain.vercel.app` with your actual Vercel domain)

#### **Database (if using guestbook/blog features)**
```
POSTGRES_URL=your-vercel-postgres-url
```
Get this from Vercel Storage → Postgres if you've set up a database.

#### **Admin Email (to enable admin features)**
```
ADMIN_EMAIL=your-email@example.com
```

#### **OAuth Providers (for authentication)**

**Google OAuth:**
```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**GitHub OAuth:**
```
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

#### **Spotify Integration (for Now Playing widget)**
```
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
SPOTIFY_REFRESH_TOKEN=your-spotify-refresh-token
```

#### **GitHub API (for repository stats)**
```
GITHUB_API_TOKEN=your-github-personal-access-token
```

### Step 4: Redeploy

After adding environment variables:

1. Go to **Deployments** tab in Vercel
2. Click the three dots (**...**) on the latest deployment
3. Select **Redeploy**
4. Check "Use existing Build Cache" (optional, for faster deployment)
5. Click **Redeploy**

---

## Alternative: Using Vercel CLI

If you prefer using the command line:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add AUTH_SECRET production
# Paste: B6NEjoafhkPc8bmYarT4abMcm21bzUzapvpz7Zu/1lA=

vercel env add AUTH_SECRET preview
# Paste: B6NEjoafhkPc8bmYarT4abMcm21bzUzapvpz7Zu/1lA=

# Redeploy
vercel --prod
```

---

## Why AUTH_SECRET is Required

Your portfolio uses **NextAuth v5** for authentication, which requires `AUTH_SECRET` to:
- Sign and encrypt JWT tokens
- Secure session cookies
- Validate authentication state

Without this variable, the build will fail or authentication will not work in production.

---

## Verification

After redeploying, verify your deployment:

1. Check build logs in Vercel dashboard - should complete successfully
2. Visit your deployed site
3. Try accessing `/dashboard` or `/guestbook` routes that require authentication
4. Check that OAuth login buttons work (if providers are configured)

---

## Troubleshooting

### Build Still Failing?

Check the Vercel build logs for specific error messages:
- Look for "AUTH_SECRET" or environment variable errors
- Ensure all three environments have the variable set

### Authentication Not Working?

1. Verify `NEXT_PUBLIC_WEBSITE_URL` matches your production domain
2. Update OAuth redirect URIs in Google/GitHub console to include your Vercel domain
3. Ensure provider credentials (CLIENT_ID, CLIENT_SECRET) are correct

### Need to Regenerate AUTH_SECRET?

```bash
openssl rand -base64 32
```

Then update in Vercel and redeploy.

---

## Security Notes

- ✅ **Never commit** `.env` files to Git
- ✅ Keep `AUTH_SECRET` secure and private
- ✅ Use different secrets for production vs development
- ✅ Rotate secrets periodically for security
- ✅ Use Vercel's encrypted environment variables feature

---

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)





