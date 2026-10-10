/**
 * ============================================================================
 * THE BALCONE SUITES & RESORT - Unified Backend Engine
 * File: code.gs
 * Author: ZettBOT Assistant by Zettbos
 * ============================================================================
 */

const CONFIG = {
  SHEET_KARYAWAN: 'Tabel_Karyawan',
  SHEET_SHIFT: 'Tabel_Shift',
  SHEET_DEPARTEMEN: 'Tabel_Departemen',
  SHEET_ABSENSI: 'Tabel_Absensi',
  SHEET_IZIN: 'Tabel_Izin_Cuti',
  SHEET_KPI: 'Tabel_KPI',
  SHEET_PENGUMUMAN: 'Tabel_Pengumuman',
  SHEET_PENGATURAN: 'Tabel_Pengaturan',
  SHEET_ROSTER: 'Tabel_Roster',
  SHEET_EDIT_PROFIL: 'Tabel_Edit_Profil',
  SHEET_GAJI_MASTER: 'Tabel_Gaji_Master',
  SHEET_PAYROLL_BULANAN: 'Tabel_Payroll_Bulanan',
  SHEET_PINJAMAN: 'Tabel_Pinjaman_Karyawan',
  SHEET_TUKAR_SHIFT: 'Tabel_Tukar_Shift'
};

/**
 * Entrypoint GET untuk merender antarmuka web
 */
function doGet(e) {
  try {
    return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('THE BALCONE SUITES & RESORT - HR & Payroll System')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('THE BALCONE SUITES & RESORT - HR & Payroll System')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

/**
 * Helper function untuk merender modul HTML/CSS/JS terpisah
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Entrypoint POST API Utama untuk seluruh komunikasi Frontend
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Request payload kosong.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action;
    const payload = requestData.payload || [];
    
    let result = null;
    
    if (action === 'loginUser') {
      result = loginUser(payload[0], payload[1], payload[2]);
    } else if (action === 'resetDeviceLock') {
      result = resetDeviceLock(payload[0]);
    } else if (action === 'registerKaryawan') {
      result = registerKaryawan(payload[0]);
    } else if (action === 'approveKaryawan') {
      result = approveKaryawan(payload[0], payload[1]);
    } else if (action === 'setEmployeeResign') {
      result = setEmployeeResign(payload[0], payload[1], payload[2]);
    } else if (action === 'processAbsensi') {
      result = processAbsensi(payload[0], payload[1], payload[2], payload[3], payload[4]);
    } else if (action === 'getKaryawanDashboard') {
      result = getKaryawanDashboard(payload[0], payload[1]);
    } else if (action === 'getHODDashboard') {
      result = getHODDashboard(payload[0], payload[1]);
    } else if (action === 'getAdminDashboard') {
      result = getAdminDashboard();
    } else if (action === 'submitIzinCuti') {
      result = submitIzinCuti(payload[0], payload[1], payload[2], payload[3], payload[4], payload[5]);
    } else if (action === 'approveIzinCuti') {
      result = approveIzinCuti(payload[0], payload[1], payload[2]);
    } else if (action === 'calculateMonthlyKPI') {
      result = calculateMonthlyKPI(payload[0]);
    } else if (action === 'getAttendanceAndLeaveResume') {
      result = getAttendanceAndLeaveResume(payload[0], payload[1], payload[2]);
    } else if (action === 'generateResumeAttendancePDFReport') {
      result = generateResumeAttendancePDFReport(payload[0], payload[1], payload[2]);
    } else if (action === 'getGlobalAttendanceList') {
      result = getGlobalAttendanceList(payload[0], payload[1], payload[2], payload[3], payload[4], payload[5]);
    } else if (action === 'generateAttendancePDFReport') {
      result = generateAttendancePDFReport(payload[0], payload[1], payload[2], payload[3]);
    } else if (action === 'getHODAttendanceList') {
      result = getHODAttendanceList(payload[0], payload[1], payload[2], payload[3], payload[4], payload[5]);
    } else if (action === 'generateHODAttendancePDFReport') {
      result = generateHODAttendancePDFReport(payload[0], payload[1], payload[2], payload[3]);
    } else if (action === 'savePengumuman') {
      result = savePengumuman(payload[0], payload[1], payload[2], payload[3], payload[4]);
    } else if (action === 'deletePengumuman') {
      result = deletePengumuman(payload[0]);
    } else if (action === 'getShiftList') {
      result = getShiftList();
    } else if (action === 'saveShift') {
      result = saveShift(payload[0], payload[1], payload[2], payload[3], payload[4], payload[5]);
    } else if (action === 'deleteShift') {
      result = deleteShift(payload[0]);
    } else if (action === 'getDepartemenList') {
      result = getDepartemenList();
    } else if (action === 'saveDepartemen') {
      result = saveDepartemen(payload[0], payload[1]);
    } else if (action === 'deleteDepartemen') {
      result = deleteDepartemen(payload[0]);
    } else if (action === 'saveOfficeSettings') {
      result = saveOfficeSettings(payload[0], payload[1], payload[2], payload[3], payload[4], payload[5]);
    } else if (action === 'getOfficeSettings') {
      result = getOfficeSettings();
    } else if (action === 'generatePDFReport') {
      result = generatePDFReport(payload[0]);
    } else if (action === 'getRosterData') {
      result = getRosterData(payload[0], payload[1]);
    } else if (action === 'saveBulkRoster') {
      result = saveBulkRoster(payload[0]);
    } else if (action === 'submitEditProfil') {
      result = submitEditProfil(payload[0], payload[1]);
    } else if (action === 'approveEditProfil') {
      result = approveEditProfil(payload[0], payload[1]);
    } else if (action === 'verifyPayrollPIN') {
      result = verifyPayrollPIN(payload[0]);
    } else if (action === 'getSalaryMasterList') {
      result = getSalaryMasterList();
    } else if (action === 'saveSalaryMaster') {
      result = saveSalaryMaster(payload[0], payload[1]);
    } else if (action === 'calculateMonthlyPayroll') {
      result = calculateMonthlyPayroll(payload[0]);
    } else if (action === 'savePayrollRun') {
      result = savePayrollRun(payload[0], payload[1]);
    } else if (action === 'getPersonalPayslip') {
      result = getPersonalPayslip(payload[0], payload[1]);
    } else if (action === 'getLoansList') {
      result = getLoansList();
    } else if (action === 'saveLoan') {
      result = saveLoan(payload[0], payload[1], payload[2], payload[3]);
    } else if (action === 'submitTukarShift') {
      result = submitTukarShift(payload[0], payload[1], payload[2], payload[3], payload[4], payload[5], payload[6]);
    } else if (action === 'respondTukarShiftRekan') {
      result = respondTukarShiftRekan(payload[0], payload[1], payload[2]);
    } else if (action === 'approveTukarShiftHOD') {
      result = approveTukarShiftHOD(payload[0], payload[1], payload[2], payload[3]);
    } else if (action === 'getTukarShiftData') {
      result = getTukarShiftData(payload[0]);
    } else {
      result = { success: false, message: 'Action API tidak dikenal.' };
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    const errorRes = { success: false, message: 'Server API Error: ' + err.toString() };
    return ContentService.createTextOutput(JSON.stringify(errorRes))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function setupDatabase() {
  authorizeDrive();

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) return;
  
  const schema = {
    [CONFIG.SHEET_KARYAWAN]: [
      'nik', 'nama', 'no_telp', 'password', 'role', 
      'status_karyawan', 'no_identitas', 'alamat', 'status_kawin', 
      'departemen', 'jabatan', 'tgl_masuk', 'tgl_lahir', 'bank', 'no_rekening', 
      'foto', 'kuota_cuti_tahunan', 'sisa_cuti_tahunan', 'status_akun', 'status_kerja', 'tgl_resign',
      'device_id'
    ],
    [CONFIG.SHEET_SHIFT]: [
      'id_shift', 'nama_shift', 'jam_masuk', 'jam_pulang', 'toleransi_terlambat_menit'
    ],
    [CONFIG.SHEET_DEPARTEMEN]: [
      'id_departemen', 'nama_departemen'
    ],
    [CONFIG.SHEET_ABSENSI]: [
      'id_absen', 'nik', 'tanggal', 'jam_masuk', 'lat_masuk', 
      'long_masuk', 'jam_pulang', 'lat_pulang', 'long_pulang', 'status', 'keterlambatan_menit'
    ],
    [CONFIG.SHEET_IZIN]: [
      'id_izin', 'nik', 'tanggal_mulai', 'tanggal_selesai', 
      'jumlah_hari', 'jenis', 'alasan', 'status_persetujuan', 'alasan_penolakan'
    ],
    [CONFIG.SHEET_KPI]: [
      'id_kpi', 'nik', 'bulan_tahun', 'total_hadir', 
      'total_terlambat', 'total_menit_terlambat', 'total_izin', 'skor_kpi_persen', 'predikat'
    ],
    [CONFIG.SHEET_PENGUMUMAN]: [
      'id_pengumuman', 'tanggal_post', 'judul', 'isi_pengumuman', 'foto_pengumuman', 'pembuat', 'status_aktif'
    ],
    [CONFIG.SHEET_PENGATURAN]: [
      'koordinat_kantor_lat', 'koordinat_kantor_long', 'radius_meter', 'qr_secret_code', 'default_kuota_cuti', 'pin_payroll', 'rate_denda_per_menit_default'
    ],
    [CONFIG.SHEET_ROSTER]: [
      'id_roster', 'nik', 'tanggal', 'id_shift', 'status_hari'
    ],
    [CONFIG.SHEET_EDIT_PROFIL]: [
      'id_pengajuan', 'nik', 'nama', 'no_telp', 'no_identitas', 'alamat', 'status_kawin', 'bank', 'no_rekening', 'foto', 'tanggal_pengajuan', 'status_persetujuan', 'password_baru'
    ],
    [CONFIG.SHEET_GAJI_MASTER]: [
      'nik', 'gaji_pokok', 'tunjangan_jabatan', 'tunjangan_makan', 'tunjangan_transport', 'rate_denda_per_menit', 'bpjs_tk_aktif', 'bpjs_kes_aktif', 'mode_prorate'
    ],
    [CONFIG.SHEET_PAYROLL_BULANAN]: [
      'id_payroll', 'nik', 'bulan_tahun', 'total_hadir', 'total_menit_terlambat', 'gaji_pokok', 'tunjangan', 'upah_lembur', 'service_charge', 'bpjs_tk', 'bpjs_kes', 'potongan_pinjaman', 'denda_terlambat', 'thp_bersih', 'tanggal_transfer', 'status_bayar'
    ],
    [CONFIG.SHEET_PINJAMAN]: [
      'id_pinjaman', 'nik', 'tanggal_pinjam', 'total_pinjaman', 'cicilan_per_bulan', 'sisa_pinjaman', 'status_lunas'
    ],
    [CONFIG.SHEET_TUKAR_SHIFT]: [
      'id_tukar', 'nik_pengaju', 'nama_pengaju', 'tanggal_pengaju', 'shift_pengaju',
      'nik_tujuan', 'nama_tujuan', 'tanggal_tujuan', 'shift_tujuan', 'departemen',
      'alasan', 'status', 'catatan_hod', 'created_at'
    ]
  };

  Object.keys(schema).forEach(sheetName => {
    let sheet = ss.getSheetByName(sheetName);
    const expectedHeaders = schema[sheetName];

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(expectedHeaders);
    } else {
      sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    }

    const headerRange = sheet.getRange(1, 1, 1, expectedHeaders.length);
    headerRange.setFontWeight('bold')
               .setBackground('#1E3A8A')
               .setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  });

  seedInitialData(ss);

  const sheetPengaturan = ss.getSheetByName(CONFIG.SHEET_PENGATURAN);
  if (sheetPengaturan) {
    sheetPengaturan.getRange('A2:B2').setNumberFormat('@');
    const data = sheetPengaturan.getDataRange().getDisplayValues();
    if (data.length > 1) {
      let latVal = data[1][0];
      let longVal = data[1][1];

      if (latVal === '-297.491' || latVal === '-297,491') latVal = '-0.297491';
      if (longVal === '100.368.819' || longVal === '100,368819') longVal = '100.368819';

      sheetPengaturan.getRange(2, 1).setValue("'" + latVal);
      sheetPengaturan.getRange(2, 2).setValue("'" + longVal);
    }
  }

  SpreadsheetApp.flush();
  Logger.log('Inisialisasi & Safe Migrate Database Balcone Resort Berhasil!');
}

function seedInitialData(ss) {
  const sheetPengaturan = ss.getSheetByName(CONFIG.SHEET_PENGATURAN);
  sheetPengaturan.getRange('A2:B2').setNumberFormat('@');
  if (sheetPengaturan.getLastRow() <= 1) {
    sheetPengaturan.appendRow(["'-0.297491", "'100.368819", "150", "BALCONE-QR-2026", "12", "123456", "1000"]);
  }

  const sheetShift = ss.getSheetByName(CONFIG.SHEET_SHIFT);
  if (sheetShift.getLastRow() <= 1) {
    sheetShift.appendRow(['SFT-01', 'Shift Pagi', '08:00', '17:00', '15']);
    sheetShift.appendRow(['SFT-02', 'Shift Middle', '12:00', '21:00', '15']);
    sheetShift.appendRow(['SFT-03', 'Shift Malam', '22:00', '07:00', '10']);
  }

  const sheetDept = ss.getSheetByName(CONFIG.SHEET_DEPARTEMEN);
  if (sheetDept.getLastRow() <= 1) {
    const initialDepts = [
      ['DPT-01', 'Front Office'],
      ['DPT-02', 'Housekeeping'],
      ['DPT-03', 'Engineering'],
      ['DPT-04', 'FB Service'],
      ['DPT-05', 'FB Product'],
      ['DPT-06', 'HRD Dept'],
      ['DPT-07', 'Accounting'],
      ['DPT-08', 'Sales & Marketing']
    ];
    initialDepts.forEach(d => sheetDept.appendRow(d));
  }

  const sheetKaryawan = ss.getSheetByName(CONFIG.SHEET_KARYAWAN);
  const updatedData = sheetKaryawan.getDataRange().getDisplayValues();
  let hasAdmin = false;
  for (let i = 1; i < updatedData.length; i++) {
    const role = updatedData[i][4];
    const userTelp = updatedData[i][2];
    if (role === 'Admin HR' || role === 'Admin' || userTelp.toLowerCase() === 'admin') {
      hasAdmin = true;
      break;
    }
  }

  if (!hasAdmin) {
    sheetKaryawan.appendRow([
      'NIK-0000', 'Admin HR Balcone', 'Admin', 'Admin', 'Admin HR', 
      'PKWTT', '1234567890123456', 'Bukittinggi, Sumatra Barat', 'K/1', 
      'HRD Dept', 'HR Manager', '2022-01-01', '1990-01-01', 'BCA', '123456789', 
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', '12', '12', 'Approved', 'Aktif', ''
    ]);
  }

  if (sheetKaryawan.getLastRow() <= 1) {
    sheetKaryawan.appendRow([
      'NIK-0002', 'Budi Santoso', "'081987654321", '123456', 'Karyawan', 
      'PKWT', '3201234567890001', 'Jl. Raya Bukittinggi No. 45', 'TK/0', 
      'Front Office', 'Receptionist', '2023-05-10', '1998-05-15', 'Mandiri', '987654321', 
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', '12', '10', 'Approved', 'Aktif', ''
    ]);
  }

  const sheetGajiMaster = ss.getSheetByName(CONFIG.SHEET_GAJI_MASTER);
  if (sheetGajiMaster.getLastRow() <= 1) {
    sheetGajiMaster.appendRow(['NIK-0002', '3500000', '500000', '300000', '200000', '1000', 'Ya', 'Ya', 'Otomatis']);
  }

  const sheetPengumuman = ss.getSheetByName(CONFIG.SHEET_PENGUMUMAN);
  if (sheetPengumuman.getLastRow() <= 1) {
    const todayStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd/MM/yyyy');
    sheetPengumuman.appendRow([
      'PGM-001', todayStr, 'Selamat Datang di Portal Mading Digital Balcone Resort', 
      'Seluruh karyawan diwajibkan melakukan scan QR Code Pass & Verifikasi GPS saat jam masuk dan pulang kerja.', 
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
      'Admin HR', 'Aktif'
    ]);
  }
}

function getIndonesianHolidaysMap(startDate, endDate) {
  const holidaysMap = {};
  try {
    const calIds = [
      'id.indonesian#holiday@group.v.calendar.google.com',
      'en.indonesian#holiday@group.v.calendar.google.com'
    ];
    
    let cal = null;
    for (let i = 0; i < calIds.length; i++) {
      try {
        cal = CalendarApp.getCalendarById(calIds[i]);
        if (cal) break;
      } catch (e) {
        // Continue if unauthorized
      }
    }

    if (cal) {
      const events = cal.getEvents(startDate, endDate);
      events.forEach(evt => {
        const eventDateStr = Utilities.formatDate(evt.getStartTime(), 'Asia/Jakarta', 'yyyy-MM-dd');
        holidaysMap[eventDateStr] = evt.getTitle();
      });
    }
  } catch (err) {
    Logger.log('Gagal mengambil kalender libur nasional Google: ' + err.toString());
  }
  return holidaysMap;
}

function authorizeDrive() {
  try {
    const folderName = 'Balcone_Foto_Karyawan';
    const folders = DriveApp.getFoldersByName(folderName);
    let folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (err) {
    Logger.log('Error Otorisasi Drive: ' + err.toString());
  }
}

/**
 * Safe Data Reader - Menjamin tidak pernah return null/throw exception
 */
function getSheetData(sheetName) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return [];
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return [];
    return sheet.getDataRange().getDisplayValues() || [];
  } catch (err) {
    Logger.log('Error getSheetData(' + sheetName + '): ' + err.toString());
    return [];
  }
}

