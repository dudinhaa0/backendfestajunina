function errorHandler(err, req, res, next) {
    console.error(err.stack);

    res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno no servidor'
    });
}

module.exports = errorHandler;