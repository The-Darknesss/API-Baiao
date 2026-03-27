require('dotenv').config();
const express = require('express');
const cors = require('cors');

// 1. Importação das Rotas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const productCategoryRoutes = require('./routes/productCategoryRoutes');
const productSituationRoutes = require('./routes/productSituationRoutes');
const situationRoutes = require('./routes/situationRoutes');

// 2. Inicialização do App
const app = express();

// 3. Middlewares (MUITO importante vir antes das rotas)
app.use(cors());
app.use(express.json());
app.use('/api', productCategoryRoutes)

// 4. Configuração das Rotas
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', productCategoryRoutes);
app.use('/api', productSituationRoutes);
app.use('/api', situationRoutes);

// Rota de teste raiz
app.get('/', (req, res) => {
  res.json({ message: 'API rodando com sucesso!' });
});

// 5. Iniciando o Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});