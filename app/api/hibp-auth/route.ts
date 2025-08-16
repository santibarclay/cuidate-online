import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Contraseña requerida' },
        { status: 400 }
      );
    }

    const hibpPagePassword = process.env.HIBP_PAGE_PASSWD;

    if (!hibpPagePassword) {
      console.error('HIBP_PAGE_PASSWD environment variable not set');
      return NextResponse.json(
        { error: 'Configuración del servidor incorrecta' },
        { status: 500 }
      );
    }

    if (password === hibpPagePassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth API route error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}