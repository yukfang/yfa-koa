var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

var count = 0;

router.get('/cb', (ctx, next) => {
    console.log('router /');
    ctx.body = 'cb'
    await next();
});

// logger
app.use(async (ctx, next) => {
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  await next();
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms + 9990}ms`);
  await next();
});

app.use(async (ctx, next) => {
    console.log('789 middle ware')
    await next();

});



// response body
app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.use(router.routes())

app.listen(3000);