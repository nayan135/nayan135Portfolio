import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  // Get the hostname
  const host = request.headers.get('host') || '';
  
  // Read the static sitemap file
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  
  // Return the sitemap with proper content type
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
