import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/generate', async (req, res) => {
  const { name, father_name, property_size, sale_amount, date } = req.body;

  let html = fs.readFileSync(path.join(__dirname, 'templates/deed_template.html'), 'utf8');
  html = html.replace('{{name}}', name)
    .replace('{{father_name}}', father_name)
    .replace('{{property_size}}', property_size)
    .replace('{{sale_amount}}', sale_amount)
    .replace('{{date}}', date);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="SaleDeed.pdf"');
  res.send(pdfBuffer);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
