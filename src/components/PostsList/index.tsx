import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPosts } from '@/server/actions/getPosts'
import Link from 'next/link'

export default async function PostsList() {
  const posts = await getPosts()

  if (!posts?.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No posts yet. Create one to get started.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="line-clamp-1">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 line-clamp-3 mb-3">{post.content}</p>

            <div className="flex justify-between text-sm text-gray-500">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              {post.owner && (
                <span className="italic">
                  by {typeof post.owner === 'object' ? post.owner.email : post.owner}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
