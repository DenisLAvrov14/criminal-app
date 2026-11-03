// Справочник разделов сайта. Ключ — значение поля `section` в Directus (оно же адрес /<section>).
// Новый раздел: добавить вариант в поле section в Directus и строку сюда.

export interface SectionInfo {
  title: string;
  intro: string;
}

export const SECTIONS: Record<string, SectionInfo> = {
  history: {
    title: 'History',
    intro:
      'From the Solovki camp and the Bitch War in the Gulag to the gang wars of the 1990s — how the criminal world was shaped.',
  },
  traditions: {
    title: 'Traditions',
    intro:
      'The unwritten code of the Russian underworld: rules, rituals, slang and the sayings that still circulate behind bars.',
  },
  hierarchy: {
    title: 'Hierarchy',
    intro:
      'Who the thieves-in-law are, where they came from, and how red, black and green zones divide power behind bars.',
  },
  locations: {
    title: 'Locations',
    intro: 'The prisons behind the legends: Butyrka, Black Dolphin, White Swan, Polar Owl and more.',
  },
  tattoos: {
    title: 'Tattoos',
    intro:
      'A language written on skin. What Russian criminal tattoos mean — rings, church domes, cats, spiders, cards and more.',
  },
  gangs: {
    title: 'Gangs',
    intro: 'Organized crime groups of Russia and the former USSR — who they were, how they ruled and how they fell.',
  },
  legends: {
    title: 'Legends',
    intro: 'Lives of famous thieves-in-law and the stories that made them legends of the underworld.',
  },
  'serial-killers': {
    title: 'Serial Killers',
    intro: 'The most notorious serial killers of the USSR and Russia, the investigations and the trials.',
  },
  music: {
    title: 'Music',
    intro: 'Blatnyak and Russian chanson — the songs of the criminal world and the people who sang them.',
  },
};

export function sectionTitle(section: string): string {
  return SECTIONS[section]?.title ?? section[0].toUpperCase() + section.slice(1);
}
