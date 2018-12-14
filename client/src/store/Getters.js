
export default {
  discordURL (state) {
    let obj = state.contact.find(c => c.title.includes('Discord'))
    if (obj) return obj.url
    return 'https://discord.gg/'
  },
  versionFileLoaded (state) {
    if (state.versionFile === false) return 'error' // lmao
    return typeof state.versionFile === 'object' && state.versionFile !== null
  }
}
