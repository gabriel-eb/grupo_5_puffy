if(!process.env.NODE_ENV){
    require('dotenv').config()
}
const path = require('path');
const { format } = require('util');
const { Storage } = require('@google-cloud/storage');

const gcpStorage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY
    }
});

const bucket = gcpStorage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

module.exports = (req, res, next) => {
    if (req.file){
        const blob = bucket.file(`${Date.now()}_img${path.extname(req.file.originalname)}`);
        const blobStream = blob.createWriteStream();
        blobStream.on('error', err => next(err));
        blobStream.on('finish', () => {
            const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            req.body.avatar = publicUrl;
            blobStream.end(req.file.buffer);
            next();
        });
    }
    next();
}

