import fs from 'fs';
import path from 'path';

// Função recursiva para gerar a estrutura do diretório
function generateStructure(dir: string, prefix: string = ''): string {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const lines = items.map((item) => {
    const isDirectory = item.isDirectory();
    const itemName = `${prefix}├---${item.name}`;
    if (isDirectory) {
      return (
        itemName + '\n' + generateStructure(path.join(dir, item.name), prefix + '│---')
      );
    }
    return itemName;
  });

  return lines.join('\n');
}

// Diretório base do projeto
const baseDir = path.resolve(__dirname, '../src');

// Gera e exibe a estrutura do projeto
console.log('API de Referência');
console.log(generateStructure(baseDir));