// boards-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const boards = new Schema({
    name: {
      type: String,
      required: true
    },
    background: {
      type: String,
      required: true
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    memberIds: [{
      type: Schema.Types.ObjectId,
      ref: 'users'
    }],
  }, {
    timestamps: true
  });

  return mongooseClient.model('boards', boards);
};
