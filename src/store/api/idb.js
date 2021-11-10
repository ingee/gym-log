const DB_NAME = 'gym-log'
const DB_VER = 1
const STORE_NAME = 'logs'
let DB

export default {
  async getDB () {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB)
      }
      console.log('@idb: getDB()', DB)

      const request = window.indexedDB.open(DB_NAME, DB_VER)
      request.onerror = e => {
        console.log('@idb: opening.onError():', e)
        reject(e)
      }
      request.onsuccess = e => {
        console.log('@idb: getDB().onSuccess()')
        DB = e.target.result
        resolve(DB)
      }
      request.onupgradeneeded = e => {
        console.log('@idb: getDB().onUpgradeNeeded()')
        const db = e.target.result
        const store = db.createObjectStore(STORE_NAME,
          { keyPath: 'id', autoIncrement: true })
        store.createIndex('date', 'date', { unique: false })
        store.createIndex('workout', 'workout', { unique: false })
      }
    })
  },

  async getLogs (year) {
    const db = await this.getDB()
    return new Promise(resolve => {
      const logs = []

      const tx = db.transaction([STORE_NAME], 'readonly')
      tx.oncomplete = () => {
        console.log(`@idb: getLogs(${year}) OK. ${logs.length} results`)
        resolve(logs)
      }
      const store = tx.objectStore(STORE_NAME)
      const index = store.index('date')
      const yearBound = IDBKeyRange.bound(year + '-01-01', year + '-12-31')
      index.openCursor(yearBound).onsuccess = e => {
        const cursor = e.target.result
        if (cursor) {
          logs.push(cursor.value)
          cursor.continue()
        }
      }
    })
  },

  async putLog ({ date, workout, labels, sets }) {
    const db = await this.getDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_NAME], 'readwrite')
      tx.oncomplete = () => {
        console.log(`@idb: putLog(${date}, ${workout}) OK`)
        resolve()
      }
      tx.onerror = e => {
        console.log(`@idb: putLog(${date}, ${workout}) ERR=`, e)
        reject(e)
      }
      const store = tx.objectStore(STORE_NAME)
      const index = store.index('date')
      const dateBound = IDBKeyRange.only(date)
      const openCursorReq = index.openCursor(dateBound)
      openCursorReq.onsuccess = e => {
        const cursor = e.target.result
        if (cursor) {
          console.log('-     update existing one')
          if (cursor.value.workout === workout) {
            const newData = cursor.value
            newData.labels = labels
            newData.sets = sets
            cursor.update(newData)
          } else {
            cursor.continue()
          }
        } else {
          console.log('-     add new one')
          const req = store.put({ date, workout, labels, sets })
          req.onerror = e => {
            if (req.error.name === 'QuotaExceededError') {
              // Let's implement this latter
              //  - https://www.w3.org/TR/WebIDL-1/#quotaexceedederror
              //  - 2021-01-09 InGee
            }
          }
        }
      }
    })
  },

  async rmLog ({ date, workout }) {
    const db = await this.getDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_NAME], 'readwrite')
      tx.oncomplete = () => {
        console.log(`@idb: rmLog(${date}, ${workout}) OK`)
        resolve()
      }
      tx.onerror = e => {
        console.log(`@idb: rmLog(${date}, ${workout}) ERR: ${e}`)
        reject(e)
      }
      const store = tx.objectStore(STORE_NAME)
      const index = store.index('date')
      const range = IDBKeyRange.only(date)
      index.openCursor(range).onsuccess = e => {
        const cursor = e.target.result
        if (cursor) {
          if (cursor.value.workout === workout) {
            console.log(`@idb: rmLog(${date}, ${workout}) found`)
            cursor.delete()
          }
          cursor.continue()
        }
      }
    })
  }
}
