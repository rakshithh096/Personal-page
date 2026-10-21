module.exports = async function handler(req, res) {
  try {
    const r = await fetch('https://letterboxd.com/soapnspices/rss/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; personal-site)' }
    });
    if (!r.ok) throw new Error('status ' + r.status);
    const xml = await r.text();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    res.status(200).send(xml);
  } catch (e) {
    res.status(502).send('upstream error');
  }
};
