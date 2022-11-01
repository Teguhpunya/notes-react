import { parseListFromStorage, saveListToStorage } from "./storageData";
import {
  getActiveNotes,
  getArchivedNotes,
  deleteNote,
  getNote,
  archiveNote,
  unarchiveNote,
  addNote,
} from "./network-data";

export {
  getActiveNotes,
  getArchivedNotes,
  deleteNote,
  getNote,
  archiveNote,
  unarchiveNote,
  addNote,
  parseListFromStorage,
  saveListToStorage,
};
