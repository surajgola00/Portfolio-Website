export const DEFAULT_PAGE_TITLE = 'TodFodCoders | Team Portfolio'
export const DEFAULT_PAGE_DESCRIPTION =
  'Explore the TodFodCoders team portfolio and view each member profile, skills, projects, and experience.'

export const updateDocumentMetadata = ({
  title = DEFAULT_PAGE_TITLE,
  description = DEFAULT_PAGE_DESCRIPTION,
} = {}) => {
  document.title = title

  let descriptionTag = document.querySelector('meta[name="description"]')

  if (!descriptionTag) {
    descriptionTag = document.createElement('meta')
    descriptionTag.name = 'description'
    document.head.appendChild(descriptionTag)
  }

  descriptionTag.setAttribute('content', description)
}
