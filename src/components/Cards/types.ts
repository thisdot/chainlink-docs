export interface ILink {
  icon: ImageMetadata
  href: string
  label: string
}
export interface ICard {
  title: string
  description: string
  links?: ILink[]
}
