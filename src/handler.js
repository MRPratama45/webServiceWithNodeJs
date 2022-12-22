const { nanoid } = require("nanoid");
const notes = require("./notes");

// handler untuk menambahkan catatan
const addNotehandler = (request, h) => {
  const { title, tags, body } = request.payload;

  // membuat id unik pke liblary nanoid
  const id = nanoid(16);
  // properti menambahkan catatan baru, karena sama gunakan new Date().toISOString();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  // memasukkan nilai" ke dalam array notes dengan method PUSH()
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  // menemtukan newNote sudah masuk ke dalam array notes
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  // menentukan respons yg diberikan server
  //   berhasil
  if (isSuccess) {
    const response = h.response({
      status: "success",
      nessage: " Catatan berhasil di tambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  //   gagal
  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });

  response.code(500);
  return response;
};

// fungsi menampilkan catatan
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

// fungsi menampilkan catatan spesifik(id)
const getNoteByIdhandler = (request, h) => {
  //   untuk mendapatkan id catatan
  const { id } = request.params;
  //   mendapatkan objek note dengan id dari objek array notes (method filter() untuk mendapatkan objek)
  //   n, bole diisi apa saja bebas
  const note = notes.filter((n) => n.id === id)[0];

  //   memastikan objek note tidak undefined, bila undefined kelmbalikan respons gagal
  //   ini logika true
  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  //   ini logika false
  const response = h.response({
    status: "fail",
    message: "catatan tidak Ditemukan",
  });
  //   call back logika false
  response.code(404);
  return response;
};

// mengubah catatam berdasarkan id
const editNoteByIdHandler = (request, h) => {
  // mendapatkan id
  const { id } = request.params;

  //   mendapatkan data notes terbaru pada body request (request.payload)
  const { title, tags, body } = request.payload;

  /**
   * perbarui nilai properti updatedAt (karena datanya adalah data yg telah ada)
   * sehingga kita perlu mendapatkan datanya
   */
  const updatedAt = new Date().toISOString();

  /**
   * data baru sudah siap (code di atas)
   * mengubah catatan lama ke yg baru dengan indexing array
   * 1. dapatkan indexing array dahulu sesuai id, gunakan findIndex()
   */
  const index = notes.findIndex((note) => note.id === id);

  //   menentukan berhasil atau gagal nilai index yg didapatkan
  //   index berhasil didapatkan
  if (index !== -1) {
    notes[index] = {
      // spread operator = meleburkan/ mengeluarkan isi array sesuai dengan jumlahnya
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Catatan berhasil di perbaharui",
    });
    response.code(200);
    return response;
  }

  //  index gagal didapatkan
  const response = h.response({
    status: "fail",
    message: "Gagal mempebaharui catatan, id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// fungsi menghapus catatan berdasarkan id
const deleteNoreByIdHandler = (request, h) => {
  // logika sama seperti mengubah, memanfaatkan index untuk menghapus catatan
  // pertama dapatkan dl idn yg dikirim melalui path parameters
  const { id } = request.params;

  // dapatkan index dari objek catatan sesuai id
  const index = notes.findIndex((note) => note.id === id);

  //   mengencek index yg didapatkan, tidakbole -1
  // untuk menghapusnya menggunakan method aray splice()
  //   logika berhasil menghapus
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  // logika gagal menghapus
  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus, Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// eksport handler dengan objek literals (lebih dari 1 nilai yg di eksportnya)
module.exports = {
  addNotehandler,
  getAllNotesHandler,
  getNoteByIdhandler,
  editNoteByIdHandler,
  deleteNoreByIdHandler,
};
