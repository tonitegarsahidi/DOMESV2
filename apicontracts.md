# API Contracts — DOMES V2

Dokumentasi lengkap endpoint API, method, request/response payload untuk backend DOMES V2.

---

## Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:3000` |
| Production  | `https://domesv2.yourdomain.com` |

## Authentication

Seluruh endpoint (kecuali dinyatakan) menggunakan **JWT Bearer Token**.

```
Authorization: Bearer <token>
```

## Standard Response Format

### Success
```json
{
  "success": true,
  "message": "Human-readable message",
  "data": { ... }
}
```

### Error
```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": "ERROR_CODE",
  "details": "Human-readable error message: ERROR_CODE"
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "...",
  "data": {
    "items": [ ... ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "totalItems": 1248,
      "totalPages": 104
    }
  }
}
```

---

## A. Authentication (Public)

---

### POST /api/auth/register

Mendaftarkan user baru.

**Request Body:**
```json
{
  "first_name": "Erlangga",
  "last_name": "Agustino",
  "position": "Administrator",
  "organization": "UNITED NATIONS",
  "phone_number": "+628123456789",
  "email": "erlangga@un.org",
  "password": "password123",
  "confirm_password": "password123",
  "captcha": "google-recaptcha-response-token"
}
```

| Field | Required | Validasi |
|-------|----------|----------|
| `first_name` | ✅ | |
| `last_name` | ✅ | |
| `email` | ✅ | Format email valid |
| `password` | ✅ | Min 6 karakter |
| `confirm_password` | ✅ | Sama dengan `password` |
| `position` | ✅ | |
| `organization` | ✅ | |
| `phone_number` | ❌ | |
| `captcha` | ❌* | Required jika RECAPTCHA_ENABLED=true |

**Response 201 (Success):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "username": "erlangga",
      "name": "Erlangga Agustino",
      "first_name": "Erlangga",
      "last_name": "Agustino",
      "email": "erlangga@un.org",
      "type": null,
      "position": "Administrator",
      "organization": "UNITED NATIONS",
      "phone_number": "+628123456789",
      "created_at": "2024-06-23T10:00:00+07:00",
      "updated_at": "2024-06-23T10:00:00+07:00"
    }
  }
}
```

**Response 409 (Conflict):**
```json
{
  "success": false,
  "message": "User with this email already exists",
  "error": "USER_ALREADY_EXISTS",
  "details": "User with this email already exists: USER_ALREADY_EXISTS"
}
```

**Response 422 (Validation):**
```json
{
  "success": false,
  "message": "Passwords do not match",
  "error": "VALIDATION_FAILED",
  "details": "Passwords do not match: VALIDATION_FAILED"
}
```

---

### POST /api/auth/login

Login dengan email dan password, mengembalikan JWT token.

**Request Body:**
```json
{
  "email": "erlangga@un.org",
  "password": "password123",
  "captcha": "google-recaptcha-response-token"
}
```

| Field | Required | Validasi |
|-------|----------|----------|
| `email` | ✅ | Format email valid |
| `password` | ✅ | |
| `captcha` | ❌* | Required jika RECAPTCHA_ENABLED=true |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "username": "erlangga",
      "name": "Erlangga Agustino",
      "first_name": "Erlangga",
      "last_name": "Agustino",
      "email": "erlangga@un.org",
      "type": "admin",
      "position": "Administrator",
      "organization": "UNITED NATIONS",
      "phone_number": "+628123456789",
      "avatar_url": "/uploads/avatars/erlangga.jpg",
      "created_at": "2024-06-23T10:00:00+07:00"
    }
  }
}
```

**Response 401 (Invalid credentials):**
```json
{
  "success": false,
  "message": "Invalid credentials",
  "error": "INVALID_CREDENTIALS",
  "details": "Invalid credentials: INVALID_CREDENTIALS"
}
```

---

### POST /api/auth/forgot-password

Mengirim email reset password. Selalu return 200 (cegah email enumeration).

**Request Body:**
```json
{
  "email": "erlangga@un.org",
  "captcha": "google-recaptcha-response-token"
}
```

**Response 200 (Always):**
```json
{
  "success": true,
  "message": "If the email exists, a reset link has been sent",
  "data": null
}
```

---

### POST /api/auth/reset-password

Mereset password menggunakan token dari email.

**Request Body:**
```json
{
  "token": "a1b2c3d4e5f6...64-hex-char-token",
  "password": "newpassword123",
  "confirm_password": "newpassword123"
}
```

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Password has been reset successfully",
  "data": null
}
```

**Response 400 (Token invalid/expired):**
```json
{
  "success": false,
  "message": "Invalid or expired reset token",
  "error": "INVALID_RESET_TOKEN",
  "details": "Invalid or expired reset token: INVALID_RESET_TOKEN"
}
```

---

## B. User Profile & Settings (Auth Required)

---

### GET /api/user/me

Mengembalikan profil user yang sedang login.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "id": 1,
    "username": "erlangga",
    "name": "Erlangga Agustino",
    "first_name": "Erlangga",
    "last_name": "Agustino",
    "email": "erlangga@un.org",
    "type": "admin",
    "role": "Administrator",
    "position": "Administrator",
    "organization": "UNITED NATIONS",
    "phone_number": "+628123456789",
    "avatar_url": "/uploads/avatars/erlangga.jpg",
    "notification_preferences": {
      "document_approvals": true,
      "broken_link_reports": true,
      "system_updates": false,
      "email_notifications": true
    },
    "created_at": "2024-06-23T10:00:00+07:00",
    "updated_at": "2024-06-23T10:00:00+07:00"
  }
}
```

**Response 401 (Unauthorized):**
```json
{
  "success": false,
  "message": "Missing authorization header",
  "error": "TOKEN_MISSING",
  "details": "Missing authorization header: TOKEN_MISSING"
}
```

---

### PUT /api/user/profile

Memperbarui profil user.

**Request Body:**
```json
{
  "first_name": "Erlangga",
  "last_name": "Agustino",
  "position": "Senior Administrator",
  "organization": "UNDP",
  "phone_number": "+628123456789"
}
```

| Field | Required | Validasi |
|-------|----------|----------|
| `first_name` | ✅ | |
| `last_name` | ✅ | |
| `email` | ❌ | Biasanya tidak bisa diubah sendiri |
| `position` | ❌ | |
| `organization` | ❌ | |
| `phone_number` | ❌ | |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "first_name": "Erlangga",
    "last_name": "Agustino",
    "name": "Erlangga Agustino",
    "position": "Senior Administrator",
    "organization": "UNDP",
    "phone_number": "+628123456789",
    "updated_at": "2024-06-23T11:00:00+07:00"
  }
}
```

---

### PUT /api/user/password

Mengganti password user.

**Request Body:**
```json
{
  "current_password": "oldpassword123",
  "new_password": "newpassword123",
  "confirm_password": "newpassword123"
}
```

| Field | Required | Validasi |
|-------|----------|----------|
| `current_password` | ✅ | Harus sesuai password saat ini |
| `new_password` | ✅ | Min 6 karakter |
| `confirm_password` | ✅ | Sama dengan `new_password` |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": null
}
```

**Response 400 (Wrong current password):**
```json
{
  "success": false,
  "message": "Current password is incorrect",
  "error": "INVALID_CURRENT_PASSWORD",
  "details": "Current password is incorrect: INVALID_CURRENT_PASSWORD"
}
```

---

### GET /api/user/notifications

