/**
 * Health check endpoint for static portfolio site
 * No database dependency required
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ 
    ok: true,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    uptime: process.uptime()
  });
}
