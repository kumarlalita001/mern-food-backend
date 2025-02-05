import mongoose, { ConnectOptions } from 'mongoose';

// interface DBOptions extends ConnectOptions {
//     useNewUrlParser: boolean;
//     useUnifiedTopology: boolean;
// }

const connectDB = async (): Promise<void> => {
    try {
        // const options: DBOptions = {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // };

        console.log(process.env.MONGODB_URI,"uri");
        const connectInstance =  await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('ERROR in connection  MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;