import mongoose,{Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";

export interface InterUser {
    email: string
    password: string
    _id?: mongoose.Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}

const userSchema = new Schema<InterUser>({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true
    }
},{
    timestamps: true
})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        const hashedPassword = await bcrypt.hash(this.password,10)
        this.password = hashedPassword
    }
    next();
})

const User = models?.User || model<InterUser>("User", userSchema)
export default User;