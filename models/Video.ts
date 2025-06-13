import mongoose,{Schema, model, models} from "mongoose";

export const VIDEO_DIM = {
    width: 1080,
    height: 1920,

} as const;

export interface InterVideo{
    _id? : mongoose.Types.ObjectId
    title: string
    description: string
    videoUrl: string
    thumbnailUrl: string
    controls?: boolean
    transformation?: {
        height: number
        width: number
        quality: number

    }
}

const videoSchema = new Schema<InterVideo>({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    videoUrl:{
        type: String,
        required:true
    },
    thumbnailUrl:{
        type: String,
        required:true
    },
    controls:{
        type: Boolean,
        default: true
    },
    transformation:{
        height:{
            type: Number,
            default: VIDEO_DIM.height
        },
        width:{
            type: Number,
            default:VIDEO_DIM.width
        },
        quality:{
            type: Number,
            min: 1,
            max: 100
        }
    }

},{timestamps: true})

const Video = models?.Video || model<InterVideo>("Video", videoSchema)

export default Video