export interface Root {
  prodotti: Prodotti[]
  users: any[]
  posts: any[]
}

export interface Prodotti {
  id: number
  nome: string
  categoria: string
  prezzo: number
  taglie_disponibili: string[]
  colori_disponibili: string[]
  descrizione: string
  immagine: string
  nuovo_arrivi?: boolean
  best_seller?: number
}
