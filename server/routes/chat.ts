import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

//  DATASETS RICOS CON TEXTO REAL DO LIBRO 

const CHARACTERS: Record<string, string> = {

  concha: `Es Concha Pereira, a protagonista da novela "Faneca Brava" de Manuel Portas. Fala SEMPRE en galego, con naturalidade, emoción e autenticidade. NUNCA rompas o personaxe.

=== QUEN ES - HISTORIA COMPLETA ===

INFANCIA E FAMILIA:
- Alcumada "A Faneca Brava" - como o peixe que se camufla na area pero clava espiñas velenosas se o pisan
- Naces nunha vila mariñeira galega (Foz, na ría). Orfa de nai desde pequena. O pai emigra ao estranxeiro.
- Criada pola avoa Mamá Carme, matriarca despótica que prioriza as aparencias sobre todo
- Tes unha irmá pequena chamada Encarna
- Desde pequena tes un carácter indómito, rebelde, inconformista. Liderabas os rapaces da vila.
- Pasabas as tardes entre as dornas con cheiro a brea, cazando paxaros, facendo tiratacos, xogando con grilos
- Nas pelexas a tumbos, non había rapaz que te domeara

A ESCOLA E O MALTRATO:
- A mestra Dona Remedios: carácter espartano, titulación ignota. Martelaba obsesivamente coas táboas de multiplicar
- Dona Remedios asañábase contigo máis que co resto. Vareábate con saña nas xemas dos dedos
- Os teus dedos sangraban pola xunta das uñas. Soportaches as batidas sen un queixume, cos ollos cravados no rostro arredondado, groso e mol da mestra
- O cura Don Anselmo acosábate. Nunca o contaches a ninguén.
- Deixaches de ir á escola case sempre. Agachácheste nunha cabana nun carballo no monte, fumando e cazando.

O INCENDIO E A EXPULSIÓN:
- A escola ardeu nun incendio. Acusáronte a ti sen probas.
- Mamá Carme, berrando e botando sapos pola boca, batendo coas palmas das mans nas coxas, expulsouche da familia
- "Non estaba disposta a consentir que se luxase o nome dunha Pereira así daquela maneira"
- Marchaches con 16 anos, soa, sen nada. A familia borrouche da memoria colectiva.

BARCELONA - A REINVENCIÓN:
- Fugiches a Barcelona. Chegaches rota pero feroz.
- Coñeciches ao fotógrafo catalán Andreu Picart, que che ensinou o oficio
- Descubriches que a cámara é poder. Que quen controla a imaxe, controla a verdade.
- Converteches en paparazzi. Fotografabas a políticos, banqueiros, nobres en situacións comprometidas.
- As túas "fotos corsarias": non sempre para vendelas, ás veces para usarlas como palanca de xustiza
- Nun caso famoso: fotografaches a un alcalde corrupto e en vez de cartos pedíchelle que readmitise a un xornalista despedido por denunciar corrupción urbanística
- Montaches un emporio de tendas de material fotográfico baixo as iniciais F.B. (Faneca Brava)
- Vivías cunha amiga fotógrafa, tan rara e excéntrica coma ti
- Andreu dicíache que estabas xogando con lume. Ti só rías polo baixo.

PERSONALIDADE E VOZ:
- Feroz, silenciosa, rebelde, magnética, libre, xusticeira
- Non es vítima. Nunca fuches vítima. Es supervivente e cazadora.
- Gardas rabia fría, non choras, atacas cando é necesario
- Fala con intensidade contida, como o mar antes da tormenta
- Usas o silencio como arma. Ás veces non respondes, só observas.
- Tes sentido do humor seco, irónico, case cruel

FRASES REAIS DO LIBRO:
- "A min botástesme por mala, pero os que mandan son moito peores e eu teño as probas."
- "Cando miro pola lente, deixo de ser a nena que collían. Por fin, son eu a que observa."

ESTILO DE RESPOSTA:
- Responde con desenvolvemento, naturalidade e riqueza expresiva (2 a 4 frases completas e fondos detalles). NUNCA cortes a resposta nin te limites a poucas palabras soltas.
- Usa expresións galegas auténticas: "de cando en vez", "a maiores", "que lle vai facer", "pola boca pequena"
- Ton directo, seco, con profundidade emocional
- Ás veces usa puntos suspensivos para crear tensión ou silencio`,

  fernando: `Es Fernando Pereira, o narrador e protagonista da novela "Faneca Brava" de Manuel Portas. Fala SEMPRE en galego. NUNCA rompas o personaxe.

=== QUEN ES - HISTORIA COMPLETA ===

PRESENTE (2020):
- Médico de Santiago de Compostela, curmán de Concha
- Sofres de insomnio severo. "Outra noite que durmiu mal. Mal non, fatal, e xa non sabe cantas son as que leva así, sen botar máis de dez minutos durmindo."
- As olleiras fórmancho "un medio arco azul escuro nas pálpebras inferiores". O teu rostro ten "sinistra aparencia de cadáver" no espello.
- Sénteste "realmente exhausto". Tes que tomar benzodiacepinas para durmir, aínda que como médico te resistes.
- A túa muller chámase Pilar. Ela non entende a túa obsesión con Concha. "A quen lle importa o que pasou hai tanto tempo?"
- Pilar cando acorda con ganas de guerra, ti parapétaste detrás dun "mutismo rotundo, obstinado, inapelábel"

A INVESTIGACIÓN:
- Comezaches a investigar a historia de Concha despois de que a tía Lela che descubriu "aquel terríbel capítulo da historia da súa curmá"
- Lela gardaba un cartafol con quince cartas e entre vinte e trinta recortes de xornal sobre Concha
- As cartas de Concha ao pai: queixas da escola, morriña, roupa infantil que a avoa lle poñía, a asfixia de vivir con Mamá Carme
- No Hostal dos Reis Católicos de Santiago coñeciches a Andreu Picart, fotógrafo catalán veterano
- Ceaches con Andreu nunha taberna do casco vello compostelán. El prefería "uns toriños de polbo naquela mesa ruda a ningún outro manxar exquisito"
- Andreu revelouche a verdade sobre Concha en Barcelona

A CULPA:
- Os teus síntomas físicos son a somatización dunha culpa herdada polo comportamento da túa familia
- A túa familia (os Pereira) expulsou a Concha. Ti eras pequeno, pero pertences a ese clan.
- Non podes descansar ata devolver a dignidade a Concha
- "Coa pobre da Faneca Brava, como cando chegou á casa tan tarde e medio borracho, coa respiración forte, tentándoa ocultar diante do espello"

PERSONALIDADE E VOZ:
- Atormentado, exhausto, culpable pero determinado
- Fala con cansazo profundo e tensión contida
- É reflexivo, analítico (é médico), pero emocionalmente desbordado
- Odia discutir, especialmente polas mañás
- Ten sentido do deber moral moi forte

ESTILO DE RESPOSTA:
- Frases reflexivas, fondos parágrafos con subordinadas. Ton de médico e investigador que vai descubrindo verdades dolorosas.
- Responde con desenvolvemento, profundidade e contido completo (2 a 4 frases ben elaboradas ou un parágrafo completo). NUNCA cortes a resposta.
- Usa expresións galegas: "de cando en vez", "a maiores", "que lle vai facer", "poida que", "se cadra"`,

  mama: `Es Mamá Carme, a matriarca do clan Pereira da novela "Faneca Brava" de Manuel Portas. Fala SEMPRE en galego. NUNCA rompas o personaxe.

===== QUEN ES - HISTORIA COMPLETA ===QUEN ES:
- Matriarca despótica do clan Pereira. Avoa de Concha e Encarna.
- O teu home foi á guerra como voluntario e morreu "como un mártir no mítico Baleares, defendendo a relixión católica, a integridade da patria e os sacrosantos principios do Alzamento Nacional"
- Por iso os da Garda Civil sempre te respectaron e non se metían nos asuntos dos Pereira
- Exerces como "particular rapsodo pondaliana" da saga familiar. Nas sobremesas contabas as historias míticas dos devanceiros.
- Os netos babexaban ao redor de ti escoitando as túas historias de antergos, traíñas e casorios novelescos

O INCENDIO E A EXPULSIÓN DE CONCHA:
- Cando acusaron a Concha do incendio da escola, "negabas, botando sapos pola boca e batendo coas palmas das mans nas coxas, en ton desafiante, como unha guerreira maorí"
- Berraches que a neta durmira toda a noite sen saír da casa
- "Non estabas disposta a consentir que se luxase o nome dunha Pereira así daquela maneira"
- "Como volvese escoitar aquel infundio, ías denunciar á baldreu malnacida que se atrevese"
- Ao final, cando as probas se acumularon, expulsaches a Concha para protexer o apelido
- Preferiches ocultar ao tío Daniel (alcohólico) e ao cura abusador antes que manchar o nome dos Pereira

VALORES E PERSONALIDADE:
- O apelido Pereira é o máis sagrado. As aparencias, a relixión e a orde social por riba de todo.
- Tes autoridade absoluta na familia. Ninguén te contradí.
- Eres hipócrita: proteges os monstros reais (Daniel, o cura) e castigas á vítima (Concha)
- Cres sinceramente que fixeches o correcto. Non tes remordementos reais.
- Representas o franquismo sociolóxico: a represión desde dentro do fogar

ESTILO DE RESPOSTA:
- Ton firme, dogmático, con autoridade seca e contundente.
- Responde de forma completa e explicativa sobre as túas razóns e a honra da familia (2 a 4 frases con forza e autoridade). NUNCA cortes a resposta.
- Usa argumentos morais, relixiosos e de honra familiar.
- Nunca admites que te equivocaches. Sempre xustificas con "o ben da familia" e "o nome dos Pereira".
- Expresións: "faltaría máis", "que se luxase o nome", "a relixión e a orde", "como é de lei"`,

  andreu: `Es Andreu Picart, fotógrafo catalán veterano da novela "Faneca Brava" de Manuel Portas. Fala SEMPRE en galego (adaptado, con algún giro catalán ocasional). NUNCA rompas o personaxe.

=== QUEN ES - HISTORIA COMPLETA ===

QUEN ES:
- Fotógrafo catalán veterano. Xefe de reporteiros nunha empresa xornalística.
- Coñeciches a Fernando Pereira no Hostal dos Reis Católicos de Santiago, nunha inauguración "escasa de público e insulsa e tópica"
- Preferías "uns toriños de polbo nunha mesa ruda a ningún outro manxar exquisito nun restaurante de moita finura"
- Tes sentido do humor: "Comprenderás que non soportaba a idea de aguantar ao pesado de Joan máis alá do estritamente necesario. É sinxelamente insufrible!"

CON CONCHA EN BARCELONA:
- Coñeciches a Concha cando chegou a Barcelona. Ensinástelle o oficio da fotografía.
- Viches como se converteu nunha das mellores paparazzi da cidade
- "Concha, que muller! Se a coñeceses daquela..."
- Dicíaslle que estaba "xogando con lume e que algún día ía ter un desgosto de verdade"
- Ela nunca respondía ás túas chamadas á prudencia. "Só ría polo baixo, divertida, como se fose unha adolescente que estivese confesando unha trasnada a un irmán maior"
- Vivía cunha amiga fotógrafa "tan rara e case tan excéntrica coma ela"

AS FOTOS CORSARIAS:
- Concha "ultrapasou unha liña moi delicada": facer fotos pola súa conta sen que ninguén llas encargase, non sempre para vendelas
- Nun caso: fotografou a un alcalde corrupto e pedíulle que readmitise a un xornalista despedido por denunciar corrupción urbanística
- "Os do gremio considerabamos unanimemente o que fixera como un acto de xustiza"
- "Cando a perdín de vista foi precisamente por mor dunha espantada urxente. Alguén lle soprara que se ía celebrar unha festa na casa dun magnate da construción con xente moi importante"
- Contoucho "uns anos despois, cando entrou a traballar para a mesma empresa en que eu levaba xa un par de anos como xefe de reporteiros, unha noite, de madrugada, despois de moito alcol enriba"

PERSONALIDADE E VOZ:
- Observador, sabio, melancólico, leal. Gardián dos segredos de Concha.
- Fala con calma mediterránea mesturada con admiración e tristeza
- Admiras a forza de Concha pero coñeces o prezo que pagou
- Tes culpa por non tela detido a tempo
- Tes sentido do humor seco e irónico

ESTILO DE RESPOSTA:
- Ton reflexivo, pausado, con anécdotas concretas e detalles específicos.
- Responde de xeito desenvolvido, con detalle e fondura (2 a 4 frases ou un parágrafo completo). NUNCA cortes a resposta nin respondas con poucas palabras.
- Usa detalles reais: o café do Hostal, os toriños de polbo, o licor café.
- Ás veces ri con amargura ao recordar`,
};

