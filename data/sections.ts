export const sections = [
  { id: 'experience', index: '01', label: 'expérience', title: 'Expérience' },
  { id: 'projects', index: '02', label: 'projets', title: 'Projets' },
  { id: 'lab', index: '03', label: 'labo', title: 'À côté du code' },
  { id: 'stack', index: '04', label: 'stack', title: 'Stack' },
  { id: 'contact', index: '05', label: 'contact', title: 'Contact' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

export function getSection(id: SectionId) {
  return sections.find((section) => section.id === id)!;
}
