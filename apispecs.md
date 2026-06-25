# API Specifications — DOMES V2

Dokumen ini memetakan setiap halaman/komponen ke daftar endpoint API yang dibutuhkan agar aplikasi berfungsi penuh.

---

## 1. Authentication

| Halaman | Komponen | Endpoint | Method | Keterangan |
|---------|----------|----------|--------|------------|
| Login | `Login.jsx` | `/api/auth/login` | POST | Login user, terima JWT |
| Register | `Register.jsx` | `/api/auth/register` | POST | Registrasi user baru |
| | | `/api/reference/organizations` | GET | Daftar organisasi untuk dropdown |
| Forgot Password | `ForgotPassword.jsx` | `/api/auth/forgot-password` | POST | Kirim email reset password |
| Reset Password | — | `/api/auth/reset-password` | POST | Reset password dengan token |

---

## 2. User Profile & Settings (CMS)

| Halaman | Komponen | Endpoint | Method | Keterangan |
|---------|----------|----------|--------|------------|
| All CMS (navbar) | `CMSNavbar.jsx` | `/api/user/me` | GET | Profil user yang login |
| Settings / Profile | `CMSSettingsProfile.jsx` | `/api/user/me` | GET | Baca profil user |
| | | `/api/user/profile` | PUT | Update profil (nama, email, dll) |
| | | `/api/upload/avatar` | POST | Upload avatar foto |
| Settings / Security | `CMSSettingsSecurity.jsx` | `/api/user/password` | PUT | Ganti password |
| Settings / Notifications | `CMSSettingsNotifications.jsx` | `/api/user/notifications` | GET | Baca preferensi notifikasi |
| | | `/api/user/notifications` | PUT | Update preferensi notifikasi |
| Settings / System | `CMSSettingsSystem.jsx` | `/api/admin/emails` | GET | Daftar email admin |
| | | `/api/admin/emails` | POST | Tambah email admin |
| | | `/api/admin/emails/{email}` | DELETE | Hapus email admin |

---

## 3. Public — Documents

| Halaman | Komponen | Endpoint | Method | Keterangan |
|---------|----------|----------|--------|------------|
| Landing / Browse | `DocumentList.jsx` | `/api/documents` | GET | Daftar dokumen (paginated, diffilter) |
| Search Results | `SearchResultsPage.jsx` | `/api/documents/search` | GET | Pencarian + filter (query, facets) |
| Document Detail | `DocumentDetail.jsx` | `/api/documents/{id}` | GET | Detail satu dokumen |
| | | `/api/documents/{id}/related` | GET | Dokumen terkait |
| | | `/api/documents/{id}/download` | GET | Download file / redirect ke file |
| Document Card | `DocumentCard.jsx` | (menggunakan data dari DocumentList / search) | | |

### Query Parameters untuk `GET /api/documents` dan `GET /api/documents/search`

| Parameter | Tipe | Contoh |
|-----------|------|--------|
| `q` | string | `"climate change"` |
| `agencies` | string (comma-separated) | `"UNDP,UNICEF,WHO"` |
| `sdgs` | string (comma-separated) | `"GOAL 1,GOAL 13"` |
| `sectors` | string (comma-separated) | `"Education and Culture,Health"` |
| `langs` | string (comma-separated) | `"english,bahasa"` |
| `yearFrom` | integer | `2014` |
| `yearTo` | integer | `2024` |
| `jointProgrammes` | string (comma-separated) | `"Climate Village Project (PROKLIM)"` |
| `lnobs` | string (comma-separated) | `"Women and Girls,Youth"` |
| `nonUnPartners` | string (comma-separated) | `"Government,Universities"` |
| `sort` | string | `"relevance"`, `"newest"`, `"oldest"`, `"popular"` |
| `page` | integer | `1` |
| `limit` | integer | `12` |

---

## 4. Public — Filters / Reference Data

| Halaman | Komponen | Endpoint | Method | Keterangan |
|---------|----------|----------|--------|------------|
| All filter areas | `FilterSidebar.jsx` | `/api/reference/agencies` | GET | Daftar 24+ UN agencies |
| | | `/api/reference/sdgs` | GET | Daftar 17 SDG Goals + ikon/warna |
| | | `/api/reference/sectors` | GET | Daftar 30+ sektor tematik |
| | | `/api/reference/languages` | GET | Daftar bahasa |
| | | `/api/reference/joint-programmes` | GET | Daftar 28 joint programmes |
| | | `/api/reference/lnobs` | GET | Daftar 4 LNOB groups |
| | | `/api/reference/non-un-partners` | GET | Daftar 8 tipe non-UN partners |
| Register | `Register.jsx` | `/api/reference/organizations` | GET | Daftar organisasi untuk dropdown |
| CMS — Step 3 | `CMSNewSubmissionStep3.jsx` | `/api/reference/sdgs` | GET | Sama seperti di atas |
| | | `/api/reference/agencies` | GET | Sama seperti di atas |
| | | `/api/reference/sectors` | GET | Sama seperti di atas |
| | | `/api/reference/joint-programmes` | GET | Sama seperti di atas |