Mengembalikan preferensi notifikasi user.

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Notification preferences retrieved successfully",
  "data": {
    "document_approvals": true,
    "broken_link_reports": true,
    "system_updates": false,
    "email_notifications": true
  }
}
```

---

### PUT /api/user/notifications

Memperbarui preferensi notifikasi user.

**Request Body:**
```json
{
  "document_approvals": true,
  "broken_link_reports": false,
  "system_updates": true,
  "email_notifications": true
}
```

| Field | Tipe | Required |
|-------|------|----------|
| `document_approvals` | boolean | ✅ |
| `broken_link_reports` | boolean | ✅ |
| `system_updates` | boolean | ✅ |
| `email_notifications` | boolean | ✅ |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Notification preferences updated successfully",
  "data": {
    "document_approvals": true,
    "broken_link_reports": false,
    "system_updates": true,
    "email_notifications": true
  }
}
```

---

## C. Public — Documents

---

### GET /api/documents

Mengembalikan daftar dokumen dengan pagination dan filtering.

**Query Parameters:**

| Parameter | Tipe | Required | Deskripsi |
|-----------|------|----------|-----------|
| `page` | integer | ❌ | Default: 1 |
| `limit` | integer | ❌ | Default: 12, Max: 50 |
| `sort` | string | ❌ | `relevance`, `newest`, `oldest`, `popular` |
| `agencies` | string | ❌ | Comma-separated: `UNDP,UNICEF,WHO` |
| `sdgs` | string | ❌ | Comma-separated: `GOAL 1,GOAL 13` |
| `sectors` | string | ❌ | Comma-separated: `Education and Culture,Health` |
| `langs` | string | ❌ | Comma-separated: `english,bahasa` |
| `yearFrom` | integer | ❌ | |
| `yearTo` | integer | ❌ | |
| `jointProgrammes` | string | ❌ | Comma-separated names |
| `lnobs` | string | ❌ | Comma-separated: `Women and Girls,Youth` |
| `nonUnPartners` | string | ❌ | Comma-separated: `Government,Universities` |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Documents retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "title": "Digital Economy and Financial Inclusion in Rural Indonesia",
        "slug": "digital-economy-financial-inclusion-rural-indonesia",
        "description": "This comprehensive report analyzes the rapid expansion of digital financial services across rural Indonesia...",
        "agency": "UNDP",
        "year": 2024,
        "language": "English, Bahasa Indonesia",
        "file_size": "4.2 MB",
        "total_pages": 120,
        "type": "Report",
        "pub_status": "Published",
        "cover_image": "/uploads/covers/doc_001.jpg",
        "sdgs": ["GOAL 1", "GOAL 5", "GOAL 8", "GOAL 10"],
        "tags": ["digital economy", "financial inclusion", "fintech"],
        "views": 1234,
        "downloads": 567,
        "created_at": "2024-06-23T10:00:00+07:00"
      },
      {
        "id": 2,
        "title": "Climate Change Adaptation in Coastal Communities",
        "slug": "climate-change-adaptation-coastal-communities",
        "description": "Examining the impact of climate change on coastal communities in Indonesia...",
        "agency": "UNEP",
        "year": 2023,
        "language": "English",
        "file_size": "3.1 MB",
        "total_pages": 95,
        "type": "Assessment",
        "pub_status": "Published",
        "cover_image": "/uploads/covers/doc_002.jpg",
        "sdgs": ["GOAL 13", "GOAL 14"],
        "tags": ["climate change", "coastal", "adaptation"],
        "views": 890,
        "downloads": 234,
        "created_at": "2024-06-23T10:00:00+07:00"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "totalItems": 1248,
      "totalPages": 104
    }
  }
}
```

---

### GET /api/documents/search

Pencarian dokumen dengan full-text search + filter.

**Query Parameters:**

| Parameter | Tipe | Required | Deskripsi |
|-----------|------|----------|-----------|
| `q` | string | ✅ | Query pencarian |
| `page` | integer | ❌ | Default: 1 |
| `limit` | integer | ❌ | Default: 12 |
| `sort` | string | ❌ | `relevance`, `newest`, `oldest`, `popular` |
| `agencies` | string | ❌ | Comma-separated |
| `sdgs` | string | ❌ | Comma-separated |
| `sectors` | string | ❌ | Comma-separated |
| `langs` | string | ❌ | Comma-separated |
| `yearFrom` | integer | ❌ | |
| `yearTo` | integer | ❌ | |
| `jointProgrammes` | string | ❌ | Comma-separated |
| `lnobs` | string | ❌ | Comma-separated |
| `nonUnPartners` | string | ❌ | Comma-separated |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Search results retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "title": "Digital Economy and Financial Inclusion in Rural Indonesia",
        "slug": "digital-economy-financial-inclusion-rural-indonesia",
        "description": "This comprehensive report analyzes the rapid expansion of digital financial services across rural Indonesia...",
        "agency": "UNDP",
        "year": 2024,
        "language": "English, Bahasa Indonesia",
        "file_size": "4.2 MB",
        "total_pages": 120,
        "type": "Report",
        "pub_status": "Published",
        "cover_image": "/uploads/covers/doc_001.jpg",
        "sdgs": ["GOAL 1", "GOAL 5", "GOAL 8", "GOAL 10"],
        "tags": ["digital economy", "financial inclusion", "fintech"],
        "views": 1234,
        "downloads": 567,
        "highlight": {
          "title": "Digital Economy and <mark>Financial Inclusion</mark> in Rural Indonesia",
          "description": "...analyzes the rapid expansion of digital <mark>financial</mark> services..."
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "totalItems": 45,
      "totalPages": 4
    },
    "suggestions": ["Green Economy", "Carbon Emission", "SDGs", "Paris Agreement"]
  }
}
```

---

### GET /api/documents/{id}

Mengembalikan detail lengkap satu dokumen.

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Document retrieved successfully",
  "data": {
    "id": 1,
    "code": "UNDP-2024-001",
    "slug": "digital-economy-financial-inclusion-rural-indonesia",
    "title": "Digital Economy and Financial Inclusion in Rural Indonesia",
    "agency": "UNDP",
    "year": 2024,
    "language": "English, Bahasa Indonesia",
    "file_url": "/uploads/documents/doc_001.pdf",
    "file_size": "4.2 MB",
    "date_added": "2026-01-03",
    "type": "Report",
    "total_pages": 120,
    "pub_status": "Published",
    "cover_image": "/uploads/covers/doc_001.jpg",
    "abstract": "This comprehensive report analyzes the rapid expansion of digital financial services across rural Indonesia. It highlights the profound impact of mobile banking and fintech solutions on local micro-economies.",
    "summary": "<b>Executive Overview</b><br><br>This extensive report provides an in-depth analysis...",
    "sdgs": [
      { "code": "GOAL 1", "name": "No Poverty", "icon": "/images/SDG-logos/SDG-1.png" },
      { "code": "GOAL 5", "name": "Gender Equality", "icon": "/images/SDG-logos/SDG-5.png" },
      { "code": "GOAL 8", "name": "Decent Work and Economic Growth", "icon": "/images/SDG-logos/SDG-8.png" },
      { "code": "GOAL 10", "name": "Reduced Inequalities", "icon": "/images/SDG-logos/SDG-10.png" }
    ],
    "tags": ["digital economy", "financial inclusion", "fintech", "women empowerment", "rural development"],
    "thematic_areas": ["Inclusive Economic Transformation"],
    "sectors": ["Economic Development", "Innovation and Technology", "Rural and Regional Development"],
    "lnob_groups": ["Women and Girls", "Rural populations"],
    "classification": {
      "lead_agency": "UNDP",
      "other_agencies": ["World Bank"],
      "joint_programme": "Climate Village Project (PROKLIM)",
      "geographic_scope": "National (Indonesia)",
      "non_un_partners": [
        { "type": "Government", "name": "Ministry of Villages" },
        { "type": "Consulting Firm", "name": "GoTo Group" }
      ]
    },
    "focal_point": {
      "name": "Budi Santoso",
      "email": "b.santoso@undp.org",
      "phone": "+62 812 3456 7890",
      "department": "Inclusive Growth Unit"
    },
    "views": 1234,
    "downloads": 567,
    "created_at": "2024-06-23T10:00:00+07:00",
    "updated_at": "2024-06-23T10:00:00+07:00"
  }
}
```

**Response 404 (Not found):**
```json
{
  "success": false,
  "message": "Document not found",
  "error": "DOCUMENT_NOT_FOUND",
  "details": "Document not found: DOCUMENT_NOT_FOUND"
}
```

---

### GET /api/documents/{id}/related

Mengembalikan daftar dokumen terkait.

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Related documents retrieved successfully",
  "data": [
    {
      "id": 6,
      "title": "Global International Waters Assessment: Sulu-Celebes...",
      "slug": "global-international-waters-assessment-sulu-celebes",
      "agency": "UNDP Indonesia",
      "year": 2017,
      "cover_image": "/uploads/covers/doc_006.jpg",
      "sdgs": ["GOAL 14"]
    },
    {
      "id": 7,
      "title": "Global International Waters Assessment: Indonesian Sea...",
      "slug": "global-international-waters-assessment-indonesian-sea",
      "agency": "UNEP",
      "year": 2017,
      "cover_image": "/uploads/covers/doc_007.jpg",
      "sdgs": ["GOAL 14"]
    }
  ]
}
```

