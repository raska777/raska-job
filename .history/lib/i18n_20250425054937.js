import fs from 'fs'
import path from 'path'

export function getMessages(lang = 'uz') {
  try {
    const filePath = path.join(process.cwd(), 'messages', `${lang}.json`)
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (error) {
    console.error('Error loading messages:', error)
    return {}
  }
}