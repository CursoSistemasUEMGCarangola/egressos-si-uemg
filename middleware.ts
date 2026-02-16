import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    const { response, user } = await updateSession(request)

    const path = request.nextUrl.pathname

    // Public Routes Whitelist
    const isPublicRoute =
        path === '/' ||
        path.startsWith('/login') ||
        path.startsWith('/auth') ||
        path.startsWith('/recover') ||
        path.startsWith('/reset')

    // If user is NOT logged in and tries to access private route
    if (!user && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If user IS logged in and tries to access login
    if (user && path === '/login') {
        // Redirect to dashboard (default student area for now, or check role later)
        // Assuming /aluno is the student area based on roadmap "aluno loga e..."
        // Validating route: Roadmap says "Fase 1: Identidade... Onboarding".
        // I will redirect to '/aluno' or '/dashboard'?
        // DNA says: /app/(portal): Área do Aluno/Egresso.
        // I'll assume '/dashboard' or '/feed' is the landing for logged users. 
        // I'll redirect to '/' for now which is public but shows feed for logged in?
        // "Fase 2: Feed da Landing Page... Implementar política RLS para permitir leitura anônima na Home."
        // So '/' is for everyone.
        return NextResponse.redirect(new URL('/', request.url))
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
