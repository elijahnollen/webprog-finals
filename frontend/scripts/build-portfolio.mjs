import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const source = resolve(process.cwd(), '..', 'dreamtown');
const output = resolve(process.cwd(), 'dist');
if (!existsSync(join(source, 'index.html'))) {
  throw new Error('Interactive portfolio source is missing.');
}
mkdirSync(output, {recursive: true});
for (const item of readdirSync(source, {withFileTypes: true})) {
  if (item.name === 'img' || (item.isFile() && /\.(html|css|js)$/.test(item.name))) {
    cpSync(join(source, item.name), join(output, item.name), {recursive: true, force: true});
  }
}
