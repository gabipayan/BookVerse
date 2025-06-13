# 📚 BookVerse

BookVerse is a full-stack book search engine that allows users to discover new books using the Google Books API, save their favorite finds, and manage their personal reading list. Originally built with a RESTful API, it has been fully refactored to use **GraphQL** with **Apollo Server**, offering a more efficient and flexible way to fetch and modify data.

> Deployed on [Render](https://render.com/) with a MongoDB Atlas cloud database.

---

## 🚀 Tech Stack

- **Frontend:** React, Apollo Client
- **Backend:** Node.js, Express, Apollo Server (GraphQL)
- **Database:** MongoDB (using MongoDB Atlas)
- **Authentication:** JWT-based auth middleware adapted for GraphQL
- **Deployment:** Render

---

## 📖 User Story

**AS AN** avid reader  
**I WANT** to search for new books to read  
**SO THAT** I can keep a list of books to purchase

---

## ✅ Acceptance Criteria

- When the app loads, users see a menu with options to **Search for Books** and **Login/Signup**, along with a search input field.
- Anyone (logged in or not) can search for books and see:
  - Title
  - Author
  - Description
  - Cover image
  - A link to the book on Google Books
- A modal allows users to toggle between **Login** and **Signup** forms.
- Upon signing up or logging in, users gain access to additional features:
  - Save books to their account
  - View and manage their saved books
  - Logout securely
- Logged-in users can:
  - Save books from search results to their personal collection
  - View saved books under the "Saved Books" section
  - Remove books from their list

---

## 🔧 Features

- 🔎 **Search** using the Google Books API
- 🔐 **User Authentication** using JWT
- 💾 **Save & Manage Books** in a personal collection
- 🔄 **GraphQL Integration** with Apollo Server & Apollo Client
- 🌐 **Responsive UI** built with React
- ☁️ **Cloud Deployment** using Render and MongoDB Atlas

---

## 🛠️ Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/bookverse.git
   cd bookverse