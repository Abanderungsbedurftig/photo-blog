const tmp = require('tmp');
const fs =require('fs');
var parseHttpHeader = require('parse-http-header');
const {Transform} = require('stream');

class StreamLength extends Transform{
    constructor(){
        super();
        this.bytes = 0;
    }

    _transform(data, encoding, cb){
        this.bytes += data.length;
        this.push(data);
        this.emit('progress');
        cb();
    }
}

const config = {
    maxFileSize: 5242880,
    allowedMimeTypes: "image/jpeg"
};
 
module.exports.getFileFromHttp = (req, dir) => {
    return new Promise((resolve, reject) => {
        let contentLength = parseHttpHeader(req.headers['content-length']) ? Number(parseHttpHeader(req.headers['content-length'])) : 0;
        let contentType =parseHttpHeader(req.headers['content-type']);
        let tempDir = dir + '/temp';
        fs.existsSync(tempDir) || fs.mkdirSync(tempDir); 
    
        if((typeof config.maxFileSize === 'number') && contentLength && contentLength > config.maxFileSize){
          reject(new Error('Слишком большое изображение'));
        }else if((contentType != config.allowedMimeTypes)){
          reject(new Error('Данный формат не поддерживается'));
        }else{
          const sendServerError = () => reject(new Error('Произошла ошибка'));
          tmp.file({dir: dir}, function _tempFileCreated(err, path, fd, cleanupCallback){
              if(err) return sendServerError();
              let wrStream = fs.createWriteStream(null, {fd});
              let aborted = false;
    
              const abortWithError = uploadError => {
                if(!aborted){
                  aborted = true;
                  if(uploadError.code !== 'EEXIST') return cleanupCallback(sendServerError);
                  sendServerError();
                }
              };
    
              wrStream.on('finish', () => {
                resolve(path);
              });
    
              wrStream.on('error', err => abortWithError(err));
    
              let counter = new StreamLength();
              counter.on('progress', () => {
                if(((contentLength && counter.bytes > contentLength) || (counter.bytes > config.maxFileSize)) && !aborted){
                  aborted = true;
                  cleanupCallback(() => reject(new Error('Слишком большое изображение')));
                }
              });
              req.on('abort', () => cleanupCallback());
              req.on('aborted', () => cleanupCallback());
              req.pipe(counter).pipe(wrStream);
          });
        }
    })
}  