/**
 * Safe Object Array Reader - Mencegah TypeError saat iterasi
 */
function getSheetDataAsObjects(sheetName) {
  try {
    const data = getSheetData(sheetName);
    if (!data || data.length <= 1) return [];
    const headers = data[0];
    const rows = data.slice(1);
    return rows.map(row => {
      let obj = {};
      headers.forEach((header, index) => {
        obj[header] = (row && row[index] !== undefined) ? row[index] : '';
      });
      return obj;
    });
  } catch (err) {
    Logger.log('Error getSheetDataAsObjects(' + sheetName + '): ' + err.toString());
    return [];
  }
}

function parseDateStrToDate(dateStr) {
  if (!dateStr) return null;
  dateStr = dateStr.toString().trim();
  let year, month, day;
  if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts[0].length === 4) {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      day = parseInt(parts[2], 10);
    } else {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      year = parseInt(parts[2], 10);
    }
  } else if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts[0].length === 4) {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      day = parseInt(parts[2], 10);
    } else {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      year = parseInt(parts[2], 10);
    }
  } else {
    return new Date(dateStr);
  }
  return new Date(year, month, day);
}

function getCutoffRange(monthYearStr) {
  let year, month;
  if (monthYearStr && monthYearStr.includes('-')) {
    const parts = monthYearStr.split('-');
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
  } else if (monthYearStr && monthYearStr.includes('/')) {
    const parts = monthYearStr.split('/');
    month = parseInt(parts[0], 10);
    year = parseInt(parts[1], 10);
  } else {
    const now = new Date();
    year = now.getFullYear();
    month = now.getMonth() + 1;
  }

  let prevYear = year;
  let prevMonth = month - 1;
  if (prevMonth === 0) {
    prevMonth = 12;
    prevYear = year - 1;
  }

  const startDate = new Date(prevYear, prevMonth - 1, 26, 0, 0, 0);
  const endDate = new Date(year, month - 1, 25, 23, 59, 59);

  return {
    startDate: startDate,
    endDate: endDate,
    startIsoStr: Utilities.formatDate(startDate, 'Asia/Jakarta', 'yyyy-MM-dd'),
    endIsoStr: Utilities.formatDate(endDate, 'Asia/Jakarta', 'yyyy-MM-dd')
  };
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function generateNIK() {
  const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN);
  let maxSeq = 0;
  employees.forEach(e => {
    if (e.nik && e.nik.indexOf('NIK-') === 0) {
      const seqStr = e.nik.replace('NIK-', '');
      const seqNum = parseInt(seqStr, 10);
      if (!isNaN(seqNum) && seqNum > maxSeq) {
        maxSeq = seqNum;
      }
    }
  });
  return 'NIK-' + (maxSeq + 1).toString().padStart(4, '0');
}

function generateDailyId(prefix, sheetName) {
  const today = new Date();
  const dateStr = Utilities.formatDate(today, 'Asia/Jakarta', 'yyyyMMdd');
  const fullPrefix = prefix + '-' + dateStr + '-';
  const data = getSheetData(sheetName);
  let maxSeq = 0;
  
  for (let i = 1; i < data.length; i++) {
    const id = data[i][0];
    if (id && id.indexOf(fullPrefix) === 0) {
      const seqNum = parseInt(id.replace(fullPrefix, ''), 10);
      if (!isNaN(seqNum) && seqNum > maxSeq) maxSeq = seqNum;
    }
  }
  return fullPrefix + (maxSeq + 1).toString().padStart(4, '0');
}

function sanitizePhone(phone) {
  if (!phone) return '';
  let str = phone.toString().trim();
  if (/[a-zA-Z]/.test(str)) {
    return str;
  }
  let cleaned = str.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('62')) {
    cleaned = '0' + cleaned.substring(2);
  } else if (cleaned.length > 0 && !cleaned.startsWith('0')) {
    cleaned = '0' + cleaned;
  }
  return cleaned;
}

function uploadFotoToDrive(base64Data, filename) {
  try {
    if (!base64Data || typeof base64Data !== 'string' || !base64Data.includes('base64,')) {
      return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
    }

    const parts = base64Data.split('base64,');
    const header = parts[0];
    const rawBase64 = parts[1];
    
    let contentType = 'image/jpeg';
    if (header.includes('image/png')) contentType = 'image/png';
    else if (header.includes('image/webp')) contentType = 'image/webp';

    const decoded = Utilities.base64Decode(rawBase64);
    const blob = Utilities.newBlob(decoded, contentType, filename);

    const folderName = 'Balcone_Foto_Karyawan';
    const folders = DriveApp.getFoldersByName(folderName);
    let folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
      folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    }

    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    const fileId = file.getId();
    return 'https://lh3.googleusercontent.com/d/' + fileId;
  } catch (err) {
    Logger.log('Gagal upload foto ke Drive: ' + err.toString());
    return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
  }
}

function getTodayBirthdaysList() {
  try {
    const todayDate = new Date();
    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    
    return employees.filter(e => {
      if (!e || e.status_akun !== 'Approved' || e.status_kerja === 'Resign' || !e.tgl_lahir) return false;
      const bDate = parseDateStrToDate(e.tgl_lahir);
      if (!bDate) return false;
      return (bDate.getDate() === todayDate.getDate() && bDate.getMonth() === todayDate.getMonth());
    }).map(e => ({
      nik: e.nik,
      nama: e.nama,
      departemen: e.departemen,
      jabatan: e.jabatan || '',
      foto: e.foto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      no_telp: e.no_telp || ''
    }));
  } catch (err) {
    Logger.log('Error getTodayBirthdaysList: ' + err.toString());
    return [];
  }
}

function resetDeviceLock(nik) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetKaryawan = ss.getSheetByName(CONFIG.SHEET_KARYAWAN);
    if (!sheetKaryawan) return { success: false, message: 'Sheet karyawan tidak ditemukan.' };

    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN);
    const index = employees.findIndex(e => e.nik === nik);
    if (index === -1) return { success: false, message: 'Karyawan dengan NIK ' + nik + ' tidak ditemukan.' };

    const headers = sheetKaryawan.getRange(1, 1, 1, Math.max(sheetKaryawan.getLastColumn(), 22)).getDisplayValues()[0];
    let devColIndex = headers.indexOf('device_id');
    if (devColIndex === -1) {
      devColIndex = 21;
      sheetKaryawan.getRange(1, 22).setValue('device_id');
    }

    const rowNum = index + 2;
    sheetKaryawan.getRange(rowNum, devColIndex + 1).setValue('');
    SpreadsheetApp.flush();

    return { 
      success: true, 
      message: 'Kunci perangkat karyawan ' + employees[index].nama + ' (' + nik + ') berhasil direset! Karyawan sekarang dapat login di perangkat baru.' 
    };
  } catch (err) {
    return { success: false, message: 'Gagal mereset perangkat: ' + err.toString() };
  }
}

function loginUser(noTelp, password, clientDeviceId) {
  try {
    const inputStr = (noTelp || '').toString().trim();
    const cleanedInputPhone = sanitizePhone(inputStr);
    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    
    let userIndex = -1;
    const user = employees.find((e, idx) => {
      if (!e) return false;
      const dbPhone = sanitizePhone(e.no_telp);
      const matchPhone = dbPhone.toLowerCase() === cleanedInputPhone.toLowerCase();
      const matchUsername = (e.no_telp && e.no_telp.toString().trim().toLowerCase() === inputStr.toLowerCase()) ||
                            (e.nama && e.nama.toString().trim().toLowerCase() === inputStr.toLowerCase()) ||
                            (e.nik && e.nik.toString().trim().toLowerCase() === inputStr.toLowerCase());
      const matchPass = (e.password === password);
      
      if ((matchPhone || matchUsername) && matchPass) {
        userIndex = idx;
        return true;
      }
      return false;
    });

    if (!user) {
      return { success: false, message: 'No. Telepon / Username atau Password salah.' };
    }

    if (user.status_akun === 'Pending') {
      return { 
        success: false, 
        message: 'Akun Anda sedang menunggu persetujuan dari Admin HR. Silakan hubungi Tim HRD.' 
      };
    } else if (user.status_akun === 'Rejected') {
      return { 
        success: false, 
        message: 'Pengajuan akun Anda ditolak oleh Admin HR.' 
      };
    }

    // Normalisasi Role Admin agar konsisten di frontend
    let userRole = user.role || 'Karyawan';
    if (userRole.toLowerCase().includes('admin')) {
      userRole = 'Admin HR';
    }

    // Single Device Locking Logic (Kecuali Admin & HOD)
    const isExemptRole = (userRole === 'Admin HR' || userRole === 'Admin' || userRole === 'HOD');
    if (!isExemptRole && clientDeviceId) {
      const registeredDevice = (user.device_id || '').toString().trim();
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheetKaryawan = ss.getSheetByName(CONFIG.SHEET_KARYAWAN);

      // Jika kolom device_id belum ada / kosong -> Kunci perangkat pertama kali
      if (!registeredDevice) {
        if (sheetKaryawan && userIndex !== -1) {
          const rowNum = userIndex + 2;
          const headers = sheetKaryawan.getRange(1, 1, 1, Math.max(sheetKaryawan.getLastColumn(), 22)).getDisplayValues()[0];
          let devColIndex = headers.indexOf('device_id');
          if (devColIndex === -1) {
            devColIndex = 21;
            sheetKaryawan.getRange(1, 22).setValue('device_id');
          }
          sheetKaryawan.getRange(rowNum, devColIndex + 1).setNumberFormat('@').setValue(clientDeviceId);
          SpreadsheetApp.flush();
        }
      } else if (registeredDevice !== clientDeviceId) {
        // Perangkat tidak cocok
        return {
          success: false,
          isDeviceLocked: true,
          message: 'Akses Ditolak: Akun Anda sudah terdaftar di perangkat lain. Silakan hubungi Admin HR untuk membuka kunci perangkat Anda.'
        };
      }
    }

    return {
      success: true,
      user: {
        nik: user.nik,
        nama: user.nama,
        no_telp: user.no_telp,
        no_identitas: user.no_identitas || '',
        alamat: user.alamat || '',
        status_kawin: user.status_kawin || 'TK/0',
        bank: user.bank || 'Mandiri',
        no_rekening: user.no_rekening || '',
        role: userRole,
        departemen: user.departemen,
        jabatan: user.jabatan,
        status_karyawan: user.status_karyawan,
        status_kerja: user.status_kerja || 'Aktif',
        tgl_resign: user.tgl_resign || '',
        tgl_lahir: user.tgl_lahir || '-',
        foto: user.foto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        kuota_cuti_tahunan: user.kuota_cuti_tahunan,
        sisa_cuti_tahunan: user.sisa_cuti_tahunan,
        device_id: user.device_id || clientDeviceId || ''
      }
    };
  } catch (err) {
    return { success: false, message: 'Terjadi kesalahan sistem: ' + err.toString() };
  }
}

function registerKaryawan(formData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetKaryawan = ss.getSheetByName(CONFIG.SHEET_KARYAWAN);
    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN);
    
    const formattedPhone = sanitizePhone(formData.no_telp);

    const isExist = employees.some(e => sanitizePhone(e.no_telp) === formattedPhone);
    if (isExist) {
      return { success: false, message: 'Nomor Telepon ' + formattedPhone + ' sudah terdaftar!' };
    }

    const newNIK = generateNIK();
    const phoneToStore = "'" + formattedPhone;

    let fotoProfilUrl = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
    if (formData.foto && formData.foto.includes('base64,')) {
      fotoProfilUrl = uploadFotoToDrive(formData.foto, newNIK + '_Foto');
    }

    sheetKaryawan.appendRow([
      newNIK,
      formData.nama,
      phoneToStore,
      formData.password,
      formData.role || 'Karyawan',
      formData.status_karyawan,
      formData.no_identitas,
      formData.alamat,
      formData.status_kawin,
      formData.departemen,
      formData.jabatan,
      formData.tgl_masuk,
      formData.tgl_lahir,
      formData.bank,
      formData.no_rekening,
      fotoProfilUrl,
      '12',
      '12',
      'Pending',
      'Aktif',
      ''
    ]);

    const sheetGajiMaster = ss.getSheetByName(CONFIG.SHEET_GAJI_MASTER);
    sheetGajiMaster.appendRow([newNIK, '3000000', '0', '0', '0', '1000', 'Ya', 'Ya', 'Otomatis']);

    SpreadsheetApp.flush();
    return {
      success: true,
      nik: newNIK,
      message: 'Pendaftaran Berhasil! NIK Anda: ' + newNIK + '. Akun Anda menunggu persetujuan Admin HR.'
    };
  } catch (err) {
    return { success: false, message: 'Gagal melakukan pendaftaran: ' + err.toString() };
  }
}

