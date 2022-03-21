import cEnviroment from '../constants/enviroment'

export const isProduction = () => (process.env.NODE_ENV === cEnviroment.production);