---

### GET /api/documents/{id}/download

Mengembalikan URL download atau redirect ke file.

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Download link generated",
  "data": {
    "download_url": "/uploads/documents/doc_001.pdf",
    "filename": "UNDP-2024-001_Digital_Economy.pdf",
    "file_size": "4.2 MB",
    "expires_at": "2024-06-23T11:00:00+07:00"
  }
}
```

---

## D. Public — Stats & Analytics

---

### GET /api/stats

Statistik global untuk InsightsBanner di landing page.

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Platform statistics retrieved successfully",
  "data": {
    "total_documents": 1796,
    "total_agencies": 24,
    "total_partners": 35,
    "total_sdg_goals": 17
  }
}
```

---

### GET /api/analytics/overview

Ringkasan metrik untuk halaman Analytics publik.

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Analytics overview retrieved successfully",
  "data": {
    "total_documents": 12457,
    "active_agencies": 24,
    "monthly_downloads": 84200,
    "total_views": 456000,
    "total_downloads": 189000
  }
}
```

---

### GET /api/analytics/uploads-over-time

Data upload per tahun (area chart).

**Query Parameters:**
| Parameter | Tipe | Required | Deskripsi |
|-----------|------|----------|-----------|
| `fromYear` | integer | ❌ | Default: 2014 |
| `toYear` | integer | ❌ | Default: 2024 |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Uploads over time retrieved successfully",
  "data": [
    { "year": 2014, "count": 120 },
    { "year": 2015, "count": 180 },
    { "year": 2016, "count": 240 },
    { "year": 2017, "count": 420 },
    { "year": 2018, "count": 580 },
    { "year": 2019, "count": 780 },
    { "year": 2020, "count": 1120 },
    { "year": 2021, "count": 1450 },
    { "year": 2022, "count": 1890 },
    { "year": 2023, "count": 2340 },
    { "year": 2024, "count": 2670 }
  ]
}
```

---

### GET /api/analytics/by-sdg

Jumlah dokumen per SDG (horizontal bar chart).

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Documents by SDG retrieved successfully",
  "data": [
    { "sdg": "GOAL 1", "name": "No Poverty", "count": 1245, "color": "#E5243B" },
    { "sdg": "GOAL 2", "name": "Zero Hunger", "count": 890, "color": "#DDA63A" },
    { "sdg": "GOAL 3", "name": "Good Health and Well-being", "count": 1567, "color": "#4C9F38" },
    { "sdg": "GOAL 4", "name": "Quality Education", "count": 1102, "color": "#C5192D" },
    { "sdg": "GOAL 5", "name": "Gender Equality", "count": 978, "color": "#FF3A21" },
    { "sdg": "GOAL 6", "name": "Clean Water and Sanitation", "count": 654, "color": "#26BDE2" },
    { "sdg": "GOAL 7", "name": "Affordable and Clean Energy", "count": 789, "color": "#FCC30B" },
    { "sdg": "GOAL 8", "name": "Decent Work and Economic Growth", "count": 1345, "color": "#A21942" },
    { "sdg": "GOAL 9", "name": "Industry, Innovation and Infrastructure", "count": 1123, "color": "#FD6925" },
    { "sdg": "GOAL 10", "name": "Reduced Inequalities", "count": 876, "color": "#DD1367" },
    { "sdg": "GOAL 11", "name": "Sustainable Cities and Communities", "count": 567, "color": "#FD9D24" },
    { "sdg": "GOAL 12", "name": "Responsible Consumption and Production", "count": 678, "color": "#BF8B2E" },
    { "sdg": "GOAL 13", "name": "Climate Action", "count": 1890, "color": "#3F7E44" },
    { "sdg": "GOAL 14", "name": "Life Below Water", "count": 345, "color": "#0A97D9" },
    { "sdg": "GOAL 15", "name": "Life on Land", "count": 456, "color": "#56C02B" },
    { "sdg": "GOAL 16", "name": "Peace, Justice and Strong Institutions", "count": 1234, "color": "#00689D" },
    { "sdg": "GOAL 17", "name": "Partnerships for the Goals", "count": 2345, "color": "#19486A" }
  ]
}
```

---

### GET /api/analytics/by-agency

Kontribusi dokumen per UN agency (bar chart).

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Documents by agency retrieved successfully",
  "data": [
    { "agency": "FAO", "count": 234 },
    { "agency": "UNDP", "count": 1876 },
    { "agency": "UNEP", "count": 987 },
    { "agency": "UNESCO", "count": 654 },
    { "agency": "UNFPA", "count": 543 },
    { "agency": "UNICEF", "count": 1567 },
    { "agency": "WHO", "count": 1234 },
    { "agency": "World Bank", "count": 432 }
  ]
}
```

---

### GET /api/analytics/by-sector

Dokumen per sektor (pie chart).

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Documents by sector retrieved successfully",
  "data": [
    { "sector": "Environment and Climate Change", "count": 2345 },
    { "sector": "Health and Nutrition", "count": 1890 },
    { "sector": "Education and Culture", "count": 1567 },
    { "sector": "Economic Development", "count": 1234 },
    { "sector": "Gender and Child Protection", "count": 987 },
    { "sector": "Governance and Corruption", "count": 876 },
    { "sector": "Agriculture and Food", "count": 765 },
    { "sector": "Social Security and Protection", "count": 654 },
    { "sector": "Other Sectors", "count": 2139 }
  ]
}
```

---

### GET /api/analytics/by-language

Dokumen per bahasa (donut chart).

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Documents by language retrieved successfully",
  "data": [
    { "language": "English", "count": 8900 },
    { "language": "Bahasa Indonesia", "count": 5200 },
    { "language": "French", "count": 1200 },
    { "language": "Arabic", "count": 900 },
    { "language": "Spanish", "count": 800 }
  ]
}
```

---

## E. Public — Reports

---

### POST /api/reports

