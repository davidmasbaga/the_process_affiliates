import mongoose from "mongoose";

const currentAffiliateIndexSchema = new mongoose.Schema({
    currentIndex: {
        type: Number,
        default: 0
    }
});

export const CurrentAffiliateIndexModel = mongoose?.models?.CurrentAffiliateIndex || mongoose.model("CurrentAffiliateIndex", currentAffiliateIndexSchema);
