import { SITE_DESCRIPTION, SITE_TITLE } from './consts';

export const LOCALES = ['en', 'cs'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

interface WorkEntry {
  company: string;
  logo: string;
  from: string;
  to?: string;
  role: string;
  paragraphs: string[];
}

interface SiteCopy {
  languageCode: string;
  ogLocale: string;
  nav: {
    home: string;
    til: string;
    blog: string;
  };
  accessibility: {
    themeToggle: string;
    copyCode: string;
  };
  metadata: {
    siteTitle: string;
    siteDescription: string;
    defaultDescription: string;
    personJobTitle: string;
    personDescription: string;
    websiteDescription: string;
  };
  home: {
    paragraphs: string[];
  };
  openToWork: {
    text: string;
    link: string;
  };
  speaking: {
    title: string;
    talks: Array<{ name: string; location: string; href: string }>;
  };
  projects: {
    title: string;
    items: Array<{
      name: string;
      tagline: string;
      description: string;
      href: string;
      logo: string;
    }>;
  };
  work: {
    title: string;
    present: string;
    entries: WorkEntry[];
  };
  blog: {
    title: string;
    pageTitle: string;
    description: string;
  };
  til: {
    title: string;
    pageTitle: string;
    description: string;
  };
  cv: {
    title: string;
    description: string;
    printTip: string;
  };
}

const sharedTalks = [
  {
    name: 'Loading 40 MB of JSON on initial load',
    location: 'Productboard frontend meetup #4 2022',
    href: 'https://www.youtube.com/watch?v=43OCcnLYYn8',
  },
  {
    name: 'Every millisecond matters',
    location: 'Productboard frontend meetup #3 2021',
    href: 'https://www.youtube.com/watch?v=IWR3xxEc3V0',
  },
  {
    name: 'Code-first GraphQL Server Development with Nexus & Prisma',
    location: 'PragueJS 2019 #4',
    href: 'https://www.youtube.com/watch?v=rTJYIfae7Rk',
  },
] as const;

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    languageCode: 'en-US',
    ogLocale: 'en_US',
    nav: {
      home: 'Home',
      til: 'Today I Learned',
      blog: 'Blog',
    },
    accessibility: {
      themeToggle: 'Toggle dark mode',
      copyCode: 'Copy code to clipboard',
    },
    metadata: {
      siteTitle: SITE_TITLE,
      siteDescription: SITE_DESCRIPTION,
      defaultDescription: 'A personal website built with Astro and Space Mono font',
      personJobTitle: 'Software Developer',
      personDescription: 'Software developer passionate about React, GraphQL, TypeScript',
      websiteDescription: SITE_DESCRIPTION,
    },
    home: {
      paragraphs: [
        'Software developer passionate about <b>React</b>, <b>GraphQL</b>, <b>TypeScript</b>, and <b>AI</b>.',
        'I specialize in building high-performance web applications with modern JavaScript technologies. My expertise includes designing scalable frontend architectures, optimizing application performance, developing type-safe GraphQL APIs, and shaping codebases so AI agents can ship in them reliably.',
        "I'm comfortable shipping full products end-to-end across the JavaScript ecosystem: from the UI and backend services to databases and deployment. I enjoy owning the whole stack and wiring the pieces together into something users can actually rely on.",
        "Based in the Czech Republic, I focus on delivering exceptional user experiences through clean code and thoughtful engineering. I'm particularly interested in performance optimization, developer experience, and building tools and AI agents that make developers' lives easier.",
        "When I'm not coding, I spend time with my family, explore new technologies, play board games, and enjoy the outdoors.",
      ],
    },
    openToWork: {
      text: 'Open to new opportunities:',
      link: 'get in touch',
    },
    speaking: {
      title: 'Speaking',
      talks: [...sharedTalks],
    },
    projects: {
      title: 'Projects',
      items: [
        {
          name: 'Untanglecode',
          tagline: 'Refactoring tangled codebases into digital gardens',
          description:
            'Side project. An AI agent that manages technical debt and ongoing maintenance, keeping codebases healthy so engineers and AI agents can keep shipping.',
          href: 'https://untanglecode.com/',
          logo: 'https://untanglecode.com/favicon.svg',
        },
      ],
    },
    work: {
      title: 'Work Experience',
      present: 'Present',
      entries: [
        {
          company: 'Self-employed',
          logo: '/favicon.svg',
          from: '2015',
          role: 'Software Consultant',
          paragraphs: [
            "Run an independent consultancy creating custom applications, content management systems (CMS), and customer relationship management (CRM) solutions tailored to clients' needs.",
          ],
        },
        {
          company: 'Productboard',
          logo: 'https://www.productboard.com/favicon.ico',
          from: '2020-02',
          to: '2026-04',
          role: 'Frontend Platform Engineer',
          paragraphs: [
            'Built gradual deployments for frontend applications on top of Cloudflare Workers and our monitoring tools. The system automatically detects faulty deployments and rolls back changes, keeping production stable as shipping velocity increased.',
            'Led the migration away from slow tooling like <b>ESLint</b> to a modern stack built on <b>oxlint</b>, <b>oxfmt</b>, and <b>tsgo</b>. This provided faster feedback loops for both engineers and AI agents working in the monorepo. Adjusted the monorepo structure and conventions to work well with agents, and authored a set of <b>skills</b> that codified our workflows so agents could ship reliably across the codebase.',
            'Led multiple legacy code cleanups, removing more than <b>250</b> cyclic dependencies and improving overall code quality. Established best practices for modular design and code organization, which improved CI/CD times and reduced the number of projects that needed to be rechecked on every change.',
            'Migrated multiple applications from <b>Webpack 3</b> to <b>Webpack 5</b>, and later to a <b>Vite + Rolldown</b> setup. Built plugins and tooling to optimize bundle size and prevent accidental regressions or dev-only packages slipping into production.',
            'Drove the introduction of <b>federated GraphQL</b> into the stack, splitting our monolithic application into multiple services and unifying data fetching for around 90% of our use cases. Built tooling for GraphQL schema unification and promoted <b>Relay</b> best practices.',
            'Maintained a frontend monorepo with more than <b>750</b> packages and <b>1.6 million</b> lines of TypeScript code, shipping a number of improvements to CI/CD and the overall developer experience at that scale.',
            'Introduced Cloudflare Workers into the stack and changed how frontend applications are served, reducing initial load time and cutting <b>TTFB</b> by <b>600ms</b>.',
            'Resurrected the design system and built the initial version of our new one, Nucleus. The goal was to unify components and introduce patterns and tools that kept React and Figma in parity.',
          ],
        },
        {
          company: 'Vercel',
          logo: 'https://www.vercel.com/favicon.ico',
          from: '2019-04',
          to: '2019-11',
          role: 'Software Engineer',
          paragraphs: [
            'Helped maintain the <b>Next.js</b> framework repository, triaging issues and reviewing community contributions, and shipped <a href="https://github.com/vercel/next.js/pull/7296" target="_blank" rel="noopener noreferrer" data-seline-event="work_link" data-seline-company="Vercel" class="underline hover:text-stone-800 dark:hover:text-stone-300">API routes support</a> and other improvements. Also worked on the internal dashboard (DNS records, preview deployments).',
          ],
        },
        {
          company: 'Prisma',
          logo: 'https://www.prisma.io/favicon.ico',
          from: '2017-09',
          to: '2018-03',
          role: 'Product Engineer',
          paragraphs: [
            'Built an Electron application, <a href="https://v1.prisma.io/docs/1.34/prisma-admin/overview-el3e/" target="_blank" rel="noopener noreferrer" data-seline-event="work_link" data-seline-company="Prisma" class="underline hover:text-stone-800 dark:hover:text-stone-300">Prisma Admin</a>, the predecessor of Prisma Studio. Created a virtual data layer on top of the actual data to display pending changes that had not yet been committed. Also maintained <a href="https://github.com/graphql/graphql-playground" target="_blank" rel="noopener noreferrer" data-seline-event="work_link" data-seline-company="Prisma" class="underline hover:text-stone-800 dark:hover:text-stone-300">GraphQL Playground</a>, IDE for exploring GraphQL APIs.',
          ],
        },
      ],
    },
    blog: {
      title: 'Blog',
      pageTitle: 'Huvik - Blog',
      description: 'My two cents about different topics going through my mind',
    },
    til: {
      title: 'Today I Learned',
      pageTitle: 'Huvik - Today I Learned',
      description:
        "Welcome to my <b>Today I Learned</b> section, where I share a collection of notes on things I've recently learned or want to revisit in the future. This section is also a resource for others who may have similar questions - if there's something you've been wondering about, chances are I've covered it here. I hope this collection helps you learn and grow, just as it does for me.",
    },
    cv: {
      title: 'Lukáš Huvar - CV',
      description: 'CV of Lukáš Huvar, software developer (React, GraphQL, TypeScript).',
      printTip:
        'Tip: ⌘P → Save as PDF · A4 · uncheck "Headers and footers" and "Background graphics".',
    },
  },
  cs: {
    languageCode: 'cs-CZ',
    ogLocale: 'cs_CZ',
    nav: {
      home: 'Domů',
      til: 'Co jsem se naučil',
      blog: 'Blog',
    },
    accessibility: {
      themeToggle: 'Přepnout tmavý režim',
      copyCode: 'Kopírovat kód do schránky',
    },
    metadata: {
      siteTitle: 'Huvik - vývojář Reactu, GraphQL a TypeScriptu',
      siteDescription:
        'Osobní web Lukáše Huvara, softwarového vývojáře z České republiky se zájmem o React, GraphQL a TypeScript.',
      defaultDescription: 'Osobní web vytvořený pomocí Astro a písma Space Mono',
      personJobTitle: 'Softwarový vývojář',
      personDescription: 'Softwarový vývojář se zájmem o React, GraphQL a TypeScript',
      websiteDescription:
        'Osobní web Lukáše Huvara, softwarového vývojáře z České republiky se zájmem o React, GraphQL a TypeScript.',
    },
    home: {
      paragraphs: [
        'Softwarový vývojář se zájmem o <b>React</b>, <b>GraphQL</b>, <b>TypeScript</b> a <b>AI</b>.',
        'Specializuji se na tvorbu vysoce výkonných webových aplikací s využitím moderních JavaScriptových technologií. Mám zkušenosti s návrhem škálovatelných frontendových architektur, optimalizací výkonu aplikací, vývojem typově bezpečných GraphQL API a úpravou codebase tak, aby v ní mohli AI agenti spolehlivě dodávat změny.',
        'V JavaScriptovém ekosystému dokážu dodat celý produkt od začátku do konce: od uživatelského rozhraní a backendových služeb přes databáze až po nasazení. Baví mě převzít odpovědnost za celý stack a propojit jednotlivé části do produktu, na který se uživatelé mohou spolehnout.',
        'Žiji v České republice a zaměřuji se na vytváření výjimečných uživatelských zážitků prostřednictvím čistého kódu a promyšleného vývoje. Zajímají mě především optimalizace výkonu, developer experience a tvorba nástrojů a AI agentů, kteří vývojářům usnadňují práci.',
        'Když zrovna nepíšu kód, trávím čas s rodinou, objevuji nové technologie, hraji deskové hry a vyrážím do přírody.',
      ],
    },
    openToWork: {
      text: 'Jsem otevřený novým příležitostem:',
      link: 'ozvěte se',
    },
    speaking: {
      title: 'Přednášky',
      talks: [...sharedTalks],
    },
    projects: {
      title: 'Projekty',
      items: [
        {
          name: 'Untanglecode',
          tagline: 'Proměna zamotaných codebase v digitální zahrady',
          description:
            'Vedlejší projekt. AI agent, který spravuje technický dluh a průběžnou údržbu. Udržuje codebase zdravou, aby v ní vývojáři i AI agenti mohli dál spolehlivě dodávat změny.',
          href: 'https://untanglecode.com/',
          logo: 'https://untanglecode.com/favicon.svg',
        },
      ],
    },
    work: {
      title: 'Pracovní zkušenosti',
      present: 'současnost',
      entries: [
        {
          company: 'Na volné noze',
          logo: '/favicon.svg',
          from: '2015',
          role: 'Softwarový konzultant',
          paragraphs: [
            'Provozuji nezávislé poradenství a vytvářím aplikace na míru, systémy pro správu obsahu (<b>CMS</b>) a řešení pro řízení vztahů se zákazníky (<b>CRM</b>) přizpůsobená potřebám klientů.',
          ],
        },
        {
          company: 'Productboard',
          logo: 'https://www.productboard.com/favicon.ico',
          from: '2020-02',
          to: '2026-04',
          role: 'Inženýr frontendové platformy',
          paragraphs: [
            'Vybudoval jsem postupné nasazování frontendových aplikací nad Cloudflare Workers a našimi monitorovacími nástroji. Systém automaticky odhalí vadné nasazení a vrátí změny zpět, takže produkce zůstává stabilní i při rostoucí rychlosti vývoje.',
            'Vedl jsem migraci od pomalých nástrojů, jako je <b>ESLint</b>, k modernímu stacku postavenému na <b>oxlint</b>, <b>oxfmt</b> a <b>tsgo</b>. Vývojáři i AI agenti pracující v monorepu díky tomu dostávali rychlejší zpětnou vazbu. Upravil jsem strukturu a konvence monorepa pro efektivní práci agentů a vytvořil sadu <b>skills</b>, která zachytila naše postupy a umožnila agentům spolehlivě dodávat změny napříč codebase.',
            'Vedl jsem několik úklidů staršího kódu, odstranil více než <b>250</b> cyklických závislostí a zlepšil celkovou kvalitu kódu. Zavedl jsem osvědčené postupy pro modulární návrh a organizaci kódu, které zrychlily CI/CD a snížily počet projektů kontrolovaných při každé změně.',
            'Migroval jsem několik aplikací z <b>Webpacku 3</b> na <b>Webpack 5</b> a později na kombinaci <b>Vite + Rolldown</b>. Vytvořil jsem pluginy a nástroje pro optimalizaci velikosti bundlů a ochranu před nechtěnými regresemi nebo proniknutím balíčků určených jen pro vývoj do produkce.',
            'Prosadil jsem zavedení <b>federovaného GraphQL</b>, rozdělení monolitické aplikace do více služeb a sjednocení načítání dat pro přibližně 90 % našich případů použití. Vytvořil jsem nástroje pro sjednocování GraphQL schémat a podporoval osvědčené postupy pro <b>Relay</b>.',
            'Spravoval jsem frontendové monorepo s více než <b>750</b> balíčky a <b>1,6 milionu</b> řádků TypeScriptu a v tomto měřítku dodal řadu vylepšení CI/CD i celkového developer experience.',
            'Zavedl jsem do stacku Cloudflare Workers a změnil způsob servírování frontendových aplikací. Zkrátil jsem tím počáteční načítání a snížil <b>TTFB</b> o <b>600 ms</b>.',
            'Oživil jsem design systém a vytvořil první verzi nového systému Nucleus. Cílem bylo sjednotit komponenty a zavést postupy a nástroje, které udržovaly React a Figmu v souladu.',
          ],
        },
        {
          company: 'Vercel',
          logo: 'https://www.vercel.com/favicon.ico',
          from: '2019-04',
          to: '2019-11',
          role: 'Softwarový inženýr',
          paragraphs: [
            'Pomáhal jsem spravovat repozitář frameworku <b>Next.js</b>, třídit issues a revidovat příspěvky komunity. Dodal jsem <a href="https://github.com/vercel/next.js/pull/7296" target="_blank" rel="noopener noreferrer" data-seline-event="work_link" data-seline-company="Vercel" class="underline hover:text-stone-800 dark:hover:text-stone-300">podporu API routes</a> a další vylepšení. Pracoval jsem také na interním dashboardu (DNS záznamy a preview deployments).',
          ],
        },
        {
          company: 'Prisma',
          logo: 'https://www.prisma.io/favicon.ico',
          from: '2017-09',
          to: '2018-03',
          role: 'Produktový inženýr',
          paragraphs: [
            'Vytvořil jsem Electron aplikaci <a href="https://v1.prisma.io/docs/1.34/prisma-admin/overview-el3e/" target="_blank" rel="noopener noreferrer" data-seline-event="work_link" data-seline-company="Prisma" class="underline hover:text-stone-800 dark:hover:text-stone-300">Prisma Admin</a>, předchůdce Prisma Studia. Nad skutečnými daty jsem vytvořil virtuální datovou vrstvu, která zobrazovala dosud nepotvrzené změny. Také jsem spravoval <a href="https://github.com/graphql/graphql-playground" target="_blank" rel="noopener noreferrer" data-seline-event="work_link" data-seline-company="Prisma" class="underline hover:text-stone-800 dark:hover:text-stone-300">GraphQL Playground</a>, IDE pro prozkoumávání GraphQL API.',
          ],
        },
      ],
    },
    blog: {
      title: 'Blog',
      pageTitle: 'Huvik - Blog',
      description: 'Moje postřehy k různým tématům, která mi zrovna běží hlavou',
    },
    til: {
      title: 'Co jsem se naučil',
      pageTitle: 'Huvik - Co jsem se naučil',
      description:
        'Vítejte v mé sekci <b>Co jsem se naučil</b>, kde sdílím poznámky k věcem, které jsem se nedávno naučil nebo ke kterým se chci v budoucnu vrátit. Sekce slouží také ostatním, kteří mohou řešit podobné otázky. Pokud vás něco zajímá, je možné, že jsem se tomu už věnoval. Doufám, že vám tato sbírka pomůže učit se a růst stejně jako mně.',
    },
    cv: {
      title: 'Lukáš Huvar - CV',
      description: 'CV Lukáše Huvara, softwarového vývojáře (React, GraphQL, TypeScript).',
      printTip:
        'Tip: ⌘P → Uložit jako PDF · A4 · vypněte „Záhlaví a zápatí“ a „Grafika na pozadí“.',
    },
  },
};

export function getLocalePath(locale: Locale, pathname: string): string {
  const publicPath =
    pathname
      .replace(/\/index\.html$/, '/')
      .replace(/\.html$/, '')
      .replace(/\/+$/, '') || '/';
  const pathWithoutLocale = publicPath.replace(/^\/cs(?=\/|$)/, '') || '/';

  if (locale === DEFAULT_LOCALE) {
    return pathWithoutLocale;
  }

  return pathWithoutLocale === '/' ? '/cs' : `/cs${pathWithoutLocale}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'cs' : 'en';
}
