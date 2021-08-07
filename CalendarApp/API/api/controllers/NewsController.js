'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM NEWS'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM NEWS WHERE id = ?'
        db.query(sql, [req.params.newsId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    }
}