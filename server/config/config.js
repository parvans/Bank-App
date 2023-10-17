import mongoose from "mongoose";

const config = async () => {
   try {
      await mongoose.connect('mongodb+srv://parvan:7Q7d4OtPt6euO9xV@cluster0.pz5dn1r.mongodb.net/?retryWrites=true&w=majority')
      console.log("DBconected");

   } catch (error) {
      console.log("error", error);
   }
}

export default config;
//mongodb+srv://dinu:12345@cluster0.nnwjthv.mongodb.net/bankapp?retryWrites=true&w=majority    7Q7d4OtPt6euO9xV