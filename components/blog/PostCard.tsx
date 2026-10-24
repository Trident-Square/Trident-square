import Link from 'next/link'
import Arrow from '@/components/site/Arrow'
import PostCover from './PostCover'
import { formatDate, readingMinutes, type Post } from '@/lib/blog'
import { cn } from '@/lib/utils'

export default function PostCard({ post, featured }: { post: Post; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn('group flex h-full flex-col border border-line bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_-28px_rgba(17,17,16,0.35)]', featured && 'lg:grid lg:grid-cols-12')}
    >
      <PostCover post={post} size={featured ? 'feature' : 'card'} className={featured ? 'aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[420px]' : 'aspect-[16/10]'} />
      <div className={cn('flex flex-1 flex-col p-6 sm:p-7', featured && 'lg:col-span-5 lg:justify-center lg:p-10')}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          {featured ? <span className="bg-cobalt px-1.5 py-0.5 text-white">Latest</span> : null}
          <span className="text-cobalt">{post.category}</span>
          <span>{formatDate(post.date)}</span>
          <span>{readingMinutes(post)} min read</span>
        </p>
        <h3 className={cn('mt-4 font-semibold tracking-[-0.025em] transition-colors group-hover:text-cobalt', featured ? 'text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1]' : 'text-[22px] leading-snug')}>
          {post.title}
        </h3>
        <p className={cn('mt-3 leading-relaxed text-muted', featured ? 'text-[17px]' : 'line-clamp-3 text-[15px]')}>{post.excerpt}</p>
        <span className="mt-auto flex items-center gap-2 pt-6 font-mono text-[12px] uppercase tracking-[0.1em]">
          Read article <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
