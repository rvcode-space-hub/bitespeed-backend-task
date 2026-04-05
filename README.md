# 🚀 Identity Reconciliation System (Bitespeed Style)

A backend system that intelligently identifies and links customer data using email and phone numbers — inspired by the Bitespeed backend challenge.

---

## 📌 Problem Statement

Users may interact with a system using different combinations of:

* Email
* Phone Number

The goal is to:

* Identify if multiple inputs belong to the same user
* Link them under a single **primary identity**
* Maintain relationships using **primary and secondary contacts**

---

## 🧠 Core Concept

❌ One user = One database row
✅ One user = One PRIMARY + Multiple SECONDARY contacts

---

## 🏗️ System Design

```
Primary Contact
   ├── Secondary Contact
   ├── Secondary Contact
   └── Secondary Contact
```

* **Primary Contact** → Main identity
* **Secondary Contacts** → Linked identities

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## 📁 Project Structure

```
src/
 ├── config/
 │     ├── db.js
 │     └── env.js
 ├── controllers/
 │     └── identify.controller.js
 ├── services/
 │     └── identify.service.js
 ├── repositories/
 │     └── identify.repository.js
 ├── models/
 │     └── contact.model.js
 ├── routes/
 │     └── identify.routes.js
 └── app.js

server.js   ✅ (root level)
```

---

## 🔗 API Endpoint

### POST `/api/v1/identify`

### Request Body

```json
{
"email":"ramKumar@gmail.com",
"phoneNumber":"123459"
}
```
---
## ✅ Response


```json
{
    "contact": {
        "primaryContactId": "69d08b7e3d200becf6221607",
        "emails": [
            "ram@gmail.com",
            "ramKumar@gmail.com"
        ],
        "phoneNumbers": [
            "123458976",
            "1234589",
            "123459"
        ],
        "secondaryContactIds": [
            "69d08bb13d200becf622160b",
            "69d08bc63d200becf622160f",
            "69d08bdf3d200becf6221614"
        ]
    }
}

```
---

## 🔥 Features

* ✅ Identity linking using email & phone
* ✅ Primary & secondary relationship handling
* ✅ Duplicate prevention
* ✅ Consolidated response generation
* ✅ Clean architecture (Controller → Service → Repository)

---

## 🧠 Key Learnings

* Data normalization
* Graph-based relationship modeling
* Real-world backend system design
* Deduplication logic

---

## ⚠️ Important Logic

* If no contact exists → create **primary**
* If contact exists → create **secondary**
* If same email + phone exists → ❌ do not create duplicate
* All secondary contacts must link directly to primary
---

## 🚀 How to Run

```bash
git clone git@github.com:rvcode-space-hub/bitespeed-backend-task.git
npm install
npm run dev

```
---

## 📌 Future Improvements
* 🔄 Merge multiple primary contacts into one
* ⚡ Add MongoDB indexing
* 🐳 Docker support
* 🗄️ PostgreSQL + Prisma version
---

## 👨‍💻 Author

Ravi Shankar Singh
---

## ⭐ If you like this project

Give it a star ⭐ on GitHub and share your feedback!
