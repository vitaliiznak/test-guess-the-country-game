export function getRandomProperty(obj: any) {
    let selectedKey;
    let n = 0;
    for (const key in obj) {
      if (Math.random() < 1 / ++n) {
        selectedKey = key;
      }
    }
    return { key: selectedKey, value: obj[selectedKey!] };
  }


  export function getRandomElement(arr: Array<any>) {
    return arr[Math.floor(Math.random() * arr.length)];
  }