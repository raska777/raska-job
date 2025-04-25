import { useTranslations } from 'next-intl';
import Post from '../../models/Post';
import dbConnect from '../../lib/db';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  await dbConnect();
  const posts = await Post.find().limit(10);

  return (
    <div>
      <h1>{t('recentPosts')}</h1>
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.translations[locale]?.title || post.title}</h2>
          <p>{post.translations[locale]?.description || post.description}</p>
        </div>
      ))}
    </div>
  );
}