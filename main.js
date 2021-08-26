function getELE(idString) {
    return document.getElementById(idString);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
/**
 * Bài tập 1: Quản lý tuyển sinh
 * B1: Nhập vào 
 * - Điểm chuẩn (diemChuan), điểm môn 1 (diem1), điểm môn 2 (diem2), điểm môn 3 (diem3)
 * - Lựa chọn: Khu vực (khuVuc), đối tượng thi (doiTuong).
 * B2: Xử lý dữ liệu
 * - Xác định điểm theo khu vực (diemKV), trong đó:
 * KVA - 2, KVB - 1, KVC - 0.5, KVx - 0
 * - Xác định điểm theo đối tượng (diemDT), trong đó:
 * ĐT0 - 0, ĐT1 - 2.5, ĐT2 - 1.5, ĐT3 - 1
 * - Xác định điểm ưu tiên (diemUuTien)
 * diemUuTien = diemKV + diemDT
 * - Xác định điểm tổng kết (diemTongKet)
 * diemTongKet = diem1 + diem2 + diem3 + diemUuTien
 * - Xác định đậu hay rớt: 
 * (diemTongKet >= diemChuan) && diem1 !== 0 && diem2 !== 0 diem 3 !== 0 -> đậu
 * B3: Xuất kết quả:  
 * return "đậu" hoặc "rớt"
 */

function bt1TuyenSinh() {
    let diemChuan = Number(getELE("bt1_diemChuan").value);
    let diem1 = Number(getELE("bt1_diem1").value);
    let diem2 = Number(getELE("bt1_diem2").value);
    let diem3 = Number(getELE("bt1_diem3").value);
    let khuVuc = getELE("bt1_khuVuc").value;
    let doiTuong = getELE("bt1_doiTuong").value;
    
    let diemKV = 0, diemDT = 0;
    // Xác định điểm theo khu vực
    switch (khuVuc) {
        case "A":
            diemKV = 2;
            break;
        case "B":
            diemKV = 1;
            break;
        case "C":
            diemKV = 0.5;
            break
        default:
            diemKV = 0;
            break;
    }
    //Xác định điểm theo đối tượng
    switch (doiTuong) {
        case "DT1":
            diemDT = 2.5;
            break;
        case "DT2":
            diemDT = 1.5;
            break;
        case "DT3":
            diemDT = 1;
            break;
        default:
            diemDT = 0;
            break;
    }
    //Xác định điểm ưu tiên
    let diemUuTien = diemKV + diemDT;
    let diemTongKet = diem1 + diem2 + diem3 + diemUuTien;
    if (diemTongKet >= diemChuan && diem1 !== 0 && diem2 !== 0 && diem3 !== 0) {
        getELE("bt1_ketQua").innerHTML = "Bạn đã đậu. Tổng điểm " + diemTongKet;
    }else{
        getELE("bt1_ketQua").innerHTML = "Bạn đã rớt. Tổng điểm " + diemTongKet;
    }
    
    // console.log(diemChuan, diem1, diem2, diem3, khuVuc, doiTuong);
}

/**
 * Bài tập 2: Tính tiền điện
 * B1: Nhập dữ liệu:
 * - Số kW điện đã dùng (sokW)
 * - Họ và tên người sử dụng (ten)
 * B2: Xử lý dữ liệu: tiền điện (tienDien) 
 * 0 - (a_500) - 50kW - (b_650) - 100kW -(c_850)- 200kW -(d_1100)- 350kW -(e_1300)-->
 *   (a): tienDien = soKW * 500;
 *   (b): tienDien = 50*500 + (sokW-50)*650;
 *   (c): tienDien = 50*500 + 50*650 + (soKW-100)*850;
 *   (d): tienDien = 50*500 + 50*650 + 100*850 + (sokW-200)*1100;
 *   (e): tienDien = 50*500 + 50*650 + 100*850 + 150*1100 + (sokW-350)*1300;
 * B3: Xuất kết quả: tienDien.
 */
function bt2TinhTienDien(){
    let ten = getELE("bt2_ten").value;
    let sokW = Number(getELE("bt2_sokW").value);
    let tienDien = 0;
    if (sokW >= 0 && sokW <=50) {
        tienDien = sokW * 500;
    } else if (sokW > 50 && sokW <=100) {
        tienDien = 50*500 + (sokW-50)*650;
    } else if(sokW > 100 && sokW <=200){
        tienDien = 50*500 + 50*650 + (sokW-100)*850;
    } else if (sokW > 200 && sokW <= 350){
        tienDien = 50*500 + 50*650 + 100*850 + (sokW-200)*1100;
    } else{
        tienDien = 50*500 + 50*650 + 100*850 + 150*1100 + (sokW-350)*1300;
    }
    getELE("bt2_ketQua").innerHTML = "Ông/bà: " + "<b>" + ten + "</b>" + " phải nộp tiền điện là: " + "<b>" + numberWithCommas(tienDien) + "</b> VNĐ"
}

/**Bài tập 3: tính thuế thu nhập cá nhân
 * B1: Xác định dữ liệu đầu vào
 * - Họ và tên: ten.
 * - Tổng thu nhập năm: thuNhap
 * - Số người phụ thuộc: soNguoi
 * B2: Tính toán
 * - Xác định thu nhập chịu thuế (thuNhapThue)
 * thuNhapThue = thuNhap - 4000000 - soNguoi*1600000
 * - Xác định thuế suất: thueSuat
 * 0 --(5%)-- 60tr --(10%)-- 120tr --(15%)-- 210tr --(20%)-- 384tr --(25%)-- 624tr --(30%)-- 960 --(35%)--
 * - Xác định tiền nộp thuế (thueCaNhan):
 * thueCaNhan = thuNhapThue * thueSuat
 * B3: Xuất kết quả -> thueCaNhan
*/

function bt3ThueCaNhan(){
    let ten = getELE("bt3_ten").value;
    let thuNhap = Number(getELE("bt3_thuNhap").value);
    let soNguoi = Number(getELE("bt3_soNguoi").value);
    //Xac dinh thu nhap chiu thue
    let thuNhapThue = thuNhap - 4000000 - soNguoi*1600000;
    // Xac dinh thue suat
    let thueSuat = 0;
    if (thuNhapThue >=0 && thuNhapThue <= 60000000) {
        thueSuat = 0.05;
    } else if (thuNhapThue > 60000000 && thuNhapThue <= 120000000){
        thueSuat = 0.1;
    }
    else if (thuNhapThue > 120000000 && thuNhapThue <= 210000000){
        thueSuat = 0.15;
    }
    else if (thuNhapThue > 210000000 && thuNhapThue <= 384000000){
        thueSuat = 0.2;
    }
    else if (thuNhapThue > 384000000 && thuNhapThue <= 624000000){
        thueSuat = 0.25;
    }
    else if (thuNhapThue > 624000000 && thuNhapThue <= 960000000){
        thueSuat = 0.3;
    }
    else {
        thueSuat = 0.35;
    }
    //Xac dinh tien nop thue
    let thueCaNhan = thuNhapThue * thueSuat;
    getELE("bt3_ketQua").innerHTML = "Ông/bà: " + "<b>" + ten + "</b> phải nộp tiền thuế cá nhân: <b>" + numberWithCommas(thueCaNhan) + "</b> VNĐ.";
}

/**Bài 4: tính tiền cáp
 * B1: Xác định dữ liệu nhập vào:
 * - Mã khách hàng: maKH
 * - Loại khách hàng (loaiKH): Nhà dân - nhaDan, Doanh nghiệp: doanhNghiep.
 * - Số kết nối: soKetNoi
 * - Số kênh cao cấp: soKenhCaoCap
 * - Phí xử lý hóa đơn: phiHoaDon
 * - Phí dịch vụ cơ bản: phiDichVu
 * - Thuê kênh cao cấp: phiCaoCap
 * B2: Tính toán dữ liệu - tiền cáp (tienCap)
 * - Trường hợp 1: Nhà dân - nhaDan
 * tienCap = phiHoaDon + phiDichVu + phiCaoCap*soKenhCaoCap
 * - Trường hợp 2: Doanh nghiệp - doanhNghiep
 *   + Xác định phí dịch vụ cơ bản:
 *      soKetNoi > 0 && soKetNoi <= 10 --> phiDichVu = 75
 *      soKetNoi > 10 --> phiDichVu = 750 + (soKetNoi - 10)*5
 *   + Xác định tiền cáp:
 *      tienCap = phiHoaDon + phiDichVu + phiCaoCap*soKenhCaoCap
 * B3: Xuất kết quả: tienCap
 */
function bt4OnchangeLoaiKH(ele){
    let soKetNoiEle = getELE("bt4_soKetNoi");
    soKetNoiEle.value= "";
    switch (ele.value) {
        case "nhaDan":
            soKetNoiEle.disabled = true;
            break;
        case "doanhNghiep":
            soKetNoiEle.disabled = false;
            break;
        default:
            soKetNoiEle.disabled = true;
            break;
    }
}
function bt4TienCap(){
    let maKH = getELE("bt4_maKH").value;
    let loaiKH = getELE("bt4_loaiKH").value;
    let soKenhCaoCap = Number(getELE("bt4_soKenhCaoCap").value);
    let phiHoaDon = 0, phiCaoCap = 0, phiDichVu = 0;
    if (loaiKH == "nhaDan") {
        phiHoaDon = 4.5;
        phiDichVu = 20.5;
        phiCaoCap = 7.5;
    } else{
        phiHoaDon = 15;
        let soKetNoi = Number(getELE("bt4_soKetNoi").value);
        if (soKetNoi > 0 && soKetNoi <= 10) {
            phiDichVu = 75;
        } else{
            phiDichVu = 750 + (soKetNoi - 10)*5;
        }
        phiCaoCap = 50;
    }
    let tienCap = phiHoaDon + phiDichVu + phiCaoCap*soKenhCaoCap;
    getELE("bt4_ketQua").innerHTML = "Khách hàng mã số <b> " + maKH + "</b> có tiền cáp <b>$" + numberWithCommas(tienCap) + "</b>";
}