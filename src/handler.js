
import * as nano from "nanoid";
import {getAllData , insertData , setData , deleteData} from "./util.js";



const getNotesHandler = (request, h) => {
    const data = getAllData()
    const response = h
      .response({
        status: "succes ",
        data: {
          notes: data
        },
      })
      .code(200);
    return response;
};

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const notes = getAllData();
    const newNote = {id: nano.nanoid(16),title,tags,body,createdAt: new Date().toISOString(),updatedAt: ""};

    if (notes.filter((e) => e.id === newNote.id).length > 0) {
        const response = h.response({
        status: "failed",
        message: "Catatan gagal ditambahkan",
        });
        response.code(500);
        return response;
    } else {
        const res = insertData(newNote);
        const response = h.response({
            status : "Success",
            message : "Berhasil menambahkan note",
            data : {
                notes : res
            }
        }).code(201)
        return response;
    }
}


const getDetailHandler = (request  ,h ) => {
    const {id} = request.params;
    const note = getAllData().filter(e => e.id === id);
    if(note.length > 0){
        return h.response({
            status : "succes ",
            message : "succesfully find the note",
            data : {
                note
            }
        }).code(200)
    }else{
        return h.response({
            status : "failed",
            message : "Note is not found",
        }).code(404)
    }
}


const updateNoteHandler = (request , h) => {
    const {title , tags , body} = request.payload;
    const {id} = request.params;

    const note = getAllData().find(e => e.id === id); 
    
    if(note){
        const res = setData(id,{
            id,
            createdAt : note.createdAt ,
            updatedAt : new Date().toISOString(),
            title,
            tags,
            body
        });

        const response  = h.response({
            status : "succes" ,
            message : "sukses mengupdate note",
            data : {
                notes : res
            }
        }).code(200)

        return response ;
    }else{
        const response  = h.response({
            status : "failed",
            message : "note is not found"
        }).code(404);

        return response ;
    }
}

const deleteNoteHandler = (request , h) => {
    const {id} =  request.params;
    if(getAllData().find(e => e.id === id)){
        const result  = deleteData(id);
        const response = h.response({
            status : "succes",
            message : "note is successfully deleted",
            data : {
                notes : result
            }
        }).code(200)
        return response ;
    }else{
        const response = h.response({
            status : "failed",
            message : "note is not found"
        }).code(404)

        return response;
    }

}

export { getNotesHandler, addNoteHandler , getDetailHandler , updateNoteHandler, deleteNoteHandler};
