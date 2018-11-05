module.exports = function (knex) {
  knex.schema.hasTable('users').then(e => {
    console.log(e)
    if(e) return
    console.log('create users')
    knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('login')
      table.string('hash')
      table.string('salt')
    }).then(console.log)
  })

  knex.schema.hasTable('sessions').then(e => {
    console.log(e)
    if(e) return
    console.log('create sessions')
    knex.schema.createTable('sessions', table => {
      table.string('login')
      table.string('token')
      table.timestamp('createdAt')
      table.timestamp('expiresAt')
    }).then(console.log)
  })
}