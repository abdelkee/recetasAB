import mongoose, { connect, ConnectionStates } from 'mongoose';

const conn = {
    isConnected: 0
} as { isConnected: ConnectionStates }

export async function connectToDatabase() {
    if (conn.isConnected) return
    const db = await connect(process.env.MONGO_URL!)
    conn.isConnected = db.connections[0].readyState

    console.log('connected to db')
}

mongoose.set('strictQuery', true)