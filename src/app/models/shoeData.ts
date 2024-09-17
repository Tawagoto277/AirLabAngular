export interface Root {
  prodotti: Prodotto[]
  banner: Banner[]
  filtro: Filtro[]
  users: any[]
  posts: any[]
}

export interface Banner {
  id: string
  nome: string
  immagine: string
}

export interface Prodotto {
  id: number
  nome: string
  categoria: string
  prezzo: number
  taglie_disponibili: string[]
  colori_disponibili: string[]
  descrizione: string
  immagine: string
  nuovo_arrivi?: boolean
  best_seller: number
}

export interface Filtro {
  id?: number
  nome?: string
  categoria?: string
  prezzo?: number
  taglie_disponibili?: string[]
  colori_disponibili?: string[]
  descrizione?: string
  immagine?: string
  nuovo_arrivi?: boolean
  best_seller?: number
}

export interface CartItem{
  id: number;
  nome: string;
  categoria: string;
  prezzo: number;
  taglia: number;
  colore: string;
  descrizione: string;
  immagine: string;
  best_seller: number;
  quantita: number;
}