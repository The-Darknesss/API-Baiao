require('dotenv').config();
const express = require('express');
const cors = require('cors');

// 1. Importação das Rotas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// 2. Inicialização do App
const app = express();

// 3. Middlewares (MUITO importante vir antes das rotas)
app.use(cors());
app.use(express.json());

// 4. Configuração das Rotas
app.use('/api', userRoutes);
app.use('/api', productRoutes);

// Rota de teste raiz
app.get('/', (req, res) => {
  res.json({ message: 'API rodando com sucesso!' });
});

// 5. Iniciando o Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});