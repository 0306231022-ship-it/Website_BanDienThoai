import {execute} from '../config/db.js';
export default class CaiDatModel{
    static async GetTTWebsite() {
        try {
            const [ketqua]= await execute('SELECT * FROM caidatwebsite LIMIT 1',[]);
            return ketqua[0] ?? null;
        } catch (error) {
             throw new Error('Database query failed: ' + error.message);
        }
    }
    static async UpdateWebsite(){

    }
}