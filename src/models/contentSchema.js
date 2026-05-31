import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  section: { 
    type: String, 
    required: true, 
    unique: true 
  },
  values: { 
    type: Object, 
    required: true 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
});


const Content = mongoose.model("Content", ContentSchema);

export default Content