Mengirim laporan broken link dari pengguna publik.

**Request Body:**
```json
{
  "document_id": 1,
  "reporter_name": "Budi Santoso",
  "reporter_email": "budi@example.com",
  "details": "The PDF link leads to a 404 error page.",
  "captcha": "google-recaptcha-response-token"
}
```

| Field | Required | Deskripsi |
|-------|----------|-----------|
| `document_id` | ✅ | ID dokumen yang rusak |
| `reporter_name` | ✅ | Nama pelapor |
| `reporter_email` | ✅ | Email pelapor |
| `details` | ✅ | Deskripsi masalah |
| `captcha` | ❌* | Required jika RECAPTCHA_ENABLED=true |

**Response 201 (Success):**
```json
{
  "success": true,
  "message": "Report submitted successfully",
  "data": {
    "id": 1,
    "document_id": 1,
    "status": "open",
    "created_at": "2024-06-23T10:00:00+07:00"
  }
}
```

---

## F. Reference Data (Public)

Semua endpoint reference bersifat publik (tanpa auth) dan mengembalikan data statis/dinamis.

---

### GET /api/reference/agencies

**Response 200:**
```json
{
  "success": true,
  "message": "Agencies retrieved successfully",
  "data": [
    { "code": "FAO", "name": "Food and Agriculture Organization", "logo_url": "/images/agency-logos/fao.png" },
    { "code": "IFAD", "name": "International Fund for Agricultural Development", "logo_url": "/images/agency-logos/ifad.png" },
    { "code": "ILO", "name": "International Labour Organization", "logo_url": "/images/agency-logos/ilo.png" },
    { "code": "IMF", "name": "International Monetary Fund", "logo_url": "/images/agency-logos/imf.png" },
    { "code": "IOM", "name": "International Organization for Migration", "logo_url": "/images/agency-logos/iom.png" },
    { "code": "ITU", "name": "International Telecommunication Union", "logo_url": "/images/agency-logos/itu.png" },
    { "code": "RCO", "name": "Resident Coordinator Office", "logo_url": "/images/agency-logos/rco.png" },
    { "code": "UNAIDS", "name": "Joint United Nations Programme on HIV/AIDS", "logo_url": "/images/agency-logos/unaids.png" },
    { "code": "UN Women", "name": "United Nations Entity for Gender Equality", "logo_url": "/images/agency-logos/un-women.png" },
    { "code": "UNDP", "name": "United Nations Development Programme", "logo_url": "/images/agency-logos/undp.png" },
    { "code": "UNEP", "name": "United Nations Environment Programme", "logo_url": "/images/agency-logos/unep.png" },
    { "code": "UNESCO", "name": "United Nations Educational, Scientific and Cultural Organization", "logo_url": "/images/agency-logos/unesco.png" },
    { "code": "UNFPA", "name": "United Nations Population Fund", "logo_url": "/images/agency-logos/unfpa.png" },
    { "code": "UN-HABITAT", "name": "United Nations Human Settlements Programme", "logo_url": "/images/agency-logos/un-habitat.png" },
    { "code": "UNHCR", "name": "United Nations High Commissioner for Refugees", "logo_url": "/images/agency-logos/unhcr.png" },
    { "code": "UNICEF", "name": "United Nations Children's Fund", "logo_url": "/images/agency-logos/unicef.png" },
    { "code": "UNIDO", "name": "United Nations Industrial Development Organization", "logo_url": "/images/agency-logos/unido.png" },
    { "code": "UNOCHA", "name": "Office for the Coordination of Humanitarian Affairs", "logo_url": "/images/agency-logos/unoocha.png" },
    { "code": "UNODC", "name": "United Nations Office on Drugs and Crime", "logo_url": "/images/agency-logos/unodc.png" },
    { "code": "UNOPS", "name": "United Nations Office for Project Services", "logo_url": "/images/agency-logos/unops.png" },
    { "code": "WFP", "name": "World Food Programme", "logo_url": "/images/agency-logos/wfp.png" },
    { "code": "WHO", "name": "World Health Organization", "logo_url": "/images/agency-logos/who.png" },
    { "code": "World Bank", "name": "World Bank Group", "logo_url": "/images/agency-logos/world-bank.png" },
    { "code": "Global Pulse/PLJ", "name": "UN Global Pulse / Pulse Lab Jakarta", "logo_url": "/images/agency-logos/global-pulse.png" }
  ]
}
```

---

### GET /api/reference/sdgs

**Response 200:**
```json
{
  "success": true,
  "message": "SDGs retrieved successfully",
  "data": [
    { "code": "GOAL 1", "name": "No Poverty", "icon": "/images/SDG-logos/SDG-1.png", "color": "#E5243B" },
    { "code": "GOAL 2", "name": "Zero Hunger", "icon": "/images/SDG-logos/SDG-2.png", "color": "#DDA63A" },
    { "code": "GOAL 3", "name": "Good Health and Well-being", "icon": "/images/SDG-logos/SDG-3.png", "color": "#4C9F38" },
    { "code": "GOAL 4", "name": "Quality Education", "icon": "/images/SDG-logos/SDG-4.png", "color": "#C5192D" },
    { "code": "GOAL 5", "name": "Gender Equality", "icon": "/images/SDG-logos/SDG-5.png", "color": "#FF3A21" },
    { "code": "GOAL 6", "name": "Clean Water and Sanitation", "icon": "/images/SDG-logos/SDG-6.png", "color": "#26BDE2" },
    { "code": "GOAL 7", "name": "Affordable and Clean Energy", "icon": "/images/SDG-logos/SDG-7.png", "color": "#FCC30B" },
    { "code": "GOAL 8", "name": "Decent Work and Economic Growth", "icon": "/images/SDG-logos/SDG-8.png", "color": "#A21942" },
    { "code": "GOAL 9", "name": "Industry, Innovation and Infrastructure", "icon": "/images/SDG-logos/SDG-9.png", "color": "#FD6925" },
    { "code": "GOAL 10", "name": "Reduced Inequalities", "icon": "/images/SDG-logos/SDG-10.png", "color": "#DD1367" },
    { "code": "GOAL 11", "name": "Sustainable Cities and Communities", "icon": "/images/SDG-logos/SDG-11.png", "color": "#FD9D24" },
    { "code": "GOAL 12", "name": "Responsible Consumption and Production", "icon": "/images/SDG-logos/SDG-12.png", "color": "#BF8B2E" },
    { "code": "GOAL 13", "name": "Climate Action", "icon": "/images/SDG-logos/SDG-13.png", "color": "#3F7E44" },
    { "code": "GOAL 14", "name": "Life Below Water", "icon": "/images/SDG-logos/SDG-14.png", "color": "#0A97D9" },
    { "code": "GOAL 15", "name": "Life on Land", "icon": "/images/SDG-logos/SDG-15.png", "color": "#56C02B" },
    { "code": "GOAL 16", "name": "Peace, Justice and Strong Institutions", "icon": "/images/SDG-logos/SDG-16.png", "color": "#00689D" },
    { "code": "GOAL 17", "name": "Partnerships for the Goals", "icon": "/images/SDG-logos/SDG-17.png", "color": "#19486A" }
  ]
}
```

---

### GET /api/reference/sectors