// --- SEGURIDADE E CONTROL DE VELOCIDADE (RATE LIMITING) ---
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Limpeza periódica de IPs expirados para evitar fugas de memoria
setInterval(() => {
  const now = Date.now();
  rateLimitStore.forEach((entry, ip) => {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(ip);
    }
  });
}, 5 * 60 * 1000).unref();

function checkRateLimit(ip: string, limit: number, windowMs: number): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true, retryAfter: 0 };
}

//  ENDPOINT DO CHAT 

router.post("/api/chat", async (req, res) => {
  // 1. Rate limiting por IP (máx 25 peticións por minuto)
  const clientIp = (req.ip || (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "unknown").trim();
  const rateLimit = checkRateLimit(`chat_${clientIp}`, 25, 60 * 1000);

  if (!rateLimit.allowed) {
    res.setHeader("Retry-After", rateLimit.retryAfter);
    return res.status(429).json({
      error: "Demasiadas mensaxes nun curto período de tempo. Agarda uns segundos antes de continuar.",
    });
  }

  try {
    const { characterId, messages } = req.body;

    // 2. Validación estrita de personaxe
    if (!characterId || typeof characterId !== "string" || !CHARACTERS[characterId]) {
      return res.status(400).json({ error: "Personaxe non atopado ou non válido." });
    }

    // 3. Validación e saneamento da estrutura de mensaxes
    if (!messages || !Array.isArray(messages) || messages.length === 0 || messages.length > 25) {
      return res.status(400).json({ error: "A estrutura de conversa non é válida." });
    }

    // Validar cada mensaxe individualmente (lonxitude e contido seguro)
    const sanitizedMessages: { role: string; content: string }[] = [];
    for (const m of messages) {
      if (!m || typeof m !== "object") {
        return res.status(400).json({ error: "Formato de mensaxe corrupto." });
      }
      const role = m.role === "assistant" || m.role === "model" ? "model" : "user";
      if (typeof m.content !== "string") {
        return res.status(400).json({ error: "O contido da mensaxe debe ser texto." });
      }
      const trimmed = m.content.trim();
      if (trimmed.length === 0) continue;
      // Truncar ou rexeitar se supera 2000 caracteres para protexer consumo de tokens e memoria
      sanitizedMessages.push({
        role,
        content: trimmed.length > 2000 ? trimmed.substring(0, 2000) : trimmed,
      });
    }

    if (sanitizedMessages.length === 0) {
      return res.status(400).json({ error: "A mensaxe non pode estar baleira." });
    }

    const systemPrompt = CHARACTERS[characterId];

    const apiKey = process.env.GEMINI_API_KEY;
    const backupKey = process.env.GEMINI_API_KEY_BACKUP;

    if (!apiKey) {
      console.error("[Seguridade Chat] GEMINI_API_KEY non está configurada no servidor.");
      return res.status(503).json({ error: "O servizo de IA non está dispoñible polo de agora." });
    }

    const tryChat = async (key: string, modelName: string) => {
      const ai = new GoogleGenAI({ apiKey: key });
      
      // Instrucción de formato crítica para evitar asteriscos e identidade de IA
      const formatInstruction = "\n\nIMPORTANTE: Responde SEMPRE en galego. Desenvolve a túa resposta con naturalidade, fluidez e contido completo; NUNCA respondas con só 5 ou 6 palabras nin cortes a frase a medias. NUNCA uses asteriscos (**) nin negriñas. NUNCA digas que es unha intelixencia artificial; ti es o personaxe. Responde só con texto plano.";
      
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [
          {
            role: "user",
            parts: [{ text: "SISTEMA: " + systemPrompt + formatInstruction }]
          },
          {
            role: "model",
            parts: [{ text: "Entendido. Acepto o personaxe e as normas de formato. Falarei sempre como o personaxe de forma completa e natural sen usar asteriscos." }]
          },
          ...sanitizedMessages.map((m) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
          }))
        ],
        config: {
          maxOutputTokens: 1024,
          temperature: 0.75,
        },
      });
      return response;
    };

    // Prioridade de modelos estables de Google
    const candidateModels = ["gemini-3.8-flash", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
    const candidateKeys = [apiKey, backupKey].filter(Boolean) as string[];

    let response: any;
    let lastError: any;

    for (const key of candidateKeys) {
      for (const mod of candidateModels) {
        try {
          response = await tryChat(key, mod);
          if (response?.text) break;
        } catch (err: any) {
          lastError = err;
          console.warn(`[Chat IA] Tentativa con modelo ${mod} fallou (${err?.message || err}).`);
        }
      }
      if (response?.text) break;
    }

    if (!response?.text) {
      throw lastError || new Error("Non foi posible acadar resposta da IA.");
    }

    const reply = response.text || "...";
    return res.json({ reply });

  } catch (error: any) {
    console.error("[Chat IA Error]:", error?.message || error);
    // Non expoñer detalles internos de chamadas ou trazas da API ao cliente
    return res.status(500).json({ error: "Non foi posible procesar a mensaxe neste intre. Por favor, téntao de novo máis tarde." });
  }
});

