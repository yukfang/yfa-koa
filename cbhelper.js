var Koa = require('koa');
var Router = require('koa-router');
const BodyParser = require('koa-bodyparser');


var app = new Koa();
var router = new Router();
var cbdata = '';

router
  .get('/cbmonitor', (ctx, next) => {
    ctx.body = cbdata;
  })
  .all('/callback', (ctx, next) => {
    var req = ctx.request;

    var socket = req.socket;

    // let headers = req.headers;
    // /** Remve useless headers */
    // delete headers['x-site-deployment-id'];
    // delete headers['was-default-hostname'];
    // delete headers['x-arr-log-id'];

    let output = {
      timestamp : new Date(),
      method    : req.method,
      body      : req.body,
      url       : req.url,
      origin    : req.origin,
      headers   : req.headers,
      params    : req.query
    };
    // let output = req;
    /** Remve useless headers */
    delete output.headers['x-site-deployment-id'];
    delete output.headers['was-default-hostname'];
    delete output.headers['x-arr-log-id'];


    cbdata = JSON.stringify(output, null, 2);

    ctx.response.status = 200;
  })
  .all('/(.*)', (ctx, next)=>{
    ctx.body = 'No Function Found'
  });

app
  .use(BodyParser({
    enableTypes:['json', 'form', 'text']
  }))
  .use(router.routes())
  .use(router.allowedMethods());


var port = (process.env.PORT ||  8080 );

app.listen(port);