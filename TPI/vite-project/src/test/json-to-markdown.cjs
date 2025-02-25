const fs = require('fs');
const path = require('path');

// Leer el archivo JSON con los resultados de los tests
const results = JSON.parse(fs.readFileSync(path.join(__dirname, 'frontend-unit-test-results.json'), 'utf-8'));

// Función para convertir los resultados a Markdown
function jsonToMarkdown(results) {
  let markdown = '# Resultados de las pruebas\n\n';

  // Verificar si 'testResults' existe y es un array
  if (results && Array.isArray(results.testResults)) {
    results.testResults.forEach((testResult) => {
      markdown += `## ${testResult.name}\n`;
      testResult.assertionResults.forEach((assertion) => {
        const status = assertion.status === 'passed' ? '✅' : '❌';
        markdown += `- **${assertion.title}**: ${status}\n`;
      });
      markdown += '\n';
    });
  } else {
    markdown += 'No se encontraron resultados de tests.\n';
  }

  return markdown;
}

// Generar el archivo Markdown
const markdown = jsonToMarkdown(results);

// Escribir el archivo Markdown en la carpeta de salida
fs.writeFileSync('test-results.md', markdown);

console.log('El reporte de los tests se ha generado en test-results.md');

