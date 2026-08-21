const DATABASE_NAME = 'mango-training'
const DATABASE_VERSION = 1
const STORY_STORE = 'stories'

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'))
  })
}

function openDatabase() {
  if (!('indexedDB' in window)) {
    return Promise.reject(new Error('This browser does not support IndexedDB.'))
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)
    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(STORY_STORE)) {
        database.createObjectStore(STORY_STORE, { keyPath: 'key' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('Could not open story storage'))
  })
}

async function useStore(mode, operation) {
  const database = await openDatabase()
  try {
    const transaction = database.transaction(STORY_STORE, mode)
    const result = await operation(transaction.objectStore(STORY_STORE))
    await new Promise((resolve, reject) => {
      transaction.oncomplete = resolve
      transaction.onerror = () => reject(transaction.error ?? new Error('Story transaction failed'))
      transaction.onabort = () => reject(transaction.error ?? new Error('Story transaction was cancelled'))
    })
    return result
  } finally {
    database.close()
  }
}

function createKey() {
  if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID()
  return `story-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function storyTitle(story) {
  const labels = story?.label
  if (!labels || typeof labels !== 'object') return 'Untitled story'
  const preferred = labels.en?.[0]
  if (typeof preferred === 'string' && preferred.trim()) return preferred.trim()
  for (const values of Object.values(labels)) {
    const value = Array.isArray(values) ? values[0] : values
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return 'Untitled story'
}

export async function listTrainingStories() {
  const records = await useStore('readonly', (store) => requestResult(store.getAll()))
  return records.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
}

export function getTrainingStory(key) {
  return useStore('readonly', (store) => requestResult(store.get(key)))
}

export async function saveTrainingStory(story, key) {
  const existing = key ? await getTrainingStory(key) : null
  const now = new Date().toISOString()
  // Mango may expose Svelte proxy values. IndexedDB only accepts structured-cloneable data.
  const portableStory = JSON.parse(JSON.stringify(story))
  const record = {
    key: key || createKey(),
    title: storyTitle(portableStory),
    story: portableStory,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  }
  await useStore('readwrite', (store) => requestResult(store.put(record)))
  return record
}
