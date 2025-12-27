import {execute} from '../config/db.js';
export default class ThuongHieuModel{
    static async ThemThuongHieu(TenThuongHieu, MoTa, HinhAnh){
        try {
            const [ketqua]= await execute('INSERT INTO thuonghieu (TenThuongHieu, MoTa, HinhAnh) VALUES (?,?,?)',[TenThuongHieu, MoTa, HinhAnh]);
            return ketqua.affectedRows >0 ? true : false;
        } catch (error) {
            return 1;
        }
    }
}