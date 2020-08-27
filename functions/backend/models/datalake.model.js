const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dumpSchema = new Schema(
    {
        artist_name: {type: String, required: true},
        contents: {type: Object, required: true},
    },
    {
        timestamps: true,
    });
const Dump = mongoose.model('datalake', dumpSchema, 'datalake');

module.exports = Dump;