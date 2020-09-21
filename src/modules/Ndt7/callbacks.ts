export const onclose = (evt: CloseEvent): void => {
  console.log('Connection closed, finished test.')
}

export const onerror = (evt: Event): void => {
  console.log(`Error encountered: ${evt}`)
}

export const onmessage = (evt: MessageEvent): void => {
  if (typeof evt.data === 'string') {
    try {
      console.log(JSON.parse(evt.data))
    }
    catch (SyntaxError) {
      console.log(evt.data)
    }
  }
}

export const onopen = (evt: Event): void => {
  console.log('Connection established, starting test...')
}

export default {
  onclose: onclose,
  onerror: onerror,
  onmessage: onmessage,
  onopen: onopen,
}
