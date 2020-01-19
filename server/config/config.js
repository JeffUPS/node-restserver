// =====================
// Puerto
//======================

process.env.PORT = process.env.PORT || 3000;

// =====================
// Base de Datos
//======================

let ulrDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://cafe_user:HI52rrO9EBKibXJ7@cluster0-sutai.mongodb.net/cafe'
}

process.env.URLDB = urlDB;