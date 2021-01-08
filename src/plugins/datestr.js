function makeDateStr (year, month, day) {
  return (new Date(`${year}-${month}-${day}`)).toISOString().substr(0, 10)
}

function makeTodayStr () {
  const tzOffset = new Date().getTimezoneOffset() * 60000
  const tzDate = new Date(Date.now() - tzOffset)
  return tzDate.toISOString().substr(0, 10)
}

export default {
  install (Vue) {
    Vue.prototype.$dateStr = {
      makeDateStr,
      makeTodayStr
    }
  }
}
