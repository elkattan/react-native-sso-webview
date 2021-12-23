import Koa, {Context} from 'koa';
import KoaRouter from '@koa/router';
import KoaPug from 'koa-pug';

const app = (module.exports = new Koa());
const router = new KoaRouter();
new KoaPug({
  viewPath: 'server/views',
  app: app,
});

// Utility functions
const randomString = (length = 20) =>
  Math.random()
    .toString()
    .substring(2, length + 2);

// Initial welcome page route
router.get('/', async function (ctx: Context) {
  await ctx.render('welcome');
});

// Auth page where cookie is set
router.post('/auth', async function (ctx: Context) {
  const cookie = randomString();
  ctx.cookies.set('auth', cookie);
  await ctx.render('auth', {cookie: cookie});
});

// Using defined routes
app.use(router.routes()).use(router.allowedMethods());

if (require.main)
  app.listen(3000, () => console.log('listening on http://localhost:3000'));
