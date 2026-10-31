import http.server
import socketserver
import os
import sys

# Ensure UTF-8 output on Windows console
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

DEFAULT_PORT = 5173

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.json': 'application/json',
        '.svg': 'image/svg+xml',
    }

    def end_headers(self):
        # Disable cache to always get latest JS modules
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

os.chdir(os.path.dirname(os.path.abspath(__file__)))
class ThreadingServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True
    allow_reuse_address = True

port = DEFAULT_PORT
httpd = None

for try_port in [5173, 5174, 3000, 8000, 8080]:
    try:
        httpd = ThreadingServer(("", try_port), Handler)
        port = try_port
        break
    except OSError:
        continue

if not httpd:
    print("❌ Không mở được cổng nào từ 5173 đến 8080. Vui lòng đóng bớt ứng dụng đang chạy.")
    sys.exit(1)

print("=" * 60)
print(f"  🚀 DACONNECT LOCAL SERVER ĐANG CHẠY THÀNH CÔNG!")
print(f"  👉 Truy cập trình duyệt: http://localhost:{port}")
print("=" * 60)
print("  Nhấn Ctrl + C để dừng server bất kỳ lúc nào.\n")

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nĐã dừng server.")
