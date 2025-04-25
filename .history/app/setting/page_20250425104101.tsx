// 'use client';

// import { useRouter } from 'next/navigation';
// import SettingsForm from '../components/SettingForm';


// export default function SettingPage() {
//   const router = useRouter();

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//         <h1 className="text-2xl font-bold">⚙️ Sozlamalar</h1>
// <SettingsForm/>
//       <div className="flex justify-between items-center mb-6">
        
//         <button
//           onClick={() => router.back()}
//           className="text-sm text-red-500 hover:underline"
//         >
//           ❌ oraqaga
//         </button>
//       </div>

      
//     </div>
//   );
// }


'use client';

import { useRouter } from 'next/navigation';
import SettingsForm from '../components/SettingForm';

export default function SettingPage() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">⚙️ 설정</h1>

      <SettingsForm />

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-red-500 hover:underline"
        >
          ❌ 돌아가기
        </button>
      </div>
    </div>
  );
}
