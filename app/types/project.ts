export interface Project {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  year?: string;
  order: number;
  featured: boolean;
  hidden: boolean;
  status?: string;
  categories: string[];
  technologies: string[];
  cover: string | null;
  preview: string | null;
  gallery: string[];
  website?: string;
  github?: string;
  color: string;
}
