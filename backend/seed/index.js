import dotenv from 'dotenv';
import seed from "mongoose-seed";

import data from "./data.json";

dotenv.config();

seed.connect(process.env.MONGODB_URI, () => {
  seed.loadModels([
    'src/models/background',
    'src/models/races',
    'src/models/class',
  ]);

  seed.clearModels(['Background', 'CharacterClass', 'Race'], () => {
    seed.populateModels(data, () => {
      seed.disconnect();
    });
  });
});