function setEmployeeResign(nik, tglResign, statusKerja) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_KARYAWAN);
    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN);
    const index = employees.findIndex(e => e.nik === nik);

    if (index === -1) return { success: false, message: 'Data karyawan tidak ditemukan.' };

    const rowNum = index + 2;
    sheet.getRange(rowNum, 20).setValue(statusKerja || 'Resign');
    sheet.getRange(rowNum, 21).setValue(tglResign || '');

    SpreadsheetApp.flush();
    return { 
      success: true, 
      message: 'Status kerja karyawan ' + nik + ' diperbarui menjadi: ' + (statusKerja || 'Resign') + ' (Tgl: ' + (tglResign || '-') + ')' 
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function processAbsensi(nik, userLat, userLong, qrSecretCode, actionType) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetSettings = ss.getSheetByName(CONFIG.SHEET_PENGATURAN);
    const settings = sheetSettings.getDataRange().getDisplayValues()[1] || ['-0.297491', '100.368819', '150', 'BALCONE-QR-2026', '12', '123456', '1000'];
    
    let kantorLatStr = settings[0].toString().trim().replace(',', '.');
    let kantorLongStr = settings[1].toString().trim().replace(',', '.');
    
    if (kantorLatStr === '-297.491') kantorLatStr = '-0.297491';
    if (kantorLongStr === '100.368.819') kantorLongStr = '100.368819';

    const kantorLat = parseFloat(kantorLatStr);
    const kantorLong = parseFloat(kantorLongStr);
    const maxRadius = parseFloat(settings[2]);
    const validQrSecret = settings[3];

    if (qrSecretCode !== validQrSecret) {
      return { success: false, message: 'QR Code Kantor tidak valid!' };
    }

    const distance = haversineDistance(parseFloat(userLat), parseFloat(userLong), kantorLat, kantorLong);
    if (distance > maxRadius) {
      return { 
        success: false, 
        message: 'Posisi Anda di luar radius aman area The Balcone! Jarak Anda: ' + distance + 'm (Maks: ' + maxRadius + 'm)' 
      };
    }

    const todayDate = new Date();
    const todayStr = Utilities.formatDate(todayDate, 'Asia/Jakarta', 'dd/MM/yyyy');
    const isoTodayStr = Utilities.formatDate(todayDate, 'Asia/Jakarta', 'yyyy-MM-dd');
    const timeStr = Utilities.formatDate(todayDate, 'Asia/Jakarta', 'HH:mm:ss');
    
    const yesterdayDate = new Date(todayDate.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = Utilities.formatDate(yesterdayDate, 'Asia/Jakarta', 'dd/MM/yyyy');

    const rosterList = getSheetDataAsObjects(CONFIG.SHEET_ROSTER);
    const userRosterToday = rosterList.find(r => r.nik === nik && (r.tanggal === isoTodayStr || r.tanggal === todayStr));

    let activeShift = null;
    const shifts = getSheetDataAsObjects(CONFIG.SHEET_SHIFT);

    if (actionType === 'MASUK') {
      if (userRosterToday) {
        const shiftVal = userRosterToday.id_shift || userRosterToday.status_hari;
        if (['OFF', 'CT', 'PH', 'EO', 'S', 'I', 'CK'].includes(shiftVal)) {
          const labelMap = {
            'OFF': 'OFF (Libur)',
            'CT': 'Cuti Tahunan (CT)',
            'PH': 'Publik Holiday (PH)',
            'EO': 'Extra Off (EO)',
            'S': 'Sakit (S)',
            'I': 'Izin (I)',
            'CK': 'Cuti Khusus (CK)'
          };
          return { success: false, message: 'Hari ini jadwal Anda adalah ' + (labelMap[shiftVal] || shiftVal) + ' pada Roster Shift.' };
        }
        activeShift = shifts.find(s => s.id_shift === userRosterToday.id_shift);
      }

      if (!activeShift) {
        activeShift = shifts[0] || { jam_masuk: '08:00', toleransi_terlambat_menit: '15' };
      }
    }

    const sheetAbsensi = ss.getSheetByName(CONFIG.SHEET_ABSENSI);
    const absensiData = getSheetDataAsObjects(CONFIG.SHEET_ABSENSI);
    const existingIndex = absensiData.findIndex(a => a.nik === nik && a.tanggal === todayStr);

    const formattedUserLat = "'" + userLat.toString();
    const formattedUserLong = "'" + userLong.toString();

    if (actionType === 'MASUK') {
      if (existingIndex !== -1 && absensiData[existingIndex].jam_masuk !== '') {
        return { success: false, message: 'Anda sudah melakukan Absen Masuk hari ini!' };
      }

      let lateMinutes = 0;
      let status = 'Tepat Waktu';
      
      const [scheduleHour, scheduleMin] = activeShift.jam_masuk.split(':').map(Number);
      const now = new Date();
      const scheduleTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), scheduleHour, scheduleMin, 0);
      const toleranceMs = parseInt(activeShift.toleransi_terlambat_menit || '15', 10) * 60 * 1000;
      
      if (now.getTime() > scheduleTime.getTime() + toleranceMs) {
        lateMinutes = Math.round((now.getTime() - scheduleTime.getTime()) / 60000);
        status = 'Terlambat';

        // Cek dispensasi jika ada izin jam-jaman yang disetujui HOD/HRD untuk hari ini
        const allIzinData = getSheetDataAsObjects(CONFIG.SHEET_IZIN) || [];
        const approvedIzinJam = allIzinData.find(iz => 
          iz && iz.nik === nik && 
          (iz.tanggal_mulai === isoTodayStr || iz.tanggal_mulai === todayStr) &&
          (iz.status_persetujuan === 'Approved' || iz.status_persetujuan === 'Approved_HOD') &&
          (iz.jenis || '').toString().toLowerCase().includes('jam')
        );

        if (approvedIzinJam) {
          status = 'Dispensasi Izin';
          lateMinutes = 0; // Bebas potongan denda keterlambatan!
        }
      }

      if (existingIndex !== -1) {
        const rowNum = existingIndex + 2;
        sheetAbsensi.getRange(rowNum, 4).setValue(timeStr);
        sheetAbsensi.getRange(rowNum, 5).setNumberFormat('@').setValue(formattedUserLat);
        sheetAbsensi.getRange(rowNum, 6).setNumberFormat('@').setValue(formattedUserLong);
        sheetAbsensi.getRange(rowNum, 10).setValue(status);
        sheetAbsensi.getRange(rowNum, 11).setValue(lateMinutes.toString());
      } else {
        const newId = generateDailyId('ABS', CONFIG.SHEET_ABSENSI);
        sheetAbsensi.appendRow([
          newId, nik, todayStr, timeStr, formattedUserLat, formattedUserLong, '', '', '', status, lateMinutes.toString()
        ]);
      }

      SpreadsheetApp.flush();
      return { success: true, message: 'Absen Masuk Berhasil! Status: ' + status + ' (' + timeStr + ')' };

    } else if (actionType === 'PULANG') {
      let targetIndex = absensiData.findIndex(a => a.nik === nik && a.tanggal === todayStr && a.jam_masuk !== '' && a.jam_pulang === '');
      let isOvernightSession = false;

      if (targetIndex === -1) {
        targetIndex = absensiData.findIndex(a => a.nik === nik && a.tanggal === yesterdayStr && a.jam_masuk !== '' && a.jam_pulang === '');
        if (targetIndex !== -1) {
          isOvernightSession = true;
        }
      }

      if (targetIndex === -1) {
        const alreadyOutToday = absensiData.some(a => a.nik === nik && a.tanggal === todayStr && a.jam_pulang !== '');
        if (alreadyOutToday) {
          return { success: false, message: 'Anda sudah melakukan Absen Pulang hari ini!' };
        }
        return { success: false, message: 'Anda belum Absen Masuk untuk sesi shift ini!' };
      }

      const rowNum = targetIndex + 2;
      sheetAbsensi.getRange(rowNum, 7).setValue(timeStr);
      sheetAbsensi.getRange(rowNum, 8).setNumberFormat('@').setValue(formattedUserLat);
      sheetAbsensi.getRange(rowNum, 9).setNumberFormat('@').setValue(formattedUserLong);

      SpreadsheetApp.flush();

      const sessionDate = absensiData[targetIndex].tanggal;
      const successMsg = isOvernightSession
        ? 'Absen Pulang Berhasil! Sesi Shift Malam (' + sessionDate + ') telah diselesaikan (' + timeStr + '). Terima kasih!'
        : 'Absen Pulang Berhasil! Terima kasih (' + timeStr + ')';

      return { success: true, message: successMsg };
    }

  } catch (err) {
    return { success: false, message: 'Gagal memproses absensi: ' + err.toString() };
  }
}

