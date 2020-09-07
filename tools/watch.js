import { spawn } from 'child_process';

var env = Object.create(process.env);
env.NODE_ENV = 'development';

const include = [
  "src/server",
  "tools",
  "public",
  "webpack.config.json",
  "package.json"
]; 

let cmd = spawn("nodemon", include.reduce((a, c) => a.concat(["--watch", c]), []).concat([
  "--ext", "js,jsx,ts,tsx", 
  "--exec", "node -r ./tools/babel-register.js ./src/server/index.ts"]),
  { env: env }
)

cmd.stdout.on('data', (data) => {
  console.log(data.toString());
});

cmd.stderr.on('data', (data) => {
  console.log(`error: ${data.toString()}`);
});
