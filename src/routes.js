import { getNotesHandler , addNoteHandler , getDetailHandler , updateNoteHandler , deleteNoteHandler } from "./handler.js";


const route = [
  {
    method: "GET",
    path: "/notes",
    handler: getNotesHandler
  },
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
    
  },
  {
    method : "GET",
    path : "/notes/{id}",
    handler : getDetailHandler
  },
  {
    method : "PUT",
    path: "/notes/{id}",
    handler : updateNoteHandler
  },
  {
    method : "DELETE",
    path : "/notes/{id}",
    handler : deleteNoteHandler
  }
];

export default route;