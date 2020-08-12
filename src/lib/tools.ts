export function getValue (object: any, path: string) {
  let res;

  const pathParts = path.split('.');
  const cKey = pathParts.shift();

  function get (pObj: any, pKey: string) {
    let bracketEnd, res;
    const bracketStart = pKey.indexOf('[');

    if (bracketStart > -1) {
      bracketEnd = pKey.indexOf(']');
      const arrIndex = pKey.substr(
        bracketStart + 1,
        bracketEnd - bracketStart - 1
      );
      pKey = pKey.substr(0, bracketStart);
      const n = pObj[pKey];
      res = n ? n[arrIndex] : undefined;
    } else {
      res = pObj[pKey];
    }
    return res;
  }

  res = get(object, cKey || '');
  if (res) {
    while (pathParts.length) {
      res = get(res, pathParts.shift() || '');
    }
  }
  return res;
}

export class AsyncLocker {
  protected resolves: Array<() => void> = [];
  protected curLocks = 0;
  protected maxLocks = 1;

  constructor (maxLocks?: number) {
    if (maxLocks && maxLocks > 1) {
      this.maxLocks = maxLocks;
    }
  }

  public async join () {
    if (this.curLocks >= this.maxLocks) {
      await new Promise((resolve) => {
        this.resolves.push(resolve);
      });
    }
    this.curLocks++;
  }

  public leave () {
    let resolve;
    if (this.resolves.length > 0) {
      resolve = this.resolves.shift();
    }
    this.curLocks--;
    if (resolve) {
      resolve();
    }
  }
}

export function generateUuid () {
  return Date.now().toString(36) + '.' + Math.floor(Math.random() * 1e6 + 1e6).toString(36);
}