**Response 200:**
```json
{
  "success": true,
  "message": "Sectors retrieved successfully",
  "data": [
    { "code": "agriculture-food", "name": "Agriculture and Food" },
    { "code": "business-investment", "name": "Business and Investment" },
    { "code": "conflict-violence-radicalism", "name": "Conflict, Violence, and Radicalism" },
    { "code": "covid-19", "name": "COVID-19" },
    { "code": "disability-vulnerability-social-welfare", "name": "Disability and Vulnerability and Social Welfare" },
    { "code": "disaster-emergency", "name": "Disaster and Emergency" },
    { "code": "economic-development", "name": "Economic Development" },
    { "code": "education-culture", "name": "Education and Culture" },
    { "code": "energy-natural-resources", "name": "Energy and Natural Resources" },
    { "code": "environment-climate-change", "name": "Environment and Climate Change" },
    { "code": "fishery-maritime", "name": "Fishery and Maritime" },
    { "code": "gender-child-protection", "name": "Gender and Child Protection" },
    { "code": "governance-corruption", "name": "Governance and Corruption" },
    { "code": "health-nutrition", "name": "Health and Nutrition" },
    { "code": "infrastructure-development", "name": "Infrastructure Development" },
    { "code": "innovation-technology", "name": "Innovation and Technology" },
    { "code": "livelihood-employment", "name": "Livelihood and Employment" },
    { "code": "population-migration", "name": "Population and Migration" },
    { "code": "poverty-social-exclusion", "name": "Poverty and Social Exclusion" },
    { "code": "public-finance-tax-fiscal-policy", "name": "Public Finance, Tax, and Fiscal Policy" },
    { "code": "rural-regional-development", "name": "Rural and Regional Development" },
    { "code": "social-security-protection", "name": "Social Security and Protection" },
    { "code": "urban-development", "name": "Urban Development" },
    { "code": "water-sanitation", "name": "Water and Sanitation" }
  ]
}
```

---

### GET /api/reference/languages

**Response 200:**
```json
{
  "success": true,
  "message": "Languages retrieved successfully",
  "data": [
    { "code": "english", "name": "English" },
    { "code": "bahasa", "name": "Bahasa Indonesia" },
    { "code": "french", "name": "French" },
    { "code": "arabic", "name": "Arabic" },
    { "code": "spanish", "name": "Spanish" }
  ]
}
```

---

### GET /api/reference/joint-programmes

**Response 200:**
```json
{
  "success": true,
  "message": "Joint programmes retrieved successfully",
  "data": [
    { "code": "adlight", "name": "Advancing Indonesia's Lighting Market to High Efficient Technologies (ADLIGHT)" },
    { "code": "berani", "name": "Better Reproductive Health and Rights for All in Indonesia (BERANI)" },
    { "code": "berani-ii", "name": "Better Sexual and Reproductive Rights for All in Indonesia (BERANI II)" },
    { "code": "chemical-weapons-terrorism", "name": "Building a safer South-East Asia by preventing and responding to the use of chemical weapons by terrorists and other non-state actors in Indonesia (Chemical Weapons Terrorism Project)" },
    { "code": "proklim", "name": "Climate Village Project (PROKLIM)" },
    { "code": "assisst", "name": "Driving Public and Private Capital Towards Green and Social Investments in Indonesia / Accelerating SDGs Investments in Indonesia (ASSIST)" },
    { "code": "empower", "name": "EmPower: Women for Climate-Resilient Societies" },
    { "code": "eljp-covid19", "name": "Employment and Livelihood: An Inclusive Approach to Economic Empowerment of Women and Vulnerable Populations in Indonesia (ELJP, COVID-19)" },
    { "code": "folur", "name": "Food Systems, Land Use and Restoration (FOLUR) Impact Program" },
    { "code": "iom-undp-seed-I", "name": "Global IOM-UNDP Seed Funding Round I" },
    { "code": "iom-undp-seed-II", "name": "Global IOM-UNDP Seed Funding Round II" },
    { "code": "gpi", "name": "Global Peatlands Initiative (GPI)" },
    { "code": "hiv-aids", "name": "HIV/AIDS Joint Programme" },
    { "code": "asp-indonesia", "name": "Leaving No One Behind: Adaptive Social Protection (ASP) for All in Indonesia" },
    { "code": "migration-governance", "name": "Migration Governance for Sustainable Development in Indonesia" },
    { "code": "net-zero-nature-positive", "name": "Net Zero Nature Positive Accelerator" },
    { "code": "page", "name": "Partnership for Action on Green Economy (PAGE)" },
    { "code": "protect", "name": "Preventing Violent Extremism through Promoting Tolerance and Respect for Diversity (PROTECT) Project" },
    { "code": "unwaste", "name": "Project Unwaste: tackling waste trafficking to support a circular economy" },
    { "code": "respect", "name": "RESPECT - Preventing Violence against Women" },
    { "code": "spotlight", "name": "Safe and Fair Migration: Realizing women migrant workers' rights and opportunities in the ASEAN region (SPOTLIGHT)" },
    { "code": "ship-to-shore", "name": "Ship to Shore Rights Project" },
    { "code": "strive-asia", "name": "Strengthening Resilience Against Violent Extremism in Asia (STRIVE Asia)" },
    { "code": "social-protection-covid19", "name": "Supporting the Government of Indonesia and Key Stakeholders to Scale-Up Inclusive Social Protection Programmes in Response to COVID-19" },
    { "code": "shift-indonesia", "name": "Sustainable, Healthy and Inclusive Food Systems Transformation (SHIFT) Indonesia" },
    { "code": "guyub", "name": "Tackling the threat of violent extremism and its impact on human securities in East Java (The Guyub Project)" },
    { "code": "veps-parole", "name": "UN Joint Violent Extremist Prisoners (VEPs) Parole and Probation Project" },
    { "code": "un-redd", "name": "UN-REDD ASEAN Social Forestry initiative (UN-REDD)" }
  ]
}
```

---

### GET /api/reference/lnobs

**Response 200:**
```json
{
  "success": true,
  "message": "LNOB groups retrieved successfully",
  "data": [
    { "code": "women-girls", "name": "Women and Girls" },
    { "code": "youth-children", "name": "Youth and Children" },
    { "code": "disabilities", "name": "Persons with Disabilities" },
    { "code": "others", "name": "Others" }
  ]
}
```

---

### GET /api/reference/non-un-partners

**Response 200:**
```json
{
  "success": true,
  "message": "Non-UN partner types retrieved successfully",
  "data": [
    { "code": "government", "name": "Government" },
    { "code": "universities", "name": "Universities" },
    { "code": "bilateral-agency", "name": "Bilateral Agency" },
    { "code": "consulting-firm", "name": "Consulting Firm" },
    { "code": "think-tank", "name": "Think Tank / Research Institute" },
    { "code": "international-ngo", "name": "International NGO" },
    { "code": "local-ngo", "name": "Local NGO" },
    { "code": "others", "name": "Others" }
  ]
}
```

---

### GET /api/reference/organizations

**Response 200:**
```json
{
  "success": true,
  "message": "Organizations retrieved successfully",
  "data": [
    { "code": "united-nations", "name": "UNITED NATIONS" },
    { "code": "fao", "name": "FAO" },
    { "code": "ifad", "name": "IFAD" },
    { "code": "ilo", "name": "ILO" },
    { "code": "iom", "name": "IOM" },
    { "code": "itu", "name": "ITU" },
    { "code": "unaids", "name": "UNAIDS" },
    { "code": "undp", "name": "UNDP" },
    { "code": "unep", "name": "UNEP" },
    { "code": "unesco", "name": "UNESCO" },
    { "code": "unfpa", "name": "UNFPA" },
    { "code": "unhcr", "name": "UNHCR" },
    { "code": "unicef", "name": "UNICEF" },
    { "code": "unido", "name": "UNIDO" },
    { "code": "unops", "name": "UNOPS" },
    { "code": "unv", "name": "UNV" },
    { "code": "un women", "name": "UN Women" },
    { "code": "wfp", "name": "WFP" },
    { "code": "who", "name": "WHO" },
    { "code": "world bank", "name": "World Bank" },
    { "code": "other", "name": "Other" }
  ]
}
```

