const runtime = (seconds) => {
  const pad = (s) => (s < 10 ? '0' + s : s);
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
};

module.exports = function (app) {
  function listRoutes() {
    let anuan = app._router.stack
      .filter(layer => layer.route)
      .map(layer => ({
        method: Object.keys(layer.route.methods).join(', ').toUpperCase(),
        path: layer.route.path
      }));
    return anuan.length;
  }

  app.get('/api/status', async (req, res) => {
    try {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'] || 'Unknown';
      const method = req.method;
      const endpoint = req.originalUrl;
      const time = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

      res.status(200).json({
        status: true,
        result: {
          status: "Aktif",
          waktu: time,
          ip_address: ip,
          user_agent: userAgent,
          method,
          endpoint,
          domain: req.hostname,
          runtime: runtime(process.uptime()),
          totalrequest: global.totalreq?.toString() || '0',
          totalfitur: listRoutes().toString(),
          total404: global.totalError404?.toString() || '0',
          total500: global.totalError500?.toString() || '0'
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  });
};
