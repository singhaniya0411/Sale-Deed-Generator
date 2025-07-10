# 🧾 Sale Deed PDF Generator

A full-stack web application that allows users to fill a property sale form and download a **custom-generated Sale Deed PDF**.

## 📝 How It Works

1. User fills a form in the React frontend.
2. The form data is sent to the backend via `/generate`.
3. Backend fills placeholders in an HTML template using that data.
4. Puppeteer renders the HTML into a downloadable PDF.
5. The PDF is returned to the frontend and downloaded by the browser.

## 📄 Template Placeholders Example

In `deed_template.html`:

```html
This Sale Deed is made on {{date}} between {{name}}, S/o {{father_name}},
for a property of {{property_size}} sq.ft., sold for ₹{{sale_amount}}.
```

## 💻 Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js, Express
- **PDF Generation**: Puppeteer
- **Template Engine**: HTML with manual placeholder replacement

## 📁 Folder Structure

```
sale-deed-generator/
├── Frontend/      # React frontend (Vite)
│   └── src/
│   |   └── App.jsx   
├── Backend/       # Node.js backend with Puppeteer
│   ├── templates/
│   │   └── deed_template.html
│   └── index.js
└── README.md
```

## 🚀 Getting Started

### 🔧 Backend Setup

```bash
cd Backend
npm install
node index.js
```

- Runs at: `http://localhost:5000`
- Make sure the file `server/templates/deed_template.html` exists.

### 🌐 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

- Runs at: `http://localhost:5173`

Ensure this proxy is set in `Frontend/vite.config.js`:

```js
server: {
  proxy: {
    '/generate': 'http://localhost:5000'
  }
}
```



## 📃 License

MIT License – Free to use and modify.