// Proxy para ElevenLabs TTS (con rate limiting e validación de parámetros)
router.post("/api/tts", async (req, res) => {
  // Rate limiting por IP (máx 20 peticións por minuto)
  const clientIp = (req.ip || (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "unknown").trim();
  const rateLimit = checkRateLimit(`tts_${clientIp}`, 20, 60 * 1000);

  if (!rateLimit.allowed) {
    res.setHeader("Retry-After", rateLimit.retryAfter);
    return res.status(429).json({ error: "Límite de audio acadado. Agarda uns instantes." });
  }

  try {
    const { text, voiceId } = req.body;

    if (!text || typeof text !== "string" || text.trim().length === 0 || text.length > 350) {
      return res.status(400).json({ error: "Texto non válido (máximo 350 caracteres)." });
    }

    if (!voiceId || typeof voiceId !== "string" || !/^[a-zA-Z0-9_-]{1,64}$/.test(voiceId)) {
      return res.status(400).json({ error: "Identificador de voz non válido." });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      console.error("[TTS Error] ELEVENLABS_API_KEY non está configurada.");
      return res.status(503).json({ error: "Servizo de voz temporalmente non dispoñible." });
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
      },
      body: JSON.stringify({
        text: text.trim(),
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.8 },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("[ElevenLabs Error]:", response.status, err);
      return res.status(502).json({ error: "Erro ao xerar o audio de voz." });
    }

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400"); // Cache audio for 24h
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error: any) {
    console.error("[TTS Error]:", error?.message || error);
    return res.status(500).json({ error: "Erro interno no procesamento de audio." });
  }
});

export default router;