---

## G. CMS — Dashboard

---

### GET /api/cms/dashboard

Ringkasan statistik untuk halaman dashboard CMS.

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "stats": {
      "total_documents": {
        "value": 1248,
        "change": 12.5,
        "trend": "up"
      },
      "total_views": {
        "value": 45200,
        "change": 8.3,
        "trend": "up"
      },
      "total_downloads": {
        "value": 8930,
        "change": -2.1,
        "trend": "down"
      },
      "total_users": {
        "value": 156,
        "change": 5.7,
        "trend": "up"
      },
      "pending_approvals": {
        "value": 23,
        "change": 0,
        "trend": "neutral"
      },
      "reports": {
        "value": 7,
        "change": -1,
        "trend": "down"
      }
    }
  }
}
```

---

### GET /api/cms/activity

Aktivitas terbaru di sistem.

**Query Parameters:**
| Parameter | Tipe | Required | Deskripsi |
|-----------|------|----------|-----------|
| `limit` | integer | ❌ | Default: 10 |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Recent activity retrieved successfully",
  "data": [
    {
      "id": 1,
      "type": "submission",
      "action": "created",
      "description": "New document submitted: 'Digital Economy Report 2024'",
      "user": "Erlangga Agustino",
      "user_avatar": "/uploads/avatars/erlangga.jpg",
      "timestamp": "2024-06-23T10:00:00+07:00",
      "time_ago": "2 minutes ago"
    },
    {
      "id": 2,
      "type": "approval",
      "action": "approved",
      "description": "Document 'Climate Change Adaptation' has been approved",
      "user": "Admin User",
      "user_avatar": null,
      "timestamp": "2024-06-23T09:45:00+07:00",
      "time_ago": "17 minutes ago"
    },
    {
      "id": 3,
      "type": "report",
      "action": "created",
      "description": "Broken link reported on document 'Water Sanitation Report'",
      "user": "Budi Santoso",
      "user_avatar": null,
      "timestamp": "2024-06-23T09:30:00+07:00",
      "time_ago": "32 minutes ago"
    }
  ]
}
```

---

## H. CMS — Submissions

---

### GET /api/submissions

Mengembalikan daftar submissions untuk CMS.

**Query Parameters:**
| Parameter | Tipe | Required | Deskripsi |
|-----------|------|----------|-----------|
| `status` | string | ❌ | Filter: `all`, `draft`, `pending_review`, `published`, `approved_unpublished` |
| `search` | string | ❌ | Pencarian judul |
| `page` | integer | ❌ | Default: 1 |
| `limit` | integer | ❌ | Default: 20 |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Submissions retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "title": "Digital Economy and Financial Inclusion in Rural Indonesia",
        "short_description": "Analysis of digital financial services expansion in rural Indonesia...",
        "date_of_publication": "2024-06-15",
        "status": "published",
        "agency": "UNDP",
        "author": "Erlangga Agustino",
        "created_at": "2024-06-23T10:00:00+07:00"
      },
      {
        "id": 2,
        "title": "Climate Change Adaptation in Coastal Communities",
        "short_description": "Examining the impact of climate change on coastal communities...",
        "date_of_publication": "2024-06-20",
        "status": "pending_review",
        "agency": "UNEP",
        "author": "Siti Rahma",
        "created_at": "2024-06-23T09:00:00+07:00"
      },
      {
        "id": 3,
        "title": "Gender Equality Progress Report 2024",
        "short_description": "Annual report on gender equality initiatives in Indonesia...",
        "date_of_publication": null,
        "status": "draft",
        "agency": "UN Women",
        "author": "Erlangga Agustino",
        "created_at": "2024-06-22T15:00:00+07:00"
      },
      {
        "id": 4,
        "title": "Education Access in Remote Areas",
        "short_description": "Study on education accessibility in Indonesia's 3T regions...",
        "date_of_publication": "2024-05-30",
        "status": "approved_unpublished",
        "agency": "UNESCO",
        "author": "Admin User",
        "created_at": "2024-06-21T11:00:00+07:00"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalItems": 156,
      "totalPages": 8
    }
  }
}
```

---

### POST /api/submissions

Membuat submission baru (final submit dari Step 4 wizard).

**Request Body (lengkap — gabungan semua step):**
```json
{
  "title": "Digital Economy and Financial Inclusion in Rural Indonesia",
  "short_description": "Analysis of digital financial services expansion...",
  "abstract": "This comprehensive report analyzes...",
  "detailed_summary": "<b>Executive Overview</b><br><br>This extensive report...",
  "date_of_publication": "2024-06-15",
  "total_pages": 120,
  "language": "English, Bahasa Indonesia",
  "publication_status": "Published",
  "tags": ["digital economy", "financial inclusion", "fintech"],
  "file_url": "/uploads/documents/doc_001.pdf",
  "file_size": "4.2 MB",
  "cover_image_url": "/uploads/covers/doc_001.jpg",
  "external_url": "",
  "supporting_files": [
    { "url": "/uploads/supporting/appendix_a.pdf", "type": "appendix", "description": "Appendix A: Data Tables" }
  ],
  "agency": "UNDP",
  "focal_point": {
    "name": "Budi Santoso",
    "email": "b.santoso@undp.org",
    "phone": "+62 812 3456 7890",
    "department": "Inclusive Growth Unit"
  },
  "sdgs": ["GOAL 1", "GOAL 5", "GOAL 8", "GOAL 10"],
  "sectors": ["Economic Development", "Innovation and Technology", "Rural and Regional Development"],
  "lnob_groups": ["Women and Girls", "Rural populations"],
  "joint_programme": "Climate Village Project (PROKLIM)",
  "other_agencies": ["World Bank"],
  "non_un_partners": [
    { "type": "Government", "name": "Ministry of Villages" },
    { "type": "Consulting Firm", "name": "GoTo Group" }
  ],
  "thematic_areas": ["Inclusive Economic Transformation"],
  "geographic_scope": "National (Indonesia)",
  "consent": true
}
```

**Response 201 (Success):**
```json
{
  "success": true,
  "message": "Submission created successfully",
  "data": {
    "id": 1,
    "status": "pending_review",
    "created_at": "2024-06-23T10:00:00+07:00"
  }
}
```

---

### POST /api/submissions/{id}/draft

Menyimpan progress submission sebagai draft (digunakan di Step 2 dan Step 3).

**Request Body:**
```json
{
  "step": 2,
  "data": {
    "title": "Digital Economy and Financial Inclusion in Rural Indonesia",
    "date_of_publication": "2024-06-15",
    "total_pages": 120,
    "language": "English, Bahasa Indonesia",
    "publication_status": "Published",
    "short_summary": "Analysis of digital financial services...",
    "tags": ["digital economy", "financial inclusion", "fintech"],
    "focal_point_name": "Budi Santoso",
    "focal_point_email": "b.santoso@undp.org",
    "focal_point_phone": "+62 812 3456 7890",
    "focal_point_department": "Inclusive Growth Unit"
  }
}
```

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Draft saved successfully",
  "data": {
    "id": 1,
    "step": 2,
    "saved_at": "2024-06-23T10:00:00+07:00"
  }
}
```

---

### DELETE /api/submissions/{id}

