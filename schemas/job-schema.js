const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const profileSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  level: {
      type: Number,
      default: 1
  },
  xp: {
      type: Number,
      default: 0
  }
})

module.exports = mongoose.model('job-schema', profileSchema)