function getKaryawanDashboard(nik, monthYear) {
  try {
    const todayDate = new Date();
    const todayStr = Utilities.formatDate(todayDate, 'Asia/Jakarta', 'dd/MM/yyyy');
    const isoTodayStr = Utilities.formatDate(todayDate, 'Asia/Jakarta', 'yyyy-MM-dd');
    
    const yesterdayDate = new Date(todayDate.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = Utilities.formatDate(yesterdayDate, 'Asia/Jakarta', 'dd/MM/yyyy');

    const absensi = getSheetDataAsObjects(CONFIG.SHEET_ABSENSI) || [];
    let todayRecord = absensi.find(a => a.nik === nik && a.tanggal === todayStr) || null;
    
    if (!todayRecord) {
      const pendingYesterday = absensi.find(a => a.nik === nik && a.tanggal === yesterdayStr && a.jam_masuk !== '' && a.jam_pulang === '');
      if (pendingYesterday) {
        todayRecord = Object.assign({}, pendingYesterday);
        todayRecord.isOvernightActive = true;
      }
    }
    
    const personalHistory = absensi
      .filter(a => a.nik === nik)
      .reverse()
      .slice(0, 10);

    const announcements = (getSheetDataAsObjects(CONFIG.SHEET_PENGUMUMAN) || [])
      .filter(p => p.status_aktif && p.status_aktif.toString().trim().toLowerCase() === 'aktif')
      .reverse();

    const leaveHistory = (getSheetDataAsObjects(CONFIG.SHEET_IZIN) || [])
      .filter(i => i.nik === nik)
      .reverse();

    const rosterList = getSheetDataAsObjects(CONFIG.SHEET_ROSTER) || [];
    const shifts = getSheetDataAsObjects(CONFIG.SHEET_SHIFT) || [];

    let currentMonthStr = monthYear;
    if (!currentMonthStr) {
      let year = todayDate.getFullYear();
      let month = todayDate.getMonth() + 1;
      if (todayDate.getDate() >= 26) {
        month += 1;
        if (month > 12) {
          month = 1;
          year += 1;
        }
      }
      currentMonthStr = year + '-' + String(month).padStart(2, '0');
    }

    const cutOff = getCutoffRange(currentMonthStr);
    const holidaysMap = getIndonesianHolidaysMap(cutOff.startDate, cutOff.endDate);

    const personalRosterWithDetails = [];
    let curDate = new Date(cutOff.startDate);
    const endDate = new Date(cutOff.endDate);

    while (curDate <= endDate) {
      const isoDate = Utilities.formatDate(curDate, 'Asia/Jakarta', 'yyyy-MM-dd');
      const matched = rosterList.find(r => r && String(r.nik).trim() === String(nik).trim() && r.tanggal === isoDate);
      
      const shiftVal = matched ? (matched.id_shift || matched.status_hari) : 'OFF';
      let shiftName = shiftVal;
      let shiftTime = '';

      if (['OFF', 'CT', 'PH', 'EO', 'S', 'I', 'CK'].includes(shiftVal)) {
        const labelMap = {
          'OFF': 'OFF (Libur)',
          'CT': 'Cuti Tahunan (CT)',
          'PH': 'Publik Holiday (PH)',
          'EO': 'Extra Off (EO)',
          'S': 'Sakit (S)',
          'I': 'Izin (I)',
          'CK': 'Cuti Khusus (CK)'
        };
        shiftName = labelMap[shiftVal] || shiftVal;
      } else {
        const matchedShift = shifts.find(s => s.id_shift === shiftVal);
        if (matchedShift) {
          shiftName = matchedShift.nama_shift || shiftVal;
          if (matchedShift.jam_masuk && matchedShift.jam_pulang) {
            shiftTime = matchedShift.jam_masuk + ' - ' + matchedShift.jam_pulang;
          } else if (matchedShift.jam_masuk) {
            shiftTime = matchedShift.jam_masuk;
          } else {
            shiftTime = '';
          }
        }
      }

      personalRosterWithDetails.push({
        id_roster: matched ? matched.id_roster : ('OFF-' + isoDate),
        tanggal: isoDate,
        id_shift: shiftVal,
        status_hari: matched ? (matched.status_hari || shiftVal) : 'OFF',
        shift_nama: shiftName,
        shift_jam: shiftTime
      });

      curDate.setDate(curDate.getDate() + 1);
    }

    const userRoster = rosterList.find(r => r && String(r.nik).trim() === String(nik).trim() && (r.tanggal === isoTodayStr || r.tanggal === todayStr));
    
    let shiftInfo = 'OFF (Libur)';
    if (userRoster) {
      const shiftVal = userRoster.id_shift || userRoster.status_hari;
      if (['OFF', 'CT', 'PH', 'EO', 'S', 'I', 'CK'].includes(shiftVal)) {
        const labelMap = {
          'OFF': 'OFF (Libur)',
          'CT': 'Cuti Tahunan (CT)',
          'PH': 'Publik Holiday (PH)',
          'EO': 'Extra Off (EO)',
          'S': 'Sakit (S)',
          'I': 'Izin (I)',
          'CK': 'Cuti Khusus (CK)'
        };
        shiftInfo = labelMap[shiftVal] || shiftVal;
      } else {
        const matched = shifts.find(s => s.id_shift === userRoster.id_shift);
        if (matched) {
          const jamStr = (matched.jam_masuk && matched.jam_pulang) ? ' (' + matched.jam_masuk + ' - ' + matched.jam_pulang + ')' : (matched.jam_masuk ? ' (' + matched.jam_masuk + ')' : '');
          shiftInfo = (matched.nama_shift || userRoster.id_shift) + jamStr;
        } else {
          shiftInfo = userRoster.id_shift;
        }
      }
    }

    return {
      success: true,
      todayRecord: todayRecord,
      history: personalHistory,
      announcements: announcements,
      todayShiftInfo: shiftInfo,
      leaveHistory: leaveHistory,
      personalRoster: personalRosterWithDetails,
      holidays: holidaysMap,
      cutoffInfo: {
        startIso: cutOff.startIsoStr,
        endIso: cutOff.endIsoStr
      },
      todayBirthdays: getTodayBirthdaysList()
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function getHODDashboard(nik, departemen) {
  try {
    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    const deptEmployees = employees.filter(e => e && e.departemen === departemen && e.status_akun === 'Approved' && e.nik !== nik);
    
    const allIzin = getSheetDataAsObjects(CONFIG.SHEET_IZIN) || [];
    
    const pendingIzinHOD = allIzin.filter(i => {
      if (!i || (i.status_persetujuan !== 'Pending_HOD' && i.status_persetujuan !== 'Pending')) return false;
      const emp = employees.find(e => e && e.nik === i.nik);
      return emp && emp.departemen === departemen && emp.nik !== nik;
    }).map(i => {
      const emp = employees.find(e => e && e.nik === i.nik) || {};
      return {
        ...i,
        nama_karyawan: emp.nama || 'N/A'
      };
    });

    const deptIzinHistory = allIzin.filter(i => {
      if (!i) return false;
      const emp = employees.find(e => e && e.nik === i.nik);
      return emp && emp.departemen === departemen;
    }).map(i => {
      const emp = employees.find(e => e && e.nik === i.nik) || {};
      return {
        ...i,
        nama_karyawan: emp.nama || 'N/A'
      };
    }).reverse();

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    getOrCreateTukarShiftSheet(ss);
    const allTukar = getSheetDataAsObjects(CONFIG.SHEET_TUKAR_SHIFT) || [];
    const pendingTukarShiftHOD = allTukar.filter(t => t && t.departemen === departemen && t.status === 'Pending_HOD').reverse();

    return {
      success: true,
      deptEmployees: deptEmployees,
      pendingIzinHOD: pendingIzinHOD,
      pendingTukarShiftHOD: pendingTukarShiftHOD,
      deptIzinHistory: deptIzinHistory
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

/**
 * Safe Admin Dashboard Loader
 * Menjamin 100% ketersediaan objek data tanpa memicu Layar Putih / Uncaught TypeError
 */
function getAdminDashboard() {
  try {
    const todayStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd/MM/yyyy');
    
    const absensi = getSheetDataAsObjects(CONFIG.SHEET_ABSENSI) || [];
    const karyawan = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    const izinList = (getSheetDataAsObjects(CONFIG.SHEET_IZIN) || []).reverse();
    const editProfilList = getSheetDataAsObjects(CONFIG.SHEET_EDIT_PROFIL) || [];
    const announcements = (getSheetDataAsObjects(CONFIG.SHEET_PENGUMUMAN) || []).reverse();

    // Memfilter karyawan operasional (Abaikan Admin HR/Admin)
    const operationalEmployees = karyawan.filter(k => {
      if (!k) return false;
      const roleStr = (k.role || '').toString().toLowerCase();
      return !roleStr.includes('admin');
    });

    const todayAbsensi = absensi.filter(a => a && a.tanggal === todayStr);
    const totalHadirToday = todayAbsensi.filter(a => a && (a.status === 'Tepat Waktu' || a.status === 'Terlambat')).length;
    const totalTerlambatToday = todayAbsensi.filter(a => a && a.status === 'Terlambat').length;
    
    const mappedIzinList = izinList.map(i => {
      if (!i) return {};
      const emp = karyawan.find(e => e && e.nik === i.nik) || {};
      return {
        ...i,
        nama: emp.nama || 'N/A',
        departemen: emp.departemen || '-'
      };
    });

    const pendingIzinHRD = mappedIzinList.filter(i => i && (i.status_persetujuan === 'Pending_HRD' || i.status_persetujuan === 'Pending'));
    const pendingKaryawan = karyawan.filter(k => k && k.status_akun === 'Pending');
    const pendingEditProfil = editProfilList.filter(e => e && e.status_persetujuan === 'Pending');

    return {
      success: true,
      stats: {
        totalKaryawan: operationalEmployees.filter(k => k && k.status_akun === 'Approved' && (k.status_kerja !== 'Resign')).length,
        totalHadirToday: totalHadirToday,
        totalTerlambatToday: totalTerlambatToday,
        totalPendingIzin: pendingIzinHRD.length,
        totalPendingKaryawan: pendingKaryawan.length,
        totalPendingEditProfil: pendingEditProfil.length
      },
      pendingIzin: pendingIzinHRD,
      allIzin: mappedIzinList,
      pendingKaryawan: pendingKaryawan,
      pendingEditProfil: pendingEditProfil,
      karyawanList: operationalEmployees,
      announcements: announcements,
      todayBirthdays: getTodayBirthdaysList()
    };
  } catch (err) {
    Logger.log('Error getAdminDashboard: ' + err.toString());
    return { 
      success: false, 
      message: 'Gagal memuat Dashboard Admin: ' + err.toString(),
      stats: { totalKaryawan: 0, totalHadirToday: 0, totalTerlambatToday: 0, totalPendingIzin: 0, totalPendingKaryawan: 0, totalPendingEditProfil: 0 },
      pendingIzin: [],
      allIzin: [],
      pendingKaryawan: [],
      pendingEditProfil: [],
      karyawanList: [],
      announcements: []
    };
  }
}

function verifyPayrollPIN(pinInput) {
  try {
    const settings = (getSheetDataAsObjects(CONFIG.SHEET_PENGATURAN) || [])[0] || {};
    const validPin = settings.pin_payroll || '123456';

    if (pinInput === validPin) {
      return { success: true, message: 'PIN Verifikasi Payroll Valid!' };
    } else {
      return { success: false, message: 'PIN Otorisasi Payroll Salah!' };
    }
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function getSalaryMasterList() {
  try {
    const employees = (getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || []).filter(k => {
      if (!k) return false;
      const roleStr = (k.role || '').toString().toLowerCase();
      return k.status_akun === 'Approved' && !roleStr.includes('admin');
    });
    
    const salaryMasters = getSheetDataAsObjects(CONFIG.SHEET_GAJI_MASTER) || [];

    const result = employees.map(emp => {
      const sal = salaryMasters.find(s => s.nik === emp.nik) || {};
      return {
        nik: emp.nik,
        nama: emp.nama,
        departemen: emp.departemen,
        jabatan: emp.jabatan,
        status_karyawan: emp.status_karyawan,
        status_kerja: emp.status_kerja || 'Aktif',
        tgl_resign: emp.tgl_resign || '',
        gaji_pokok: sal.gaji_pokok || '3000000',
        tunjangan_jabatan: sal.tunjangan_jabatan || '0',
        tunjangan_makan: sal.tunjangan_makan || '0',
        tunjangan_transport: sal.tunjangan_transport || '0',
        rate_denda_per_menit: sal.rate_denda_per_menit || '1000',
        bpjs_tk_aktif: sal.bpjs_tk_aktif || 'Ya',
        bpjs_kes_aktif: sal.bpjs_kes_aktif || 'Ya',
        mode_prorate: sal.mode_prorate || 'Otomatis'
      };
    });

    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function saveSalaryMaster(nik, salaryData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_GAJI_MASTER);
    const masterList = getSheetDataAsObjects(CONFIG.SHEET_GAJI_MASTER) || [];

    const idx = masterList.findIndex(m => m.nik === nik);
    if (idx !== -1) {
      const row = idx + 2;
      sheet.getRange(row, 2).setValue(salaryData.gaji_pokok || '0');
      sheet.getRange(row, 3).setValue(salaryData.tunjangan_jabatan || '0');
      sheet.getRange(row, 4).setValue(salaryData.tunjangan_makan || '0');
      sheet.getRange(row, 5).setValue(salaryData.tunjangan_transport || '0');
      sheet.getRange(row, 6).setValue(salaryData.rate_denda_per_menit || '1000');
      sheet.getRange(row, 7).setValue(salaryData.bpjs_tk_aktif || 'Ya');
      sheet.getRange(row, 8).setValue(salaryData.bpjs_kes_aktif || 'Ya');
      sheet.getRange(row, 9).setValue(salaryData.mode_prorate || 'Otomatis');
    } else {
      sheet.appendRow([
        nik,
        salaryData.gaji_pokok || '0',
        salaryData.tunjangan_jabatan || '0',
        salaryData.tunjangan_makan || '0',
        salaryData.tunjangan_transport || '0',
        salaryData.rate_denda_per_menit || '1000',
        salaryData.bpjs_tk_aktif || 'Ya',
        salaryData.bpjs_kes_aktif || 'Ya',
        salaryData.mode_prorate || 'Otomatis'
      ]);
    }

    SpreadsheetApp.flush();
    return { success: true, message: 'Struktur gaji master karyawan ' + nik + ' berhasil diperbarui!' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function calculateMonthlyPayroll(bulanTahun) {
  try {
    const cutOff = getCutoffRange(bulanTahun);
    let karyawan = (getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || []).filter(k => {
      if (!k) return false;
      const roleStr = (k.role || '').toString().toLowerCase();
      return k.status_akun === 'Approved' && !roleStr.includes('admin');
    });
    
    karyawan = karyawan.filter(emp => {
      if (!emp.tgl_resign || emp.tgl_resign === '') return true;
      return emp.tgl_resign >= cutOff.startIsoStr;
    });

    const salaryMasters = getSheetDataAsObjects(CONFIG.SHEET_GAJI_MASTER) || [];
    const absensi = getSheetDataAsObjects(CONFIG.SHEET_ABSENSI) || [];
    const loans = getSheetDataAsObjects(CONFIG.SHEET_PINJAMAN) || [];
    const existingPayroll = getSheetDataAsObjects(CONFIG.SHEET_PAYROLL_BULANAN) || [];

    const payrollList = karyawan.map(emp => {
      const existingRecord = existingPayroll.find(p => p.nik === emp.nik && p.bulan_tahun === bulanTahun);

      if (existingRecord && existingRecord.status_bayar === 'Paid / Final') {
        return {
          nik: emp.nik,
          nama: emp.nama,
          no_identitas: emp.no_identitas || '-',
          departemen: emp.departemen,
          jabatan: emp.jabatan,
          status_karyawan: emp.status_karyawan,
          bank: emp.bank || 'Mandiri',
          no_rekening: emp.no_rekening || '-',
          bulan_tahun: bulanTahun,
          total_hadir: parseInt(existingRecord.total_hadir || '0', 10),
          total_menit_terlambat: parseInt(existingRecord.total_menit_terlambat || '0', 10),
          gaji_pokok: parseFloat(existingRecord.gaji_pokok || '0'),
          tunjangan: parseFloat(existingRecord.tunjangan || '0'),
          upah_lembur: parseFloat(existingRecord.upah_lembur || '0'),
          service_charge: parseFloat(existingRecord.service_charge || '0'),
          bpjs_tk: parseFloat(existingRecord.bpjs_tk || '0'),
          bpjs_kes: parseFloat(existingRecord.bpjs_kes || '0'),
          potongan_pinjaman: parseFloat(existingRecord.potongan_pinjaman || '0'),
          denda_terlambat: parseFloat(existingRecord.denda_terlambat || '0'),
          thp_bersih: parseFloat(existingRecord.thp_bersih || '0'),
          status_bayar: existingRecord.status_bayar,
          tanggal_transfer: existingRecord.tanggal_transfer || '-'
        };
      }

      const salMaster = salaryMasters.find(s => s.nik === emp.nik) || {
        gaji_pokok: '3000000', tunjangan_jabatan: '0', tunjangan_makan: '0', tunjangan_transport: '0',
        rate_denda_per_menit: '1000', bpjs_tk_aktif: 'Ya', bpjs_kes_aktif: 'Ya', mode_prorate: 'Otomatis'
      };

      const empAbsensi = absensi.filter(a => {
        if (!a || a.nik !== emp.nik || !a.tanggal) return false;
        const parts = a.tanggal.split('/');
        if (parts.length === 3) {
          const recDate = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
          return recDate >= cutOff.startDate && recDate <= cutOff.endDate;
        }
        return false;
      });

      const totalHadir = empAbsensi.filter(a => a.status === 'Tepat Waktu' || a.status === 'Terlambat').length;
      let totalMenitTerlambat = 0;
      empAbsensi.forEach(a => {
        totalMenitTerlambat += parseInt(a.keterlambatan_menit || '0', 10);
      });

      const baseGajiPokok = parseFloat(salMaster.gaji_pokok || '0');
      const tunjJab = parseFloat(salMaster.tunjangan_jabatan || '0');
      const tunjMakan = parseFloat(salMaster.tunjangan_makan || '0');
      const tunjTransport = parseFloat(salMaster.tunjangan_transport || '0');
      const baseTotalTunjangan = tunjJab + tunjMakan + tunjTransport;

      const modeProrate = salMaster.mode_prorate || 'Otomatis';
      let isProrateApplied = false;

      if (modeProrate === 'Paksa Prorate') {
        isProrateApplied = true;
      } else if (modeProrate === 'Paksa Full (100%)') {
        isProrateApplied = false;
      } else {
        const isNewEmployeeInCutoff = emp.tgl_masuk && emp.tgl_masuk > cutOff.startIsoStr && emp.tgl_masuk <= cutOff.endIsoStr;
        const isResignInCutoff = emp.tgl_resign && emp.tgl_resign >= cutOff.startIsoStr && emp.tgl_resign <= cutOff.endIsoStr;
        if (isNewEmployeeInCutoff || isResignInCutoff) {
          isProrateApplied = true;
        }
      }

      const targetHariKerja = 26;
      const prorateRatio = isProrateApplied ? Math.min(1, totalHadir / targetHariKerja) : 1;

      let gantiGajiPokok = baseGajiPokok;
      let totalTunjangan = baseTotalTunjangan;

      if (emp.status_karyawan === 'DW' || emp.status_karyawan === 'Casual') {
        gantiGajiPokok = baseGajiPokok * totalHadir;
        totalTunjangan = baseTotalTunjangan;
      } else if (isProrateApplied) {
        gantiGajiPokok = Math.round(baseGajiPokok * prorateRatio);
        totalTunjangan = Math.round(baseTotalTunjangan * prorateRatio);
      }

      const upahLembur = 0;
      const serviceCharge = 0;
      const grossEarnings = gantiGajiPokok + totalTunjangan + upahLembur + serviceCharge;

      let potBPJSTK = 0;
      let potBPJSKes = 0;

      if (salMaster.bpjs_tk_aktif === 'Ya') {
        if (emp.status_karyawan === 'DW' || emp.status_karyawan === 'Casual') {
          potBPJSTK = Math.round(grossEarnings * 0.0084);
        } else {
          potBPJSTK = Math.round(gantiGajiPokok * 0.03);
        }
      }

      if (salMaster.bpjs_kes_aktif === 'Ya') {
        if (emp.status_karyawan === 'DW' || emp.status_karyawan === 'Casual') {
          potBPJSKes = 0;
        } else {
          potBPJSKes = Math.round(gantiGajiPokok * 0.01);
        }
      }

      const rateDenda = parseFloat(salMaster.rate_denda_per_menit || '1000');
      const dendaTerlambat = Math.round(totalMenitTerlambat * rateDenda);

      let potPinjaman = 0;
      if (existingRecord && existingRecord.potongan_pinjaman !== undefined && existingRecord.potongan_pinjaman !== '') {
        potPinjaman = parseFloat(existingRecord.potongan_pinjaman || '0');
      } else {
        const activeLoan = loans.find(l => l.nik === emp.nik && l.status_lunas === 'Belum Lunas');
        if (activeLoan) {
          potPinjaman = Math.min(parseFloat(activeLoan.sisa_pinjaman || '0'), parseFloat(activeLoan.cicilan_per_bulan || '0'));
        }
      }

      const totalPotongan = potBPJSTK + potBPJSKes + dendaTerlambat + potPinjaman;
      const thpBersih = Math.max(0, Math.round(grossEarnings - totalPotongan));

      return {
        nik: emp.nik,
        nama: emp.nama,
        no_identitas: emp.no_identitas || '-',
        departemen: emp.departemen,
        jabatan: emp.jabatan,
        status_karyawan: emp.status_karyawan,
        status_kerja: emp.status_kerja || 'Aktif',
        bank: emp.bank || 'Mandiri',
        no_rekening: emp.no_rekening || '-',
        bulan_tahun: bulanTahun,
        total_hadir: totalHadir,
        total_menit_terlambat: totalMenitTerlambat,
        gaji_pokok: gantiGajiPokok,
        tunjangan: totalTunjangan,
        upah_lembur: upahLembur,
        service_charge: serviceCharge,
        bpjs_tk: potBPJSTK,
        bpjs_kes: potBPJSKes,
        potongan_pinjaman: potPinjaman,
        denda_terlambat: dendaTerlambat,
        thp_bersih: thpBersih,
        status_bayar: existingRecord ? existingRecord.status_bayar : 'Draft',
        tanggal_transfer: existingRecord ? existingRecord.tanggal_transfer : '-'
      };
    });

    return { success: true, data: payrollList };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function savePayrollRun(bulanTahun, payrollItems) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetPayroll = ss.getSheetByName(CONFIG.SHEET_PAYROLL_BULANAN);
    const existingPayroll = getSheetDataAsObjects(CONFIG.SHEET_PAYROLL_BULANAN) || [];
    const sheetLoans = ss.getSheetByName(CONFIG.SHEET_PINJAMAN);
    const loans = getSheetDataAsObjects(CONFIG.SHEET_PINJAMAN) || [];

    const todayStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd/MM/yyyy HH:mm');

    payrollItems.forEach(item => {
      const idx = existingPayroll.findIndex(p => p.nik === item.nik && p.bulan_tahun === bulanTahun);
      
      if (idx !== -1) {
        const row = idx + 2;
        sheetPayroll.getRange(row, 4).setValue(item.total_hadir.toString());
        sheetPayroll.getRange(row, 5).setValue(item.total_menit_terlambat.toString());
        sheetPayroll.getRange(row, 6).setValue(item.gaji_pokok.toString());
        sheetPayroll.getRange(row, 7).setValue(item.tunjangan.toString());
        sheetPayroll.getRange(row, 8).setValue((item.upah_lembur || 0).toString());
        sheetPayroll.getRange(row, 9).setValue((item.service_charge || 0).toString());
        sheetPayroll.getRange(row, 10).setValue(item.bpjs_tk.toString());
        sheetPayroll.getRange(row, 11).setValue(item.bpjs_kes.toString());
        sheetPayroll.getRange(row, 12).setValue(item.potongan_pinjaman.toString());
        sheetPayroll.getRange(row, 13).setValue(item.denda_terlambat.toString());
        sheetPayroll.getRange(row, 14).setValue(item.thp_bersih.toString());
        sheetPayroll.getRange(row, 15).setValue(todayStr);
        sheetPayroll.getRange(row, 16).setValue('Paid / Final');
      } else {
        const newId = 'PYR-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 100);
        sheetPayroll.appendRow([
          newId,
          item.nik,
          bulanTahun,
          item.total_hadir.toString(),
          item.total_menit_terlambat.toString(),
          item.gaji_pokok.toString(),
          item.tunjangan.toString(),
          (item.upah_lembur || 0).toString(),
          (item.service_charge || 0).toString(),
          item.bpjs_tk.toString(),
          item.bpjs_kes.toString(),
          item.potongan_pinjaman.toString(),
          item.denda_terlambat.toString(),
          item.thp_bersih.toString(),
          todayStr,
          'Paid / Final'
        ]);
      }

      if (item.potongan_pinjaman > 0) {
        const loanIdx = loans.findIndex(l => l.nik === item.nik && l.status_lunas === 'Belum Lunas');
        if (loanIdx !== -1) {
          const currentSisa = parseFloat(loans[loanIdx].sisa_pinjaman || '0');
          const newSisa = Math.max(0, currentSisa - item.potongan_pinjaman);
          sheetLoans.getRange(loanIdx + 2, 6).setValue(newSisa.toString());
          if (newSisa === 0) {
            sheetLoans.getRange(loanIdx + 2, 7).setValue('Lunas');
          }
        }
      }
    });

    SpreadsheetApp.flush();
    return { success: true, message: 'Proses Payroll Siklus Cut-Off ' + bulanTahun + ' Berhasil Difinalisasi & Disimpan!' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function getPersonalPayslip(nik, bulanTahun) {
  try {
    const payrollList = getSheetDataAsObjects(CONFIG.SHEET_PAYROLL_BULANAN) || [];
    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    const emp = employees.find(e => e && e.nik === nik);

    if (!emp) return { success: false, message: 'Karyawan tidak ditemukan.' };

    const record = payrollList.find(p => p && p.nik === nik && p.bulan_tahun === bulanTahun);
    if (!record) {
      return { success: false, message: 'Slip gaji periode ' + bulanTahun + ' belum diterbitkan oleh Admin HRD.' };
    }

    return {
      success: true,
      data: {
        id_payroll: record.id_payroll,
        nik: emp.nik,
        nama: emp.nama,
        departemen: emp.departemen,
        jabatan: emp.jabatan,
        status_karyawan: emp.status_karyawan,
        bank: emp.bank || 'Mandiri',
        no_rekening: emp.no_rekening || '-',
        bulan_tahun: record.bulan_tahun,
        total_hadir: record.total_hadir,
        total_menit_terlambat: record.total_menit_terlambat,
        gaji_pokok: parseFloat(record.gaji_pokok || '0'),
        tunjangan: parseFloat(record.tunjangan || '0'),
        upah_lembur: parseFloat(record.upah_lembur || '0'),
        service_charge: parseFloat(record.service_charge || '0'),
        bpjs_tk: parseFloat(record.bpjs_tk || '0'),
        bpjs_kes: parseFloat(record.bpjs_kes || '0'),
        potongan_pinjaman: parseFloat(record.potongan_pinjaman || '0'),
        denda_terlambat: parseFloat(record.denda_terlambat || '0'),
        thp_bersih: parseFloat(record.thp_bersih || '0'),
        tanggal_transfer: record.tanggal_transfer,
        status_bayar: record.status_bayar
      }
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function getLoansList() {
  try {
    const loans = getSheetDataAsObjects(CONFIG.SHEET_PINJAMAN) || [];
    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];

    const result = loans.map(l => {
      if (!l) return {};
      const emp = employees.find(e => e && e.nik === l.nik) || {};
      return {
        ...l,
        nama: emp.nama || 'N/A',
        departemen: emp.departemen || '-'
      };
    }).reverse();

    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function saveLoan(nik, totalPinjaman, cicilanPerBulan, tanggalPinjam) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_PINJAMAN);
    const newId = 'LNM-' + Date.now().toString().slice(-6);

    sheet.appendRow([
      newId,
      nik,
      tanggalPinjam || Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd'),
      totalPinjaman,
      cicilanPerBulan,
      totalPinjaman,
      'Belum Lunas'
    ]);

    SpreadsheetApp.flush();
    return { success: true, message: 'Pinjaman karyawan baru berhasil dicatat!' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function submitEditProfil(nik, formData) {
  try {
    if (!nik) {
      return { success: false, message: 'Sesi NIK Karyawan tidak terdeteksi. Silakan login ulang.' };
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheetEdit = ss.getSheetByName(CONFIG.SHEET_EDIT_PROFIL);
    
    if (!sheetEdit) {
      sheetEdit = ss.insertSheet(CONFIG.SHEET_EDIT_PROFIL);
      sheetEdit.appendRow([
        'id_pengajuan', 'nik', 'nama', 'no_telp', 'no_identitas', 'alamat', 'status_kawin', 'bank', 'no_rekening', 'foto', 'tanggal_pengajuan', 'status_persetujuan', 'password_baru'
      ]);
      sheetEdit.getRange('A1:M1').setFontWeight('bold').setBackground('#1E3A8A').setFontColor('#FFFFFF');
    }

    const todayStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd/MM/yyyy HH:mm');

    let fotoUrl = formData.current_foto || '';
    if (formData.foto && typeof formData.foto === 'string' && formData.foto.includes('base64,')) {
      fotoUrl = uploadFotoToDrive(formData.foto, nik + '_EditProfil_' + Date.now());
    }

    const newId = 'PRF-' + Date.now().toString().slice(-6);
    sheetEdit.appendRow([
      newId,
      nik,
      formData.nama || '',
      "'" + sanitizePhone(formData.no_telp),
      formData.no_identitas || '',
      formData.alamat || '',
      formData.status_kawin || 'TK/0',
      formData.bank || 'Mandiri',
      formData.no_rekening || '',
      fotoUrl,
      todayStr,
      'Pending',
      formData.password_baru || ''
    ]);

    SpreadsheetApp.flush();
    return { success: true, message: 'Pengajuan perubahan profil & password berhasil dikirim! Menunggu persetujuan Admin HR.' };
  } catch (err) {
    return { success: false, message: 'Gagal mengajukan edit profil: ' + err.toString() };
  }
}

function approveEditProfil(idPengajuan, actionStatus) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetEdit = ss.getSheetByName(CONFIG.SHEET_EDIT_PROFIL);
    if (!sheetEdit) return { success: false, message: 'Tabel pengajuan edit profil belum tersedia.' };

    const editData = getSheetDataAsObjects(CONFIG.SHEET_EDIT_PROFIL) || [];
    const idx = editData.findIndex(e => e && e.id_pengajuan === idPengajuan);

    if (idx === -1) return { success: false, message: 'Data pengajuan edit profil tidak ditemukan.' };

    const item = editData[idx];
    sheetEdit.getRange(idx + 2, 12).setValue(actionStatus);

    if (actionStatus === 'Approved') {
      const sheetEmp = ss.getSheetByName(CONFIG.SHEET_KARYAWAN);
      const empData = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
      const empIdx = empData.findIndex(e => e && e.nik === item.nik);

      if (empIdx !== -1) {
        const rowNum = empIdx + 2;
        if (item.nama) sheetEmp.getRange(rowNum, 2).setValue(item.nama);
        if (item.no_telp) sheetEmp.getRange(rowNum, 3).setValue("'" + sanitizePhone(item.no_telp));
        if (item.password_baru && item.password_baru.trim() !== '') {
          sheetEmp.getRange(rowNum, 4).setValue(item.password_baru.trim());
        }
        if (item.no_identitas) sheetEmp.getRange(rowNum, 7).setValue(item.no_identitas);
        if (item.alamat) sheetEmp.getRange(rowNum, 8).setValue(item.alamat);
        if (item.status_kawin) sheetEmp.getRange(rowNum, 9).setValue(item.status_kawin);
        if (item.bank) sheetEmp.getRange(rowNum, 14).setValue(item.bank);
        if (item.no_rekening) sheetEmp.getRange(rowNum, 15).setValue(item.no_rekening);
        if (item.foto && item.foto !== '') sheetEmp.getRange(rowNum, 16).setValue(item.foto);
      }
    }

    SpreadsheetApp.flush();
    return { success: true, message: 'Pengajuan edit profil ' + item.nik + ' berhasil: ' + actionStatus };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function approveKaryawan(nik, actionStatus) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_KARYAWAN);
    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    const index = employees.findIndex(e => e && e.nik === nik);

    if (index === -1) return { success: false, message: 'Data karyawan tidak ditemukan.' };

    const rowNum = index + 2;
    sheet.getRange(rowNum, 19).setValue(actionStatus);

    SpreadsheetApp.flush();
    return { success: true, message: 'Status karyawan ' + nik + ' diperbarui menjadi: ' + actionStatus };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function submitIzinCuti(nik, tglMulai, tglSelesai, jumlahHari, jenis, alasan) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    const emp = employees.find(e => e && e.nik === nik);

    if (!emp) return { success: false, message: 'Data karyawan tidak ditemukan.' };

    // Validasi kuota jika Cuti Tahunan (Cuti Khusus / Lainnya TIDAK memotong kuota)
    if (jenis === 'Cuti Tahunan') {
      const sisaCuti = parseInt(emp.sisa_cuti_tahunan || '0', 10);
      if (parseInt(jumlahHari, 10) > sisaCuti) {
        return { success: false, message: 'Sisa kuota cuti tahunan Anda (' + sisaCuti + ' hari) tidak mencukupi.' };
      }
    }

    const empRoleLower = (emp.role || '').toString().toLowerCase();
    const isIzinJam = (jenis || '').toString().toLowerCase().includes('jam');

    let initialStatus = 'Pending_HOD';
    if (!isIzinJam && (empRoleLower.includes('hod') || empRoleLower.includes('admin'))) {
      initialStatus = 'Pending_HRD';
    }

    const sheetIzin = ss.getSheetByName(CONFIG.SHEET_IZIN);
    const newId = 'IZN-' + Date.now().toString().slice(-6);
    sheetIzin.appendRow([
      newId, nik, tglMulai, tglSelesai, jumlahHari, jenis, alasan, initialStatus, ''
    ]);

    SpreadsheetApp.flush();
    const destMessage = initialStatus === 'Pending_HRD' ? 'Admin HRD' : 'HOD Departemen';
    return { success: true, message: 'Pengajuan ' + jenis + ' berhasil dikirim ke ' + destMessage + '.' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function approveIzinCuti(idIzin, action, rejectionReason) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetIzin = ss.getSheetByName(CONFIG.SHEET_IZIN);
    const izinData = getSheetDataAsObjects(CONFIG.SHEET_IZIN) || [];
    const index = izinData.findIndex(i => i && i.id_izin === idIzin);

    if (index === -1) return { success: false, message: 'Data pengajuan tidak ditemukan.' };

    const item = izinData[index];
    const rowNum = index + 2;
    let newStatus = item.status_persetujuan;
    const isIzinJam = (item.jenis || '').toString().toLowerCase().includes('jam');

    if (item.status_persetujuan === 'Pending_HOD' || item.status_persetujuan === 'Pending') {
      if (action === 'Approved') {
        // POINT 1: Izin Jam-Jaman CUKUP HOD SAJA (Langsung Final Approved)!
        newStatus = isIzinJam ? 'Approved' : 'Pending_HRD';
      } else if (action === 'Rejected') {
        newStatus = 'Rejected_HOD';
      }
    } else if (item.status_persetujuan === 'Pending_HRD') {
      if (action === 'Approved') {
        newStatus = 'Approved';
      } else if (action === 'Rejected') {
        newStatus = 'Rejected_HRD';
      }
    }

    sheetIzin.getRange(rowNum, 8).setValue(newStatus);
    if (rejectionReason) {
      sheetIzin.getRange(rowNum, 9).setValue(rejectionReason);
    }

    if (newStatus === 'Approved') {
      // Potong saldo HANYA jika Cuti Tahunan (Cuti Khusus / Lainnya TIDAK memotong cuti tahunan)
      if (item.jenis === 'Cuti Tahunan') {
        const sheetEmp = ss.getSheetByName(CONFIG.SHEET_KARYAWAN);
        const empData = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
        const empIdx = empData.findIndex(e => e && e.nik === item.nik);
        
        if (empIdx !== -1) {
          const currentSisa = parseInt(empData[empIdx].sisa_cuti_tahunan || '0', 10);
          const cutiDays = parseInt(item.jumlah_hari, 10);
          sheetEmp.getRange(empIdx + 2, 18).setValue(Math.max(0, currentSisa - cutiDays).toString());
        }
      }

      // POINT 2: Tentukan kode shift Roster
      let shiftCode = 'I';
      const jLower = (item.jenis || '').toString().toLowerCase();
      if (item.jenis === 'Cuti Tahunan') shiftCode = 'CT';
      else if (item.jenis === 'Publik Holiday') shiftCode = 'PH';
      else if (item.jenis === 'Extra Off') shiftCode = 'EO';
      else if (item.jenis === 'Sakit') shiftCode = 'S';
      else if (item.jenis === 'Izin') shiftCode = 'I';
      else if (jLower.includes('cuti khusus') || jLower.includes('lainnya')) shiftCode = 'CK'; // KODE CK UNTUK CUTI KHUSUS!

      // Update Roster hanya jika BUKAN izin jam-jaman
      if (!isIzinJam) {
        let startDate = parseDateStrToDate(item.tanggal_mulai);
        let endDate = parseDateStrToDate(item.tanggal_selesai);

        if (startDate && endDate) {
          const sheetRoster = ss.getSheetByName(CONFIG.SHEET_ROSTER);
          const rosterData = getSheetDataAsObjects(CONFIG.SHEET_ROSTER) || [];

          let cur = new Date(startDate);
          while (cur <= endDate) {
            const isoDate = Utilities.formatDate(cur, 'Asia/Jakarta', 'yyyy-MM-dd');
            
            const rosterIdx = rosterData.findIndex(r => r && r.nik === item.nik && r.tanggal === isoDate);
            if (rosterIdx !== -1) {
              sheetRoster.getRange(rosterIdx + 2, 4).setValue(shiftCode);
              sheetRoster.getRange(rosterIdx + 2, 5).setValue(shiftCode);
            } else {
              const newId = 'RST-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 100);
              sheetRoster.appendRow([newId, item.nik, isoDate, shiftCode, shiftCode]);
            }
            cur.setDate(cur.getDate() + 1);
          }
        }
      }
    }

    SpreadsheetApp.flush();
    return { success: true, message: 'Status pengajuan ' + item.jenis + ' berhasil diperbarui: ' + newStatus };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

/* ==========================================================================
   TUKAR SHIFT (SHIFT SWAP) ENGINE - ANTAR REKAN 1 DEPARTEMEN (APPROVAL HOD)
   ========================================================================== */

function getOrCreateTukarShiftSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEET_TUKAR_SHIFT);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_TUKAR_SHIFT);
    const expectedHeaders = [
      'id_tukar', 'nik_pengaju', 'nama_pengaju', 'tanggal_pengaju', 'shift_pengaju',
      'nik_tujuan', 'nama_tujuan', 'tanggal_tujuan', 'shift_tujuan', 'departemen',
      'alasan', 'status', 'catatan_hod', 'created_at'
    ];
    sheet.appendRow(expectedHeaders);
    sheet.getRange(1, 1, 1, expectedHeaders.length)
         .setFontWeight('bold')
         .setBackground('#1E3A8A')
         .setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function submitTukarShift(nikPengaju, tglPengaju, shiftPengaju, nikTujuan, tglTujuan, shiftTujuan, alasan) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetTukar = getOrCreateTukarShiftSheet(ss);

    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    const empPengaju = employees.find(e => e && String(e.nik).trim() === String(nikPengaju).trim());
    const empTujuan = employees.find(e => e && String(e.nik).trim() === String(nikTujuan).trim());

    if (!empPengaju || !empTujuan) {
      return { success: false, message: 'Data karyawan tidak ditemukan.' };
    }

    if (empPengaju.departemen !== empTujuan.departemen) {
      return { success: false, message: 'Tukar shift hanya dapat dilakukan antar rekan satu departemen (' + empPengaju.departemen + ').' };
    }

    if (String(nikPengaju).trim() === String(nikTujuan).trim()) {
      return { success: false, message: 'Tidak dapat mengajukan tukar shift dengan diri sendiri.' };
    }

    const newId = 'TS-' + Date.now().toString().slice(-6);
    const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm');

    sheetTukar.appendRow([
      newId,
      nikPengaju,
      empPengaju.nama,
      tglPengaju,
      shiftPengaju,
      nikTujuan,
      empTujuan.nama,
      tglTujuan,
      shiftTujuan,
      empPengaju.departemen,
      alasan || '-',
      'Pending_Rekan', // Menunggu persetujuan rekan yang diajak tukar
      '',
      nowStr
    ]);

    SpreadsheetApp.flush();
    return { success: true, message: 'Pengajuan tukar shift berhasil dikirim ke ' + empTujuan.nama + ' untuk dikonfirmasi.' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function respondTukarShiftRekan(nikRekan, idTukar, action) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetTukar = getOrCreateTukarShiftSheet(ss);
    const data = getSheetDataAsObjects(CONFIG.SHEET_TUKAR_SHIFT) || [];
    const index = data.findIndex(d => d && d.id_tukar === idTukar);

    if (index === -1) return { success: false, message: 'Data tukar shift tidak ditemukan.' };
    const item = data[index];

    if (String(item.nik_tujuan).trim() !== String(nikRekan).trim()) {
      return { success: false, message: 'Anda tidak memiliki hak untuk merespons pengajuan ini.' };
    }

    if (item.status !== 'Pending_Rekan') {
      return { success: false, message: 'Pengajuan ini sudah berstatus: ' + item.status };
    }

    const rowNum = index + 2;
    const isAccept = (action === 'Accept' || action === 'Accepted');
    let newStatus = isAccept ? 'Pending_HOD' : 'Rejected_Rekan';

    sheetTukar.getRange(rowNum, 12).setValue(newStatus);
    SpreadsheetApp.flush();

    const msg = isAccept
      ? 'Anda telah menyetujui pertukaran shift. Pengajuan kini diteruskan ke HOD untuk persetujuan akhir.'
      : 'Anda telah menolak pengajuan pertukaran shift ini.';

    return { success: true, message: msg };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function approveTukarShiftHOD(hodNik, idTukar, action, rejectionReason) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetTukar = getOrCreateTukarShiftSheet(ss);
    const data = getSheetDataAsObjects(CONFIG.SHEET_TUKAR_SHIFT) || [];
    const index = data.findIndex(d => d && d.id_tukar === idTukar);

    if (index === -1) return { success: false, message: 'Data tukar shift tidak ditemukan.' };
    const item = data[index];

    if (item.status !== 'Pending_HOD') {
      return { success: false, message: 'Pengajuan ini tidak sedang menunggu persetujuan HOD (Status: ' + item.status + ').' };
    }

    const rowNum = index + 2;
    const isApprove = (action === 'Approve' || action === 'Approved');
    let newStatus = isApprove ? 'Approved' : 'Rejected_HOD';

    sheetTukar.getRange(rowNum, 12).setValue(newStatus);
    if (rejectionReason) {
      sheetTukar.getRange(rowNum, 13).setValue(rejectionReason);
    }

    // POINT 3: Jika HOD APPROVE, OTOMATIS TUKAR SHIFT DI ROSTER!
    if (newStatus === 'Approved') {
      const sheetRoster = ss.getSheetByName(CONFIG.SHEET_ROSTER);
      const rosterData = getSheetDataAsObjects(CONFIG.SHEET_ROSTER) || [];

      const rPengaju = rosterData.find(r => r && String(r.nik).trim() === String(item.nik_pengaju).trim() && r.tanggal === item.tanggal_pengaju);
      const rTujuan = rosterData.find(r => r && String(r.nik).trim() === String(item.nik_tujuan).trim() && r.tanggal === item.tanggal_tujuan);

      const shiftPengajuId = rPengaju ? (rPengaju.id_shift || rPengaju.status_hari) : (item.shift_pengaju || 'OFF');
      const shiftPengajuStatus = rPengaju ? (rPengaju.status_hari || rPengaju.id_shift) : (item.shift_pengaju || 'OFF');

      const shiftTujuanId = rTujuan ? (rTujuan.id_shift || rTujuan.status_hari) : (item.shift_tujuan || 'OFF');
      const shiftTujuanStatus = rTujuan ? (rTujuan.status_hari || rTujuan.id_shift) : (item.shift_tujuan || 'OFF');

      // 1. Update Roster Pengaju pada tanggal_pengaju menjadi shift_tujuan
      const idxPengaju = rosterData.findIndex(r => r && String(r.nik).trim() === String(item.nik_pengaju).trim() && r.tanggal === item.tanggal_pengaju);
      if (idxPengaju !== -1) {
        sheetRoster.getRange(idxPengaju + 2, 4).setValue(shiftTujuanId);
        sheetRoster.getRange(idxPengaju + 2, 5).setValue(shiftTujuanStatus);
      } else {
        const newId1 = 'RST-' + Date.now().toString().slice(-6);
        sheetRoster.appendRow([newId1, item.nik_pengaju, item.tanggal_pengaju, shiftTujuanId, shiftTujuanStatus]);
      }

      // 2. Update Roster Tujuan pada tanggal_tujuan menjadi shift_pengaju
      const idxTujuan = rosterData.findIndex(r => r && String(r.nik).trim() === String(item.nik_tujuan).trim() && r.tanggal === item.tanggal_tujuan);
      if (idxTujuan !== -1) {
        sheetRoster.getRange(idxTujuan + 2, 4).setValue(shiftPengajuId);
        sheetRoster.getRange(idxTujuan + 2, 5).setValue(shiftPengajuStatus);
      } else {
        const newId2 = 'RST-' + (Date.now() + 1).toString().slice(-6);
        sheetRoster.appendRow([newId2, item.nik_tujuan, item.tanggal_tujuan, shiftPengajuId, shiftPengajuStatus]);
      }
    }

    SpreadsheetApp.flush();
    const msg = isApprove
      ? 'Tukar shift berhasil disetujui HOD dan jadwal Roster kedua karyawan telah otomatis diperbarui!'
      : 'Pengajuan tukar shift ditolak oleh HOD.';

    return { success: true, message: msg };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function getTukarShiftData(nik) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    getOrCreateTukarShiftSheet(ss);

    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    const emp = employees.find(e => e && String(e.nik).trim() === String(nik).trim());
    if (!emp) return { success: false, message: 'Karyawan tidak ditemukan.' };

    const dept = emp.departemen;
    const colleagues = employees
      .filter(e => e && e.departemen === dept && e.nik !== nik && e.status_akun === 'Approved' && e.status_kerja !== 'Resign')
      .map(e => ({ nik: e.nik, nama: e.nama, jabatan: e.jabatan }));

    const colleagueNiks = {};
    colleagues.forEach(c => { colleagueNiks[c.nik] = true; });

    const allRoster = getSheetDataAsObjects(CONFIG.SHEET_ROSTER) || [];
    const shifts = getSheetDataAsObjects(CONFIG.SHEET_SHIFT) || [];

    const shiftMap = {};
    shifts.forEach(s => {
      if (s && s.id_shift) {
        let jamStr = '';
        if (s.jam_masuk && s.jam_pulang) jamStr = s.jam_masuk + ' - ' + s.jam_pulang;
        else if (s.jam_masuk) jamStr = s.jam_masuk;
        shiftMap[s.id_shift] = {
          nama: s.nama_shift || s.id_shift,
          jam: jamStr
        };
      }
    });

    const labelMap = {
      'OFF': 'OFF (Libur)',
      'CT': 'Cuti Tahunan (CT)',
      'PH': 'Publik Holiday (PH)',
      'EO': 'Extra Off (EO)',
      'S': 'Sakit (S)',
      'I': 'Izin (I)',
      'CK': 'Cuti Khusus (CK)'
    };

    const colleagueRosters = allRoster
      .filter(r => r && colleagueNiks[r.nik] && r.tanggal)
      .map(r => {
        const shiftVal = r.id_shift || r.status_hari;
        let sName = shiftVal;
        let sJam = '';
        if (labelMap[shiftVal]) {
          sName = labelMap[shiftVal];
        } else if (shiftMap[r.id_shift]) {
          sName = shiftMap[r.id_shift].nama;
          sJam = shiftMap[r.id_shift].jam;
        }
        return {
          nik: r.nik,
          tanggal: r.tanggal,
          id_shift: r.id_shift,
          shift_nama: sName,
          shift_jam: sJam
        };
      });

    const allTukar = getSheetDataAsObjects(CONFIG.SHEET_TUKAR_SHIFT) || [];

    const myRequests = allTukar.filter(t => t && t.nik_pengaju === nik).reverse();
    const incomingRequests = allTukar.filter(t => t && t.nik_tujuan === nik && t.status === 'Pending_Rekan').reverse();
    const incomingHistory = allTukar.filter(t => t && t.nik_tujuan === nik && t.status !== 'Pending_Rekan').reverse();

    return {
      success: true,
      colleagues: colleagues,
      colleagueRosters: colleagueRosters,
      myRequests: myRequests,
      incomingRequests: incomingRequests,
      incomingHistory: incomingHistory
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function getShiftList() {
  return { success: true, data: getSheetDataAsObjects(CONFIG.SHEET_SHIFT) || [] };
}

function saveShift(idShift, namaShift, jamMasuk, jamPulang, toleransi, oldShiftId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_SHIFT);
    const shifts = getSheetDataAsObjects(CONFIG.SHEET_SHIFT) || [];

    const targetSearchId = oldShiftId || idShift;
    const idx = shifts.findIndex(s => s && s.id_shift === targetSearchId);

    if (idx !== -1) {
      const row = idx + 2;
      sheet.getRange(row, 1).setValue(idShift);
      sheet.getRange(row, 2).setValue(namaShift);
      sheet.getRange(row, 3).setValue(jamMasuk);
      sheet.getRange(row, 4).setValue(jamPulang);
      sheet.getRange(row, 5).setValue(toleransi.toString());
    } else {
      const newId = idShift || ('SFT-' + (shifts.length + 1).toString().padStart(2, '0'));
      sheet.appendRow([newId, namaShift, jamMasuk, jamPulang, toleransi.toString()]);
    }

    SpreadsheetApp.flush();
    return { success: true, message: 'Shift kerja berhasil disimpan!' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function deleteShift(idShift) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_SHIFT);
    const shifts = getSheetDataAsObjects(CONFIG.SHEET_SHIFT) || [];
    const idx = shifts.findIndex(s => s && s.id_shift === idShift);

    if (idx !== -1) {
      sheet.deleteRow(idx + 2);
      SpreadsheetApp.flush();
      return { success: true, message: 'Shift berhasil dihapus!' };
    }
    return { success: false, message: 'Shift tidak ditemukan.' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function getDepartemenList() {
  return { success: true, data: getSheetDataAsObjects(CONFIG.SHEET_DEPARTEMEN) || [] };
}

function saveDepartemen(idDept, namaDept) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_DEPARTEMEN);
    const depts = getSheetDataAsObjects(CONFIG.SHEET_DEPARTEMEN) || [];

    if (idDept) {
      const idx = depts.findIndex(d => d && d.id_departemen === idDept);
      if (idx !== -1) {
        sheet.getRange(idx + 2, 2).setValue(namaDept);
      }
    } else {
      const newId = 'DPT-' + (depts.length + 1).toString().padStart(2, '0');
      sheet.appendRow([newId, namaDept]);
    }

    SpreadsheetApp.flush();
    return { success: true, message: 'Departemen berhasil disimpan!' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function deleteDepartemen(idDept) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_DEPARTEMEN);
    const depts = getSheetDataAsObjects(CONFIG.SHEET_DEPARTEMEN) || [];
    const idx = depts.findIndex(d => d && d.id_departemen === idDept);

    if (idx !== -1) {
      sheet.deleteRow(idx + 2);
      SpreadsheetApp.flush();
      return { success: true, message: 'Departemen berhasil dihapus!' };
    }
    return { success: false, message: 'Departemen tidak ditemukan.' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function savePengumuman(idPengumuman, judul, isi, status, fotoBase64) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_PENGUMUMAN);
    const list = getSheetDataAsObjects(CONFIG.SHEET_PENGUMUMAN) || [];
    const todayStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd/MM/yyyy');

    let photoUrl = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600';
    if (fotoBase64 && fotoBase64.includes('base64,')) {
      photoUrl = uploadFotoToDrive(fotoBase64, 'Mading_' + Date.now());
    }

    if (idPengumuman) {
      const idx = list.findIndex(p => p && p.id_pengumuman === idPengumuman);
      if (idx !== -1) {
        const row = idx + 2;
        sheet.getRange(row, 3).setValue(judul);
        sheet.getRange(row, 4).setValue(isi);
        if (fotoBase64 && fotoBase64.includes('base64,')) {
          sheet.getRange(row, 5).setValue(photoUrl);
        }
        sheet.getRange(row, 7).setValue(status);
      }
    } else {
      const newId = 'PGM-' + Date.now().toString().slice(-5);
      sheet.appendRow([newId, todayStr, judul, isi, photoUrl, 'Admin HR', status || 'Aktif']);
    }

    SpreadsheetApp.flush();
    return { success: true, message: 'Mading pengumuman berhasil disimpan!' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function deletePengumuman(idPengumuman) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_PENGUMUMAN);
    const list = getSheetDataAsObjects(CONFIG.SHEET_PENGUMUMAN) || [];
    const idx = list.findIndex(p => p && p.id_pengumuman === idPengumuman);

    if (idx !== -1) {
      sheet.deleteRow(idx + 2);
      SpreadsheetApp.flush();
      return { success: true, message: 'Pengumuman Mading berhasil dihapus!' };
    }
    return { success: false, message: 'Pengumuman tidak ditemukan.' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function calculateMonthlyKPI(bulanTahun) {
  try {
    const cutOff = getCutoffRange(bulanTahun);
    const absensi = getSheetDataAsObjects(CONFIG.SHEET_ABSENSI) || [];
    const karyawan = (getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || []).filter(k => {
      if (!k) return false;
      const roleStr = (k.role || '').toString().toLowerCase();
      return k.status_akun === 'Approved' && !roleStr.includes('admin');
    });

    const kpiResults = karyawan.map(emp => {
      const empAbsensi = absensi.filter(a => {
        if (!a || a.nik !== emp.nik || !a.tanggal) return false;
        const parts = a.tanggal.split('/');
        if (parts.length === 3) {
          const recDate = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
          return recDate >= cutOff.startDate && recDate <= cutOff.endDate;
        }
        return false;
      });

      const totalHadir = empAbsensi.filter(a => a.status === 'Tepat Waktu' || a.status === 'Terlambat').length;
      const totalTerlambat = empAbsensi.filter(a => a.status === 'Terlambat').length;
      
      let totalMenitTerlambat = 0;
      empAbsensi.forEach(a => {
        totalMenitTerlambat += parseInt(a.keterlambatan_menit || '0', 10);
      });

      let skor = 100 - (totalTerlambat * 3) - (totalMenitTerlambat * 0.1);
      skor = Math.max(0, Math.min(100, Math.round(skor)));

      let predikat = 'Sangat Baik';
      if (skor < 70) predikat = 'Perlu Evaluasi';
      else if (skor < 80) predikat = 'Cukup';
      else if (skor < 90) predikat = 'Baik';

      return {
        nik: emp.nik,
        nama: emp.nama,
        departemen: emp.departemen,
        bulan_tahun: bulanTahun + ' (Cut-off 26-25)',
        total_hadir: totalHadir,
        total_terlambat: totalTerlambat,
        total_menit_terlambat: totalMenitTerlambat,
        skor_kpi_persen: skor + '%',
        predikat: predikat
      };
    });

    return { success: true, data: kpiResults };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function getAttendanceAndLeaveResume(startDate, endDate, filterDept) {
  try {
    const employeesAll = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    let karyawan = employeesAll.filter(k => {
      if (!k) return false;
      const roleStr = (k.role || '').toString().toLowerCase();
      return k.status_akun === 'Approved' && !roleStr.includes('admin');
    });

    if (filterDept && filterDept !== 'ALL') {
      karyawan = karyawan.filter(k => k.departemen === filterDept);
    }

    // Default ke cutoff berjalan jika kosong
    if (!startDate || !endDate) {
      const now = new Date();
      let y = now.getFullYear();
      let m = now.getMonth() + 1;
      const mStr = y + '-' + String(m).padStart(2, '0');
      const cut = getCutoffRange(mStr);
      if (!startDate) startDate = Utilities.formatDate(cut.startDate, 'Asia/Jakarta', 'yyyy-MM-dd');
      if (!endDate) endDate = Utilities.formatDate(cut.endDate, 'Asia/Jakarta', 'yyyy-MM-dd');
    }

    let startYMD = normalizeDateToYMD(startDate);
    let endYMD = normalizeDateToYMD(endDate);
    if (startYMD && endYMD && startYMD > endYMD) {
      const t = startYMD;
      startYMD = endYMD;
      endYMD = t;
      const tStr = startDate;
      startDate = endDate;
      endDate = tStr;
    }

    const absensiAll = getSheetDataAsObjects(CONFIG.SHEET_ABSENSI) || [];
    const rosterAll = getSheetDataAsObjects(CONFIG.SHEET_ROSTER) || [];
    const izinAll = getSheetDataAsObjects(CONFIG.SHEET_IZIN) || [];

    // Filter absensi dalam rentang
    const absensiInRange = absensiAll.filter(a => a && a.tanggal && isDateInRange(a.tanggal, startDate, endDate));

    // Filter roster dalam rentang
    const rosterInRange = rosterAll.filter(r => r && r.tanggal && isDateInRange(r.tanggal, startDate, endDate));

    // Filter izin yang disetujui (Approved / Approved_HOD)
    const approvedIzin = izinAll.filter(iz => {
      if (!iz) return false;
      const st = (iz.status_persetujuan || '').toString();
      if (st !== 'Approved' && st !== 'Approved_HOD') return false;
      
      const izStartYMD = normalizeDateToYMD(iz.tanggal_mulai);
      const izEndYMD = normalizeDateToYMD(iz.tanggal_selesai || iz.tanggal_mulai);
      if (!izStartYMD) return false;
      
      return izStartYMD <= endYMD && (izEndYMD ? izEndYMD >= startYMD : izStartYMD >= startYMD);
    });

    // 1. Kumpulkan Detail Pengambilan Cuti/Izin
    const leaveDetails = [];
    const leaveStats = {
      cutiTahunan: 0,
      publikHoliday: 0,
      extraOff: 0,
      cutiKhusus: 0,
      sakit: 0,
      izin: 0,
      izinJam: 0,
      totalHari: 0
    };

    approvedIzin.forEach(iz => {
      const emp = employeesAll.find(e => e && e.nik === iz.nik);
      if (filterDept && filterDept !== 'ALL' && emp && emp.departemen !== filterDept) return;

      const jenisLower = (iz.jenis || '').toString().toLowerCase();
      let kategoriKode = 'I';
      let kategoriLabel = iz.jenis || 'Izin';
      let daysCount = parseFloat(iz.jumlah_hari || '1') || 1;

      if (jenisLower.includes('tahunan') || jenisLower === 'ct') {
        kategoriKode = 'CT';
        kategoriLabel = 'Cuti Tahunan (CT)';
        leaveStats.cutiTahunan += daysCount;
      } else if (jenisLower.includes('publik') || jenisLower.includes('public') || jenisLower === 'ph') {
        kategoriKode = 'PH';
        kategoriLabel = 'Publik Holiday (PH)';
        leaveStats.publikHoliday += daysCount;
      } else if (jenisLower.includes('extra') || jenisLower === 'eo') {
        kategoriKode = 'EO';
        kategoriLabel = 'Extra Off (EO)';
        leaveStats.extraOff += daysCount;
      } else if (jenisLower.includes('khusus') || jenisLower.includes('lainnya') || jenisLower === 'ck') {
        kategoriKode = 'CK';
        kategoriLabel = 'Cuti Khusus (CK)';
        leaveStats.cutiKhusus += daysCount;
      } else if (jenisLower.includes('sakit') || jenisLower === 's') {
        kategoriKode = 'S';
        kategoriLabel = 'Sakit (S)';
        leaveStats.sakit += daysCount;
      } else if (jenisLower.includes('jam')) {
        kategoriKode = 'IJ';
        kategoriLabel = 'Izin Jam-Jaman';
        leaveStats.izinJam += 1;
      } else {
        kategoriKode = 'I';
        kategoriLabel = 'Izin (I)';
        leaveStats.izin += daysCount;
      }
      leaveStats.totalHari += daysCount;

      leaveDetails.push({
        id_izin: iz.id_izin || '-',
        nik: iz.nik,
        nama: emp ? emp.nama : (iz.nama || 'N/A'),
        departemen: emp ? emp.departemen : '-',
        jenis: kategoriLabel,
        kategori_kode: kategoriKode,
        tanggal_mulai: iz.tanggal_mulai || '-',
        tanggal_selesai: iz.tanggal_selesai || iz.tanggal_mulai || '-',
        jumlah_hari: iz.jumlah_hari || '1',
        alasan: iz.alasan || '-',
        status: iz.status_persetujuan || 'Approved'
      });
    });

    leaveDetails.reverse();

    // 2. Hitung Persentase Kehadiran per Karyawan (Target KPI 100%)
    let totalScheduledResort = 0;
    let totalHadirResort = 0;

    const employeeAttendance = karyawan.map(emp => {
      const empNik = String(emp.nik).trim();
      
      const empAbsensi = absensiInRange.filter(a => a && String(a.nik).trim() === empNik);
      const totalHadir = empAbsensi.filter(a => a.status === 'Tepat Waktu' || a.status === 'Terlambat' || (a.status || '').includes('Hadir') || (a.status || '').includes('Dispensasi')).length;
      const totalTerlambat = empAbsensi.filter(a => a.status === 'Terlambat').length;
      let totalMenitTerlambat = 0;
      empAbsensi.forEach(a => {
        totalMenitTerlambat += parseInt(a.keterlambatan_menit || '0', 10);
      });

      const empRoster = rosterInRange.filter(r => r && String(r.nik).trim() === empNik);
      
      let hariWajibKerja = 0;
      let hariOff = 0;
      let hariCuti = 0;

      if (empRoster.length > 0) {
        empRoster.forEach(r => {
          const shiftVal = (r.id_shift || r.status_hari || '').toString().trim();
          if (shiftVal === 'OFF') {
            hariOff++;
          } else if (['CT', 'PH', 'EO', 'S', 'I', 'CK'].includes(shiftVal)) {
            hariCuti++;
          } else if (shiftVal !== '') {
            hariWajibKerja++;
          }
        });
      } else {
        hariWajibKerja = Math.max(totalHadir, 1);
      }

      const empIzinDays = leaveDetails
        .filter(ld => String(ld.nik).trim() === empNik && ld.kategori_kode !== 'IJ')
        .reduce((sum, ld) => sum + (parseFloat(ld.jumlah_hari) || 1), 0);

      let persenKehadiran = 100;
      if (hariWajibKerja > 0) {
        persenKehadiran = Math.min(100, Math.round((totalHadir / hariWajibKerja) * 1000) / 10);
      } else {
        persenKehadiran = 100;
      }

      totalScheduledResort += hariWajibKerja;
      totalHadirResort += totalHadir;

      let statusKPI = '100% (Mencapai Target)';
      let statusColor = 'emerald';
      if (persenKehadiran >= 100) {
        statusKPI = '100% (Mencapai Target)';
        statusColor = 'emerald';
      } else if (persenKehadiran >= 90) {
        statusKPI = persenKehadiran + '% (Baik)';
        statusColor = 'indigo';
      } else if (persenKehadiran >= 80) {
        statusKPI = persenKehadiran + '% (Cukup)';
        statusColor = 'amber';
      } else {
        statusKPI = persenKehadiran + '% (Perlu Evaluasi)';
        statusColor = 'rose';
      }

      return {
        nik: emp.nik,
        nama: emp.nama,
        departemen: emp.departemen,
        hari_wajib: hariWajibKerja,
        total_hadir: totalHadir,
        hari_off: hariOff,
        hari_cuti: Math.max(hariCuti, empIzinDays),
        total_terlambat: totalTerlambat,
        menit_terlambat: totalMenitTerlambat,
        persen_kehadiran: persenKehadiran,
        status_kpi: statusKPI,
        status_color: statusColor
      };
    });

    employeeAttendance.sort((a, b) => a.nama.localeCompare(b.nama));

    let rataRataResort = 100;
    if (totalScheduledResort > 0) {
      rataRataResort = Math.min(100, Math.round((totalHadirResort / totalScheduledResort) * 1000) / 10);
    }

    return {
      success: true,
      startDate: startDate,
      endDate: endDate,
      filterDept: filterDept || 'ALL',
      summary: {
        totalKaryawan: karyawan.length,
        rataRataKehadiran: rataRataResort,
        targetKPI: 100,
        totalHariWajib: totalScheduledResort,
        totalHadirRiil: totalHadirResort,
        leaveStats: leaveStats
      },
      employeeAttendance: employeeAttendance,
      leaveDetails: leaveDetails
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function generateResumeAttendancePDFReport(startDate, endDate, filterDept) {
  try {
    const resumeRes = getAttendanceAndLeaveResume(startDate, endDate, filterDept);
    if (!resumeRes || !resumeRes.success) {
      return { success: false, message: resumeRes ? resumeRes.message : 'Gagal menghasilkan resume.' };
    }

    const startStr = resumeRes.startDate;
    const endStr = resumeRes.endDate;
    const deptStr = resumeRes.filterDept || 'ALL';
    const s = resumeRes.summary;
    const empAtt = resumeRes.employeeAttendance || [];
    const leaveDet = resumeRes.leaveDetails || [];

    const dispStart = formatDisplayDateID(startStr);
    const dispEnd = formatDisplayDateID(endStr);
    const deptLabel = (deptStr !== 'ALL') ? deptStr : 'Semua Departemen';

    let html = '<div style="font-family:Arial, sans-serif; padding:15px; color:#1e293b; font-size:10px;">';
    
    // Header
    html += '<h2 style="text-align:center; color:#1e1b4b; margin:0 0 4px 0; font-size:15px; letter-spacing:0.5px;">THE BALCONE SUITES & RESORT</h2>';
    html += '<h4 style="text-align:center; color:#4338ca; margin:0 0 4px 0; font-size:12px; text-transform:uppercase;">RESUME EVALUASI KEHADIRAN & PENGAMBILAN CUTI KARYAWAN</h4>';
    html += '<p style="text-align:center; font-size:10px; color:#64748b; margin:0 0 14px 0;">' +
      'Periode: <b>' + dispStart + ' s/d ' + dispEnd + '</b> &bull; Departemen: <b>' + deptLabel + '</b>' +
      '</p>';

    // Summary Box
    html += '<div style="background-color:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:10px; margin-bottom:15px;">';
    html += '<table style="width:100%; font-size:9.5px; border-collapse:collapse;">';
    html += '<tr>' +
      '<td style="width:25%; padding:4px;"><b>Total Karyawan:</b> ' + s.totalKaryawan + ' Orang</td>' +
      '<td style="width:25%; padding:4px;"><b>Rata-rata Kehadiran:</b> <span style="color:#059669; font-weight:bold;">' + s.rataRataKehadiran + '%</span> (Target: 100%)</td>' +
      '<td style="width:25%; padding:4px;"><b>Hari Kerja Terjadwal:</b> ' + s.totalHariWajib + ' Hari</td>' +
      '<td style="width:25%; padding:4px;"><b>Total Hadir Riil:</b> ' + s.totalHadirRiil + ' Hari</td>' +
      '</tr>';
    html += '<tr>' +
      '<td colspan="4" style="padding:6px 4px 2px 4px; border-top:1px dashed #cbd5e1; color:#475569;">' +
      '<b>Rekapitulasi Cuti & Izin Diambil:</b> ' +
      'Cuti Tahunan (CT): <b>' + s.leaveStats.cutiTahunan + '</b> Hr &bull; ' +
      'Public Holiday (PH): <b>' + s.leaveStats.publikHoliday + '</b> Hr &bull; ' +
      'Extra Off (EO): <b>' + s.leaveStats.extraOff + '</b> Hr &bull; ' +
      'Cuti Khusus (CK): <b>' + s.leaveStats.cutiKhusus + '</b> Hr &bull; ' +
      'Sakit: <b>' + s.leaveStats.sakit + '</b> Hr &bull; ' +
      'Izin/Jam: <b>' + (s.leaveStats.izin + s.leaveStats.izinJam) + '</b> Hr &bull; ' +
      'Total: <b style="color:#4338ca;">' + s.leaveStats.totalHari + ' Hari</b>' +
      '</td>' +
      '</tr>';
    html += '</table></div>';

    // Bagian 1: Tabel Persentase Kehadiran
    html += '<h4 style="color:#1e1b4b; margin:12px 0 6px 0; font-size:10.5px; text-transform:uppercase;">1. Persentase Kehadiran Karyawan (Target KPI: 100%)</h4>';
    html += '<table border="1" cellpadding="4" cellspacing="0" style="width:100%; border-collapse:collapse; font-size:9px; border-color:#cbd5e1; margin-bottom:15px;">';
    html += '<tr style="background-color:#1e1b4b; color:white; font-size:8.5px; text-transform:uppercase;">' +
      '<th style="width:20px; text-align:center;">No</th>' +
      '<th style="width:70px;">NIK</th>' +
      '<th>Nama Karyawan</th>' +
      '<th>Departemen</th>' +
      '<th style="width:55px; text-align:center;">Wajib (Hr)</th>' +
      '<th style="width:55px; text-align:center;">Hadir (Hr)</th>' +
      '<th style="width:50px; text-align:center;">Terlambat</th>' +
      '<th style="width:65px; text-align:center;">% Kehadiran</th>' +
      '<th style="width:85px; text-align:center;">Status KPI</th>' +
      '</tr>';

    if (empAtt.length === 0) {
      html += '<tr><td colspan="9" style="text-align:center; padding:10px; color:#94a3b8;">Tidak ada data karyawan.</td></tr>';
    } else {
      empAtt.forEach((emp, idx) => {
        const bgRow = (idx % 2 === 1) ? '#f8fafc' : '#ffffff';
        const pctColor = emp.persen_kehadiran >= 100 ? '#059669' : (emp.persen_kehadiran >= 85 ? '#2563eb' : '#dc2626');
        html += '<tr style="background-color:' + bgRow + ';">' +
          '<td style="text-align:center;">' + (idx + 1) + '</td>' +
          '<td style="font-family:monospace; font-weight:bold; color:#312e81;">' + emp.nik + '</td>' +
          '<td style="font-weight:bold;">' + emp.nama + '</td>' +
          '<td>' + emp.departemen + '</td>' +
          '<td style="text-align:center;">' + emp.hari_wajib + '</td>' +
          '<td style="text-align:center; font-weight:bold; color:#059669;">' + emp.total_hadir + '</td>' +
          '<td style="text-align:center;">' + (emp.total_terlambat > 0 ? emp.total_terlambat + 'x (' + emp.menit_terlambat + 'm)' : '-') + '</td>' +
          '<td style="text-align:center; font-weight:bold; color:' + pctColor + ';">' + emp.persen_kehadiran + '%</td>' +
          '<td style="text-align:center; font-size:8px;">' + emp.status_kpi + '</td>' +
          '</tr>';
      });
    }
    html += '</table>';

    // Bagian 2: Tabel Pengambilan Cuti & Izin
    html += '<h4 style="color:#1e1b4b; margin:14px 0 6px 0; font-size:10.5px; text-transform:uppercase;">2. Detail Pengambilan Cuti, Public Holiday, Extra Off & Izin</h4>';
    html += '<table border="1" cellpadding="4" cellspacing="0" style="width:100%; border-collapse:collapse; font-size:9px; border-color:#cbd5e1; margin-bottom:15px;">';
    html += '<tr style="background-color:#312e81; color:white; font-size:8.5px; text-transform:uppercase;">' +
      '<th style="width:20px; text-align:center;">No</th>' +
      '<th style="width:70px;">NIK</th>' +
      '<th>Nama Karyawan</th>' +
      '<th>Departemen</th>' +
      '<th>Jenis Cuti / Izin</th>' +
      '<th style="text-align:center;">Periode / Tanggal</th>' +
      '<th style="width:45px; text-align:center;">Durasi</th>' +
      '<th>Alasan / Keterangan</th>' +
      '<th style="width:60px; text-align:center;">Status</th>' +
      '</tr>';

    if (leaveDet.length === 0) {
      html += '<tr><td colspan="9" style="text-align:center; padding:10px; color:#94a3b8;">Tidak ada pengambilan cuti/izin pada periode ini.</td></tr>';
    } else {
      leaveDet.forEach((ld, idx) => {
        const bgRow = (idx % 2 === 1) ? '#f8fafc' : '#ffffff';
        const tglStr = (ld.tanggal_mulai === ld.tanggal_selesai) ? ld.tanggal_mulai : (ld.tanggal_mulai + ' s/d ' + ld.tanggal_selesai);
        html += '<tr style="background-color:' + bgRow + ';">' +
          '<td style="text-align:center;">' + (idx + 1) + '</td>' +
          '<td style="font-family:monospace; font-weight:bold; color:#312e81;">' + ld.nik + '</td>' +
          '<td style="font-weight:bold;">' + ld.nama + '</td>' +
          '<td>' + ld.departemen + '</td>' +
          '<td style="font-weight:bold; color:#4338ca;">' + ld.jenis + '</td>' +
          '<td style="text-align:center; font-size:8.5px;">' + tglStr + '</td>' +
          '<td style="text-align:center; font-weight:bold;">' + ld.jumlah_hari + ' Hari</td>' +
          '<td>' + ld.alasan + '</td>' +
          '<td style="text-align:center; font-size:8px; color:#059669; font-weight:bold;">' + ld.status + '</td>' +
          '</tr>';
      });
    }
    html += '</table>';

    // Kolom Tanda Tangan
    html += '<table style="width:100%; margin-top:25px; font-size:9.5px; border-collapse:collapse; page-break-inside:avoid;">';
    html += '<tr>' +
      '<td style="width:40%; text-align:center;">' +
      'Dibuat Oleh,<br><br><br><br>' +
      '<b>( HR Officer )</b><br>' +
      'Personnel & Attendance' +
      '</td>' +
      '<td style="width:20%;"></td>' +
      '<td style="width:40%; text-align:center;">' +
      'Mengetahui & Menyetujui,<br><br><br><br>' +
      '<b>( General Manager / HR Manager )</b><br>' +
      'The Balcone Suites & Resort' +
      '</td>' +
      '</tr>';
    html += '</table>';

    html += '<p style="text-align:right; font-size:8.5px; color:#94a3b8; margin-top:15px;">Dicetak otomatis oleh Sistem HR The Balcone Suites & Resort pada ' + (new Date().toLocaleString('id-ID')) + '</p>';
    html += '</div>';

    let periodSuffix = startStr + '_sd_' + endStr;
    const safeDeptStr = (deptStr !== 'ALL') ? deptStr + '_' : '';
    const safeFileTitle = ('Resume_Kehadiran_Cuti_Balcone_' + safeDeptStr + periodSuffix).replace(/[^a-zA-Z0-9]/g, '_');
    const blob = Utilities.newBlob(html, 'text/html', safeFileTitle + '.html');
    const pdfBlob = blob.getAs('application/pdf');
    const base64Pdf = Utilities.base64Encode(pdfBlob.getBytes());

    return {
      success: true,
      pdfBase64: 'data:application/pdf;base64,' + base64Pdf,
      fileName: safeFileTitle + '.pdf'
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function matchesDateOrMonth(targetDateStr, filterStr) {
  if (!filterStr || !targetDateStr) return false;
  targetDateStr = targetDateStr.toString().trim();
  filterStr = filterStr.toString().trim();
  if (targetDateStr === filterStr || targetDateStr.indexOf(filterStr) !== -1) return true;

  // Format YYYY-MM-DD -> DD/MM/YYYY
  if (/^\d{4}-\d{2}-\d{2}$/.test(filterStr)) {
    const p = filterStr.split('-');
    const dmy = p[2] + '/' + p[1] + '/' + p[0];
    if (targetDateStr.indexOf(dmy) !== -1) return true;
  }
  // Format YYYY-MM -> /MM/YYYY
  if (/^\d{4}-\d{2}$/.test(filterStr)) {
    const p = filterStr.split('-');
    const my = '/' + p[1] + '/' + p[0];
    if (targetDateStr.indexOf(my) !== -1) return true;
  }
  // Format DD/MM/YYYY -> YYYY-MM-DD
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(filterStr)) {
    const p = filterStr.split('/');
    const ymd = p[2] + '-' + p[1] + '-' + p[0];
    if (targetDateStr.indexOf(ymd) !== -1) return true;
  }
  return false;
}

function normalizeDateToYMD(dateVal) {
  if (!dateVal) return null;
  if (dateVal instanceof Date && !isNaN(dateVal.getTime())) {
    const y = dateVal.getFullYear();
    const m = String(dateVal.getMonth() + 1).padStart(2, '0');
    const d = String(dateVal.getDate()).padStart(2, '0');
    return parseInt(y + m + d, 10);
  }
  const str = dateVal.toString().trim();
  if (!str) return null;

  // Format YYYY-MM-DD or YYYY/MM/DD
  const isoMatch = str.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (isoMatch) {
    const y = isoMatch[1];
    const m = isoMatch[2].padStart(2, '0');
    const d = isoMatch[3].padStart(2, '0');
    return parseInt(y + m + d, 10);
  }

  // Format DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
  if (dmyMatch) {
    const d = dmyMatch[1].padStart(2, '0');
    const m = dmyMatch[2].padStart(2, '0');
    const y = dmyMatch[3];
    return parseInt(y + m + d, 10);
  }

  // Fallback parseDateStrToDate
  const parsed = parseDateStrToDate(str);
  if (parsed && !isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const d = String(parsed.getDate()).padStart(2, '0');
    return parseInt(y + m + d, 10);
  }

  return null;
}

function isDateInRange(targetDateStr, startDateStr, endDateStr) {
  if (!targetDateStr) return false;
  if (!startDateStr && !endDateStr) return true;

  const targetYMD = normalizeDateToYMD(targetDateStr);
  if (!targetYMD) {
    if (startDateStr && matchesDateOrMonth(targetDateStr, startDateStr)) return true;
    if (endDateStr && matchesDateOrMonth(targetDateStr, endDateStr)) return true;
    return false;
  }

  let startYMD = startDateStr ? normalizeDateToYMD(startDateStr) : null;
  let endYMD = endDateStr ? normalizeDateToYMD(endDateStr) : null;

  // Smart Auto-swap jika tanggal mulai > tanggal selesai
  if (startYMD && endYMD && startYMD > endYMD) {
    const temp = startYMD;
    startYMD = endYMD;
    endYMD = temp;
  }

  if (startYMD && targetYMD < startYMD) return false;
  if (endYMD && targetYMD > endYMD) return false;

  return true;
}

function formatDisplayDateID(dateVal) {
  if (!dateVal) return '';
  const ymd = normalizeDateToYMD(dateVal);
  if (!ymd) return String(dateVal);
  const s = String(ymd);
  return s.substring(6, 8) + '/' + s.substring(4, 6) + '/' + s.substring(0, 4);
}

function getGlobalAttendanceList(searchKey, filterDept, startDateOrDateMonth, endDateOrPage, pageOrLimit, limit) {
  try {
    let startDate = startDateOrDateMonth || '';
    let endDate = '';
    let page = 1;
    let limitNum = 15;

    // Cek fleksibilitas signature lama (5 arg) vs baru (6 arg)
    if (typeof endDateOrPage === 'number' || (endDateOrPage !== undefined && endDateOrPage !== null && !isNaN(endDateOrPage) && String(endDateOrPage).trim() !== '' && !String(endDateOrPage).includes('-') && !String(endDateOrPage).includes('/'))) {
      endDate = '';
      page = parseInt(endDateOrPage) || 1;
      limitNum = parseInt(pageOrLimit) || 15;
    } else {
      endDate = endDateOrPage || '';
      page = parseInt(pageOrLimit) || 1;
      limitNum = parseInt(limit) || 15;
    }

    let data = getSheetDataAsObjects(CONFIG.SHEET_ABSENSI) || [];
    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    
    data = data.map(item => {
      if (!item) return {};
      const emp = employees.find(e => e && e.nik === item.nik) || {};
      return {
        ...item,
        nama_karyawan: emp.nama || 'N/A',
        departemen: emp.departemen || '-'
      };
    }).reverse();

    if (searchKey && searchKey.trim() !== '') {
      const key = searchKey.toLowerCase().trim();
      data = data.filter(d => 
        (d.nama_karyawan && d.nama_karyawan.toLowerCase().includes(key)) || 
        (d.nik && d.nik.toLowerCase().includes(key))
      );
    }

    if (filterDept && filterDept !== 'ALL') {
      data = data.filter(d => d.departemen === filterDept);
    }

    if ((startDate && startDate.trim() !== '') || (endDate && endDate.trim() !== '')) {
      data = data.filter(d => d.tanggal && isDateInRange(d.tanggal, startDate, endDate));
    }

    const totalRecords = data.length;
    const pageNum = parseInt(page) || 1;
    limitNum = parseInt(limitNum) || 15;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedData = data.slice(startIndex, startIndex + limitNum);

    return {
      success: true,
      data: paginatedData,
      total: totalRecords,
      totalPages: Math.ceil(totalRecords / limitNum),
      currentPage: pageNum
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function generateAttendancePDFReport(searchKey, filterDept, startDate, endDate) {
  try {
    let data = getSheetDataAsObjects(CONFIG.SHEET_ABSENSI) || [];
    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    
    data = data.map(item => {
      if (!item) return {};
      const emp = employees.find(e => e && e.nik === item.nik) || {};
      return {
        ...item,
        nama_karyawan: emp.nama || 'N/A',
        departemen: emp.departemen || '-'
      };
    }).reverse();

    if (searchKey && searchKey.trim() !== '') {
      const key = searchKey.toLowerCase().trim();
      data = data.filter(d => 
        (d.nama_karyawan && d.nama_karyawan.toLowerCase().includes(key)) || 
        (d.nik && d.nik.toLowerCase().includes(key))
      );
    }

    if (filterDept && filterDept !== 'ALL') {
      data = data.filter(d => d.departemen === filterDept);
    }

    if ((startDate && startDate.trim() !== '') || (endDate && endDate.trim() !== '')) {
      data = data.filter(d => d.tanggal && isDateInRange(d.tanggal, startDate, endDate));
    }

    let filterInfo = [];
    if (filterDept && filterDept !== 'ALL') filterInfo.push('Departemen: ' + filterDept);
    else filterInfo.push('Departemen: Semua');

    if (startDate && startDate.trim() !== '' && endDate && endDate.trim() !== '') {
      filterInfo.push('Periode: ' + formatDisplayDateID(startDate) + ' s/d ' + formatDisplayDateID(endDate));
    } else if (startDate && startDate.trim() !== '') {
      filterInfo.push('Periode: Mulai ' + formatDisplayDateID(startDate));
    } else if (endDate && endDate.trim() !== '') {
      filterInfo.push('Periode: Hingga ' + formatDisplayDateID(endDate));
    } else {
      filterInfo.push('Periode: Semua Tanggal');
    }

    if (searchKey && searchKey.trim() !== '') filterInfo.push('Pencarian: "' + searchKey + '"');

    let htmlContent = '<div style="font-family:Arial, sans-serif; padding:15px; color:#1e293b;">';
    htmlContent += '<h2 style="text-align:center; color:#1e1b4b; margin:0 0 5px 0;">THE BALCONE SUITES & RESORT</h2>';
    htmlContent += '<h4 style="text-align:center; color:#4338ca; margin:0 0 5px 0;">LAPORAN REKAPITULASI RIWAYAT PRESENSI</h4>';
    htmlContent += '<p style="text-align:center; font-size:11px; color:#64748b; margin:0 0 15px 0;">' + filterInfo.join(' | ') + ' &bull; Total Baris: ' + data.length + '</p>';
    
    htmlContent += '<table border="1" cellpadding="5" cellspacing="0" style="width:100%; border-collapse:collapse; font-size:10px; border-color:#cbd5e1;">';
    htmlContent += '<tr style="background-color:#1e1b4b; color:white; font-size:9.5px; text-transform:uppercase;">' +
      '<th style="width:25px; text-align:center;">No</th>' +
      '<th>Tanggal</th>' +
      '<th>NIK</th>' +
      '<th>Nama Karyawan</th>' +
      '<th>Departemen</th>' +
      '<th style="text-align:center;">Jam Masuk</th>' +
      '<th style="text-align:center;">Jam Pulang</th>' +
      '<th style="text-align:center;">Status</th>' +
      '<th style="text-align:center;">Terlambat</th>' +
      '</tr>';

    if (data.length === 0) {
      htmlContent += '<tr><td colspan="9" style="text-align:center; padding:15px; color:#94a3b8;">Tidak ada data riwayat absensi yang sesuai filter.</td></tr>';
    } else {
      data.forEach((row, idx) => {
        const bgRow = (idx % 2 === 1) ? '#f8fafc' : '#ffffff';
        const statusColor = (row.status === 'Tepat Waktu') ? '#059669' : '#e11d48';
        htmlContent += '<tr style="background-color:' + bgRow + ';">' +
          '<td style="text-align:center;">' + (idx + 1) + '</td>' +
          '<td>' + (row.tanggal || '-') + '</td>' +
          '<td style="font-weight:bold; color:#312e81;">' + (row.nik || '-') + '</td>' +
          '<td>' + (row.nama_karyawan || '-') + '</td>' +
          '<td>' + (row.departemen || '-') + '</td>' +
          '<td style="text-align:center; font-family:monospace;">' + (row.jam_masuk || '-') + '</td>' +
          '<td style="text-align:center; font-family:monospace;">' + (row.jam_pulang || '-') + '</td>' +
          '<td style="text-align:center; font-weight:bold; color:' + statusColor + ';">' + (row.status || '-') + '</td>' +
          '<td style="text-align:center;">' + (row.keterlambatan_menit ? row.keterlambatan_menit + ' mnt' : '-') + '</td>' +
          '</tr>';
      });
    }

    htmlContent += '</table>';
    htmlContent += '<p style="text-align:right; font-size:9px; color:#94a3b8; margin-top:20px;">Dicetak otomatis oleh Sistem HR The Balcone Suites & Resort pada ' + (new Date().toLocaleString('id-ID')) + '</p>';
    htmlContent += '</div>';

    let periodSuffix = 'Semua';
    if (startDate && startDate.trim() !== '' && endDate && endDate.trim() !== '') {
      periodSuffix = startDate.trim() + '_sd_' + endDate.trim();
    } else if (startDate && startDate.trim() !== '') {
      periodSuffix = 'Mulai_' + startDate.trim();
    } else if (endDate && endDate.trim() !== '') {
      periodSuffix = 'Hingga_' + endDate.trim();
    }
    const safeDeptStr = (filterDept && filterDept !== 'ALL') ? filterDept + '_' : '';
    const safeFileTitle = ('Laporan_Absensi_Balcone_' + safeDeptStr + periodSuffix).replace(/[^a-zA-Z0-9]/g, '_');
    const blob = Utilities.newBlob(htmlContent, 'text/html', safeFileTitle + '.html');
    const pdfBlob = blob.getAs('application/pdf');
    const base64Pdf = Utilities.base64Encode(pdfBlob.getBytes());

    return {
      success: true,
      pdfBase64: 'data:application/pdf;base64,' + base64Pdf,
      fileName: safeFileTitle + '.pdf'
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function getHODAttendanceList(hodNik, searchKey, startDateOrDateMonth, endDateOrPage, pageOrLimit, limit) {
  try {
    let startDate = startDateOrDateMonth || '';
    let endDate = '';
    let page = 1;
    let limitNum = 15;

    // Cek kompatibilitas signature lama vs baru
    if (typeof endDateOrPage === 'number' || (endDateOrPage !== undefined && endDateOrPage !== null && !isNaN(endDateOrPage) && String(endDateOrPage).trim() !== '' && !String(endDateOrPage).includes('-') && !String(endDateOrPage).includes('/'))) {
      endDate = '';
      page = parseInt(endDateOrPage) || 1;
      limitNum = parseInt(pageOrLimit) || 15;
    } else {
      endDate = endDateOrPage || '';
      page = parseInt(pageOrLimit) || 1;
      limitNum = parseInt(limit) || 15;
    }

    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    const hod = employees.find(e => e && e.nik === hodNik);
    if (!hod) return { success: false, message: 'Data HOD tidak ditemukan.' };
    const dept = hod.departemen;

    let data = getSheetDataAsObjects(CONFIG.SHEET_ABSENSI) || [];
    data = data.map(item => {
      if (!item) return {};
      const emp = employees.find(e => e && e.nik === item.nik) || {};
      return {
        ...item,
        nama_karyawan: emp.nama || 'N/A',
        departemen: emp.departemen || '-'
      };
    }).reverse();

    // Data isolation: hanya staf di departemen HOD
    data = data.filter(d => d.departemen === dept);

    if (searchKey && searchKey.trim() !== '') {
      const key = searchKey.toLowerCase().trim();
      data = data.filter(d => 
        (d.nama_karyawan && d.nama_karyawan.toLowerCase().includes(key)) || 
        (d.nik && d.nik.toLowerCase().includes(key))
      );
    }

    if ((startDate && startDate.trim() !== '') || (endDate && endDate.trim() !== '')) {
      data = data.filter(d => d.tanggal && isDateInRange(d.tanggal, startDate, endDate));
    }

    const totalRecords = data.length;
    const pageNum = parseInt(page) || 1;
    limitNum = parseInt(limitNum) || 15;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedData = data.slice(startIndex, startIndex + limitNum);

    return {
      success: true,
      data: paginatedData,
      total: totalRecords,
      departemen: dept,
      totalPages: Math.ceil(totalRecords / limitNum),
      currentPage: pageNum
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function generateHODAttendancePDFReport(hodNik, searchKey, startDate, endDate) {
  try {
    const employees = getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || [];
    const hod = employees.find(e => e && e.nik === hodNik);
    if (!hod) return { success: false, message: 'Data HOD tidak ditemukan.' };
    return generateAttendancePDFReport(searchKey, hod.departemen, startDate, endDate);
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function generatePDFReport(bulanTahun) {
  try {
    const kpiRes = calculateMonthlyKPI(bulanTahun);
    if (!kpiRes.success) return kpiRes;

    let htmlContent = '<h1 style="text-align:center; color:#1E3A8A;">THE BALCONE SUITES & RESORT</h1>';
    htmlContent += '<h3 style="text-align:center; color:#555;">LAPORAN KEHADIRAN & KPI KARYAWAN PERIODE CUT-OFF (' + bulanTahun + ')</h3>';
    htmlContent += '<p style="text-align:center; font-size:12px; color:#777;">Siklus Cut-Off Resmi: Tanggal 26 s/d Tanggal 25</p>';
    htmlContent += '<table border="1" style="width:100%; border-collapse:collapse; font-family:sans-serif; margin-top:15px;" cellpadding="6">';
    htmlContent += '<tr style="background-color:#1E3A8A; color:white;">' +
      '<th>NIK</th><th>Nama Karyawan</th><th>Departemen</th><th>Total Hadir</th><th>Terlambat</th><th>Skor KPI</th><th>Predikat</th>' +
      '</tr>';

    kpiRes.data.forEach(row => {
      htmlContent += '<tr>' +
        '<td>' + row.nik + '</td>' +
        '<td>' + row.nama + '</td>' +
        '<td>' + row.departemen + '</td>' +
        '<td style="text-align:center;">' + row.total_hadir + '</td>' +
        '<td style="text-align:center;">' + row.total_terlambat + '</td>' +
        '<td style="text-align:center; font-weight:bold;">' + row.skor_kpi_persen + '</td>' +
        '<td style="text-align:center;">' + row.predikat + '</td>' +
        '</tr>';
    });
    htmlContent += '</table>';

    const blob = Utilities.newBlob(htmlContent, 'text/html', 'Laporan_Balcone_' + bulanTahun.replace('/', '_') + '.html');
    const pdfBlob = blob.getAs('application/pdf');
    const base64Pdf = Utilities.base64Encode(pdfBlob.getBytes());

    return {
      success: true,
      pdfBase64: 'data:application/pdf;base64,' + base64Pdf,
      fileName: 'Laporan_Kehadiran_Balcone_' + bulanTahun.replace('/', '_') + '.pdf'
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function getOfficeSettings() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_PENGATURAN);
    const settings = sheet.getDataRange().getDisplayValues()[1] || ['-0.297491', '100.368819', '150', 'BALCONE-QR-2026', '12', '123456', '1000'];
    
    let lat = settings[0].toString().trim().replace(',', '.');
    let long = settings[1].toString().trim().replace(',', '.');

    if (lat === '-297.491') lat = '-0.297491';
    if (long === '100.368.819') long = '100.368819';

    return {
      success: true,
      settings: {
        lat: lat,
        long: long,
        radius: settings[2],
        qrCode: settings[3],
        pinPayroll: settings[5] || '123456',
        rateDendaDefault: settings[6] || '1000'
      }
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function saveOfficeSettings(lat, long, radius, qrCode, pinPayroll, rateDenda) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_PENGATURAN);
    
    sheet.getRange('A2:B2').setNumberFormat('@');
    
    let cleanLat = lat.toString().trim().replace(',', '.');
    let cleanLong = long.toString().trim().replace(',', '.');
    
    sheet.getRange(2, 1).setValue("'" + cleanLat);
    sheet.getRange(2, 2).setValue("'" + cleanLong);
    sheet.getRange(2, 3).setValue(radius.toString());
    sheet.getRange(2, 4).setValue(qrCode);
    if (pinPayroll) sheet.getRange(2, 6).setValue(pinPayroll.toString());
    if (rateDenda) sheet.getRange(2, 7).setValue(rateDenda.toString());
    
    SpreadsheetApp.flush();
    return { success: true, message: 'Pengaturan area kantor, PIN Payroll, & Denda berhasil diperbarui!' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function getRosterData(monthYear, filterDept) {
  try {
    const cutOff = getCutoffRange(monthYear);
    let karyawan = (getSheetDataAsObjects(CONFIG.SHEET_KARYAWAN) || []).filter(k => {
      if (!k) return false;
      const roleStr = (k.role || '').toString().toLowerCase();
      return k.status_akun === 'Approved' && !roleStr.includes('admin');
    });
    
    karyawan = karyawan.filter(emp => {
      if (!emp.tgl_resign || emp.tgl_resign === '') return true;
      return emp.tgl_resign >= cutOff.startIsoStr;
    });

    if (filterDept && filterDept !== 'ALL') {
      karyawan = karyawan.filter(k => k.departemen === filterDept);
    }

    const rosterList = getSheetDataAsObjects(CONFIG.SHEET_ROSTER) || [];
    const shifts = getSheetDataAsObjects(CONFIG.SHEET_SHIFT) || [];

    const filteredRoster = rosterList.filter(r => {
      if (!r || !r.tanggal) return false;
      return r.tanggal >= cutOff.startIsoStr && r.tanggal <= cutOff.endIsoStr;
    });

    const holidaysMap = getIndonesianHolidaysMap(cutOff.startDate, cutOff.endDate);

    return {
      success: true,
      karyawan: karyawan,
      roster: filteredRoster,
      shifts: shifts,
      holidays: holidaysMap,
      cutoff: {
        startIso: cutOff.startIsoStr,
        endIso: cutOff.endIsoStr
      }
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function saveBulkRoster(rosterItems) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetRoster = ss.getSheetByName(CONFIG.SHEET_ROSTER);
    const existingRoster = getSheetDataAsObjects(CONFIG.SHEET_ROSTER) || [];

    rosterItems.forEach(item => {
      const idx = existingRoster.findIndex(r => r && r.nik === item.nik && r.tanggal === item.tanggal);
      if (idx !== -1) {
        const rowNum = idx + 2;
        sheetRoster.getRange(rowNum, 4).setValue(item.id_shift);
        sheetRoster.getRange(rowNum, 5).setValue(item.status_hari || item.id_shift);
      } else {
        const newId = 'RST-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 100);
        sheetRoster.appendRow([
          newId, item.nik, item.tanggal, item.id_shift, item.status_hari || item.id_shift
        ]);
      }
    });

    SpreadsheetApp.flush();
    return { success: true, message: 'Jadwal Roster Shift berhasil disimpan!' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}