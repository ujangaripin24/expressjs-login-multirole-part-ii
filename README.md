### Change column table using Sequelize
Oke 👍 berarti kamu mau bikin **migration baru** dengan `sequelize-cli` untuk mengubah constraint kolom `password` supaya `allowNull: true`.

Di Sequelize, kamu nggak boleh edit langsung di migration lama (biar history migration tetap konsisten), jadi kita buat migration baru.

---

### 1. Buat migration baru

Jalankan di terminal:

```bash
npx sequelize-cli migration:generate --name alter-users-password-allow-null
```

Ini bakal bikin file di folder `migrations/` misalnya:

```
migrations/20250823120000-alter-users-password-allow-null.js
```

---

### 2. Edit migration tersebut

Isi `up` dan `down` untuk mengubah kolom:

```js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
```

> ⚠️ Pastikan nama tabel (`Users`) dan nama kolom (`password`) sesuai dengan di database kamu.

---

### 3. Jalankan migration

```bash
npx sequelize-cli db:migrate
```

---

📌 Sekarang kolom `password` di tabel `Users` sudah boleh `NULL`.

Mau aku kasih contoh juga cara **ngecek hasilnya** di database dengan query SQL langsung biar kamu yakin sudah berubah?