Menghapus submission.

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Submission deleted successfully",
  "data": null
}
```

**Response 404 (Not found):**
```json
{
  "success": false,
  "message": "Submission not found",
  "error": "SUBMISSION_NOT_FOUND",
  "details": "Submission not found: SUBMISSION_NOT_FOUND"
}
```

---

### PUT /api/submissions/{id}/publish

Mempublikasikan submission.

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Document published successfully",
  "data": {
    "id": 1,
    "status": "published",
    "published_at": "2024-06-23T10:00:00+07:00"
  }
}
```

---

### PUT /api/submissions/{id}/unpublish

Menarik publikasi dokumen (unpublish).

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Document unpublished successfully",
  "data": {
    "id": 1,
    "status": "approved_unpublished"
  }
}
```

---

## I. CMS — Users Management

---

### GET /api/users

Mengembalikan daftar users (Admin only).

**Query Parameters:**
| Parameter | Tipe | Required | Deskripsi |
|-----------|------|----------|-----------|
| `search` | string | ❌ | Cari berdasarkan nama, email, organisasi |
| `role` | string | ❌ | Filter: `administrator`, `editor`, `viewer` |
| `status` | string | ❌ | Filter: `active`, `inactive` |
| `page` | integer | ❌ | Default: 1 |
| `limit` | integer | ❌ | Default: 20 |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "first_name": "Erlangga",
        "last_name": "Agustino",
        "email": "erlangga@un.org",
        "phone_number": "+628123456789",
        "organization": "UNDP",
        "position": "Administrator",
        "role": "administrator",
        "status": "active",
        "avatar_url": "/uploads/avatars/erlangga.jpg",
        "created_at": "2024-06-23T10:00:00+07:00",
        "last_login": "2024-06-23T10:00:00+07:00"
      },
      {
        "id": 2,
        "first_name": "Siti",
        "last_name": "Rahma",
        "email": "siti.rahma@un.org",
        "phone_number": "+628987654321",
        "organization": "UNEP",
        "position": "Program Officer",
        "role": "editor",
        "status": "active",
        "avatar_url": null,
        "created_at": "2024-06-22T10:00:00+07:00",
        "last_login": "2024-06-23T08:30:00+07:00"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalItems": 52,
      "totalPages": 3
    }
  }
}
```

---

### POST /api/users

Membuat user baru (Admin only).

**Request Body:**
```json
{
  "first_name": "Budi",
  "last_name": "Santoso",
  "email": "budi.santoso@un.org",
  "password": "password123",
  "confirm_password": "password123",
  "organization": "WHO",
  "position": "Health Officer",
  "phone_number": "+6281122334455",
  "role": "editor",
  "status": "active"
}
```

| Field | Required | Validasi |
|-------|----------|----------|
| `first_name` | ✅ | |
| `last_name` | ✅ | |
| `email` | ✅ | Format email valid, unique |
| `password` | ✅ | Min 6 karakter |
| `confirm_password` | ✅ | Sama dengan `password` |
| `organization` | ❌ | |
| `position` | ❌ | |
| `phone_number` | ❌ | |
| `role` | ✅ | `administrator`, `editor`, `viewer` |
| `status` | ❌ | Default: `active` |

**Response 201 (Success):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 3,
    "first_name": "Budi",
    "last_name": "Santoso",
    "email": "budi.santoso@un.org",
    "organization": "WHO",
    "position": "Health Officer",
    "role": "editor",
    "status": "active",
    "created_at": "2024-06-23T10:00:00+07:00"
  }
}
```

---

### PUT /api/users/{id}

Memperbarui data user (Admin only).

**Request Body:**
```json
{
  "first_name": "Budi",
  "last_name": "Santoso",
  "organization": "WHO",
  "position": "Senior Health Officer",
  "phone_number": "+6281122334455",
  "role": "administrator",
  "status": "active"
}
```

| Field | Required | Validasi |
|-------|----------|----------|
| `first_name` | ❌ | |
| `last_name` | ❌ | |
| `organization` | ❌ | |
| `position` | ❌ | |
| `phone_number` | ❌ | |
| `role` | ❌ | `administrator`, `editor`, `viewer` |
| `status` | ❌ | `active`, `inactive` |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 3,
    "first_name": "Budi",
    "last_name": "Santoso",
    "email": "budi.santoso@un.org",
    "organization": "WHO",
    "position": "Senior Health Officer",
    "role": "administrator",
    "status": "active",
    "updated_at": "2024-06-23T11:00:00+07:00"
  }
}
```

---

### DELETE /api/users/{id}

Menghapus user (Admin only).

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

**Response 404 (Not found):**
```json
{
  "success": false,
  "message": "User not found",
  "error": "USER_NOT_FOUND",
  "details": "User not found: USER_NOT_FOUND"
}
```

---

## J. CMS — Analytics

---

### GET /api/analytics/summary

Ringkasan statistik untuk CMS Analytics.

**Query Parameters:**
| Parameter | Tipe | Required | Deskripsi |
|-----------|------|----------|-----------|
| `period` | string | ❌ | `7d`, `30d`, `90d`, `1y`. Default: `30d` |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Analytics summary retrieved successfully",
  "data": {
    "total_downloads": {
      "value": 24592,
      "change": 12.5,
      "trend": "up"
    },
    "total_views": {
      "value": 89401,
      "change": 8.2,
      "trend": "up"
    },
    "active_users": {
      "value": 3240,
      "change": -2.1,
      "trend": "down"
    }
  }
}
```

---

### GET /api/analytics/top-downloads

Dokumen paling banyak didownload.

**Query Parameters:**
| Parameter | Tipe | Required | Deskripsi |
|-----------|------|----------|-----------|
| `limit` | integer | ❌ | Default: 10 |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Top downloads retrieved successfully",
  "data": [
    { "title": "Digital Economy Report 2024", "downloads": 1234, "progress": 100 },
    { "title": "Climate Change Adaptation Guide", "downloads": 987, "progress": 80 },
    { "title": "Gender Equality Annual Report", "downloads": 876, "progress": 71 },
    { "title": "Water Sanitation Assessment", "downloads": 765, "progress": 62 },
    { "title": "Education Access Study", "downloads": 654, "progress": 53 }
  ]
}
```

---

### GET /api/analytics/top-views

Dokumen paling banyak dilihat.

**Query Parameters:**
| Parameter | Tipe | Required | Deskripsi |
|-----------|------|----------|-----------|
| `limit` | integer | ❌ | Default: 10 |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Top views retrieved successfully",
  "data": [
    { "title": "Digital Economy Report 2024", "category": "Economics", "views": 5678 },
    { "title": "Climate Change Adaptation Guide", "category": "Environment", "views": 4567 },
    { "title": "Gender Equality Annual Report", "category": "Social", "views": 3456 },
    { "title": "COVID-19 Impact Assessment", "category": "Health", "views": 2345 },
    { "title": "Education Access Study", "category": "Education", "views": 1234 }
  ]
}
```

---

## K. CMS — Reports

---

### GET /api/reports

Mengembalikan daftar laporan broken links (CMS).

**Query Parameters:**
| Parameter | Tipe | Required | Deskripsi |
|-----------|------|----------|-----------|
| `status` | string | ❌ | Filter: `all`, `open`, `in_progress`, `resolved` |
| `search` | string | ❌ | Cari berdasarkan judul dokumen |
| `page` | integer | ❌ | Default: 1 |
| `limit` | integer | ❌ | Default: 20 |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Reports retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "document_id": 5,
        "document_title": "Water Sanitation Assessment 2023",
        "reporter_name": "Budi Santoso",
        "reporter_email": "budi@example.com",
        "details": "The PDF link leads to a 404 error page.",
        "status": "open",
        "created_at": "2024-06-23T10:00:00+07:00"
      },
      {
        "id": 2,
        "document_id": 12,
        "document_title": "Climate Adaptation Report",
        "reporter_name": "Siti Rahma",
        "reporter_email": "siti@example.com",
        "details": "Download button not working.",
        "status": "in_progress",
        "created_at": "2024-06-22T15:00:00+07:00"
      },
      {
        "id": 3,
        "document_id": 8,
        "document_title": "Economic Growth Study 2024",
        "reporter_name": "Admin UN",
        "reporter_email": "admin@un.org",
        "details": "Cover image broken.",
        "status": "resolved",
        "created_at": "2024-06-21T09:00:00+07:00"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalItems": 7,
      "totalPages": 1
    }
  }
}
```

