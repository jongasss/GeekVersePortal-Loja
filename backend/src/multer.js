const multer = require("multer") // Importa multer, que deixa colocar imagens no servidor sem pesar no banco de dados

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./src/public") // Diz onde vai ser guardada as imagens (pasta public)
    },
    filename: function(req, file, cb) {
        let nome_sem_espacos = file.originalname.trim()
        let nome_array = nome_sem_espacos.split(" ")
        let nome_com_underline = nome_array.join("_")
        return cb(null, `${Date.now()}_${nome_com_underline}`) // Diz como vai ser o nome do arquiv (substitui espaços por underline)
    }
})

let upload = multer({ storage }) // Cria o negócio que deixa colocar as imagens nas pastas e com o nome ditos acima

module.exports = upload; // Exporta para usar em outros arquivos