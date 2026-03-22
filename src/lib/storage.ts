// Storage utility for handling local and cloud storage of audio databases

export type StorageLocation = "local" | "cloud" | null;

export interface AudioDatabase {
  id: string;
  name: string;
  files: DatabaseFileData[];
  storageLocation: StorageLocation;
  cloudUrl?: string;
  createdAt: number;
  updatedAt: number;
  totalSize: number;
}

export interface DatabaseFileData {
  id: string;
  name: string;
  size: number;
  type: string;
  data?: ArrayBuffer;
  cloudUrl?: string;
  localPath?: string;
}

// IndexedDB setup for local storage
const DB_NAME = "SongbirdAI_Databases";
const DB_VERSION = 1;
const STORE_NAME = "audioFiles";

let db: IDBDatabase | null = null;

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

// Save file to IndexedDB
export const saveFileToLocal = async (
  fileId: string,
  file: File
): Promise<void> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const reader = new FileReader();
    reader.onload = () => {
      const fileData = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        data: reader.result,
        timestamp: Date.now(),
      };

      const request = store.put(fileData);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

// Get file from IndexedDB
export const getFileFromLocal = async (
  fileId: string
): Promise<DatabaseFileData | null> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(fileId);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
};

// Delete file from IndexedDB
export const deleteFileFromLocal = async (fileId: string): Promise<void> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(fileId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Get all files from IndexedDB
export const getAllFilesFromLocal = async (): Promise<DatabaseFileData[]> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
};

// Download files to user's computer
export const downloadToComputer = (files: DatabaseFileData[], dbName: string) => {
  files.forEach(async (file) => {
    const fileData = await getFileFromLocal(file.id);
    if (!fileData?.data) return;

    const blob = new Blob([fileData.data], { type: file.type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
};

// Export database as JSON
export const exportDatabaseMetadata = (database: AudioDatabase): void => {
  const metadata = {
    ...database,
    files: database.files.map((f) => ({
      id: f.id,
      name: f.name,
      size: f.size,
      type: f.type,
    })),
  };

  const blob = new Blob([JSON.stringify(metadata, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${database.name}_metadata.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Simulate cloud upload (would connect to real API in production)
export const uploadToCloud = async (
  files: File[],
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        clearInterval(interval);
        onProgress?.(100);
        // Simulate cloud URL
        const cloudUrl = `https://cloud.songbird.ai/databases/${Math.random()
          .toString(36)
          .substring(7)}`;
        resolve(cloudUrl);
      } else {
        onProgress?.(Math.min(progress, 99));
      }
    }, 300);
  });
};

// Get storage usage
export const getStorageUsage = async (): Promise<{
  used: number;
  total: number;
}> => {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return {
      used: estimate.usage || 0,
      total: estimate.quota || 0,
    };
  }
  return { used: 0, total: 0 };
};

// Format bytes to readable size
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};
