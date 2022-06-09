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


    let headers = req.headers;
    /** Remve useless headers */
    delete headers['x-site-deployment-id'];
    delete headers['was-default-hostname'];
    delete headers['x-arr-log-id'];


    let timestamp = new Date();

    let resp = {
      timestamp,
      method  : req.method,
      body    : req.body,
      url     : req.url,
      origin  : req.origin,
      headers ,
      params  : req.query
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