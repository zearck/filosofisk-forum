export interface Lecture {
  date: string; // ISO format YYYY-MM-DD
  time: string;
  speaker: string;
  title: string;
  description: string;
}

export const lectures: Lecture[] = [
  {
    date: '2026-02-16',
    time: '19:30',
    speaker: 'Jacob v. H. Holtermann, Ph.d., lektor i retsfilosofi, iCourts, KU',
    title: '\u201CBut you came to me\u201D \u2013 P\u00e5 jagt efter samfundskontrakten i Ukraine-krigens naturtilstand',
    description: 'Opl\u00e6gget handler om den internationale strafferets filosofiske grundlag og konkrete muligheder i dagens geopolitiske situation, hvor vi ofte nok h\u00f8rer, at magt er ret. Opl\u00e6gget tager afs\u00e6t i et aktuelt forskningsprojekt om kampen for retf\u00e6rdighed i krigen i Ukraine, b\u00e5de n\u00e5r det g\u00e6lder overholdelse af krigens love, og n\u00e5r det g\u00e6lder retf\u00e6rdighed for ofrene for de krigsforbrydelser, der s\u00e6rligt beg\u00e5s af Rusland.',
  },
  {
    date: '2026-03-10',
    time: '19:30',
    speaker: 'Lars Sandbeck, studielektor, Folkekirkens uddannelses- og videnscenter',
    title: 'Bliver selv den st\u00f8rste synder frelst?',
    description: 'En b\u00e6rende tanke i kristendommen er, at b\u00e5de Guds k\u00e6rlighed og frelservilje er universel og derfor g\u00e6lder alle mennesker. Ikke desto mindre har den officielle kirkelige trosl\u00e6re siden den tidlige middelalder h\u00e6vdet, at langt fra alle mennesker ender med at blive frelst. Betyder det noget for vores gudsforestilling, om alle eller kun nogle mennesker frelses?',
  },
  {
    date: '2026-03-23',
    time: '19:30',
    speaker: 'Michael Agerbo M\u00f8rch, Ph.d., lektor, Dansk Bibel-Institut',
    title: 'Frederik Stjernfelt og den danske, intellektuelle debat siden 1980\u2019erne',
    description: 'Frederik Stjernfelt er blevet kaldt sin generations vigtigste intellektuelle. Foredraget indkredser Stjernfelts virke gennem de tre titler \u201Cprofessor\u201D, \u201Cpolemiker\u201D og \u201Cpolyhistor\u201D og viser eksempler p\u00e5, hvilken markant indflydelse Stjernfelt har haft p\u00e5 dansk kulturliv siden midten af 1980\u2019erne.',
  },
  {
    date: '2026-04-28',
    time: '19:30',
    speaker: 'Thomas S\u00f8birk Pedersen, PhD & Dr. Phil, Professor, Roskilde University',
    title: '\u2019Finland eksisterer ikke\u2019 er en kendt konspirationsteori. Men hvad b\u00f8r vi stille op med konspirationsteorier?',
    description: 'Hvad kendetegner en konspirationsteori og hvordan vi kan inddele dem i sande, falske, skadelige hhv. gavnlige konspirationsteorier. Der er is\u00e6r de falske og skadelige konspirationsteorier der kalder p\u00e5 moralfilosofiske overvejelser.',
  },
  {
    date: '2026-05-04',
    time: '19:30',
    speaker: 'Anni Greve, lektor emerita, Roskilde Universitetscenter',
    title: 'G\u00e6stfrihed og oplysning \u2013 i m\u00f8det med Kina',
    description: 'Med magtskiftet i Washington har \u2019oplysningstiden\u2019 f\u00e5et en dramatisk aktualitet. Foredraget giver et indblik i forholdet mellem hospitalitet til den fremmede og den europ\u00e6iske oplysningstid, med fokus p\u00e5 Immanuel Kant og Jacques Derrida som samtalepartnere.',
  },
  {
    date: '2026-05-21',
    time: '19:30',
    speaker: 'Jonas Holst, Ph.D., Lektor i Filosofi, San Jorge Universitet, Zaragoza',
    title: 'Hinsides det menneskelige vilk\u00e5r: En filosofisk antropologisk kritik af humansf\u00e6rens udvidelse',
    description: 'Med afs\u00e6t i sp\u00f8rgsm\u00e5l som Hannah Arendt stiller i indledningen til Det menneskelige vilk\u00e5r (1958) ang\u00e5ende menneskehedens fremtidige \u201Cverdensl\u00f8shed\u201D, vil foredraget h\u00e6vde, at en af den europ\u00e6iske filosofi og kunsts grundbestr\u00e6belser best\u00e5r i at overskride de vilk\u00e5r, som vi er underlagt p\u00e5 jorden.',
  },
];

export function getNextLecture(): Lecture | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const lecture of lectures) {
    const lectureDate = new Date(lecture.date + 'T23:59:59');
    if (lectureDate >= today) {
      return lecture;
    }
  }
  return null;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  const days = ['s\u00f8ndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'l\u00f8rdag'];
  const months = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];
  const day = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day.charAt(0).toUpperCase() + day.slice(1)} den ${dayOfMonth}. ${month} ${year}`;
}
