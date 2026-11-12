import { useEffect } from 'react';

type Props = { title: string; description: string };

export function PageMeta({ title, description }: Props) {
  useEffect(() => {
    document.title = `${title} | Nuit Lumière`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.append(meta);
    }
    meta.content = description;
  }, [description, title]);
  return null;
}
