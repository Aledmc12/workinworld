export interface RecursoBiblioteca {
  slug: string;
  tipo: string;
  autor: string;
  titulo: string;
  anio: number;
  corto: string;
  porQue?: string;
  url: string;
  estado: "verificado" | "preparacion";
}

export const recursosBiblioteca: RecursoBiblioteca[] = [
  {
    slug: "razavi-diamante-del-cuidado",
    tipo: "Capítulo",
    autor: "Shahra Razavi",
    titulo:
      "Regímenes de bienestar y regímenes de cuidado (El diamante del cuidado)",
    anio: 2007,
    corto:
      "Propone el «diamante del cuidado»: familias, mercado, Estado y sector comunitario como los lugares donde se produce el cuidado.",
    porQue:
      "Da un marco sencillo para preguntarse quién cuida en cada país o comunidad y con qué apoyo. Es una buena puerta de entrada al tema.",
    url: "https://repositorio.redalas.net/sites/default/files/2025-07/Adjunto%207%20-%20Shara%20Razavi%20El%20diamante%20del%20cuidado.pdf",
    estado: "verificado",
  },
  {
    slug: "nuevas-familias-nuevos-cuidados",
    tipo: "Libro",
    autor: "Isabel Cristina Jaramillo Sierra y Tary Cuyana Garzón Landínez",
    titulo:
      "Nuevas familias, nuevos cuidados: cómo redistribuir el cuidado dentro y fuera de los hogares del siglo XXI",
    anio: 2023,
    corto:
      "Cómo han cambiado las familias y por qué el derecho debe reconocer el cuidado y repartirlo mejor dentro y fuera de los hogares.",
    porQue:
      "Conecta el debate sobre el cuidado con el derecho colombiano. Ideal para clases de derecho de familia y derecho laboral.",
    url: "https://books.google.com.co/books/about/Nuevas_familias_nuevos_cuidados.html?id=rtGxEAAAQBAJ&redir_esc=y",
    estado: "verificado",
  },
  {
    slug: "razavi-unrisd",
    tipo: "Documento de trabajo",
    autor: "Shahra Razavi",
    titulo:
      "The Political and Social Economy of Care in a Development Context",
    anio: 2007,
    corto:
      "Documento de base de UNRISD sobre la economía del cuidado en países en desarrollo y las opciones de política pública.",
    porQue:
      "Es la fuente completa del capítulo traducido y un mapa amplio del debate, útil para cursos avanzados.",
    url: "https://cdn.unrisd.org/assets/library/papers/pdf-files/razavi-paper.pdf",
    estado: "verificado",
  },
];
