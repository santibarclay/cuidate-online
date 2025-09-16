import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limit';

interface FeedbackRequest {
  feedback: string;
  email?: string;
  pageInfo: {
    url: string;
    userAgent: string;
    timestamp: string;
    viewport: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Apply strict rate limiting for feedback to prevent spam
    console.log('Checking rate limit for feedback API...');
    const rateLimitResult = await checkRateLimit(request);

    if (!rateLimitResult.allowed) {
      const headers = getRateLimitHeaders(rateLimitResult);
      return NextResponse.json(
        {
          error: 'Límite de feedback excedido',
          message: rateLimitResult.error || 'Demasiadas solicitudes de feedback. Intenta más tarde.'
        },
        {
          status: 429,
          headers
        }
      );
    }

    console.log('Rate limit passed. Remaining feedback requests:', rateLimitResult.remaining);

    const body: FeedbackRequest = await request.json();

    if (!body.feedback || !body.feedback.trim()) {
      return NextResponse.json(
        { error: 'Feedback es requerido' },
        { status: 400 }
      );
    }

    // Basic validation
    if (body.feedback.length > 2000) {
      return NextResponse.json(
        { error: 'El feedback es demasiado largo (máximo 2000 caracteres)' },
        { status: 400 }
      );
    }

    // Email validation if provided
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Get email configuration from environment
    const resendApiKey = process.env.RESEND_API_KEY;
    const feedbackEmail = process.env.FEEDBACK_EMAIL; // Your email address

    if (!resendApiKey || !feedbackEmail) {
      console.error('Email configuration not found');
      // Fallback: just log the feedback
      console.log('Feedback received:', {
        feedback: body.feedback,
        email: body.email,
        url: body.pageInfo.url,
        timestamp: body.pageInfo.timestamp
      });

      const response = NextResponse.json({
        success: true,
        message: 'Feedback recibido correctamente'
      });

      // Add rate limit headers even for fallback response
      const headers = getRateLimitHeaders(rateLimitResult);
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);

    // Format email subject and body
    const emailSubject = `[Cuidate Online] Nuevo Feedback: ${body.feedback.substring(0, 30)}${body.feedback.length > 30 ? '...' : ''}`;

    const emailHTML = `
      <h2>💬 Nuevo Feedback de Cuidate Online</h2>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Mensaje del usuario:</h3>
        <p style="font-size: 16px; line-height: 1.6; color: #374151;">${body.feedback.replace(/\n/g, '<br>')}</p>
      </div>

      ${body.email ? `
      <div style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #065f46;">📧 Email de contacto:</h3>
        <p style="color: #065f46; font-family: monospace;">${body.email}</p>
      </div>
      ` : ''}

      <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #475569;">🔍 Información de contexto:</h3>
        <ul style="color: #64748b; font-size: 14px;">
          <li><strong>URL:</strong> ${body.pageInfo.url}</li>
          <li><strong>Fecha:</strong> ${new Date(body.pageInfo.timestamp).toLocaleString('es-AR')}</li>
          <li><strong>Viewport:</strong> ${body.pageInfo.viewport}</li>
          <li><strong>Navegador:</strong> ${body.pageInfo.userAgent.substring(0, 100)}...</li>
        </ul>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
      <p style="font-size: 12px; color: #9ca3af; text-align: center;">
        Este email fue enviado automáticamente por el sistema de feedback de Cuidate Online
      </p>
    `;

    const emailText = `
Nuevo Feedback de Cuidate Online

Mensaje: ${body.feedback}

${body.email ? `Email de contacto: ${body.email}` : ''}

Información de contexto:
- URL: ${body.pageInfo.url}
- Fecha: ${new Date(body.pageInfo.timestamp).toLocaleString('es-AR')}
- Viewport: ${body.pageInfo.viewport}
- Navegador: ${body.pageInfo.userAgent}
    `.trim();

    try {
      console.log('Attempting to send email with Resend...');
      console.log('From:', 'Cuidate Online <feedback@resend.dev>');
      console.log('To:', feedbackEmail);
      console.log('Subject:', emailSubject);

      // Send email using Resend
      const emailResult = await resend.emails.send({
        from: 'Cuidate Online <feedback@resend.dev>', // Using resend.dev domain (works out of the box)
        to: [feedbackEmail],
        subject: emailSubject,
        html: emailHTML,
        text: emailText,
        replyTo: body.email || undefined, // If user provided email, set as reply-to
      });

      console.log('Resend response:', emailResult);

      if (emailResult.error) {
        console.error('Resend API error:', emailResult.error);
        throw new Error(`Resend error: ${JSON.stringify(emailResult.error)}`);
      }

      console.log('Email sent successfully:', emailResult.data?.id);

      const response = NextResponse.json({
        success: true,
        message: 'Feedback enviado correctamente',
        emailId: emailResult.data?.id
      });

      // Add rate limit headers to successful response
      const headers = getRateLimitHeaders(rateLimitResult);
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;

    } catch (emailError) {
      console.error('Failed to send email - detailed error:', emailError);
      console.error('Error type:', typeof emailError);
      console.error('Error message:', emailError instanceof Error ? emailError.message : 'Unknown error');
      throw new Error('Failed to send feedback email');
    }

  } catch (error) {
    console.error('Feedback API error:', error);

    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        message: 'No pudimos procesar tu feedback. Intenta nuevamente.'
      },
      { status: 500 }
    );
  }
}