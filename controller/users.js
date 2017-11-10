const userModel = require('../model/uploader');
const Scraper = require('./googlescraper');
const path = require('path');
const _ = require('lodash');
const request = require('request-promise');
const fs = require('fs');
const Promise = require('bluebird');
const Jimp = require('jimp');
const imageClass = require('../model');

let users = {}

//download path
const imgpath = path.join(__dirname, '/../downloads/');

// To skip Error: self signed certificate in certificate chain
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

module.exports = users;

users.get = get;
users.post = post;
users.put = put;
users.del = del;
users.serve = serve;
users.tags = getTags;

function get(req, res, next) {

    //save images from write stream
    let download = function (uri, filename, callback) {

        request.head(uri, function (err, res, body) {
            request(uri).pipe(fs.createWriteStream(path.join(imgpath, filename))).on('close', callback);
        });
    };

    let response = {};
    let google = new Scraper();
    google.list({
        keyword: req.params.name,
        num: 15,
        detail: true,
        nightmare: {
            show: false
        }
    })
        .then(function (result) {

            // image results from google.
            return result;
            // 
        })
        .then((result) => {
            let filePaths = [];
            let files = {};

            // save images from google.
            const promises = _.map(result, (img) => {
                const filename = req.params.name + '-' + Date.now() + '' + _.random(1, 9999) + '.jpg';
                filePaths.push({ tag: req.params.name, link: path.join('downloads', filename), file: filename });
                return new Promise.resolve(download(img.url, filename, function () {

                    console.log('done for: ' + filename);
                }));
            });

            Promise.all(promises)
                .then((data) => {
                    console.log('images saved');
                    return imageClass.saveImage(filePaths);

                })
                .then((saved) => {
                    response.images = result;
                    response.status = true;
                    res.json(response);
                })
                .catch((err) => {
                    console.log('error saving images.');
                });
        })
        .catch(function (err) {
            console.log('err', err);
        });
}

function serve(req, res, next) {
    let response = {};
    imageClass.serveImages(req.params.name)
        .then((images) => {
            if (images) {
                response.images = images;
                response.status = true;
                res.json(response);
            } else {
                response.images = [];
                response.status = true;
                res.json(response);
            }
        })
        .catch((err) => {
            console.log('cannot find images.', err);
        });
}

function getTags(req, res, next) {
    let response = {};
    imageClass.getTags()
        .then((result) => {
            if (result) {
                response.keys = result;
                response.status = true;
                res.json(response);
            } else {
                response.keys = [];
                response.status = false;
                res.json(response);
            }
        })
        .catch((err) => {
            console.log('cannot find images.', err);
        });
}

function post(req, res, next) {
    var response = {};
    response.name = req.body.name;
    res.json(response);
}

function put(req, res, next) {

    var response = {};
    response.name = req.body.name;
    res.json(response);
}

function del(req, res, next) {

    var response = {};
    response.name = req.body.name;
    res.json(response);
}
