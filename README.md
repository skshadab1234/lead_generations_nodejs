# 🔍 Unlock Hidden Lead Sources Using Google Places API

Automate your lead generation process by discovering and extracting business contact information (including emails) from Google Places — and export it all into a professional Excel file.

Perfect for marketers, freelancers, agencies, and SaaS startups looking to get ahead of their competitors by tapping into **underutilized business data**.

---

## 🚀 Features

✅ Search local businesses via Google Places API  
✅ Fetch details: Name, Address, Rating, Phone, Website, Opening Hours  
✅ Scrape emails from websites using Regex  
✅ Export clean Excel file using ExcelJS  
✅ Handles API errors and rate limits gracefully

---

## 🛠️ Tech Stack

- Node.js
- Google Places API
- Axios
- ExcelJS
- dotenv

---

## 📦 Requirements

- Node.js v16 or above
- Google Cloud Project with billing enabled
- Google Places API enabled

---

## ⚙️ Setup Instructions

### 1. 🧭 Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select an existing one
3. Navigate to: **API & Services → Library**
4. Enable **Places API**
5. Go to: **API & Services → Credentials → Create API Key**
6. Ensure billing is enabled for the API

---

### 2. 📁 Project Setup

```bash
# Step 1: Create a folder
mkdir lead-finder && cd lead-finder

# Step 2: Initialize Node.js
npm init -y

# Step 3: Install dependencies
npm install axios exceljs dotenv
````

---

### 3. 🌐 Environment Configuration

Create a `.env` file in the root folder and paste your API key:

```env
GOOGLE_API_KEY=your_google_places_api_key_here
```

---

### 4. ✍️ Script Overview (index.js)

This is what the script does:

* Accepts:

  * `keyword` (e.g., perfume shop, marketing agency)
  * `location` (latitude & longitude)
  * `radius` (in meters)
* Calls Google Places API for nearby businesses
* Fetches detailed info for each place
* If a website is found, it fetches the page and scrapes emails
* Saves results in an Excel file: `leads.xlsx`

---

### 5. ▶️ Running the Script

```bash
node index.js
```

The script will generate an Excel file in the same directory with the extracted lead data.

---

## 📊 Sample Excel Output

| Name           | Address         | Rating | Phone          | Website                             | Email                                       | Opening Hours    |
| -------------- | --------------- | ------ | -------------- | ----------------------------------- | ------------------------------------------- | ---------------- |
| Aroma Boutique | 123 Main Street | 4.5    | +91-9999999999 | [www.aroma.in](http://www.aroma.in) | [contact@aroma.in](mailto:contact@aroma.in) | Mon-Sat 10am–8pm |

---

## 💡 Notes

* Google Places API offers **28,000 free requests/month**
* Regex is used to identify emails in raw HTML
* API quota can be hit quickly — add delays between calls if needed
* Website scraping may fail if pages are protected or non-existent
* The tool can be extended with:

  * CSV output
  * Zapier integration
  * LinkedIn scraping

---

## 🧾 License

This project is licensed for **personal and commercial use** under a limited license.

✅ Allowed:

* Use in client projects
* Modify the code
  ❌ Not allowed:
* Resell or distribute publicly without permission

---

## 📬 Contact & Support

Have questions or need help setting this up?

Drop a message at: **[pwscoding@gmail.com](mailto:pwscoding@gmail.com)** or connect on [LinkedIn](https://linkedin.com/in/pshadab)

---

Made with ❤️ by Shadab Khan

