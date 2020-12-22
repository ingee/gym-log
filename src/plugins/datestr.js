function makeDateStr (year, month, day) {
  return (new Date(`${year}-${month}-${day}`)).toISOString().substr(0, 10)
}

function makeTodayStr () {
  return (new Date()).toISOString().substr(0, 10)
}

export default {
  install (Vue) {
    Vue.prototype.$dateStr = {
      makeDateStr,
      makeTodayStr
    }
  }
}
