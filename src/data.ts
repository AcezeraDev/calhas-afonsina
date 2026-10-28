// Dados comerciais conferidos no site original (empresa.json do pacote).
export const empresa = {
  nome: 'Calhas Afonsina',
  fundacao: 2005,
  whatsapp: '5511955556283',
  whatsappLabel: '(11) 95555-6283',
  telefones: ['(11) 4368-8207', '(11) 4362-4109'],
  email: 'vendas@calhasafonsina.com.br',
  endereco: 'Rua Afonsina, 141 - Rudge Ramos',
  cidade: 'São Bernardo do Campo - SP',
  cep: '09633-000',
  area: 'Grande ABCD e proximidades',
  horarios: [
    ['Seg a Qui', '8h às 17h30'],
    ['Sexta', '8h às 17h'],
    ['Sábado', '8h às 12h'],
  ],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Afonsina+141+Rudge+Ramos+S%C3%A3o+Bernardo+do+Campo',
}

export const waLink = (texto = 'Olá! Vim pelo site e gostaria de um orçamento.') =>
  `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(texto)}`

export const nav = [
  { href: '#manifesto', label: 'Empresa' },
  { href: '#calhas', label: 'Calhas' },
  { href: '#trabalhos', label: 'Trabalhos' },
  { href: '#dicas', label: 'Dicas' },
  { href: '#contato', label: 'Contato' },
]

export const servicos = [
  'Calhas',
  'Rufos',
  'Pingadeiras',
  'Coifas',
  'Dutos',
  'Chaminés',
  'Exaustores',
  'Condutores',
  'Funilaria industrial',
  'Peças sob medida',
]

export const areas = [
  {
    titulo: 'Residencial',
    img: '/img/calhasafonsina-slider-home.jpg',
    texto:
      'Produção própria e instalação de calhas, rufos, pingadeiras, coifas para churrasqueiras, chaminés de fornos de pizza e muitos outros produtos.',
  },
  {
    titulo: 'Comercial',
    img: '/img/172878_7559f62dd513420bbad3524ab228760b.jpg',
    texto:
      'Coifas para cozinhas industriais, chaminés e exaustores feitos com maquinário próprio. Instalamos ou, se preferir, apenas fornecemos.',
  },
  {
    titulo: 'Industrial',
    img: '/img/172878_8ae385fa8d37444780beda4cde173383.jpg',
    texto:
      'Dutos, chaminés, exaustores, condutores e todo serviço necessário em chapas galvanizadas ou de alumínio, com equipe própria para instalação.',
  },
]

export type Perfil = {
  id: string
  nome: string
  finalidade: string
  detalhe: string
  // pontos do perfil em mm, desenhados como seção transversal
  pontos: [number, number][]
}

export const perfis: Perfil[] = [
  {
    id: 'colonial',
    nome: 'Colonial / Escadinha / Americana',
    finalidade:
      'Calha externa usada no beiral da telha para captação e condução de águas. Fixada diretamente na tabeira.',
    detalhe:
      'Os modelos têm a mesma finalidade; escolher entre eles é questão de estética. O corte é dimensionado conforme a necessidade.',
    pontos: [
      [0, 30], [0, 100], [70, 100], [70, 80], [100, 80], [100, 55], [130, 55], [130, 10], [122, 10], [122, 0],
    ],
  },
  {
    id: 'platibanda',
    nome: 'Platibanda / Quadrada',
    finalidade:
      'Calha embutida. Pode ser usada na canaleta entre a telha e o beiral ou em divisa com vizinho.',
    detalhe: 'O modelo e o corte dependem das circunstâncias e são avaliados pelo profissional instalador.',
    pontos: [
      [-14, 8], [0, 8], [0, 100], [120, 100], [120, 8], [134, 8],
    ],
  },
  {
    id: 'agua-furtada',
    nome: 'Água Furtada',
    finalidade:
      'Fica entre dois telhados. Recolhe a água do recorte entre uma caída e outra e despeja em outra calha.',
    detalhe: 'O tamanho depende da largura do vão entre as telhas.',
    pontos: [
      [0, 0], [55, 70], [65, 80], [75, 70], [130, 0],
    ],
  },
  {
    id: 'tampas',
    nome: 'Tampas e Bocais',
    finalidade:
      'Tampas (terminais ou cabeceiras) fecham o final da calha. O bocal é o conector instalado na calha para entrar no condutor.',
    detalhe: 'Fabricados sob medida para cada modelo de calha.',
    pontos: [
      [0, 0], [0, 50], [40, 50], [40, 100], [80, 100], [80, 50], [120, 50], [120, 0],
    ],
  },
]

