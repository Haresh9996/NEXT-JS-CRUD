const {username, password} = process.env
export const connectionStr = `mongodb+srv://haresh9669:${password}@cluster0.gu8xemu.mongodb.net/productData?retryWrites=true&w=majority&appName=Cluster0`

export const BASE_API_URL = process.env.NEXT_URL