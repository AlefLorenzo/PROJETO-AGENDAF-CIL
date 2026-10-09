const telas = [1, 2, 3, 4].map(n => document.getElementById(`tela${n}`));
const barraProgresso = document.getElementById('barraProgresso');
const etapaTopo = document.getElementById('etapaTopo');
const servicos = [...document.querySelectorAll('.opcao-servico')];
const horarios = [...document.querySelectorAll('.horario')];
const dataInput = document.getElementById('data');
const nomeInput = document.getElementById('nome');

const agendamento = { servico: '', data: '', horario: '', nome: '' };

function mostrarTela(numero) {
  telas.forEach((tela, indice) => tela.classList.toggle('oculto', indice !== numero - 1));
  barraProgresso.style.width = `${numero * 25}%`;
  etapaTopo.textContent = numero === 4 ? 'CONCLUÍDO' : `ETAPA ${numero} DE 4`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarErro(id, mensagem) {
  document.getElementById(id).textContent = mensagem;
}

function dataLocalISO(data = new Date()) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

dataInput.min = dataLocalISO();
dataInput.value = dataLocalISO();

servicos.forEach(botao => {
  botao.addEventListener('click', () => {
    servicos.forEach(item => item.classList.remove('selecionado'));
    botao.classList.add('selecionado');
    agendamento.servico = botao.dataset.servico;
    mostrarErro('erroServico', '');
  });
});

document.getElementById('irData').addEventListener('click', () => {
  if (!agendamento.servico) {
    mostrarErro('erroServico', 'Selecione um serviço antes de continuar.');
    return;
  }
  atualizarHorarios();
  mostrarTela(2);
});

function atualizarHorarios() {
  agendamento.data = dataInput.value;
  agendamento.horario = '';
  horarios.forEach(botao => {
    botao.classList.remove('selecionado');
    botao.disabled = false;
  });

  const dica = document.getElementById('dicaHorario');
  if (!agendamento.data) {
    dica.textContent = 'Escolha a data para consultar os horários.';
    return;
  }

  const escolhida = new Date(`${agendamento.data}T00:00:00`);
  const hoje = new Date(`${dataLocalISO()}T00:00:00`);
  if (escolhida.getTime() === hoje.getTime()) {
    const agora = new Date();
    horarios.forEach(botao => {
      const [hora, minuto] = botao.dataset.horario.split(':').map(Number);
      if (hora * 60 + minuto <= agora.getHours() * 60 + agora.getMinutes()) {
        botao.disabled = true;
      }
    });
  }

  // Demonstração de indisponibilidade: às 10:30 não há vaga aos domingos.
  if (escolhida.getDay() === 0) {
    const horarioIndisponivel = document.querySelector('[data-horario="10:30"]');
    horarioIndisponivel.disabled = true;
    dica.textContent = 'Aos domingos, 10:30 está indisponível. Escolha outro horário.';
  } else {
    dica.textContent = 'Os horários riscados estão indisponíveis para a data escolhida.';
  }
}

dataInput.addEventListener('change', () => {
  atualizarHorarios();
  mostrarErro('erroData', '');
});

horarios.forEach(botao => {
  botao.addEventListener('click', () => {
    if (botao.disabled) return;
    horarios.forEach(item => item.classList.remove('selecionado'));
    botao.classList.add('selecionado');
    agendamento.horario = botao.dataset.horario;
    mostrarErro('erroData', '');
  });
});

document.getElementById('voltarServico').addEventListener('click', () => mostrarTela(1));

document.getElementById('irRevisao').addEventListener('click', () => {
  if (!dataInput.value) {
    mostrarErro('erroData', 'Selecione uma data para continuar.');
    return;
  }
  if (dataInput.value < dataLocalISO()) {
    mostrarErro('erroData', 'A data escolhida já passou. Selecione hoje ou uma data futura.');
    return;
  }
  if (!agendamento.horario) {
    mostrarErro('erroData', 'Selecione um horário disponível para continuar.');
    return;
  }

  agendamento.data = dataInput.value;
  document.getElementById('resumoServico').textContent = agendamento.servico;
  document.getElementById('resumoData').textContent = formatarData(agendamento.data);
  document.getElementById('resumoHorario').textContent = agendamento.horario;
  mostrarTela(3);
});

document.getElementById('voltarData').addEventListener('click', () => mostrarTela(2));

function formatarData(valor) {
  if (!valor) return '—';
  const [ano, mes, dia] = valor.split('-');
  return `${dia}/${mes}/${ano}`;
}

document.getElementById('confirmar').addEventListener('click', () => {
  agendamento.nome = nomeInput.value.trim();
  if (!agendamento.nome) {
    mostrarErro('erroNome', 'Informe seu nome completo antes de confirmar.');
    nomeInput.focus();
    return;
  }
  if (agendamento.nome.length < 2) {
    mostrarErro('erroNome', 'Digite um nome válido com pelo menos 2 caracteres.');
    nomeInput.focus();
    return;
  }

  mostrarErro('erroNome', '');
  const protocolo = `AF-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  document.getElementById('protocolo').textContent = protocolo;
  document.getElementById('finalNome').textContent = agendamento.nome;
  document.getElementById('finalServico').textContent = agendamento.servico;
  document.getElementById('finalData').textContent = formatarData(agendamento.data);
  document.getElementById('finalHorario').textContent = agendamento.horario;
  mostrarTela(4);
});

document.getElementById('novoAgendamento').addEventListener('click', () => {
  agendamento.servico = '';
  agendamento.data = dataLocalISO();
  agendamento.horario = '';
  agendamento.nome = '';
  dataInput.value = dataLocalISO();
  nomeInput.value = '';
  servicos.forEach(item => item.classList.remove('selecionado'));
  horarios.forEach(item => {
    item.classList.remove('selecionado');
    item.disabled = false;
  });
  ['erroServico', 'erroData', 'erroNome'].forEach(id => mostrarErro(id, ''));
  atualizarHorarios();
  mostrarTela(1);
});
