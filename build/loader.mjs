import yaml from 'yaml';
import path from 'node:path';
import fs from 'node:fs';

export async function load(url, context, nextLoad) {
  const ext = url
    .split('.')
    .at(-1);

  if (ext === 'yml') {
    const normalizedUrl = url
      .split('://')
      .at(-1);
    const source = fs.readFileSync(path.resolve(normalizedUrl), 'utf8');

    return {
      format: 'json',
      shortCircuit: true,
      source: JSON.stringify(yaml.parse(source)),
    }
  }

  return nextLoad(url, context);
}