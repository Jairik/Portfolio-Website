export class ProjectItem {
  title: string = "";
  date?: string = "";
  description: string = "";
  link: string = "";
  techStack: string[] = [];
  imageSrc?: string[] = [];
  demoLink?: string = "";
  demoVideoLink?: string = "";
  featured?: boolean = false;
  current?: boolean = false;
  award?: string = "";

  constructor(
    title: string,
    description: string,
    link: string,
    techStack: string[],
    date?: string,
    imageSrc?: string[],
    demoLink?: string,
    demoVideoLink?: string,
    featured?: boolean,
    current?: boolean,
    award?: string
  ) {
    this.title = title;
    this.date = date;
    this.description = description;
    this.link = link;
    this.techStack = techStack;
    this.imageSrc = imageSrc;
    this.demoLink = demoLink;
    this.demoVideoLink = demoVideoLink;
    this.featured = featured;
    this.current = current;
    this.award = award;
  }
}
