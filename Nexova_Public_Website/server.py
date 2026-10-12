"""Small development server for the Nexova public website."""

from __future__ import annotations

import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


SITE_ROOT = Path(__file__).resolve().parent
HOST = "0.0.0.0"
DEFAULT_PORT = 8000


def get_port() -> int:
    """Return a valid port from the environment, or the default port."""
    raw_port = os.getenv("PORT", str(DEFAULT_PORT))
    try:
        port = int(raw_port)
    except ValueError as error:
        raise SystemExit(f"PORT must be a number, received: {raw_port!r}") from error

    if not 1 <= port <= 65535:
        raise SystemExit("PORT must be between 1 and 65535")
    return port


def main() -> None:
    """Serve this directory over HTTP for local and Codespaces previews."""
    port = get_port()
    handler = partial(SimpleHTTPRequestHandler, directory=str(SITE_ROOT))
    server = ThreadingHTTPServer((HOST, port), handler)
    print(f"Serving Nexova at http://localhost:{port}")
    print("Press Ctrl+C to stop.")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
