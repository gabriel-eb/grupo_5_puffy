const path = require('path');
const { format } = require('util');
const { Storage } = require('@google-cloud/storage');

const gcpStorage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n")
    }
});

const bucket = gcpStorage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

module.exports = (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const blob = bucket.file(`${Date.now()}_img${path.extname(req.file.originalname)}`);
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });
    blobStream.on('error', err => next(err));
    blobStream.on('finish', () => {
        blob.makePublic().then(() => {
            req.body.avatar = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            next();
        });
    });

    blobStream.end(req.file.buffer);
}