---

## 5. Public — Analytics

| Halaman | Komponen | Endpoint | Method | Keterangan |
|---------|----------|----------|--------|------------|
| Landing | `InsightsBanner.jsx` | `/api/stats` | GET | Statistik global (docs, agencies, partners, sdgs) |
| Analytics | `AnalyticsDashboard.jsx` | `/api/analytics/overview` | GET | Metrik ringkasan (total docs, agencies, downloads) |
| | | `/api/analytics/uploads-over-time` | GET | Upload per tahun (2014–2024) |
| | | `/api/analytics/by-sdg` | GET | Jumlah dokumen per SDG |
| | | `/api/analytics/by-agency` | GET | Kontribusi per agency |
| | | `/api/analytics/by-sector` | GET | Dokumen per sektor (pie chart) |
| | | `/api/analytics/by-language` | GET | Dokumen per bahasa (donut chart) |

---

## 6. Public — Reports

| Halaman | Komponen | Endpoint | Method | Keterangan |
|---------|----------|----------|--------|------------|
| Document Detail | `DocumentDetail.jsx` | `/api/reports` | POST | Submit laporan broken link |

---

## 7. CMS — Dashboard

| Halaman | Komponen | Endpoint | Method | Keterangan |
|---------|----------|----------|--------|------------|
| Dashboard | `CMSDashboard.jsx` | `/api/cms/dashboard` | GET | Statistik dashboard (cards) |
| | | `/api/cms/activity` | GET | Aktivitas terbaru (recent activity feed) |

---

## 8. CMS — Submissions

| Halaman | Komponen | Endpoint | Method | Keterangan |
|---------|----------|----------|--------|------------|
| Submissions List | `CMSSubmissions.jsx` | `/api/submissions` | GET | Daftar submissions (dengan filter status) |
| | | `/api/submissions/{id}` | DELETE | Hapus submission |
| | | `/api/submissions/{id}/publish` | PUT | Publish dokumen |
| | | `/api/submissions/{id}/unpublish` | PUT | Unpublish dokumen |
| New — Step 1 | `CMSNewSubmissionStep1.jsx` | `/api/upload` | POST | Upload file primer, cover, supporting |
| | | `/api/upload/url-validate` | POST | Validasi external URL |
| New — Step 2 | `CMSNewSubmissionStep2.jsx` | `/api/submissions/{id}/draft` | POST | Simpan metadata (draft step 2) |
| New — Step 3 | `CMSNewSubmissionStep3.jsx` | `/api/submissions/{id}/draft` | POST | Simpan alignment (draft step 3) |
| New — Step 4 | `CMSNewSubmissionStep4.jsx` | `/api/submissions` | POST | Submit final (create submission) |
| | | `/api/submissions/{id}/draft` | POST | Simpan sebagai draft |
| (di masa depan) | — | `/api/submissions/extract` | POST | AI extraction dari file (future) |

> **Catatan:** Semua step submission menggunakan draft sementara yang disimpan dengan ID yang sama. Saat step-4 submit, status berubah menjadi "Draft" atau "Pending Review".

### Status Submission
| Status | Keterangan |
|--------|------------|
| `draft` | Masih dalam proses pengisian |
| `pending_review` | Menunggu review dari admin |
| `published` | Dokumen sudah dipublikasikan |
| `approved_unpublished` | Disetujui tapi belum dipublikasi |

---

## 9. CMS — Users Management

| Halaman | Komponen | Endpoint | Method | Keterangan |
|---------|----------|----------|--------|------------|
| Users | `CMSUsers.jsx` | `/api/users` | GET | Daftar semua users |
| | | `/api/users` | POST | Buat user baru |
| | | `/api/users/{id}` | PUT | Update user |
| | | `/api/users/{id}` | DELETE | Hapus user |
| | | `/api/reference/organizations` | GET | Daftar organisasi (sama seperti register) |

---

## 10. CMS — Analytics

| Halaman | Komponen | Endpoint | Method | Keterangan |
|---------|----------|----------|--------|------------|
| Analytics | `CMSAnalytics.jsx` | `/api/analytics/summary?period=30d` | GET | Ringkasan statistik CMS |
| | | `/api/analytics/top-downloads` | GET | Dokumen paling banyak didownload |
| | | `/api/analytics/top-views` | GET | Dokumen paling banyak dilihat |

---

## 11. CMS — Reports

| Halaman | Komponen | Endpoint | Method | Keterangan |
|---------|----------|----------|--------|------------|
| Reports | `CMSReports.jsx` | `/api/reports` | GET | Daftar laporan broken links (CMS) |
| | | `/api/reports/{id}/status` | PUT | Update status laporan |

### Status Report
| Status | Keterangan |
|--------|------------|
| `open` | Laporan baru, belum ditangani |
| `in_progress` | Sedang dalam penanganan |
| `resolved` | Sudah diperbaiki |

