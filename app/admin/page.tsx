// // app/admin/page.tsx
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import { redirect } from 'next/navigation';
// // import AdminPageClient from './AdminPageClient';

// export default async function AdminPage() {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user?.role !== 'admin') {
//     redirect('/login');
//   }

//   return <AdminPageClient />;
// }