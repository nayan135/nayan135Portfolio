import { AdminPanel } from '@/components/admin-panel'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel - Portfolio Management',
  description: 'Content management system for portfolio website',
  robots: 'noindex, nofollow', // Prevent search engines from indexing admin pages
}

export default function AdminPage() {
  return <AdminPanel />
}