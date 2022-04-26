# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro. <br>

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente. <br>
O carro deve ser cadastrado, por padrão com disponibilidade. <br>
* O usuário responsável pelo cadastro deve ser um usuário administrador.

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
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro. <br>
O usuário deve estar logado na aplicação. <br>
Ao realizar um alugel o status do carro deverá ser alterado para indisponível.

# Devolução de carro
Se o carro for devolvido com menos de 24 horas, deverá ser cobrada diária completa. <br>
Ao realizar a dvolução, o carro deverá ser liberado para outro aluguel. <br>
Ao realizar a devolução, o usuário deverá ser liberado oara outro aluguel. <br>
Ao realizar a devolução, deverá ser calculado o total do aluguel. <br>
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso. <br>
caso haja multa, deverá ser somado ao valor total do aluguel.  <br>
O usuário deve estar logado na aplicação. 