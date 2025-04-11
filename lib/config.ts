const config = {
  database: {
    url: process.env.NODE_ENV === 'production' 
      ? process.env.POSTGRES_PRISMA_URL 
      : process.env.DATABASE_URL,
  },
  isProduction: process.env.NODE_ENV === 'production',
}

export default config; 