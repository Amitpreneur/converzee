const fs = require("fs");
const script = require("./script");
const MODE = process.env.MODE;
const RESOURCE_URL = MODE === "DEV" ? `${process.env.DOMAIN_PATH}/` : `${process.env.HOSTURL}/static`;
const SUPPORT_URL = `${process.env.SUPPORT_PATH}/`;
module.exports = {
  ifcodeexists: (userid, next) => {
    const path = `./public/codes/${userid}.js`;
    if (fs.existsSync(path)) {
      return true;
    } else {
      return false;
    }
  },

  createfile: (userid, host, next) => {
    scriptdata = script.code();
    const path = `./client/dist/code/${userid}.js`; //`./public/codes/${userid}.js`;
    // const params = `window.userid="${userid}" \n\n window.myConversionKit_host="${host}"\n\n`;
    // const params2 = `window.mck_rUrl="${RESOURCE_URL}/static"\n\n`;
    const params = `window.userid="${userid}";window.myConversionKit_host="${host}";window.mck_rUrl="${RESOURCE_URL}";window.mck_support_URL="${host}/";`;
    fs.writeFile(path, params + script.code(), (err) => {
      if (err) {
        console.log("writeFile err", err);
        next(err, null);
      }
      else {
        console.log("writeFile else");
        next(null, true);
      }
    });
    // fs.writeFile(path, `window.userid="${userid}"`, err => {
    //   if (err) next(err);
    // });
    // fs.appendFile(path, "\n" + `window.host="${host}"`, function(err) {
    //   if (err) throw err;
    //   console.log("Saved!");
    // });

    // fs.appendFile(path, "\n" + script.code(), function(err) {
    //   if (err) throw err;
    //   console.log("Saved!");
    // });
  },
  updatefile: (userid, host, next) => {
    scriptdata = script.code();
    const path = `./client/dist/code/${userid}.js`;
    const params = `window.userid="${userid}";window.myConversionKit_host="${host}";window.mck_rUrl="${RESOURCE_URL}";window.mck_support_URL="${host}/";`;
    
    fs.readFile(path, 'utf8', function ( err, data ) {
      if(data) {
        console.log("params", params);
        fs.writeFile(path, params + script.code(), (err1) => {
          if (err) {
            console.log("writeFile err", err1);
            next(err1, null);
          }
          else {
            console.log("writeFile else");
            next(null, true);
          }
        });
      }
    } )
  }
};
