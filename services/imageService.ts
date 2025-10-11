export const getProfileImage = (file: { uri?: string } | string | null) => {
  if (file && typeof file === 'string') return file
  if (file && typeof file === 'object') return file.uri

  return require('../assets/images/icon.png')
}

export const getFilePath = (file: { uri?: string } | string | null) => {
  if (file && typeof file === 'string') return file
  if (file && typeof file === 'object') return file.uri

  return null
}
