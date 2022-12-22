const {
  addNotehandler,
  getAllNotesHandler,
  getNoteByIdhandler,
  editNoteByIdHandler,
  deleteNoreByIdHandler,
} = require("./handler");

const routes = [
  {
    // route menambahkan catatan
    method: "POST",
    path: "/notes",
    // fungsi handler (dibuat di file handler.js) > setelah dibuat panggil nama fungsinya (configurasi)
    handler: addNotehandler,
  },
  {
    // route menampilkan catatan
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
  //   route menampilkan catatan spesifik (id)
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdhandler,
  },
  //   route mengubah catatan berdasarkan (id)
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByIdHandler,
  },
  //   menghapus catatan berdasarkan id
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoreByIdHandler,
  },
];

module.exports = routes;
