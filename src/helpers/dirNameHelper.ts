import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function getDirname(importMetaUrl : any) {
  const __filename = fileURLToPath(importMetaUrl);
  return dirname(__filename);
}
