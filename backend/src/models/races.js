import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  description: String,
  traits: [
    {
      name: { type: String, required: true },
      description: String
    }
  ],
  subraces: [
    {
      name: { type: String, required: true },
      description: String,
      traits: [
        {
          name: { type: String, required: true },
          description: String
        }
      ]
    }
  ]
});

export default mongoose.model('Race', schema);
