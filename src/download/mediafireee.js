module.exports = function (app) {
  app.get('/download/mediafire', async (req, res) => {
    try {
      const { apikey, url } = req.query;
      if (!global.apikey.includes(apikey)) {
        return res.json({ status: false, error: 'Apikey invalid' });
      }

      if (!url) {
        return res.json({ status: false, error: 'Url is required' });
      }

      const results = await global.fetchJson(`https://fastrestapis.fasturl.cloud/downup/mediafiredown?url=${url}`);

      if (!results || !results.result) {
        return res.status(500).json({ status: false, error: 'Failed to fetch result from external API' });
      }

      const {
        download,
        cookie,
        quickkey,
        filename,
        ready,
        created,
        description,
        size,
        privacy,
        password,
        hash,
        filetype,
        mimetype,
        owner,
        flag,
        permissions,
        revision,
        view,
        edit
      } = results.result;

      res.status(200).json({
        status: true,
        message: 'Success',
        result: {
          filename,
          size,
          mimetype,
          filetype,
          download_url: download,
          quickkey,
          hash,
          privacy,
          password_protected: password !== 'no',
          created,
          description,
          owner,
          ready,
          revision,
          view,
          edit,
          permissions,
          flag,
          cookie
        },
        source: 'Fast Rest API - FastURL'
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: `Internal Server Error: ${error.message}`
      });
    }
  });
}