export const materiais = [
  { nome: 'Chapa galvanizada', spec: 'nº 26 · 24 · 22' },
  { nome: 'Alumínio', spec: '0,70 mm' },
  { nome: 'Inox 304 escovado', spec: '0,50 mm' },
]

export type Obra = { img: string; titulo: string; categoria: 'Calhas e Rufos' | 'Dutos' | 'Coifas e Exaustores' }

// Fotos reais do site original. Títulos genéricos: o pacote não liga cada foto a um cliente.
export const obras: Obra[] = [
  { img: '/img/ai/obra-residencia-tratada.webp', titulo: 'Calhas em residência', categoria: 'Calhas e Rufos' },
  { img: '/img/calhasafonsina-duto.jpg', titulo: 'Chaminé em inox', categoria: 'Dutos' },
  { img: '/img/172878_7559f62dd513420bbad3524ab228760b.jpg', titulo: 'Coifa para churrasqueira', categoria: 'Coifas e Exaustores' },
  { img: '/img/ai/obra-calha-corrente-tratada.webp', titulo: 'Calha com corrente de chuva', categoria: 'Calhas e Rufos' },
  { img: '/img/172878_8ae385fa8d37444780beda4cde173383.jpg', titulo: 'Dutos industriais', categoria: 'Dutos' },
  { img: '/img/calhasafonsina-slider-home.jpg', titulo: 'Calha e condutor', categoria: 'Calhas e Rufos' },
  { img: '/img/172878_4578ca1fe4f5463e82e6cd015bdc3e22.jpg', titulo: 'Coifa e duto em inox', categoria: 'Coifas e Exaustores' },
  { img: '/img/DSC06964.jpg', titulo: 'Calha em chapa galvanizada', categoria: 'Calhas e Rufos' },
  { img: '/img/172878_cdaf7bdce25146e0b7c2581666bec5c1.jpg', titulo: 'Chaminé de forno de pizza', categoria: 'Dutos' },
  { img: '/img/172878_3d47fe61c262476298013b8f673ed96c.jpg', titulo: 'Dutos flexíveis', categoria: 'Dutos' },
  { img: '/img/DSC06202.jpg', titulo: 'Calha e rufo em fachada', categoria: 'Calhas e Rufos' },
]

export const dicas = [
  {
    titulo: 'Manutenção de calhas e rufos',
    itens: [
      'Verifique periodicamente calhas, rufos e condutores.',
      'Faça limpeza removendo detritos que se acumulam no fundo da calha.',
      'Revise as emendas e os pontos de fixação.',
      'Aplique um impermeabilizante.',
      'Não deixe a calha acumular água parada: isso leva à corrosão da chapa.',
    ],
  },
  {
    titulo: 'Instalação',
    itens: [
      'Para instalações novas, o mais indicado é um profissional fazer o projeto e a instalação.',
      'Evite remendos e trocas parciais: pontos de corrosão costumam indicar que a calha toda está comprometida.',
      'Evite subir no telhado com mau tempo. Até uma garoa compromete o serviço e a segurança.',
      'Uma emenda mal concluída pode causar infiltrações e umidade.',
      'Aproveite a estiagem para planejar manutenção, reformas e trocas.',
    ],
  },
]

export const faq = [
  {
    q: 'Qual a diferença entre calha e rufo?',
    a: 'A calha faz a captação da água da chuva. O rufo faz a proteção contra infiltrações.',
  },
  {
    q: 'Como é cobrado?',
    a: 'A cobrança é feita por metro linear. O preço por metro depende do corte.',
  },
  {
    q: 'Vocês fazem orçamento no local?',
    a: 'Sim. Agendamos a visita de um técnico montador quando o cliente quer também a mão de obra de instalação. É importante que a montagem seja feita por quem mediu, para não haver conflito de ponto de vista.',
  },
  {
    q: 'Quais materiais vocês usam?',
    a: 'Chapa galvanizada 26, 24 e 22, alumínio 0,70 mm e inox 304 escovado 0,50 mm. Outras espessuras sob consulta.',
  },
  {
    q: 'O que é corte?',
    a: 'É a soma das medidas das dobras. Uma calha quadrada com 10 cm de largura, 10 cm de profundidade nas duas laterais e abas de 1,5 cm soma 33 cm: corte 33. Vale também para rufo.',
  },
]
