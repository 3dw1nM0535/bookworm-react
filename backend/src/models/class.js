import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
});

export default mongoose.model('CharacterClass', schema);
