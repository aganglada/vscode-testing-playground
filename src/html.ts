export const getHtml = (url: string) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      html, body, iframe { 
        margin: 0; 
        padding: 0; 
        border: 0; 
        height: 100vh; 
        width: 100vw; 
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <iframe src="${url}"></iframe>
    <script>
      window.addEventListener("message", (e) => {
        window.dispatchEvent(new KeyboardEvent('keydown', JSON.parse(e.data)));
      }, false);
    </script>
  </body>
</html>
`