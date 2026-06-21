const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

const { getDb } = require('./db');
const app = express();
const port = process.env.PORT || 8000;

// গ্লোবাল মিডেলওয়্যারসমূহ
app.use(cors({
    origin: ["http://localhost:3000"], // নেক্সট.জিএস ফ্রন্টএন্ড পোর্ট
    credentials: true
}));
app.use(express.json());

//  ডাটাবেজ কালেকশন মিডেলওয়্যার (প্রতি রিকোয়েস্টে অটো কালেকশন ইনজেক্ট করবে)
app.use(async (req, res, next) => {
    try {
        const db = await getDb();

        //   কালেকশনগুলো এখানে ডিফাইন করা হলো
        req.db = {
            // books: db.collection("books"),

        };

        next();
    } catch (error) {
        res.status(500).json({ error: "Database connection failed via middleware" });
    }
});

// =======================================================================
//         কোড লেখার সময় req.db.collectionName ব্যবহার করবেন
// =======================================================================









// =======================================================================

// বেস হেলথ চেক রুট
app.get('/', (req, res) => {
    res.send('ShelfParcel Serverless-Ready Core Engine is running active and clean!');
});

// লোকাল পিসির ডেভলপমেন্ট রানার কন্ট্রোল
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(` Back-end Terminal active on local port http://localhost:${port}`);
    });
}

module.exports = app; // Vercel হোস্টিংয়ের জন্য রেডি এক্সপোর্ট