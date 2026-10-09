# AgendaFácil

O **AgendaFácil** é um protótipo de sistema de agendamento desenvolvido com **HTML, CSS e JavaScript**. Ele permite que o usuário selecione um serviço, escolha uma data e um horário, revise os dados e visualize a confirmação do agendamento.

## Funcionalidades

- Seleção de serviço: corte de cabelo, manutenção ou consultoria.
- Escolha de data para o agendamento.
- Exibição e seleção de horários disponíveis.
- Validação de campos obrigatórios.
- Revisão das informações antes da confirmação.
- Opção de voltar e editar os dados.
- Tela de confirmação com protocolo.
- Layout responsivo para computadores e dispositivos móveis.
- Situações alternativas demonstrativas, como horário indisponível.

## Tecnologias utilizadas

- **HTML5** — estrutura das páginas.
- **CSS3** — estilos, layout e responsividade.
- **JavaScript** — navegação entre telas, validações e interações.

## Estrutura do projeto

```text
AgendaFacil/
├── index.html   # Estrutura das telas
├── style.css    # Estilos visuais
├── script.js    # Lógica e interações
└── README.md    # Documentação do projeto
```

## Como executar

1. Baixe ou clone este projeto.
2. Se o projeto estiver em um arquivo ZIP, extraia seu conteúdo.
3. Abra a pasta `AgendaFacil`.
4. Abra o arquivo `index.html` em um navegador, como Google Chrome, Microsoft Edge ou Firefox.
5. Navegue pelas telas e teste o fluxo de agendamento.

Não é necessário instalar dependências nem configurar um servidor para executar esta demonstração localmente.

## Fluxo de navegação

1. **Selecionar serviço:** escolha uma das opções disponíveis.
2. **Escolher data e horário:** informe a data e selecione um horário disponível.
3. **Revisar agendamento:** confira o serviço, a data e o horário e informe seu nome.
4. **Confirmar:** visualize a confirmação e o protocolo gerado.

## Validações e situações alternativas

- O sistema solicita a seleção de um serviço antes de avançar.
- A data não pode ser anterior ao dia atual.
- É necessário escolher um horário disponível.
- O nome é obrigatório para confirmar o agendamento.
- Em uma situação demonstrativa, o horário das 10:30 aparece indisponível aos domingos.
- O usuário pode voltar às etapas anteriores para revisar ou corrigir informações.

## Limitações atuais

Este projeto é um **protótipo front-end para fins acadêmicos**. Os dados não são enviados a um servidor nem salvos em um banco de dados. Os horários e o protocolo são demonstrativos; portanto, o sistema ainda não realiza reservas reais nem impede conflitos entre usuários diferentes.

## Possíveis melhorias futuras

- Criar uma API e integrar um banco de dados.
- Salvar os agendamentos de forma persistente.
- Consultar a disponibilidade real dos horários.
- Adicionar cadastro e contato do cliente.
- Enviar confirmação por e-mail ou mensagem.
- Criar uma área administrativa para gerenciar serviços e reservas.

## Autor

Projeto acadêmico **AgendaFácil**.

---

Desenvolvido com HTML, CSS e JavaScript.
