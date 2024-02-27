'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "397349000546-5tdugu957pad1mqpppqo78eb1bcieqrl.apps.googleusercontent.com"

export function GoogleOAuthProviders({ children }: { children: React.ReactNode }) {
    return <GoogleOAuthProvider clientId={googleClientId} >{children}</GoogleOAuthProvider>;
}
