import * as fs from "node:fs";



const {env} = process;

const getAllData = () => {
    const data = JSON.parse(fs.readFileSync(env.dbpath));
    return data ; 
}

const insertData = (payload) => {
    const data = getAllData()
    data.push(payload);
    fs.writeFileSync(env.dbpath, JSON.stringify(data));
    return data;
}

const setData = (id , data) => {
    const other = getAllData().filter(e => e.id !== id);
    const result = [...other, data];
    fs.writeFileSync(env.dbpath , JSON.stringify(result));
    return result;
}

const deleteData = (id) => {
    const other = getAllData().filter((e) => e.id !== id);
    fs.writeFileSync(env.dbpath,JSON.stringify(other));
    return other;
}


export {getAllData , insertData , setData , deleteData}