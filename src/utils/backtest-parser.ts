export const parseBacktest = (content: string) => {
  const lines = content.split('\n')
  const result = [] as Array<{ key: string; value: any }>

  let isGot = false
  for (const line of lines) {
    if (line.includes('| Backtesting from')) {
      isGot = true
    }
    if (!isGot) {
      continue
    }
    const [key, value] = line
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((item) => item.trim())

    if (key && value) {
      result.push({
        key,
        value,
      })
    }

    if (line.includes('Market change')) {
      break
    }
  }

  return result
}
