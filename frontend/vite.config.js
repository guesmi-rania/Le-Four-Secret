export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://recettes-de-cuisine.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
