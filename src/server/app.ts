import express from 'express';
import { join } from 'path';

import session from 'cookie-session';
import favicon from 'serve-favicon';
import { loadTemplateBlocking } from './template';

global.htmlTemplate = loadTemplateBlocking();

const app = express();
app.set('port', process.env.PORT || 3000);
app.use('/template.html', (req, res) => res.status(404).send('NOT FOUND'));
app.use(express.static(join(__dirname, './dist'), { maxAge: '7d' })); //seven day cache
app.use(express.static(join(__dirname, '../public')));
app.use(favicon(join(__dirname, '../public', 'favicon.ico')));
//app.get('/sitemap', (req, res) => res.sendFile(join(__dirname, '../../public/sitemap.xml')));
//
global.navigator = { userAgent: 'all' };
 
app.use(session({
  name: 'session',
  keys: ['SECRET']
}));

export default app;
