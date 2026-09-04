import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

function mediaUploadPlugin(): Plugin {
  return {
    name: 'media-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString());
            const { fileName, fileData } = body;

            if (!fileName || !fileData) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing fileName or fileData' }));
              return;
            }

            // Extract base64 payload
            const matches = fileData.match(/^data:([A-Za-z0-9-+/]+);base64,(.+)$/);
            const base64Content = matches ? matches[2] : fileData;
            const buffer = Buffer.from(base64Content, 'base64');

            // Sanitize filename and create unique timestamped name
            const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
            const uniqueName = `${Date.now()}_${cleanName}`;
            
            const uploadDir = path.resolve(process.cwd(), 'public/uploads');
            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }

            const targetFilePath = path.join(uploadDir, uniqueName);
            fs.writeFileSync(targetFilePath, buffer);

            const publicUrl = `/uploads/${uniqueName}`;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ url: publicUrl, fileName: uniqueName }));
          } catch (err: unknown) {
            console.error('Upload handler error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            const msg = err instanceof Error ? err.message : 'Upload processing failed';
            res.end(JSON.stringify({ error: msg }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mediaUploadPlugin()],
})

