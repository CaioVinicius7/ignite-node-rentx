# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro. <br>
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente. <br>
Não deve ser possível alterar a placa de um carro já cadastrado. <br>
O carro deve ser cadastrado, por padrão com disponibilidade. <br>
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF** 
Deve ser possível listar todos os carros disponíveis. <br>
Deve ser possível listar todos os carros disponíveis pelo nome da categoria. <br>
Deve ser possível listar todos os carros disponíveis pelo nome da marca. <br>
Deve ser possível listar todos os carros disponíveis pelo nome da carro. 

**RN**
O usuário não precisa estare logado no sistema.

# Cadastro de especificação do carro

**RF**
Deve ser possível cadastrar uma especificação para um carro. <br>
Deve ser possível listar todas as especificações. <br>
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado. <br>
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro. <br>
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro. <br>
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carros

**RF**
Deve ser possível cadastrar o aluguel.

**RN**
O aluguel deve ter duração miníma de 24 horas. <br>
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário. <br>
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro. 