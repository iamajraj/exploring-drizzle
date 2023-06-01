import Fastify from 'fastify';
import { db } from './db/db';
import { users } from './db/schema/users';
import { posts } from './db/schema/posts';
import { eq } from 'drizzle-orm';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', async (req, rep) => {
  const all_users = db.select().from(users).all();
  rep.status(200).send(all_users);
});

fastify.get('/left-join-posts', async (req, rep) => {
  const users_with_posts = db
    .select({
      user: users,
      posts: posts,
    })
    .from(users)
    .leftJoin(posts, eq(users.id, posts.authorId))
    .all();
  rep.send(users_with_posts);
});
fastify.get('/inner-join-posts', async (req, rep) => {
  const users_with_posts = db
    .select({
      user: users,
      posts: posts,
    })
    .from(users)
    .innerJoin(posts, eq(users.id, posts.authorId))
    .all();
  rep.send(users_with_posts);
});

const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
    });
    console.log('Server started 🚀');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
