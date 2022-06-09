var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();
var cbdata = '';

router
  .get('/cbmonitor', (ctx, next) => {
    ctx.body = cbdata;
  })
  .all('/callback', (ctx, next) => {
    var req = ctx.request;

    let path    =  req.baseUrl;
    let params  =  req.query;
    let body    =  req.body;
    let headers =  req.headers;
    let timestamp = new Date();

    let resp = {
      timestamp,
      body,
      path,
      headers,
      params
    };

    cbdata = JSON.stringify(resp, null, 2);

    ctx.response.status = 200;
    // ctx.body = null;
  })
  .all('/(.*)', (ctx, next)=>{
    ctx.body = 'No Function Found'
  });

app.use(router.routes()).use(router.allowedMethods());


var port = (process.env.PORT ||  8080 );

app.listen(port);