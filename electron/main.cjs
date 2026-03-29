const fs = require('fs');
const path = require('path');
const { app, BrowserWindow, protocol, net } = require('electron');
const { pathToFileURL } = require('url');

const isDev = !app.isPackaged;
const APP_PROTOCOL = 'app';
const EXPORT_ROOT = path.join(__dirname, '../out');

protocol.registerSchemesAsPrivileged([
  {
    scheme: APP_PROTOCOL,
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
    },
  },
]);

function isInsideExportRoot(targetPath) {
  const relativePath = path.relative(EXPORT_ROOT, targetPath);

  return (
    relativePath === '' ||
    (!relativePath.startsWith('..') && !path.isAbsolute(relativePath))
  );
}

function resolveStaticFile(requestUrl) {
  const { pathname } = new URL(requestUrl);
  const decodedPath = decodeURIComponent(pathname || '/');
  const trimmedPath = decodedPath.replace(/^\/+/, '').replace(/\/+$/, '');
  const candidates =
    trimmedPath === ''
      ? [path.resolve(EXPORT_ROOT, 'index.html')]
      : path.extname(trimmedPath)
        ? [path.resolve(EXPORT_ROOT, trimmedPath)]
        : [
            path.resolve(EXPORT_ROOT, trimmedPath, 'index.html'),
            path.resolve(EXPORT_ROOT, `${trimmedPath}.html`),
          ];

  for (const candidate of candidates) {
    if (
      isInsideExportRoot(candidate) &&
      fs.existsSync(candidate) &&
      fs.statSync(candidate).isFile()
    ) {
      return candidate;
    }
  }

  const notFoundPage = path.resolve(EXPORT_ROOT, '404.html');
  if (fs.existsSync(notFoundPage) && fs.statSync(notFoundPage).isFile()) {
    return notFoundPage;
  }

  return path.resolve(EXPORT_ROOT, 'index.html');
}

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1080,
    minHeight: 720,
    backgroundColor: '#f4eadb',
    title: '国男大冒险',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key === 'F12') {
      mainWindow.webContents.toggleDevTools();
      event.preventDefault();
    }
  });

  if (isDev) {
    void mainWindow.loadURL('http://localhost:3000');
  } else {
    void mainWindow.loadURL(`${APP_PROTOCOL}://-/`);
  }
}

app.whenReady().then(() => {
  if (!isDev) {
    protocol.handle(APP_PROTOCOL, (request) => {
      const filePath = resolveStaticFile(request.url);
      return net.fetch(pathToFileURL(filePath).toString());
    });
  }

  createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