---

### PUT /api/reports/{id}/status

Memperbarui status laporan broken link.

**Request Body:**
```json
{
  "status": "in_progress"
}
```

| Field | Required | Validasi |
|-------|----------|----------|
| `status` | ✅ | `open`, `in_progress`, `resolved` |

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Report status updated successfully",
  "data": {
    "id": 1,
    "status": "in_progress",
    "updated_at": "2024-06-23T11:00:00+07:00"
  }
}
```

**Response 400 (Invalid status):**
```json
{
  "success": false,
  "message": "Invalid status value",
  "error": "VALIDATION_FAILED",
  "details": "Status must be one of: open, in_progress, resolved"
}
```

---

## L. CMS — Settings (Admin)

---

### GET /api/admin/emails

Mengembalikan daftar email admin (Admin only).

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Admin emails retrieved successfully",
  "data": [
    { "email": "admin@un.org", "added_at": "2024-06-01T10:00:00+07:00" },
    { "email": "superadmin@un.org", "added_at": "2024-06-01T10:00:00+07:00" }
  ]
}
```

---

### POST /api/admin/emails

Menambahkan email admin baru (Admin only).

**Request Body:**
```json
{
  "email": "newadmin@un.org"
}
```

| Field | Required | Validasi |
|-------|----------|----------|
| `email` | ✅ | Format email valid, unique |

**Response 201 (Success):**
```json
{
  "success": true,
  "message": "Admin email added successfully",
  "data": {
    "email": "newadmin@un.org",
    "added_at": "2024-06-23T10:00:00+07:00"
  }
}
```

**Response 409 (Already exists):**
```json
{
  "success": false,
  "message": "Admin email already exists",
  "error": "ADMIN_EMAIL_EXISTS",
  "details": "Admin email already exists: ADMIN_EMAIL_EXISTS"
}
```

---

### DELETE /api/admin/emails/{email}

Menghapus email admin (Admin only).

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Admin email removed successfully",
  "data": null
}
```

**Response 404 (Not found):**
```json
{
  "success": false,
  "message": "Admin email not found",
  "error": "ADMIN_EMAIL_NOT_FOUND",
  "details": "Admin email not found: ADMIN_EMAIL_NOT_FOUND"
}
```

---

## M. File Uploads

---

### POST /api/upload

Upload file (dokumen, cover, supporting files).

**Request:** `multipart/form-data`

| Field | Tipe | Required | Deskripsi |
|-------|------|----------|-----------|
| `file` | file | ✅ | File yang diupload |
| `type` | string | ✅ | `document`, `cover`, `supporting`, `avatar` |
| `submission_id` | integer | ❌ | ID submission (untuk document/cover/supporting) |

**Response 201 (Success):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "url": "/uploads/documents/doc_001.pdf",
    "filename": "doc_001.pdf",
    "original_name": "Digital_Economy_Report_2024.pdf",
    "file_size": "4.2 MB",
    "mime_type": "application/pdf"
  }
}
```

**Response 413 (File too large):**
```json
{
  "success": false,
  "message": "File size exceeds the maximum limit of 50MB",
  "error": "FILE_TOO_LARGE",
  "details": "File size exceeds the maximum limit of 50MB: FILE_TOO_LARGE"
}
```

---

### POST /api/upload/url-validate

Validasi external URL (apakah bisa diakses).

**Request Body:**
```json
{
  "url": "https://example.com/documents/report.pdf"
}
```

**Response 200 (Valid):**
```json
{
  "success": true,
  "message": "URL is valid",
  "data": {
    "url": "https://example.com/documents/report.pdf",
    "accessible": true,
    "content_type": "application/pdf",
    "file_size": "3.5 MB"
  }
}
```

**Response 200 (Invalid):**
```json
{
  "success": true,
  "message": "URL is not accessible",
  "data": {
    "url": "https://example.com/documents/report.pdf",
    "accessible": false,
    "error": "HTTP 404 Not Found"
  }
}
```

---

### POST /api/upload/avatar

Upload avatar user.

**Request:** `multipart/form-data`

| Field | Tipe | Required | Deskripsi |
|-------|------|----------|-----------|
| `avatar` | file | ✅ | File gambar (max 2MB, format: jpg/png/webp) |

**Response 201 (Success):**
```json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "data": {
    "avatar_url": "/uploads/avatars/erlangga.jpg"
  }
}
```

---

## N. System

---

### GET /api/health-check

Pengecekan status database, redis, dan aplikasi.

**Response 200 (Healthy):**
```json
{
  "success": true,
  "message": "All systems operational",
  "data": {
    "status": "healthy",
    "timestamp": "2024-06-23T10:00:00+07:00",
    "services": {
      "application": "healthy",
      "database": "healthy",
      "redis": "disabled"
    }
  }
}
```

**Response 503 (Unhealthy):**
```json
{
  "success": true,
  "message": "Service degraded",
  "data": {
  "status": "unhealthy",
  "timestamp": "2024-06-23T10:00:00+07:00",
  "services": {
    "application": "healthy",
    "database": "unhealthy",
    "database_error": "database not initialized",
    "redis": "disabled"
    }
  }
}
```

---

## Error Codes

| Kode | HTTP Status | Deskripsi |
|------|-------------|-----------|
| `INVALID_REQUEST_BODY` | 400 | Format request body salah |
| `INVALID_RESET_TOKEN` | 400 | Token reset password tidak valid/expired |
| `INVALID_CREDENTIALS` | 401 | Email atau password salah |
| `TOKEN_MISSING` | 401 | Header Authorization tidak ada |
| `INVALID_TOKEN` | 401 | Token JWT tidak valid |
| `TOKEN_EXPIRED` | 401 | Token JWT sudah expired |
| `USER_NOT_FOUND` | 404 | User tidak ditemukan |
| `DOCUMENT_NOT_FOUND` | 404 | Dokumen tidak ditemukan |
| `SUBMISSION_NOT_FOUND` | 404 | Submission tidak ditemukan |
| `ADMIN_EMAIL_NOT_FOUND` | 404 | Email admin tidak ditemukan |
| `USER_ALREADY_EXISTS` | 409 | Email sudah terdaftar |
| `ADMIN_EMAIL_EXISTS` | 409 | Email admin sudah ada |
| `FILE_TOO_LARGE` | 413 | Ukuran file melebihi batas |
| `CAPTCHA_INVALID` | 422 | Captcha tidak valid |
| `CAPTCHA_MISSING` | 422 | Captcha tidak dikirim |
| `VALIDATION_FAILED` | 422 | Validasi input gagal |
| `INVALID_CURRENT_PASSWORD` | 400 | Password saat ini salah |
| `DATABASE_ERROR` | 500 | Error database |
| `INTERNAL_ERROR` | 500 | Error internal server |
