export type IngredientGroup = {
  title: string;
  items: string[];
};

export type Recipe = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  category: string;
  time: string;
  yield: string;
  difficulty: "Fácil" | "Intermediário";
  ingredients: IngredientGroup[];
  steps: string[];
  chefTip: string;
  sellingTip: string;
  storage: string;
};

export const recipes: Recipe[] = [
  {
    slug: "brownie-recheado",
    name: "Brownie recheado",
    shortName: "Brownie",
    description: "Casquinha fina, interior úmido e uma camada generosa de brigadeiro cremoso.",
    image: "/receitas/brownie.webp",
    category: "Chocolate",
    time: "1h20",
    yield: "16 unidades",
    difficulty: "Fácil",
    ingredients: [
      {
        title: "Massa",
        items: [
          "200 g de chocolate meio amargo picado",
          "120 g de manteiga sem sal",
          "3 ovos",
          "1 xícara (chá) de açúcar",
          "¾ de xícara (chá) de farinha de trigo",
          "2 colheres (sopa) de cacau em pó",
          "1 pitada de sal",
        ],
      },
      {
        title: "Recheio",
        items: [
          "1 caixa de leite condensado (395 g)",
          "½ caixa de creme de leite (100 g)",
          "2 colheres (sopa) de cacau em pó",
          "1 colher (sopa) de manteiga",
        ],
      },
    ],
    steps: [
      "Aqueça o forno a 180 °C e forre uma forma de aproximadamente 20 × 30 cm com papel-manteiga.",
      "Derreta o chocolate com a manteiga em intervalos curtos no micro-ondas, mexendo até obter um creme liso. Deixe amornar.",
      "Misture os ovos e o açúcar apenas até incorporar. Junte o chocolate derretido.",
      "Peneire a farinha, o cacau e o sal sobre a mistura. Mexa com uma espátula somente até a massa ficar uniforme.",
      "Espalhe na forma e asse por 22 a 28 minutos. A superfície deve formar casquinha e o centro permanecer levemente úmido.",
      "Para o recheio, cozinhe todos os ingredientes em fogo baixo, mexendo sempre, até atingir ponto de brigadeiro cremoso. Deixe esfriar.",
      "Com o brownie completamente frio, corte-o ao meio na horizontal ou divida a placa em duas partes iguais. Espalhe o brigadeiro e cubra com a outra parte.",
      "Leve à geladeira por 30 minutos para firmar e corte em 16 quadrados com uma faca limpa.",
    ],
    chefTip: "Não espere o palito sair totalmente seco: esse é o segredo para um brownie úmido, e não um bolo de chocolate.",
    sellingTip: "Embale cada quadrado individualmente e deixe o recheio visível na lateral. Pese as unidades para manter o mesmo padrão.",
    storage: "Até 4 dias refrigerado, em recipiente bem fechado.",
  },
  {
    slug: "bolo-no-pote",
    name: "Bolo de chocolate no pote",
    shortName: "Bolo no pote",
    description: "Camadas de massa macia, calda suave e brigadeiro cremoso em uma porção pronta para vender.",
    image: "/receitas/bolo_no_pote.webp",
    category: "No pote",
    time: "1h15",
    yield: "10 potes de 200 ml",
    difficulty: "Fácil",
    ingredients: [
      {
        title: "Massa",
        items: [
          "2 ovos",
          "1 xícara (chá) de açúcar",
          "½ xícara (chá) de óleo",
          "1 xícara (chá) de leite morno",
          "1½ xícara (chá) de farinha de trigo",
          "½ xícara (chá) de chocolate em pó 50%",
          "1 colher (sopa) de fermento químico",
        ],
      },
      {
        title: "Recheio e calda",
        items: [
          "2 caixas de leite condensado (790 g)",
          "2 caixas de creme de leite (400 g)",
          "5 colheres (sopa) de chocolate em pó 50%",
          "1 colher (sopa) de manteiga",
          "½ xícara (chá) de leite para umedecer",
          "Granulado para finalizar",
        ],
      },
    ],
    steps: [
      "Aqueça o forno a 180 °C. Unte e enfarinhe uma forma retangular média.",
      "Misture os ovos, o açúcar e o óleo. Acrescente o leite morno e, aos poucos, a farinha e o chocolate peneirados.",
      "Adicione o fermento por último, mexendo delicadamente. Asse por 30 a 35 minutos e deixe esfriar.",
      "Coloque leite condensado, creme de leite, chocolate e manteiga em uma panela de fundo grosso.",
      "Cozinhe em fogo baixo, mexendo sempre, até formar um brigadeiro cremoso que cai lentamente da espátula. Espere esfriar.",
      "Retire as bordas mais firmes do bolo e corte a massa em cubos pequenos ou esfarele em pedaços médios.",
      "Monte cada pote com uma fina camada de brigadeiro, bolo, um pouco de leite, mais brigadeiro e outra camada de bolo.",
      "Finalize com brigadeiro e granulado. Tampe, etiquete e mantenha refrigerado.",
    ],
    chefTip: "Umedeça sem encharcar. Coloque a calda aos poucos para a massa continuar leve e as camadas permanecerem bonitas.",
    sellingTip: "Use potes transparentes do mesmo tamanho e limpe as bordas antes de tampar. Uma montagem uniforme aumenta o valor percebido.",
    storage: "Até 4 dias na geladeira. Se acrescentar frutas frescas, reduza para 2 dias.",
  },
  {
    slug: "brigadeiro-gourmet",
    name: "Brigadeiro gourmet",
    shortName: "Brigadeiro",
    description: "Chocolate intenso, textura macia e acabamento elegante para festas, caixas e encomendas.",
    image: "/receitas/brigadeiro_gurmet.webp",
    category: "Docinhos",
    time: "40 min",
    yield: "25 unidades",
    difficulty: "Fácil",
    ingredients: [
      {
        title: "Brigadeiro",
        items: [
          "1 caixa de leite condensado (395 g)",
          "100 g de chocolate meio amargo picado",
          "½ caixa de creme de leite (100 g)",
          "1 colher (sopa) de cacau em pó",
          "1 colher (sopa) rasa de manteiga sem sal",
          "120 g de granulado ou raspas de chocolate",
        ],
      },
    ],
    steps: [
      "Coloque leite condensado, creme de leite, cacau e manteiga em uma panela de fundo grosso. Misture antes de ligar o fogo.",
      "Leve ao fogo baixo e mexa continuamente, alcançando também as laterais e o fundo da panela.",
      "Acrescente o chocolate picado quando a mistura estiver quente e continue mexendo até derreter.",
      "Cozinhe até a massa desgrudar do fundo e cair da espátula em bloco macio.",
      "Transfira para um prato levemente untado e cubra com filme em contato. Deixe esfriar por completo.",
      "Unte as mãos com uma quantidade mínima de manteiga e faça porções de aproximadamente 18 g.",
      "Enrole, passe no granulado ou nas raspas e coloque em forminhas.",
    ],
    chefTip: "Fogo baixo e movimento constante evitam que o brigadeiro queime ou fique açucarado.",
    sellingTip: "Padronize com uma balança e monte caixas com 4, 6 ou 12 unidades. Coberturas diferentes criam uma coleção sem mudar a massa-base.",
    storage: "Até 5 dias em local fresco ou refrigerado, sempre bem protegido.",
  },
  {
    slug: "trufas-de-chocolate",
    name: "Trufas de chocolate",
    shortName: "Trufas",
    description: "Ganache aveludada com cobertura delicada de cacau, perfeita para presentear ou vender.",
    image: "/receitas/trufas.webp",
    category: "Chocolate",
    time: "2h",
    yield: "24 unidades",
    difficulty: "Fácil",
    ingredients: [
      {
        title: "Ganache",
        items: [
          "300 g de chocolate meio amargo picado",
          "150 g de creme de leite",
          "1 colher (chá) de baunilha ou essência de rum (opcional)",
          "1 pitada de sal",
        ],
      },
      {
        title: "Finalização",
        items: [
          "½ xícara (chá) de cacau em pó",
          "Raspas de chocolate ou castanhas trituradas (opcional)",
        ],
      },
    ],
    steps: [
      "Coloque o chocolate picado em uma tigela seca.",
      "Aqueça o creme de leite até começar a formar pequenas bolhas nas bordas, sem deixar ferver intensamente.",
      "Despeje o creme sobre o chocolate, aguarde 1 minuto e misture do centro para fora até a ganache ficar brilhante.",
      "Adicione a baunilha e o sal. Cubra com filme em contato e leve à geladeira por cerca de 1 hora, até firmar.",
      "Retire pequenas porções com uma colher e modele rapidamente com as mãos frias.",
      "Passe cada trufa pelo cacau, pelas raspas ou pelas castanhas.",
      "Acomode em forminhas e mantenha refrigerada até o momento de servir.",
    ],
    chefTip: "Se a massa amolecer durante a modelagem, volte à geladeira por 10 minutos e continue depois.",
    sellingTip: "Varie a finalização para montar caixas sortidas. Identifique sabores com forminhas de cores diferentes.",
    storage: "Até 5 dias na geladeira, em recipiente fechado. Retire alguns minutos antes de consumir.",
  },
  {
    slug: "geladinho-gourmet",
    name: "Geladinho gourmet de chocolate",
    shortName: "Geladinho",
    description: "Base cremosa, sabor marcante de chocolate e preparo simples para produzir em quantidade.",
    image: "/receitas/geladinho.webp",
    category: "Gelados",
    time: "6h20",
    yield: "12 unidades",
    difficulty: "Fácil",
    ingredients: [
      {
        title: "Base",
        items: [
          "1 litro de leite integral gelado",
          "1 caixa de leite condensado (395 g)",
          "1 caixa de creme de leite (200 g)",
          "½ xícara (chá) de leite em pó",
          "½ xícara (chá) de chocolate em pó 50%",
          "100 g de chocolate meio amargo derretido",
          "12 saquinhos próprios para geladinho",
        ],
      },
    ],
    steps: [
      "Derreta o chocolate e misture-o ao creme de leite até formar uma ganache lisa.",
      "No liquidificador, coloque o leite, o leite condensado, o leite em pó, o chocolate em pó e a ganache.",
      "Bata por cerca de 1 minuto, somente até a mistura ficar homogênea.",
      "Deixe a espuma baixar por alguns minutos para facilitar o envase.",
      "Com um funil, distribua aproximadamente 120 ml em cada saquinho, deixando espaço para fechar.",
      "Retire o excesso de ar e dê um nó firme próximo ao líquido.",
      "Coloque no congelador, preferencialmente na posição horizontal, por no mínimo 6 horas.",
    ],
    chefTip: "Dissolver o chocolate no creme antes de bater ajuda a evitar pequenos grumos e deixa a textura mais uniforme.",
    sellingTip: "Produza lotes do mesmo volume e identifique sabor e data em cada unidade. Transporte sempre em caixa térmica.",
    storage: "Até 30 dias congelado, sem oscilações de temperatura.",
  },
  {
    slug: "pudim-caseiro",
    name: "Pudim de leite condensado",
    shortName: "Pudim",
    description: "Clássico, cremoso e coberto por uma calda de caramelo dourada.",
    image: "/receitas/pudin.webp",
    category: "Clássicos",
    time: "5h",
    yield: "10 fatias",
    difficulty: "Fácil",
    ingredients: [
      {
        title: "Calda",
        items: [
          "1 xícara (chá) de açúcar",
          "½ xícara (chá) de água quente",
        ],
      },
      {
        title: "Pudim",
        items: [
          "1 caixa de leite condensado (395 g)",
          "2 medidas da caixa de leite integral",
          "3 ovos",
          "1 colher (chá) de baunilha (opcional)",
        ],
      },
    ],
    steps: [
      "Derreta o açúcar em fogo baixo até obter um caramelo âmbar. Acrescente a água quente com cuidado e mexa até dissolver os torrões.",
      "Espalhe a calda no fundo e nas laterais de uma forma de pudim de 20 cm.",
      "Bata leite condensado, leite, ovos e baunilha apenas até misturar. Para um pudim mais liso, evite incorporar muito ar.",
      "Passe a mistura por uma peneira e despeje na forma caramelizada.",
      "Cubra com papel-alumínio e coloque a forma dentro de uma assadeira com água quente até a metade.",
      "Asse em forno preaquecido a 180 °C, em banho-maria, por 1h10 a 1h30, até as bordas firmarem e o centro ainda balançar levemente.",
      "Espere esfriar e leve à geladeira por pelo menos 3 horas.",
      "Passe uma faca fina na borda, aqueça rapidamente o fundo da forma e desenforme sobre um prato fundo.",
    ],
    chefTip: "Para um pudim liso, bata pouco e asse em temperatura moderada. Para mais furinhos, bata um pouco mais a mistura.",
    sellingTip: "Além do tamanho família, asse em formas individuais e informe claramente que o produto precisa ficar refrigerado.",
    storage: "Até 4 dias na geladeira, sempre tampado.",
  },
  {
    slug: "palha-italiana",
    name: "Palha italiana",
    shortName: "Palha italiana",
    description: "Brigadeiro macio com pedaços crocantes de biscoito e acabamento delicado de açúcar.",
    image: "/receitas/palha_italiana.webp",
    category: "Docinhos",
    time: "1h30",
    yield: "20 quadrados",
    difficulty: "Fácil",
    ingredients: [
      {
        title: "Massa",
        items: [
          "1 caixa de leite condensado (395 g)",
          "100 g de chocolate meio amargo picado",
          "2 colheres (sopa) de cacau em pó",
          "1 colher (sopa) de manteiga",
          "120 g de biscoito tipo maisena",
          "Açúcar de confeiteiro ou leite em pó para finalizar",
        ],
      },
    ],
    steps: [
      "Forre uma forma quadrada pequena com papel-manteiga e unte levemente.",
      "Quebre os biscoitos com as mãos, deixando pedaços de tamanhos diferentes. Reserve.",
      "Misture leite condensado, chocolate, cacau e manteiga em uma panela.",
      "Cozinhe em fogo baixo, mexendo sempre, até chegar ao ponto de brigadeiro firme e desgrudar do fundo.",
      "Desligue o fogo, junte os biscoitos e misture rapidamente para distribuí-los.",
      "Espalhe na forma, pressione e nivele com uma espátula levemente untada.",
      "Espere esfriar e leve à geladeira por 1 hora.",
      "Desenforme, corte em quadrados e passe no açúcar de confeiteiro ou no leite em pó.",
    ],
    chefTip: "Não triture demais o biscoito. Pedaços irregulares deixam o corte bonito e preservam a crocância.",
    sellingTip: "Corte com régua e faca limpa para padronizar. Embalagens transparentes valorizam o contraste dos pedaços de biscoito.",
    storage: "Até 5 dias em recipiente fechado, em local fresco ou refrigerado.",
  },
  {
    slug: "cookies-recheados",
    name: "Cookies recheados",
    shortName: "Cookies",
    description: "Bordas douradas, centro macio, gotas de chocolate e recheio cremoso.",
    image: "/receitas/cookies.webp",
    category: "Assados",
    time: "1h30",
    yield: "12 unidades",
    difficulty: "Intermediário",
    ingredients: [
      {
        title: "Massa",
        items: [
          "120 g de manteiga em ponto de pomada",
          "½ xícara (chá) de açúcar mascavo",
          "⅓ de xícara (chá) de açúcar refinado",
          "1 ovo",
          "1 colher (chá) de essência de baunilha",
          "2 xícaras (chá) de farinha de trigo",
          "½ colher (chá) de bicarbonato de sódio",
          "1 pitada de sal",
          "120 g de gotas de chocolate",
        ],
      },
      {
        title: "Recheio",
        items: [
          "180 g de brigadeiro firme, doce de leite ou creme de avelã gelado",
        ],
      },
    ],
    steps: [
      "Faça 12 pequenas porções de recheio sobre papel-manteiga e leve ao congelador por 20 minutos.",
      "Misture a manteiga com os dois açúcares até formar um creme. Junte o ovo e a baunilha.",
      "Acrescente farinha, bicarbonato e sal. Mexa somente até não restarem partes secas.",
      "Incorpore as gotas de chocolate e leve a massa à geladeira por 30 minutos.",
      "Divida a massa em 12 porções. Abra cada uma na palma da mão, coloque o recheio gelado no centro e feche bem.",
      "Distribua em assadeiras forradas, deixando bastante espaço entre os cookies.",
      "Asse em forno preaquecido a 180 °C por 12 a 15 minutos. As bordas devem dourar e o centro ainda parecer macio.",
      "Espere 10 minutos na assadeira antes de transferir para uma grade.",
    ],
    chefTip: "O descanso da massa evita que o cookie se espalhe demais. Retire do forno antes de o centro parecer totalmente assado.",
    sellingTip: "Informe o sabor do recheio em uma etiqueta e venda também em caixas com sabores variados.",
    storage: "Até 4 dias em pote bem fechado. Recheios lácteos exigem refrigeração.",
  },
  {
    slug: "torta-no-pote",
    name: "Torta de chocolate no pote",
    shortName: "Torta no pote",
    description: "Farofa crocante de biscoito, creme suave e ganache em camadas bem definidas.",
    image: "/receitas/torta_no_pote.webp",
    category: "No pote",
    time: "1h20",
    yield: "10 potes de 200 ml",
    difficulty: "Fácil",
    ingredients: [
      {
        title: "Base",
        items: [
          "200 g de biscoito tipo maisena",
          "80 g de manteiga derretida",
        ],
      },
      {
        title: "Creme",
        items: [
          "1 caixa de leite condensado (395 g)",
          "2 caixas de creme de leite (400 g)",
          "3 colheres (sopa) de leite em pó",
          "1 colher (sopa) de manteiga",
        ],
      },
      {
        title: "Ganache",
        items: [
          "250 g de chocolate meio amargo",
          "1 caixa de creme de leite (200 g)",
          "Raspas de chocolate para decorar",
        ],
      },
    ],
    steps: [
      "Triture os biscoitos até obter uma farofa e misture com a manteiga derretida.",
      "Espalhe a farofa em uma assadeira e asse a 180 °C por 8 minutos para ficar mais crocante. Deixe esfriar.",
      "Para o creme, misture leite condensado, uma caixa de creme de leite, leite em pó e manteiga.",
      "Cozinhe em fogo baixo até engrossar levemente. Desligue, misture a outra caixa de creme de leite e deixe esfriar.",
      "Derreta o chocolate e misture com o creme de leite até formar uma ganache brilhante.",
      "Monte os potes com farofa, creme branco, uma camada fina de ganache e repita.",
      "Finalize com ganache e raspas de chocolate.",
      "Tampe e leve à geladeira por pelo menos 40 minutos antes de servir.",
    ],
    chefTip: "Monte somente com todos os componentes frios; isso preserva as camadas e evita condensação dentro do pote.",
    sellingTip: "Use a mesma quantidade de cada creme em todos os potes. Um saco de confeitar ajuda a produzir rápido e sem sujar as bordas.",
    storage: "Até 4 dias na geladeira, bem tampada.",
  },
  {
    slug: "pao-de-mel",
    name: "Pão de mel recheado",
    shortName: "Pão de mel",
    description: "Massa aromática com mel e especiarias, recheio de doce de leite e cobertura de chocolate.",
    image: "/receitas/pao_de_mel.webp",
    category: "Assados",
    time: "2h",
    yield: "16 unidades",
    difficulty: "Intermediário",
    ingredients: [
      {
        title: "Massa",
        items: [
          "1 xícara (chá) de leite",
          "½ xícara (chá) de mel",
          "½ xícara (chá) de açúcar mascavo",
          "2 colheres (sopa) de manteiga derretida",
          "2 xícaras (chá) de farinha de trigo",
          "¼ de xícara (chá) de chocolate em pó 50%",
          "1 colher (chá) de canela em pó",
          "¼ de colher (chá) de cravo em pó",
          "1 colher (chá) de bicarbonato de sódio",
          "1 colher (chá) de fermento químico",
        ],
      },
      {
        title: "Recheio e cobertura",
        items: [
          "400 g de doce de leite firme",
          "500 g de cobertura de chocolate ao leite ou meio amargo",
        ],
      },
    ],
    steps: [
      "Aqueça o forno a 180 °C e unte forminhas de pão de mel ou uma forma retangular.",
      "Misture leite, mel, açúcar mascavo e manteiga até o açúcar começar a dissolver.",
      "Peneire farinha, chocolate, canela, cravo, bicarbonato e fermento.",
      "Junte os secos aos líquidos e mexa somente até obter uma massa uniforme.",
      "Preencha as forminhas até a metade e asse por 18 a 22 minutos. Se usar uma forma única, asse por cerca de 30 minutos.",
      "Espere esfriar, desenforme e corte cada unidade ao meio. Recheie com doce de leite e feche.",
      "Derreta a cobertura conforme as instruções da embalagem e banhe cada pão de mel, retirando o excesso.",
      "Deixe secar sobre papel-manteiga antes de embalar.",
    ],
    chefTip: "Não asse demais: o mel mantém a massa úmida, mas o excesso de forno pode deixá-la seca.",
    sellingTip: "Embale somente quando a cobertura estiver totalmente firme. Uma fita e uma etiqueta simples transformam a unidade em presente.",
    storage: "Até 7 dias bem embalado, em local fresco e protegido do calor.",
  },
];

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}
