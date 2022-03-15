import http from 'http';

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
  const pathname = normalizedURL.pathname.slice(1) || 'index.html';
  const parts = normalizedURL.pathname.slice(1).split('/');
  const query = Object.fromEntries(normalizedURL.searchParams.entries());

  let result = `
    <h1>Hello !!!</h1>
    <h3>Enter query parameters in the URL &#9757;</h3>
  `;

  if (pathname !== 'index.html' || Object.keys(query).length > 0) {
    result = JSON.stringify({
      parts,
      query,
    });
  }

  res.end(result);
});

server.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}/`);
});
