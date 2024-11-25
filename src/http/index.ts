// Utility function to check if the code is running on the client-side
export const isClient = () => typeof window !== 'undefined'

export { default as http } from './http'
