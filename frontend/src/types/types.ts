export interface FormData {
  accountType: string,
  companyName: string,
  firstName?: string,
  fullName?: string,
  lastName?: string,
  email: string,
  phone: string,
  industry: string,
  size?: string,
  projectType?: string,
  description: string,
  budgetMin?: string,
  budgetMax?: string,
  timeline?: string,
  howHeard?: string,
  loaction?: string,
  hourlyRate?: number,
  job?: string,
  additionalInfo: string,
  role: string
}

export interface Conversation {
  createdAt: string
  email: string
  gender: string
  name: string
  profilePicture: string
  role: string
  updatedAt: string
  __v: number
  _id: string
}

export interface Messages {
  _id: string
  senderId: string,
  receiverId: string | undefined,
  conversationId: string,
  message: string,
  timestamp: string
}

export interface User {
  _id: string,
  name: string,
  email: string,
  profilePic: string
}