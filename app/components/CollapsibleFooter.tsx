
// 'use client';
// import { useState } from 'react';

// export default function CollapsibleFooter() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="mt-10 text-center">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
//       >
//         {isOpen ? '❌ 닫기' : 'ℹ️ 사이트 정보'}
//       </button>

//       {isOpen && (
//         <div className="mt-4 p-6 bg-gray-100 rounded-xl shadow-lg max-w-2xl mx-auto text-left transition-all duration-300">
//           <h3 className="text-lg font-semibold mb-2">라스카잡 소개</h3>
//           <p className="text-sm text-gray-600">
//             이 플랫폼을 통해 구인 공고를 게시하거나, 일자리를 찾을 수 있으며,
//             프로필을 관리할 수 있습니다. 모든 정보는 최신 보안 기술로 보호되며
//             안전하게 관리됩니다.
//           </p>
//           <div className="mt-4 flex gap-4">
//             <a href="/privacy" className="text-blue-600 hover:underline text-sm">개인정보처리방침</a>
//             <a href="/terms" className="text-blue-600 hover:underline text-sm">이용약관</a>
//             <a href="/contact" className="text-blue-600 hover:underline text-sm">문의하기</a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }'use client';
import { useState } from 'react';
import styles from 'styles/footer.module.css';

export default function CollapsibleFooter() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFooter = () => {
    setIsOpen(!isOpen);
    // Scroll to bottom when opening (if not already there)
    if (!isOpen) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <footer className={styles.footerContainer}>
      <button
        onClick={toggleFooter}
        className={styles.toggleButton}
        aria-expanded={isOpen}
        aria-label={isOpen ? '푸터 닫기' : '푸터 열기'}
      >
        {isOpen ? (
          <>
            <svg className={styles.toggleIcon} viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
            닫기
          </>
        ) : (
          <>
            <svg className={styles.toggleIcon} viewBox="0 0 24 24">
              <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
            </svg>
            Raska Job 정보
          </>
        )}
      </button>

      {isOpen && (
        <div className={styles.footerContent}>
          <div className={styles.footerMain}>
            <div className={styles.brandSection}>
              <h3 className={styles.brandTitle}>
                <span className={styles.brandName}>Raska Job</span>
                <span className={styles.brandSlogan}>당신의 꿈의 직장을 찾아보세요</span>
              </h3>
              <p className={styles.brandDescription}>
                Raska Job은 구직자와 구인자를 연결하는 최적의 플랫폼입니다.
                아르바이트부터 정규직까지 다양한 기회를 발견하세요.
              </p>
            </div>

            <div className={styles.linksSection}>
              <div className={styles.linkColumn}>
                <h4 className={styles.linkHeading}>서비스</h4>
                <ul className={styles.linkList}>
                  <li><a href="/jobs" className={styles.linkItem}>구인공고</a></li>
                  <li><a href="/companies" className={styles.linkItem}>기업정보</a></li>
                  <li><a href="/resume" className={styles.linkItem}>이력서 관리</a></li>
                  <li><a href="/blog" className={styles.linkItem}>취업 팁</a></li>
                </ul>
              </div>

              <div className={styles.linkColumn}>
                <h4 className={styles.linkHeading}>회사</h4>
                <ul className={styles.linkList}>
                  <li><a href="/about" className={styles.linkItem}>회사소개</a></li>
                  <li><a href="/careers" className={styles.linkItem}>채용정보</a></li>
                  <li><a href="/press" className={styles.linkItem}>보도자료</a></li>
                  <li><a href="/contact" className={styles.linkItem}>문의하기</a></li>
                </ul>
              </div>

              <div className={styles.linkColumn}>
                <h4 className={styles.linkHeading}>법적</h4>
                <ul className={styles.linkList}>
                  <li><a href="/terms" className={styles.linkItem}>이용약관</a></li>
                  <li><a href="/privacy" className={styles.linkItem}>개인정보처리방침</a></li>
                  <li><a href="/cookies" className={styles.linkItem}>쿠키 정책</a></li>
                  <li><a href="/guidelines" className={styles.linkItem}>커뮤니티 가이드라인</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com/raskajob" aria-label="Facebook" className={styles.socialLink}>
                <svg className={styles.socialIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                </svg>
              </a>
              <a href="https://twitter.com/raskajob" aria-label="Twitter" className={styles.socialLink}>
                <svg className={styles.socialIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z" />
                </svg>
              </a>
              <a href="https://instagram.com/raskajob" aria-label="Instagram" className={styles.socialLink}>
                <svg className={styles.socialIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z" />
                </svg>
              </a>
              <a href="https://linkedin.com/company/raskajob" aria-label="LinkedIn" className={styles.socialLink}>
                <svg className={styles.socialIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                </svg>
              </a>
            </div>

            <div className={styles.legalText}>
              <p>© {new Date().getFullYear()} Raska Job Inc. 모든 권리 보유.</p>
              <p>대한민국 서울특별시 강남구 테헤란로 123, Raska Job 빌딩</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}