import { translateText } from './deepl';
import Post from '../models/Post';

export async function translatePost(postId: string, targetLang: 'uz' | 'ru') {
  const post = await Post.findById(postId);
  if (!post) throw new Error('Post topilmadi');

  // Agar avval tarjima qilinmagan bo'lsa
  if (!post.translations[targetLang]) {
    post.translations[targetLang] = {
      title: await translateText(post.title, targetLang),
      description: post.description 
        ? await translateText(post.description, targetLang)
        : undefined
    };
    await post.save();
  }

  return post.translations[targetLang];
}