---

## 12. CMS — Master Reference Management

| Halaman | Komponen | Endpoint | Method | Keterangan |
|---------|----------|----------|--------|------------|
| Master Reference | `CMSMasterReference.jsx` | `/api/v2/cms/master/{type}` | GET | Mengambil semua item master untuk tipe referensi terpilih (termasuk status aktif/nonaktif) |
| | | `/api/v2/cms/master/{type}` | POST | Menambahkan item master baru (Admin only) |
| | | `/api/v2/cms/master/{type}/{code}` | PUT | Memperbarui detail item master berdasarkan kode (Admin only) |
| | | `/api/v2/cms/master/{type}/{code}` | DELETE | Menghapus item master secara permanen (Admin only) |

### Fitur Kustom Master Reference yang Diimplementasikan:
1. **Layout Lega**: Desain 90% full-width untuk visualisasi data master yang masif.
2. **Keamanan Non-Admin**: Alert visual & Restricted Lock Screen jika peran simulated user bukan Administrator.
3. **Modal Konfirmasi Hapus**: Dialog overlay interaktif dengan pesan peringatan relasi data.
4. **Upload SDG Icon (Base64)**: Penambahan choose file input dengan preview gambar instan pada form SDG.
5. **Upload Agency Logo (Base64 opsional)**: Pilihan choose file input opsional dengan preview dan tombol hapus pada form UN Agencies.

---

## Ringkasan Semua Endpoint

### Auth (Public)
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/register` | ❌ |
| POST | `/api/auth/login` | ❌ |
| POST | `/api/auth/forgot-password` | ❌ |
| POST | `/api/auth/reset-password` | ❌ |

### User (Auth Required)
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/user/me` | ✅ |
| PUT | `/api/user/profile` | ✅ |
| PUT | `/api/user/password` | ✅ |
| GET | `/api/user/notifications` | ✅ |
| PUT | `/api/user/notifications` | ✅ |

### Public — Documents & Stats
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/documents` | ❌ |
| GET | `/api/documents/search` | ❌ |
| GET | `/api/documents/{id}` | ❌ |
| GET | `/api/documents/{id}/related` | ❌ |
| GET | `/api/documents/{id}/download` | ❌ |
| GET | `/api/stats` | ❌ |

### Public — Analytics
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/analytics/overview` | ❌ |
| GET | `/api/analytics/uploads-over-time` | ❌ |
| GET | `/api/analytics/by-sdg` | ❌ |
| GET | `/api/analytics/by-agency` | ❌ |
| GET | `/api/analytics/by-sector` | ❌ |
| GET | `/api/analytics/by-language` | ❌ |

### Public — Reports
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/reports` | ❌ |

### Reference Data (Public)
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/reference/agencies` | ❌ |
| GET | `/api/reference/sdgs` | ❌ |
| GET | `/api/reference/sectors` | ❌ |
| GET | `/api/reference/languages` | ❌ |
| GET | `/api/reference/joint-programmes` | ❌ |
| GET | `/api/reference/lnobs` | ❌ |
| GET | `/api/reference/non-un-partners` | ❌ |
| GET | `/api/reference/organizations` | ❌ |

### CMS — Dashboard
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/cms/dashboard` | ✅ |
| GET | `/api/cms/activity` | ✅ |

### CMS — Submissions
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/submissions` | ✅ |
| POST | `/api/submissions` | ✅ |
| DELETE | `/api/submissions/{id}` | ✅ |
| PUT | `/api/submissions/{id}/publish` | ✅ |
| PUT | `/api/submissions/{id}/unpublish` | ✅ |
| POST | `/api/submissions/{id}/draft` | ✅ |

### CMS — Users
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/users` | ✅ (admin) |
| POST | `/api/users` | ✅ (admin) |
| PUT | `/api/users/{id}` | ✅ (admin) |
| DELETE | `/api/users/{id}` | ✅ (admin) |

### CMS — Analytics
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/analytics/summary` | ✅ |
| GET | `/api/analytics/top-downloads` | ✅ |
| GET | `/api/analytics/top-views` | ✅ |

### CMS — Reports
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/reports` | ✅ |
| PUT | `/api/reports/{id}/status` | ✅ |

### CMS — Settings / Admin
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/admin/emails` | ✅ (admin) |
| POST | `/api/admin/emails` | ✅ (admin) |
| DELETE | `/api/admin/emails/{email}` | ✅ (admin) |

### CMS — Master Reference
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/v2/cms/master/{type}` | ✅ |
| POST | `/api/v2/cms/master/{type}` | ✅ (admin) |
| PUT | `/api/v2/cms/master/{type}/{code}` | ✅ (admin) |
| DELETE | `/api/v2/cms/master/{type}/{code}` | ✅ (admin) |

### Upload
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/upload` | ✅ |
| POST | `/api/upload/url-validate` | ✅ |
| POST | `/api/upload/avatar` | ✅ |

### System
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/health-check` | ❌ |
| GET | `/` | ❌ |
