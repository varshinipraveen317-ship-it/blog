const mongoose = require("mongoose");

/* ================= BLOG SCHEMA ================= */

const Schema = new mongoose.Schema({
 title:String,
 content:String,
 img_url:String,
});
/* ================= MODEL ================= */

const BlogModel = mongoose.model("Blog", Schema);

/* ================= EXPORT ================= */

module.exports = BlogModel;
