const JsConfuser = require("js-confuser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });

module.exports = function (app) {
  app.post("/encrypt/hard", upload.single("file"), async (req, res) => {
    try {
      const { apikey } = req.body;
      const file = req.file;

      if (!global.apikey || !global.apikey.includes(apikey)) {
        return res.status(401).json({ status: false, error: "Apikey invalid" });
      }

      if (!file) {
        return res.status(400).json({ status: false, error: "No file uploaded" });
      }

      const jsCode = fs.readFileSync(file.path, "utf-8");

      const result = await JsConfuser.obfuscate(jsCode, {
        target: "node",
        preset: "high",
        compact: true,
        minify: true,
        flatten: true,
        identifierGenerator: function () {
          const c = "素晴座素晴難DitssGanteng素晴座素晴難AsumaCantip素晴座素晴難";
          const d = (x) => x.replace(/[^a-zA-Z座Asuma素Multi素晴]/g, "");
          const e = (y) =>
            [...Array(y)]
              .map(() =>
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(
                  Math.random() * 52 | 0
                )
              )
              .join("");
          return d(c) + e(2);
        },
        renameVariables: true,
        renameGlobals: true,
        stringEncoding: true,
        stringSplitting: 0,
        stringConcealing: true,
        stringCompression: true,
        duplicateLiteralsRemoval: 1,
        stack: true,
        controlFlowFlattening: 1,
        opaquePredicates: 0.9,
        dispatcher: true,
        hexadecimalNumbers: true,
        movedDeclarations: true,
        objectExtraction: true,
        globalConcealing: true
      });

      const outFile = path.join("outputs", `enc-${file.originalname}`);
      fs.writeFileSync(outFile, result);

      res.download(outFile, `encrypted-${file.originalname}`, () => {
        fs.unlinkSync(file.path);
        fs.unlinkSync(outFile);
      });

    } catch (err) {
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
