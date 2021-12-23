import Koa, {Context} from 'koa';
import KoaRouter from '@koa/router';
import KoaPug from 'koa-pug';

const app = (module.exports = new Koa());
const router = new KoaRouter();
// eslint-disable-next-line no-new
new KoaPug({
  viewPath: 'server/views',
  app,
});

// Utility functions
const randomString = (length = 20) =>
  Math.random()
    .toString()
    .substring(2, length + 2);

// HTTP Cookie Routes
// Initial welcome page route
router.get('/http-cookie', async function (ctx: Context) {
  await ctx.render('http-cookie/welcome');
});

// Auth page where cookie is set
router.post('/http-cookie/auth', async function (ctx: Context) {
  const cookie = randomString();
  ctx.cookies.set('auth', cookie, {httpOnly: true});
  await ctx.render('http-cookie/auth', {cookie: cookie});
});

// Script Cookie Routes
// Initial welcome page route
router.get('/script-cookie', async function (ctx: Context) {
  await ctx.render('script-cookie/welcome');
});

// Auth page where cookie is set
router.post('/script-cookie/auth', async function (ctx: Context) {
  const cookie = randomString();
  ctx.cookies.set('auth', cookie, {httpOnly: false});
  await ctx.render('script-cookie/auth', {cookie: cookie});
});

// Token Communication Routes
// Initial welcome page route
router.get('/communication', async function (ctx: Context) {
  await ctx.render('communicate-token/welcome');
});

// Auth page where cookie is set
router.post('/communication/auth', async function (ctx: Context) {
  const cookie = randomString();
  ctx.cookies.set('auth', cookie);
  await ctx.render('communicate-token/auth', {cookie: cookie});
});

// Using defined routes
app.use(router.routes()).use(router.allowedMethods());

if (require.main) {
  app.listen(3000, () => console.log('listening on http://localhost:3000'));
}
