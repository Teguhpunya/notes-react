import React from "react";

const LangContext = React.createContext<any>({});

export const LangProvider = LangContext.Provider;
export const LangConsumer = LangContext.Consumer;

export default LangContext;

export const appLangData = {
  "en-US": {
    header: {
      archive: "Archive",
    },
    alertwindow: {
      moveError: "Move note failed!",
      moveSuccess: "Note moved.",
      deleteError: "Delete failed!",
      deleteSuccess: "Note deleted.",
      saveError: "Save failed!",
      saveSuccess: "Note saved.",
      charaLimit: "Title more than 50 characters.",
    },
    authentication: {
      registerSection: "Register an Account",
      hasAccount: "Already has account? ",
      loginHere: "Login here!",
      noAccount: "Need an account? ",
      registerHere: "Register here!",
    },
    input: {
      charaAvail: "Characters remaining: ",
      titlePlaceholder: "Note title..",
      bodyPlaceholder: "Note content..",
    },
    search: {
      placeholder: "Search note...",
    },
    card: {
      defaultSection: "My Notes",
      archivedSection: "Archived",
      noResult: "No result!",
      loading: "Loading...",
    },
    button: {
      archive: "Archive",
      unarchive: "Unarchive",
      delete: "Delete",
      back: "Back",
      add: "Add note",
    },
  },
  id: {
    header: {
      archive: "Arsip",
    },
    alertwindow: {
      moveError: "Catatan gagal dipindahkan.",
      moveSuccess: "Catatan berhasil dipindahkan.",
      deleteError: "Catatan gagal dihapus.",
      deleteSuccess: "Catatan berhasil dihapus.",
      saveError: "Catatan gagal disimpan.",
      saveSuccess: "Catatan tersimpan.",
      charaLimit: "Maksimal judul catatan 50 karakter.",
    },
    authentication: {
      registerSection: "Daftar Akun",
      hasAccount: "Sudah punya akun? ",
      loginHere: "Login di sini.",
      noAccount: "Belum punya akun? ",
      registerHere: "Daftar di sini!",
    },
    input: {
      charaAvail: "Sisa karakter: ",
      titlePlaceholder: "Judul catatan...",
      bodyPlaceholder: "Isi catatan...",
    },
    search: {
      placeholder: "Cari catatan...",
    },
    card: {
      defaultSection: "Catatanku",
      archivedSection: "Terarsipkan",
      noResult: "Catatan tidak ditemukan!",
      loading: "Sedang memuat...",
    },
    button: {
      archive: "Arsipkan",
      unarchive: "Batalkan arsip",
      delete: "Hapus",
      back: "Kembali",
      add: "Catatan baru",
    },
  },
};
