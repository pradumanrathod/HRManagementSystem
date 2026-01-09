import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema= new mongoose.Schema(
    {
        name: { type:String, required: true},
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
        },
        password: {type:String, required:true},

        role:{
            type:String,
            enum: ["Admin", "HR", "Manager", "Employee"],
            default: "Employee",
        },

        isActive:{type:Boolean, default: true}, // doesnt delete the db permanently
    },
    {timestamps:true}  //shows time of creation and update
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
}


userSchema.index({ email: 1 });
export default mongoose.model("User", userSchema);